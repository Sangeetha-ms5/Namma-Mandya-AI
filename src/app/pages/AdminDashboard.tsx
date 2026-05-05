import { useState } from 'react';
import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { Users, ShoppingCart, Truck, TrendingUp, Package, BarChart3, FileText } from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  phone: string;
  taluk: string;
  crops: number;
  status: 'active' | 'inactive';
}

interface Consumer {
  id: string;
  name: string;
  phone: string;
  taluk: string;
  orders: number;
  status: 'active' | 'inactive';
}

interface Order {
  id: string;
  farmer: string;
  consumer: string;
  items: string;
  amount: number;
  status: 'pending' | 'delivering' | 'completed';
  date: string;
}

const mockFarmers: Farmer[] = [
  { id: 'F001', name: 'Ramesh Kumar', phone: '9876543210', taluk: 'Mandya', crops: 8, status: 'active' },
  { id: 'F002', name: 'Suresh Gowda', phone: '9876543211', taluk: 'Maddur', crops: 12, status: 'active' },
  { id: 'F003', name: 'Manjunath', phone: '9876543212', taluk: 'Malavalli', crops: 6, status: 'active' },
  { id: 'F004', name: 'Krishna Murthy', phone: '9876543213', taluk: 'Pandavapura', crops: 10, status: 'inactive' },
  { id: 'F005', name: 'Ravi Shankar', phone: '9876543214', taluk: 'Mandya', crops: 15, status: 'active' },
];

const mockConsumers: Consumer[] = [
  { id: 'C001', name: 'Priya Sharma', phone: '9876501234', taluk: 'Maddur', orders: 5, status: 'active' },
  { id: 'C002', name: 'Anil Kumar', phone: '9876501235', taluk: 'Mandya', orders: 3, status: 'active' },
  { id: 'C003', name: 'Deepa Rao', phone: '9876501236', taluk: 'Shrirangapatna', orders: 8, status: 'active' },
  { id: 'C004', name: 'Vikram Singh', phone: '9876501237', taluk: 'Krishnarajpet', orders: 2, status: 'inactive' },
];

