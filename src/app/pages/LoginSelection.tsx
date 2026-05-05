import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';

const userTypes = [
  {
    type: 'Farmer',
    icon: '👨‍🌾',
    path: '/farmer/register',
    description: 'Sell your harvest directly to consumers'
  },
  {
    type: 'Consumer',
    icon: '🛒',
    path: '/consumer/register',
    description: 'Buy fresh produce from local farmers'
  },
  {
    type: 'Delivery Partner',
    icon: '🚚',
    path: '/delivery/dashboard',
    description: 'Deliver fresh produce and earn'
  },
  {
    type: 'Admin',
    icon: '🧠',
    path: '/admin/dashboard',
    description: 'Manage platform operations'
  }
];

export default function LoginSelection() {
  return (
    <GreenBackground>
      <Navigation />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12">
        <h1 className="text-5xl font-bold text-white mb-4 flex items-center gap-3">
          <span>🌱</span>
          Select Your Role
          <span>🌱</span>
        </h1>
        <p className="text-xl text-white/90 mb-16">Choose how you want to join Namma Mandya AI</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full px-4">
          {userTypes.map((user) => (
            <Link
              key={user.type}
              to={user.path}
              className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 hover:border-white/50 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 cursor-pointer"
            >
              {/* Icon */}
              <div className="text-8xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                {user.icon}
              </div>

              {/* Type */}
              <h2 className="text-3xl font-bold text-white text-center mb-3">
                {user.type}
              </h2>

              {/* Description */}
              <p className="text-white/80 text-center text-lg">
                {user.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>
      </div>
    </GreenBackground>
  );
}
