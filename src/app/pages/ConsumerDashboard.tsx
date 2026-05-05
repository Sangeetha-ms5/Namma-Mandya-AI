import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { ShoppingCart } from 'lucide-react';

const categories = [
  { name: 'Vegetables', icon: '🥬', path: '/consumer/products/vegetables' },
  { name: 'Fruits', icon: '🍎', path: '/consumer/products/fruits' },
  { name: 'Leaves', icon: '🌿', path: '/consumer/products/leaves' },
  { name: 'Milk Products', icon: '🥛', path: '/consumer/products/milk-products' },
  { name: 'Grains', icon: '🌾', path: '/consumer/products/grains' },
  { name: 'Organic Products', icon: '🌱', path: '/consumer/products/organic' }
];

export default function ConsumerDashboard() {
  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-bold text-white flex items-center gap-3">
              <span>🛒</span>
              Consumer Dashboard
              <span>🌱</span>
            </h1>

            <Link
              to="/consumer/cart"
              className="bg-white/20 backdrop-blur-lg px-8 py-4 rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all flex items-center gap-3 text-white font-bold text-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              View Cart
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/20 hover:border-white/50 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                {/* Icon */}
                <div className="text-8xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h2 className="text-3xl font-bold text-white text-center">
                  {category.name}
                </h2>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
              </Link>
            ))}
          </div>

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
