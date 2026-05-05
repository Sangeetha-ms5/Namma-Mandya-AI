import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { Trash2, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  icon: string;
  farmerName: string;
  farmerAddress: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const removeItem = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      localStorage.removeItem('cart');
      setCartItems([]);
      setOrderPlaced(false);
    }, 3000);
  };

  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-12 flex items-center gap-3">
            <ShoppingBag className="w-12 h-12" />
            Shopping Cart
            <span>🛒</span>
          </h1>

          {orderPlaced && (
            <div className="mb-8 bg-white/20 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/40 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-white mb-2">Order Placed Successfully!</h2>
              <p className="text-white/90 text-lg">Your fresh produce will be delivered soon.</p>
            </div>
          )}

          {cartItems.length === 0 && !orderPlaced ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-16 border-2 border-white/20 text-center">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
              <p className="text-white/80 text-lg mb-8">Start adding fresh produce from local farmers!</p>
              <Link
                to="/consumer/dashboard"
                className="inline-block bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold text-xl px-12 py-4 rounded-xl hover:scale-105 transition-all duration-300"
              >
                Browse Products
              </Link>
            </div>
          ) : !orderPlaced ? (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-8">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 flex items-center gap-6"
                  >
                    {/* Product Icon */}
                    <div className="text-6xl">{item.icon}</div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-white/80 text-sm mb-1">
                        <span className="font-semibold">Farmer:</span> {item.farmerName}
                      </p>
                      <p className="text-white/70 text-xs">{item.farmerAddress}</p>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-white font-bold text-2xl">₹{item.price}/kg</div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(index)}
                      className="bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-xl transition-all"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold text-white">Total:</span>
                  <span className="text-4xl font-bold text-white">₹{getTotalPrice()}</span>
                </div>

                <button
                  onClick={placeOrder}
                  className="w-full bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold text-2xl py-5 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Place Order 🌱
                </button>
              </div>
            </>
          ) : null}

          {/* Navigation Buttons */}
          <div className="flex gap-6 justify-center mt-16">
            <button
              onClick={() => window.history.back()}
              className="bg-white/20 backdrop-blur-lg text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-white/30 transition-all border-2 border-white/30"
            >
              ← Previous Page
            </button>
            <Link
              to="/"
              className="bg-white/20 backdrop-blur-lg text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-white/30 transition-all border-2 border-white/30"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>
    </GreenBackground>
  );
}
