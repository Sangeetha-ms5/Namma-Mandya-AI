import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { Leaf, Users, TrendingUp, Shield, Truck, BarChart3 } from 'lucide-react';

export default function AboutPage() {
  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              <span>🌱</span>
              About Namma Mandya AI
              <span>🌾</span>
            </h1>
            <p className="text-2xl text-white/90 font-medium">
              Every Harvest Deserves a Market
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/30 shadow-2xl mb-12">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Our Mission</h2>
            <p className="text-white/90 text-xl leading-relaxed text-center mb-6">
              Namma Mandya AI is a revolutionary farm-to-consumer agriculture platform that connects local farmers directly with consumers, eliminating middlemen and ensuring fair prices for both parties. We leverage AI technology to provide real-time market insights, demand predictions, and smart order matching.
            </p>
            <p className="text-white/80 text-lg leading-relaxed text-center">
              Our platform empowers farmers in Mandya district with verified market access, transparent pricing, and AI-driven recommendations, while giving consumers access to fresh, locally-sourced produce at competitive prices.
            </p>
          </div>

          {/* Features Grid */}
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105">
              <div className="text-6xl mb-4 text-center">👨‍🌾</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Farmer Empowerment</h3>
              <p className="text-white/80 text-center">
                Direct market access, transparent pricing, and profile management for farmers to showcase their produce
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105">
              <div className="text-6xl mb-4 text-center">🛒</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Consumer Access</h3>
              <p className="text-white/80 text-center">
                Fresh produce directly from local farmers with complete transparency on source and pricing
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105">
              <div className="text-6xl mb-4 text-center">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">AI Market Insights</h3>
              <p className="text-white/80 text-center">
                Real-time price predictions, demand forecasting, and smart recommendations for optimal selling times
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105">
              <div className="text-6xl mb-4 text-center">🚚</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Reliable Delivery</h3>
              <p className="text-white/80 text-center">
                Live tracking and verified delivery partners ensuring fresh produce reaches consumers quickly
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105">
              <div className="text-6xl mb-4 text-center">📦</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Bulk Orders</h3>
              <p className="text-white/80 text-center">
                Smart matching system for hotels, hospitals, and institutions with multiple farmer collaboration
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105">
              <div className="text-6xl mb-4 text-center">✅</div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">Verified Platform</h3>
              <p className="text-white/80 text-center">
                Government-ready verification system ensuring authenticity and quality of all transactions
              </p>
            </div>
          </div>

          {/* Coverage Area */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/30 shadow-2xl mb-12">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Coverage Area</h2>
            <p className="text-white/90 text-xl text-center mb-6">
              Currently serving all 7 Taluks of Mandya District, Karnataka
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Mandya', 'Maddur', 'Malavalli', 'Pandavapura', 'Nagamangala', 'Shrirangapatna', 'Krishnarajpet'].map((taluk) => (
                <div key={taluk} className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30">
                  <p className="text-white font-semibold text-lg">{taluk}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Section */}
          <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/40 shadow-2xl mb-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">100+</div>
                <p className="text-white/80 text-lg">Registered Farmers</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">30+</div>
                <p className="text-white/80 text-lg">Crop Varieties</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">500+</div>
                <p className="text-white/80 text-lg">Happy Consumers</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-block bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold text-2xl px-16 py-6 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Join Namma Mandya AI Today 🌱
            </Link>
          </div>

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
