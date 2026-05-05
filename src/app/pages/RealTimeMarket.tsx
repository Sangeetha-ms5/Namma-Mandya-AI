import { useState } from 'react';
import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { Upload, TrendingUp, TrendingDown, Minus, Plus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CropMarket {
  id: string;
  name: string;
  icon: string;
  currentPrice: number;
  trend: 'up' | 'down' | 'stable';
  aiSuggestion: string;
  weeklyData: { day: string; price: number }[];
  customIcon?: string;
}

const generatePredictiveData = (basePrice: number, trend: 'up' | 'down' | 'stable') => {
  const data = [];
  let price = basePrice * 0.7;

  for (let i = 0; i < 7; i++) {
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
    data.push({ day, price: Math.round(price) });

    if (trend === 'up') {
      price += (basePrice * 0.05) + Math.random() * 3;
    } else if (trend === 'down') {
      price -= (basePrice * 0.05) + Math.random() * 2;
    } else {
      price += (Math.random() - 0.5) * 2;
    }
  }

  data[3].price = basePrice;
  return data;
};

const initialCropMarketData: CropMarket[] = [
  {
    id: '1',
    name: 'Tomato',
    icon: '🍅',
    currentPrice: 30,
    trend: 'up',
    aiSuggestion: 'Price Rising - Hold for 2 more days',
    weeklyData: [
      { day: 'Sun', price: 20 },
      { day: 'Mon', price: 23 },
      { day: 'Tue', price: 26 },
      { day: 'Wed', price: 28 },
      { day: 'Thu', price: 30 },
      { day: 'Fri', price: 33 },
      { day: 'Sat', price: 35 }
    ]
  },
  {
    id: '2',
    name: 'Onion',
    icon: '🧅',
    currentPrice: 25,
    trend: 'down',
    aiSuggestion: 'Sell Today - Price dropping',
    weeklyData: [
      { day: 'Sun', price: 35 },
      { day: 'Mon', price: 32 },
      { day: 'Tue', price: 30 },
      { day: 'Wed', price: 28 },
      { day: 'Thu', price: 25 },
      { day: 'Fri', price: 23 },
      { day: 'Sat', price: 20 }
    ]
  },
  {
    id: '3',
    name: 'Potato',
    icon: '🥔',
    currentPrice: 20,
    trend: 'stable',
    aiSuggestion: 'Stable Price - Good time to sell',
    weeklyData: [
      { day: 'Sun', price: 20 },
      { day: 'Mon', price: 19 },
      { day: 'Tue', price: 20 },
      { day: 'Wed', price: 21 },
      { day: 'Thu', price: 20 },
      { day: 'Fri', price: 20 },
      { day: 'Sat', price: 19 }
    ]
  },
  {
    id: '4',
    name: 'Carrot',
    icon: '🥕',
    currentPrice: 35,
    trend: 'up',
    aiSuggestion: 'Demand High - Best time to sell',
    weeklyData: [
      { day: 'Sun', price: 25 },
      { day: 'Mon', price: 27 },
      { day: 'Tue', price: 30 },
      { day: 'Wed', price: 32 },
      { day: 'Thu', price: 35 },
      { day: 'Fri', price: 38 },
      { day: 'Sat', price: 40 }
    ]
  },
  {
    id: '5',
    name: 'Cabbage',
    icon: '🥬',
    currentPrice: 18,
    trend: 'stable',
    aiSuggestion: 'Hold Crop - Price may rise soon',
    weeklyData: [
      { day: 'Sun', price: 18 },
      { day: 'Mon', price: 18 },
      { day: 'Tue', price: 17 },
      { day: 'Wed', price: 18 },
      { day: 'Thu', price: 18 },
      { day: 'Fri', price: 19 },
      { day: 'Sat', price: 19 }
    ]
  },
  {
    id: '6',
    name: 'Chilli',
    icon: '🌶️',
    currentPrice: 60,
    trend: 'up',
    aiSuggestion: 'Peak Season - Sell now',
    weeklyData: [
      { day: 'Sun', price: 45 },
      { day: 'Mon', price: 50 },
      { day: 'Tue', price: 53 },
      { day: 'Wed', price: 56 },
      { day: 'Thu', price: 60 },
      { day: 'Fri', price: 65 },
      { day: 'Sat', price: 68 }
    ]
  },
  {
    id: '7',
    name: 'Beans',
    icon: '🫘',
    currentPrice: 40,
    trend: 'up',
    aiSuggestion: 'Price Rising - Good demand',
    weeklyData: generatePredictiveData(40, 'up')
  },
  {
    id: '8',
    name: 'Brinjal',
    icon: '🍆',
    currentPrice: 28,
    trend: 'stable',
    aiSuggestion: 'Stable Price - Safe to sell',
    weeklyData: generatePredictiveData(28, 'stable')
  },
  {
    id: '9',
    name: 'Cucumber',
    icon: '🥒',
    currentPrice: 24,
    trend: 'down',
    aiSuggestion: 'Sell Today - Declining market',
    weeklyData: generatePredictiveData(24, 'down')
  },
  {
    id: '10',
    name: 'Pumpkin',
    icon: '🎃',
    currentPrice: 15,
    trend: 'stable',
    aiSuggestion: 'Hold Crop - Steady demand',
    weeklyData: generatePredictiveData(15, 'stable')
  },
  {
    id: '11',
    name: 'Banana',
    icon: '🍌',
    currentPrice: 20,
    trend: 'up',
    aiSuggestion: 'Price Rising - Wait 1-2 days',
    weeklyData: generatePredictiveData(20, 'up')
  },
  {
    id: '12',
    name: 'Mango',
    icon: '🥭',
    currentPrice: 80,
    trend: 'up',
    aiSuggestion: 'Peak Season - Excellent demand',
    weeklyData: generatePredictiveData(80, 'up')
  },
  {
    id: '13',
    name: 'Coconut',
    icon: '🥥',
    currentPrice: 25,
    trend: 'stable',
    aiSuggestion: 'Stable Price - Good time',
    weeklyData: generatePredictiveData(25, 'stable')
  },
  {
    id: '14',
    name: 'Spinach',
    icon: '🥬',
    currentPrice: 30,
    trend: 'up',
    aiSuggestion: 'Demand High - Sell now',
    weeklyData: generatePredictiveData(30, 'up')
  },
  {
    id: '15',
    name: 'Coriander',
    icon: '🌿',
    currentPrice: 40,
    trend: 'stable',
    aiSuggestion: 'Hold Crop - Price steady',
    weeklyData: generatePredictiveData(40, 'stable')
  },
  {
    id: '16',
    name: 'Mint',
    icon: '🌿',
    currentPrice: 35,
    trend: 'up',
    aiSuggestion: 'Price Rising - Hold',
    weeklyData: generatePredictiveData(35, 'up')
  },
  {
    id: '17',
    name: 'Cauliflower',
    icon: '🥦',
    currentPrice: 22,
    trend: 'down',
    aiSuggestion: 'Sell Today - Price dropping',
    weeklyData: generatePredictiveData(22, 'down')
  },
  {
    id: '18',
    name: 'Capsicum',
    icon: '🫑',
    currentPrice: 50,
    trend: 'up',
    aiSuggestion: 'Demand High - Best time',
    weeklyData: generatePredictiveData(50, 'up')
  },
  {
    id: '19',
    name: 'Ragi',
    icon: '🌾',
    currentPrice: 35,
    trend: 'stable',
    aiSuggestion: 'Stable Price - Good market',
    weeklyData: generatePredictiveData(35, 'stable')
  },
  {
    id: '20',
    name: 'Paddy',
    icon: '🌾',
    currentPrice: 30,
    trend: 'up',
    aiSuggestion: 'Price Rising - Wait',
    weeklyData: generatePredictiveData(30, 'up')
  },
  {
    id: '21',
    name: 'Sugarcane',
    icon: '🎋',
    currentPrice: 28,
    trend: 'stable',
    aiSuggestion: 'Hold Crop - Steady demand',
    weeklyData: generatePredictiveData(28, 'stable')
  },
  {
    id: '22',
    name: 'Groundnut',
    icon: '🥜',
    currentPrice: 55,
    trend: 'up',
    aiSuggestion: 'Demand High - Sell now',
    weeklyData: generatePredictiveData(55, 'up')
  },
  {
    id: '23',
    name: 'Maize',
    icon: '🌽',
    currentPrice: 22,
    trend: 'down',
    aiSuggestion: 'Sell Today - Market declining',
    weeklyData: generatePredictiveData(22, 'down')
  },
  {
    id: '24',
    name: 'Turmeric',
    icon: '🟡',
    currentPrice: 120,
    trend: 'up',
    aiSuggestion: 'Price Rising - Hold for profit',
    weeklyData: generatePredictiveData(120, 'up')
  },
  {
    id: '25',
    name: 'Ginger',
    icon: '🫚',
    currentPrice: 80,
    trend: 'stable',
    aiSuggestion: 'Stable Price - Safe to sell',
    weeklyData: generatePredictiveData(80, 'stable')
  }
];

const demandData = [
  { crop: 'Tomato', demand: 450 },
  { crop: 'Onion', demand: 380 },
  { crop: 'Carrot', demand: 320 },
  { crop: 'Chilli', demand: 290 },
  { crop: 'Potato', demand: 250 },
  { crop: 'Beans', demand: 220 },
  { crop: 'Cabbage', demand: 180 }
];

export default function RealTimeMarket() {
  const [crops, setCrops] = useState<CropMarket[]>(initialCropMarketData);
  const [selectedCrop, setSelectedCrop] = useState<CropMarket | null>(null);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    icon: '',
    currentPrice: 0,
    trend: 'stable' as 'up' | 'down' | 'stable'
  });

  const handleAddCrop = () => {
    if (newCrop.name && newCrop.currentPrice > 0) {
      const suggestions = {
        up: 'Price Rising - Hold for profit',
        down: 'Sell Today - Market declining',
        stable: 'Stable Price - Safe to sell'
      };

      const crop: CropMarket = {
        id: Date.now().toString(),
        name: newCrop.name,
        icon: newCrop.icon || '🌱',
        currentPrice: newCrop.currentPrice,
        trend: newCrop.trend,
        aiSuggestion: suggestions[newCrop.trend],
        weeklyData: generatePredictiveData(newCrop.currentPrice, newCrop.trend)
      };

      setCrops([...crops, crop]);
      setNewCrop({ name: '', icon: '', currentPrice: 0, trend: 'stable' });
      setShowAddCrop(false);
    }
  };

  const handleIconUpload = (cropId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCrops(crops.map(crop =>
          crop.id === cropId ? { ...crop, customIcon: reader.result as string } : crop
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-orange-400" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-blue-400" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getSuggestionColor = (suggestion: string) => {
    if (suggestion.includes('Sell') || suggestion.includes('Best time')) {
      return 'bg-orange-500/80';
    } else if (suggestion.includes('Hold') || suggestion.includes('Rising')) {
      return 'bg-purple-500/80';
    } else if (suggestion.includes('dropping')) {
      return 'bg-blue-500/80';
    }
    return 'bg-yellow-500/80';
  };

  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
            <span>📊</span>
            Real-Time Market Prices
            <span>💹</span>
          </h1>

          {/* Crop Price Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop)}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:border-white/50 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {/* Icon with Upload */}
                <div className="relative mb-4 flex justify-center">
                  {crop.customIcon ? (
                    <img src={crop.customIcon} alt={crop.name} className="w-16 h-16 object-contain" />
                  ) : (
                    <span className="text-5xl">{crop.icon}</span>
                  )}
                  <label className="absolute -bottom-2 -right-2 bg-white/80 rounded-full p-1 cursor-pointer hover:bg-white transition-colors shadow-lg">
                    <Upload className="w-3 h-3 text-[#0B7A3E]" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIconUpload(crop.id, e)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Crop Name */}
                <h3 className="text-lg font-bold text-white text-center mb-2">{crop.name}</h3>

                {/* Current Price */}
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold text-white">₹{crop.currentPrice}</div>
                  <div className="text-white/70 text-xs">per kg</div>
                </div>

                {/* Trend */}
                <div className="flex items-center justify-center gap-2">
                  {getTrendIcon(crop.trend)}
                </div>

                {/* AI Suggestion Badge */}
                <div className={`${getSuggestionColor(crop.aiSuggestion)} text-white text-xs px-2 py-1 rounded-full mt-3 text-center font-medium`}>
                  {crop.aiSuggestion.split(' - ')[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Crop View */}
          {selectedCrop && (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 shadow-2xl mb-12">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  {selectedCrop.customIcon ? (
                    <img src={selectedCrop.customIcon} alt={selectedCrop.name} className="w-24 h-24 object-contain" />
                  ) : (
                    <span className="text-6xl">{selectedCrop.icon}</span>
                  )}
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">{selectedCrop.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-white">₹{selectedCrop.currentPrice}/kg</span>
                      {getTrendIcon(selectedCrop.trend)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCrop(null)}
                  className="text-white hover:text-white/70 text-3xl"
                >
                  ✕
                </button>
              </div>

              {/* AI Suggestion */}
              <div className={`${getSuggestionColor(selectedCrop.aiSuggestion)} text-white px-6 py-4 rounded-2xl mb-8 text-center`}>
                <div className="text-2xl font-bold mb-1">🤖 AI Suggestion</div>
                <div className="text-xl">{selectedCrop.aiSuggestion}</div>
              </div>

              {/* 7-Day Price Graph */}
              <div className="bg-white/20 rounded-2xl p-6 border-2 border-white/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">7-Day Price Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedCrop.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                    <XAxis dataKey="day" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(11, 122, 62, 0.9)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderRadius: '12px',
                        color: 'white'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#FF8C42"
                      strokeWidth={3}
                      dot={{ fill: '#FF8C42', r: 6 }}
                      name="Price (₹/kg)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* High Demand Crops */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 shadow-2xl mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
              <span>🔥</span>
              High Demand Crops This Week
            </h2>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="crop" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 122, 62, 0.9)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                />
                <Legend />
                <Bar dataKey="demand" name="Demand (kg)" fill="#EC4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <p className="text-white/80 text-center mt-6">
              📈 Crops with high demand tend to get better prices
            </p>
          </div>

          {/* Add Crop Button */}
          <button
            onClick={() => setShowAddCrop(true)}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] p-6 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3 font-bold text-lg z-50"
          >
            <Plus className="w-8 h-8" />
            Add New Crop
          </button>

          {/* Add Crop Modal */}
          {showAddCrop && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 shadow-2xl max-w-md w-full mx-4">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Add New Crop for Prediction</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Crop Name *</label>
                    <input
                      type="text"
                      value={newCrop.name}
                      onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                      placeholder="e.g., Radish"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Icon Emoji</label>
                    <input
                      type="text"
                      value={newCrop.icon}
                      onChange={(e) => setNewCrop({ ...newCrop, icon: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                      placeholder="🌱"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Current Market Price (₹/kg) *</label>
                    <input
                      type="number"
                      value={newCrop.currentPrice || ''}
                      onChange={(e) => setNewCrop({ ...newCrop, currentPrice: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Market Trend *</label>
                    <select
                      value={newCrop.trend}
                      onChange={(e) => setNewCrop({ ...newCrop, trend: e.target.value as 'up' | 'down' | 'stable' })}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-white/60"
                    >
                      <option value="up" className="bg-[#0B7A3E]">📈 Rising (Up)</option>
                      <option value="down" className="bg-[#0B7A3E]">📉 Falling (Down)</option>
                      <option value="stable" className="bg-[#0B7A3E]">➡️ Stable</option>
                    </select>
                  </div>

                  <div className="bg-white/20 rounded-xl p-4 mt-4">
                    <p className="text-white/90 text-sm">
                      🤖 AI will automatically generate a 7-day price prediction graph based on the current price and trend you select.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setShowAddCrop(false)}
                      className="flex-1 bg-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/30 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddCrop}
                      className="flex-1 bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold py-3 rounded-xl hover:scale-105 transition-all"
                    >
                      Add & Predict
                    </button>
                  </div>
                </div>
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
