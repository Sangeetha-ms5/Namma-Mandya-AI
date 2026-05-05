import { useState } from 'react';
import { useParams, Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { ShoppingCart, Upload } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  icon: string;
  farmerName: string;
  farmerAddress: string;
  price: number;
  quantity: number;
}

const mockProducts: Record<string, Product[]> = {
  vegetables: [
    { id: '1', name: 'Tomato', icon: '🍅', farmerName: 'Ramesh Kumar', farmerAddress: 'Mandya, Karnataka', price: 30, quantity: 100 },
    { id: '2', name: 'Onion', icon: '🧅', farmerName: 'Suresh Gowda', farmerAddress: 'Maddur, Karnataka', price: 25, quantity: 150 },
    { id: '3', name: 'Potato', icon: '🥔', farmerName: 'Manjunath', farmerAddress: 'Malavalli, Karnataka', price: 20, quantity: 200 },
    { id: '4', name: 'Carrot', icon: '🥕', farmerName: 'Krishna Murthy', farmerAddress: 'Pandavapura, Karnataka', price: 35, quantity: 80 },
  ],
  fruits: [
    { id: '5', name: 'Banana', icon: '🍌', farmerName: 'Ravi Shankar', farmerAddress: 'Mandya, Karnataka', price: 20, quantity: 120 },
    { id: '6', name: 'Mango', icon: '🥭', farmerName: 'Venkatesh', farmerAddress: 'Shrirangapatna, Karnataka', price: 80, quantity: 50 },
  ],
  leaves: [
    { id: '7', name: 'Spinach', icon: '🥬', farmerName: 'Nagendra', farmerAddress: 'Krishnarajpet, Karnataka', price: 30, quantity: 60 },
    { id: '8', name: 'Coriander', icon: '🌿', farmerName: 'Prakash', farmerAddress: 'Mandya, Karnataka', price: 40, quantity: 40 },
  ],
  'milk-products': [
    { id: '9', name: 'Fresh Milk', icon: '🥛', farmerName: 'Dairy Farm Co-op', farmerAddress: 'Maddur, Karnataka', price: 50, quantity: 100 },
  ],
  grains: [
    { id: '10', name: 'Ragi', icon: '🌾', farmerName: 'Basavaraj', farmerAddress: 'Malavalli, Karnataka', price: 35, quantity: 200 },
    { id: '11', name: 'Paddy', icon: '🌾', farmerName: 'Shivaraj', farmerAddress: 'Pandavapura, Karnataka', price: 30, quantity: 300 },
  ],
  organic: [
    { id: '12', name: 'Organic Tomato', icon: '🍅', farmerName: 'Organic Farmers Group', farmerAddress: 'Mandya, Karnataka', price: 45, quantity: 80 },
  ]
};

export default function ProductListing() {
  const { category } = useParams();
  const products = category ? mockProducts[category] || [] : [];
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCart(existingCart);
    alert(`${product.name} added to cart!`);
  };

  const buyNow = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.location.href = '/consumer/cart';
  };

  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-bold text-white flex items-center gap-3 capitalize">
              <span>🌱</span>
              {category?.replace('-', ' ')}
            </h1>

            <Link
              to="/consumer/cart"
              className="bg-white/20 backdrop-blur-lg px-8 py-4 rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all flex items-center gap-3 text-white font-bold text-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              View Cart
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                {/* Product Image */}
                <div className="relative mb-4 flex justify-center">
                  <span className="text-7xl">{product.icon}</span>
                  <label className="absolute -bottom-2 -right-2 bg-white/80 rounded-full p-2 cursor-pointer hover:bg-white transition-colors shadow-lg">
                    <Upload className="w-4 h-4 text-[#0B7A3E]" />
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>

                {/* Product Name */}
                <h3 className="text-2xl font-bold text-white text-center mb-3">{product.name}</h3>

                {/* Farmer Details */}
                <div className="mb-4 space-y-1">
                  <p className="text-white/90 text-sm">
                    <span className="font-semibold">Farmer:</span> {product.farmerName}
                  </p>
                  <p className="text-white/80 text-xs">{product.farmerAddress}</p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-white font-bold text-2xl">₹{product.price}/kg</div>
                  <div className="text-white/70 text-sm">Available: {product.quantity} kg</div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-white/20 backdrop-blur-md text-white font-bold py-3 rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => buyNow(product)}
                    className="flex-1 bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold py-3 rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center text-white text-2xl py-20">
              No products available in this category yet.
            </div>
          )}

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
