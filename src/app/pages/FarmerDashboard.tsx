import { useState } from 'react';
import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { Plus, Upload, Edit2, Save } from 'lucide-react';

interface Crop {
  id: string;
  name: string;
  icon: string;
  apmcPrice: number;
  editablePrice: number;
  quantity: number;
  customIcon?: string;
}

const initialCrops: Crop[] = [
  { id: '1', name: 'Tomato', icon: '🍅', apmcPrice: 30, editablePrice: 30, quantity: 0 },
  { id: '2', name: 'Onion', icon: '🧅', apmcPrice: 25, editablePrice: 25, quantity: 0 },
  { id: '3', name: 'Potato', icon: '🥔', apmcPrice: 20, editablePrice: 20, quantity: 0 },
  { id: '4', name: 'Carrot', icon: '🥕', apmcPrice: 35, editablePrice: 35, quantity: 0 },
  { id: '5', name: 'Beans', icon: '🫘', apmcPrice: 40, editablePrice: 40, quantity: 0 },
  { id: '6', name: 'Cabbage', icon: '🥬', apmcPrice: 18, editablePrice: 18, quantity: 0 },
  { id: '7', name: 'Cauliflower', icon: '🥦', apmcPrice: 22, editablePrice: 22, quantity: 0 },
  { id: '8', name: 'Chilli', icon: '🌶️', apmcPrice: 60, editablePrice: 60, quantity: 0 },
  { id: '9', name: 'Brinjal', icon: '🍆', apmcPrice: 28, editablePrice: 28, quantity: 0 },
  { id: '10', name: 'Cucumber', icon: '🥒', apmcPrice: 24, editablePrice: 24, quantity: 0 },
  { id: '11', name: 'Pumpkin', icon: '🎃', apmcPrice: 15, editablePrice: 15, quantity: 0 },
  { id: '12', name: 'Ragi', icon: '🌾', apmcPrice: 35, editablePrice: 35, quantity: 0 },
  { id: '13', name: 'Paddy', icon: '🌾', apmcPrice: 30, editablePrice: 30, quantity: 0 },
  { id: '14', name: 'Sugarcane', icon: '🎋', apmcPrice: 28, editablePrice: 28, quantity: 0 },
  { id: '15', name: 'Banana', icon: '🍌', apmcPrice: 20, editablePrice: 20, quantity: 0 },
  { id: '16', name: 'Mango', icon: '🥭', apmcPrice: 80, editablePrice: 80, quantity: 0 },
  { id: '17', name: 'Coconut', icon: '🥥', apmcPrice: 25, editablePrice: 25, quantity: 0 },
  { id: '18', name: 'Arecanut', icon: '🌰', apmcPrice: 450, editablePrice: 450, quantity: 0 },
  { id: '19', name: 'Turmeric', icon: '🟡', apmcPrice: 120, editablePrice: 120, quantity: 0 },
  { id: '20', name: 'Ginger', icon: '🫚', apmcPrice: 80, editablePrice: 80, quantity: 0 },
  { id: '21', name: 'Green Gram', icon: '🫘', apmcPrice: 65, editablePrice: 65, quantity: 0 },
  { id: '22', name: 'Black Gram', icon: '🫘', apmcPrice: 70, editablePrice: 70, quantity: 0 },
  { id: '23', name: 'Groundnut', icon: '🥜', apmcPrice: 55, editablePrice: 55, quantity: 0 },
  { id: '24', name: 'Maize', icon: '🌽', apmcPrice: 22, editablePrice: 22, quantity: 0 },
  { id: '25', name: 'Spinach', icon: '🥬', apmcPrice: 30, editablePrice: 30, quantity: 0 },
  { id: '26', name: 'Coriander', icon: '🌿', apmcPrice: 40, editablePrice: 40, quantity: 0 },
  { id: '27', name: 'Mint', icon: '🌿', apmcPrice: 35, editablePrice: 35, quantity: 0 },
  { id: '28', name: 'Drumstick', icon: '🥖', apmcPrice: 45, editablePrice: 45, quantity: 0 },
  { id: '29', name: 'Bottle Gourd', icon: '🥒', apmcPrice: 18, editablePrice: 18, quantity: 0 },
  { id: '30', name: 'Ridge Gourd', icon: '🥒', apmcPrice: 20, editablePrice: 20, quantity: 0 },
  { id: '31', name: 'Capsicum', icon: '🫑', apmcPrice: 50, editablePrice: 50, quantity: 0 },
];

