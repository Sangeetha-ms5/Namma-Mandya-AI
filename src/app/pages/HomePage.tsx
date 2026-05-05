import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';

export default function HomePage() {
  return (
    <GreenBackground>
      <Navigation />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        {/* Animated Marquee Tagline */}
        <div className="w-full overflow-hidden mb-12">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-4xl md:text-6xl font-bold text-white inline-block px-8">
              🌱 Namma Mandya AI — Every Harvest Deserves a Market 🌱
            </span>
            <span className="text-4xl md:text-6xl font-bold text-white inline-block px-8">
              🌱 Namma Mandya AI — Every Harvest Deserves a Market 🌱
            </span>
          </div>
        </div>

        {/* Get Started Button */}
        <Link
          to="/login"
          className="group relative px-16 py-6 bg-gradient-to-r from-white to-[#f0f0f0] rounded-full text-2xl font-bold text-[#0B7A3E] shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10">GET STARTED</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1FAF5A] to-[#0B7A3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </Link>

        {/* Floating Plants Animation */}
        <div className="absolute bottom-20 left-20 text-6xl animate-bounce-slow">🌾</div>
        <div className="absolute top-40 right-32 text-5xl animate-pulse">🌿</div>
        <div className="absolute bottom-32 right-20 text-7xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>🍃</div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </GreenBackground>
  );
}
