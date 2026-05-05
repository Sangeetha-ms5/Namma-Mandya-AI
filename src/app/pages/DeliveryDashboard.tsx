import { useState } from 'react';
import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { MapPin, Package, CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  farmerName: string;
  consumerName: string;
  items: string[];
  pickupAddress: string;
  deliveryAddress: string;
  status: 'available' | 'accepted' | 'delivering' | 'delivered';
}

const mockOrders: Order[] = [
  {
    id: '1',
    farmerName: 'Ramesh Kumar',
    consumerName: 'Priya Sharma',
    items: ['Tomato - 5kg', 'Onion - 3kg'],
    pickupAddress: 'Mandya, Karnataka',
    deliveryAddress: 'Maddur, Karnataka',
    status: 'available'
  },
  {
    id: '2',
    farmerName: 'Suresh Gowda',
    consumerName: 'Anil Kumar',
    items: ['Mango - 10kg'],
    pickupAddress: 'Shrirangapatna, Karnataka',
    deliveryAddress: 'Mandya, Karnataka',
    status: 'available'
  }
];

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [sharingLocation, setSharingLocation] = useState<string | null>(null);

  const acceptOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
  };

  const startDelivery = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'delivering' } : order
    ));
    setSharingLocation(orderId);
  };

  const completeDelivery = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'delivered' } : order
    ));
    setSharingLocation(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-blue-500/80';
      case 'accepted':
        return 'bg-yellow-500/80';
      case 'delivering':
        return 'bg-orange-500/80';
      case 'delivered':
        return 'bg-green-500/80';
      default:
        return 'bg-gray-500/80';
    }
  };

  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-12 flex items-center gap-3">
            <span>🚚</span>
            Delivery Partner Dashboard
            <span>📦</span>
          </h1>

          {/* Available Orders */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <Package className="w-8 h-8" />
              Available Orders
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.filter(o => o.status === 'available').map((order) => (
                <div
                  key={order.id}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Order #{order.id}</h3>
                      <span className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-white/70 text-sm">Farmer</p>
                      <p className="text-white font-semibold">{order.farmerName}</p>
                      <p className="text-white/80 text-sm">{order.pickupAddress}</p>
                    </div>

                    <div>
                      <p className="text-white/70 text-sm">Consumer</p>
                      <p className="text-white font-semibold">{order.consumerName}</p>
                      <p className="text-white/80 text-sm">{order.deliveryAddress}</p>
                    </div>

                    <div>
                      <p className="text-white/70 text-sm mb-1">Items</p>
                      <ul className="list-disc list-inside text-white/90">
                        {order.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => acceptOrder(order.id)}
                    className="w-full bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold py-3 rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Accept Order
                  </button>
                </div>
              ))}
            </div>

            {orders.filter(o => o.status === 'available').length === 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border-2 border-white/20 text-center">
                <p className="text-white/80 text-xl">No available orders at the moment.</p>
              </div>
            )}
          </div>

          {/* Active Deliveries */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <MapPin className="w-8 h-8" />
              Active Deliveries
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.filter(o => o.status === 'accepted' || o.status === 'delivering').map((order) => (
                <div
                  key={order.id}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Order #{order.id}</h3>
                      <span className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-white/70 text-sm">Pickup from</p>
                      <p className="text-white font-semibold">{order.farmerName}</p>
                      <p className="text-white/80 text-sm">{order.pickupAddress}</p>
                    </div>

                    <div>
                      <p className="text-white/70 text-sm">Deliver to</p>
                      <p className="text-white font-semibold">{order.consumerName}</p>
                      <p className="text-white/80 text-sm">{order.deliveryAddress}</p>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  {sharingLocation === order.id && (
                    <div className="mb-6 bg-white/20 rounded-xl p-8 text-center border-2 border-white/30">
                      <MapPin className="w-12 h-12 text-white mx-auto mb-3" />
                      <p className="text-white font-semibold mb-2">📍 Live Location Sharing Active</p>
                      <p className="text-white/70 text-sm">Consumer can track your location</p>
                      <div className="mt-4 bg-white/10 rounded-lg p-4">
                        <p className="text-white/90 text-sm">🗺️ Map View Placeholder</p>
                        <p className="text-white/60 text-xs mt-2">Live tracking enabled</p>
                      </div>
                    </div>
                  )}

                  {order.status === 'accepted' ? (
                    <button
                      onClick={() => startDelivery(order.id)}
                      className="w-full bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold py-3 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-5 h-5" />
                      Start Delivery & Share Location
                    </button>
                  ) : (
                    <button
                      onClick={() => completeDelivery(order.id)}
                      className="w-full bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold py-3 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Complete Delivery
                    </button>
                  )}
                </div>
              ))}
            </div>

            {orders.filter(o => o.status === 'accepted' || o.status === 'delivering').length === 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border-2 border-white/20 text-center">
                <p className="text-white/80 text-xl">No active deliveries.</p>
              </div>
            )}
          </div>

          {/* Completed Deliveries */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle className="w-8 h-8" />
              Completed Deliveries
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.filter(o => o.status === 'delivered').map((order) => (
                <div
                  key={order.id}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-500/40 opacity-80"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Order #{order.id}</h3>
                      <span className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        ✅ DELIVERED
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-white/80">
                      {order.farmerName} → {order.consumerName}
                    </p>
                    <p className="text-white/60 text-sm">{order.items.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GreenBackground>
  );
}