export default function FarmerDashboard() {
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    icon: '',
    apmcPrice: 0,
    editablePrice: 0,
    quantity: 0
  });

  const handleAddCrop = () => {
    if (newCrop.name && newCrop.apmcPrice > 0) {
      const crop: Crop = {
        id: Date.now().toString(),
        name: newCrop.name,
        icon: newCrop.icon || '🌱',
        apmcPrice: newCrop.apmcPrice,
        editablePrice: newCrop.editablePrice || newCrop.apmcPrice,
        quantity: newCrop.quantity
      };
      setCrops([...crops, crop]);
      setNewCrop({ name: '', icon: '', apmcPrice: 0, editablePrice: 0, quantity: 0 });
      setShowAddCrop(false);
    }
  };

  const updateCrop = (id: string, field: string, value: number) => {
    setCrops(crops.map(crop =>
      crop.id === id ? { ...crop, [field]: value } : crop
    ));
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

  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <span>👨‍🌾</span>
            Farmer Dashboard
            <span>🌾</span>
          </h1>

          {/* Crop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                {/* Icon with Upload */}
                <div className="relative mb-4 flex justify-center">
                  {crop.customIcon ? (
                    <img src={crop.customIcon} alt={crop.name} className="w-16 h-16 object-contain" />
                  ) : (
                    <span className="text-5xl">{crop.icon}</span>
                  )}
                  <label className="absolute -bottom-2 -right-2 bg-white/80 rounded-full p-2 cursor-pointer hover:bg-white transition-colors shadow-lg">
                    <Upload className="w-4 h-4 text-[#0B7A3E]" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIconUpload(crop.id, e)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Crop Name */}
                <h3 className="text-xl font-bold text-white text-center mb-4">{crop.name}</h3>

                {/* APMC Price */}
                <div className="mb-3">
                  <label className="text-white/80 text-sm">APMC Mandi Price</label>
                  <div className="text-white font-bold text-lg">₹{crop.apmcPrice}/kg</div>
                </div>

                {/* Editable Price */}
                <div className="mb-3">
                  <label className="text-white/80 text-sm">Your Price</label>
                  <input
                    type="number"
                    value={crop.editablePrice}
                    onChange={(e) => updateCrop(crop.id, 'editablePrice', Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-white/60"
                    placeholder="Price/kg"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-white/80 text-sm">Available (kg)</label>
                  <input
                    type="number"
                    value={crop.quantity}
                    onChange={(e) => updateCrop(crop.id, 'quantity', Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-white/60"
                    placeholder="Quantity"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Crop Button */}
          <button
            onClick={() => setShowAddCrop(true)}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] p-6 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3 font-bold text-lg"
          >
            <Plus className="w-8 h-8" />
            Add New Crop
          </button>

          {/* Add Crop Modal */}
          {showAddCrop && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 shadow-2xl max-w-md w-full mx-4">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Add New Crop</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Crop Name</label>
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
                    <label className="block text-white mb-2">APMC Price (₹/kg)</label>
                    <input
                      type="number"
                      value={newCrop.apmcPrice || ''}
                      onChange={(e) => setNewCrop({ ...newCrop, apmcPrice: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Your Price (₹/kg)</label>
                    <input
                      type="number"
                      value={newCrop.editablePrice || ''}
                      onChange={(e) => setNewCrop({ ...newCrop, editablePrice: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Quantity (kg)</label>
                    <input
                      type="number"
                      value={newCrop.quantity || ''}
                      onChange={(e) => setNewCrop({ ...newCrop, quantity: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                      placeholder="100"
                    />
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
                      Add Crop
                    </button>
                  </div>
                </div>
              </div>
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