const mockOrders: Order[] = [
  { id: 'ORD001', farmer: 'Ramesh Kumar', consumer: 'Priya Sharma', items: 'Tomato (5kg), Onion (3kg)', amount: 350, status: 'completed', date: '2026-05-04' },
  { id: 'ORD002', farmer: 'Suresh Gowda', consumer: 'Anil Kumar', items: 'Mango (10kg)', amount: 800, status: 'delivering', date: '2026-05-05' },
  { id: 'ORD003', farmer: 'Manjunath', consumer: 'Deepa Rao', items: 'Potato (20kg)', amount: 400, status: 'pending', date: '2026-05-05' },
  { id: 'ORD004', farmer: 'Ravi Shankar', consumer: 'Priya Sharma', items: 'Banana (15kg)', amount: 300, status: 'completed', date: '2026-05-03' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'farmers' | 'consumers' | 'orders'>('overview');
  const [farmers, setFarmers] = useState<Farmer[]>(mockFarmers);
  const [consumers, setConsumers] = useState<Consumer[]>(mockConsumers);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const toggleFarmerStatus = (farmerId: string) => {
    setFarmers(farmers.map(farmer =>
      farmer.id === farmerId
        ? { ...farmer, status: farmer.status === 'active' ? 'inactive' : 'active' }
        : farmer
    ));
  };

  const toggleConsumerStatus = (consumerId: string) => {
    setConsumers(consumers.map(consumer =>
      consumer.id === consumerId
        ? { ...consumer, status: consumer.status === 'active' ? 'inactive' : 'active' }
        : consumer
    ));
  };

  const updateOrderStatus = (orderId: string, newStatus: 'pending' | 'delivering' | 'completed') => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const stats = {
    totalFarmers: farmers.length,
    activeFarmers: farmers.filter(f => f.status === 'active').length,
    totalConsumers: consumers.length,
    activeConsumers: consumers.filter(c => c.status === 'active').length,
    totalOrders: orders.length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0),
  };

  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-12 flex items-center gap-3">
            <span>🧠</span>
            Admin Dashboard
            <span>📊</span>
          </h1>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-12 h-12 text-orange-400" />
                <span className="text-white/80 text-sm">Active</span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stats.activeFarmers}</div>
              <div className="text-white/70">Active Farmers</div>
              <div className="text-white/50 text-sm mt-2">Total: {stats.totalFarmers}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <ShoppingCart className="w-12 h-12 text-blue-400" />
                <span className="text-white/80 text-sm">Active</span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stats.activeConsumers}</div>
              <div className="text-white/70">Active Consumers</div>
              <div className="text-white/50 text-sm mt-2">Total: {stats.totalConsumers}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Package className="w-12 h-12 text-purple-400" />
                <span className="text-white/80 text-sm">Completed</span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stats.completedOrders}</div>
              <div className="text-white/70">Orders Completed</div>
              <div className="text-white/50 text-sm mt-2">Total: {stats.totalOrders}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:scale-105 transition-all">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-12 h-12 text-yellow-400" />
                <span className="text-white/80 text-sm">Revenue</span>
              </div>
              <div className="text-4xl font-bold text-white mb-1">₹{stats.totalRevenue}</div>
              <div className="text-white/70">Total Revenue</div>
              <div className="text-white/50 text-sm mt-2">This month</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-white text-[#0B7A3E]'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('farmers')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'farmers'
                  ? 'bg-white text-[#0B7A3E]'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Farmers
            </button>
            <button
              onClick={() => setActiveTab('consumers')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'consumers'
                  ? 'bg-white text-[#0B7A3E]'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Consumers
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'orders'
                  ? 'bg-white text-[#0B7A3E]'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Orders
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6">Platform Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">📍 Taluk Coverage</h3>
                    <div className="space-y-2">
                      {['Mandya', 'Maddur', 'Malavalli', 'Pandavapura', 'Nagamangala', 'Shrirangapatna', 'Krishnarajpet'].map((taluk) => (
                        <div key={taluk} className="flex justify-between items-center text-white/90">
                          <span>{taluk}</span>
                          <span className="bg-green-500/80 px-3 py-1 rounded-full text-sm">Active</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">📊 Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-white/90">
                        <span>Active Deliveries</span>
                        <span className="font-bold">2</span>
                      </div>
                      <div className="flex justify-between text-white/90">
                        <span>Pending Orders</span>
                        <span className="font-bold">1</span>
                      </div>
                      <div className="flex justify-between text-white/90">
                        <span>Total Crops Listed</span>
                        <span className="font-bold">31+</span>
                      </div>
                      <div className="flex justify-between text-white/90">
                        <span>Platform Uptime</span>
                        <span className="font-bold text-green-400">99.9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="bg-green-500/80 p-3 rounded-full">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">New Farmer Registered</p>
                      <p className="text-white/70 text-sm">Ravi Shankar joined from Mandya</p>
                    </div>
                    <span className="text-white/60 text-sm">2 hrs ago</span>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="bg-blue-500/80 p-3 rounded-full">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">Order Completed</p>
                      <p className="text-white/70 text-sm">ORD001 delivered successfully</p>
                    </div>
                    <span className="text-white/60 text-sm">5 hrs ago</span>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="bg-orange-500/80 p-3 rounded-full">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">Price Alert</p>
                      <p className="text-white/70 text-sm">Tomato prices increased by 15%</p>
                    </div>
                    <span className="text-white/60 text-sm">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'farmers' && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">All Farmers</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white font-bold py-4 px-4">ID</th>
                      <th className="text-left text-white font-bold py-4 px-4">Name</th>
                      <th className="text-left text-white font-bold py-4 px-4">Phone</th>
                      <th className="text-left text-white font-bold py-4 px-4">Taluk</th>
                      <th className="text-left text-white font-bold py-4 px-4">Crops Listed</th>
                      <th className="text-left text-white font-bold py-4 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmers.map((farmer) => (
                      <tr key={farmer.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                        <td className="text-white/90 py-4 px-4">{farmer.id}</td>
                        <td className="text-white py-4 px-4 font-semibold">{farmer.name}</td>
                        <td className="text-white/90 py-4 px-4">{farmer.phone}</td>
                        <td className="text-white/90 py-4 px-4">{farmer.taluk}</td>
                        <td className="text-white/90 py-4 px-4">{farmer.crops} crops</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => toggleFarmerStatus(farmer.id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                              farmer.status === 'active' ? 'bg-green-500/80 hover:bg-green-600/80 text-white' : 'bg-gray-500/80 hover:bg-gray-600/80 text-white'
                            }`}
                          >
                            {farmer.status.toUpperCase()}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'consumers' && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">All Consumers</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white font-bold py-4 px-4">ID</th>
                      <th className="text-left text-white font-bold py-4 px-4">Name</th>
                      <th className="text-left text-white font-bold py-4 px-4">Phone</th>
                      <th className="text-left text-white font-bold py-4 px-4">Taluk</th>
                      <th className="text-left text-white font-bold py-4 px-4">Total Orders</th>
                      <th className="text-left text-white font-bold py-4 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consumers.map((consumer) => (
                      <tr key={consumer.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                        <td className="text-white/90 py-4 px-4">{consumer.id}</td>
                        <td className="text-white py-4 px-4 font-semibold">{consumer.name}</td>
                        <td className="text-white/90 py-4 px-4">{consumer.phone}</td>
                        <td className="text-white/90 py-4 px-4">{consumer.taluk}</td>
                        <td className="text-white/90 py-4 px-4">{consumer.orders} orders</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => toggleConsumerStatus(consumer.id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                              consumer.status === 'active' ? 'bg-green-500/80 hover:bg-green-600/80 text-white' : 'bg-gray-500/80 hover:bg-gray-600/80 text-white'
                            }`}
                          >
                            {consumer.status.toUpperCase()}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">All Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white font-bold py-4 px-4">Order ID</th>
                      <th className="text-left text-white font-bold py-4 px-4">Farmer</th>
                      <th className="text-left text-white font-bold py-4 px-4">Consumer</th>
                      <th className="text-left text-white font-bold py-4 px-4">Items</th>
                      <th className="text-left text-white font-bold py-4 px-4">Amount</th>
                      <th className="text-left text-white font-bold py-4 px-4">Date</th>
                      <th className="text-left text-white font-bold py-4 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                        <td className="text-white/90 py-4 px-4 font-semibold">{order.id}</td>
                        <td className="text-white/90 py-4 px-4">{order.farmer}</td>
                        <td className="text-white/90 py-4 px-4">{order.consumer}</td>
                        <td className="text-white/80 py-4 px-4 text-sm">{order.items}</td>
                        <td className="text-white py-4 px-4 font-bold">₹{order.amount}</td>
                        <td className="text-white/80 py-4 px-4 text-sm">{order.date}</td>
                        <td className="py-4 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as 'pending' | 'delivering' | 'completed')}
                            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105 ${
                              order.status === 'completed' ? 'bg-green-500/80 text-white' :
                              order.status === 'delivering' ? 'bg-orange-500/80 text-white' :
                              'bg-yellow-500/80 text-white'
                            }`}
                          >
                            <option value="pending" className="bg-[#0B7A3E]">PENDING</option>
                            <option value="delivering" className="bg-[#0B7A3E]">DELIVERING</option>
                            <option value="completed" className="bg-[#0B7A3E]">COMPLETED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-6 justify-center mt-16">
            <Link
              to="/"
              className="bg-white/20 backdrop-blur-lg text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-white/30 transition-all border-2 border-white/30"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </GreenBackground>
  );
}
