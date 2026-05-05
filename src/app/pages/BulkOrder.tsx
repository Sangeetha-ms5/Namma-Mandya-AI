import { useState } from 'react';
import { Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { Plus, Trash2, Building2 } from 'lucide-react';

const taluks = [
  'Mandya',
  'Maddur',
  'Malavalli',
  'Pandavapura',
  'Nagamangala',
  'Shrirangapatna',
  'Krishnarajpet'
];

const organizationTypes = [
  'Hotel',
  'Catering',
  'Hospital',
  'School',
  'College'
];

interface CropRequirement {
  crop: string;
  quantity: number;
}

export default function BulkOrder() {
  const [formData, setFormData] = useState({
    organizationType: '',
    organizationName: '',
    address: '',
    taluk: '',
    district: 'Mandya',
    deliveryDate: ''
  });

  const [cropRequirements, setCropRequirements] = useState<CropRequirement[]>([
    { crop: '', quantity: 0 }
  ]);

  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [showAcceptedNotification, setShowAcceptedNotification] = useState(false);

  const addCropRequirement = () => {
    setCropRequirements([...cropRequirements, { crop: '', quantity: 0 }]);
  };

  const removeCropRequirement = (index: number) => {
    setCropRequirements(cropRequirements.filter((_, i) => i !== index));
  };

  const updateCropRequirement = (index: number, field: string, value: string | number) => {
    const updated = cropRequirements.map((req, i) =>
      i === index ? { ...req, [field]: value } : req
    );
    setCropRequirements(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);

    // Show "order accepted" notification after 20 seconds
    setTimeout(() => {
      setShowAcceptedNotification(true);

      // Hide all notifications and reset form after showing acceptance
      setTimeout(() => {
        setShowAcceptedNotification(false);
        setOrderSubmitted(false);
        setFormData({
          organizationType: '',
          organizationName: '',
          address: '',
          taluk: '',
          district: 'Mandya',
          deliveryDate: ''
        });
        setCropRequirements([{ crop: '', quantity: 0 }]);
      }, 5000);
    }, 20000);
  };

  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4 text-center flex items-center justify-center gap-3">
            <Building2 className="w-12 h-12" />
            Bulk Order
            <span>📦</span>
          </h1>
          <p className="text-xl text-white/90 text-center mb-12">
            Order large quantities for your organization
          </p>

          {showAcceptedNotification ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-green-500/50 shadow-2xl text-center animate-pulse">
              <div className="text-8xl mb-6">🎉</div>
              <h2 className="text-4xl font-bold text-white mb-4">Order Accepted!</h2>
              <p className="text-white/90 text-xl mb-4">
                Great news! Farmers have accepted your bulk order.
              </p>
              <div className="bg-green-500/20 rounded-2xl p-6 mt-6 border-2 border-green-500/40">
                <p className="text-white font-semibold mb-2">✅ Order Confirmed</p>
                <p className="text-white/80 text-sm">
                  Your order will be prepared and delivered on the scheduled date. You'll receive updates via SMS.
                </p>
              </div>
            </div>
          ) : orderSubmitted ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/30 shadow-2xl text-center">
              <div className="text-8xl mb-6">✅</div>
              <h2 className="text-4xl font-bold text-white mb-4">Bulk Order Submitted!</h2>
              <p className="text-white/90 text-xl mb-4">
                Your order has been sent to farmers in your area.
              </p>
              <div className="bg-white/20 rounded-2xl p-6 mt-6">
                <p className="text-white font-semibold mb-2">📢 Order Matching in Progress</p>
                <p className="text-white/80 text-sm">
                  Multiple farmers can collaborate to fulfill your order. You'll be notified once farmers accept your order.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-white/70 text-xs mt-2">Waiting for farmer confirmation...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/30 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Type */}
                <div>
                  <label className="block text-white font-medium mb-2 text-lg">Organization Type *</label>
                  <select
                    required
                    value={formData.organizationType}
                    onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-white/60 text-lg"
                  >
                    <option value="" className="bg-[#0B7A3E]">Select Type</option>
                    {organizationTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#0B7A3E]">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Organization Name */}
                <div>
                  <label className="block text-white font-medium mb-2 text-lg">Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-lg"
                    placeholder="Enter organization name"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-white font-medium mb-2 text-lg">Address *</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-lg"
                    placeholder="Enter full address"
                  />
                </div>

                {/* Taluk */}
                <div>
                  <label className="block text-white font-medium mb-2 text-lg">Taluk *</label>
                  <select
                    required
                    value={formData.taluk}
                    onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-white/60 text-lg"
                  >
                    <option value="" className="bg-[#0B7A3E]">Select Taluk</option>
                    {taluks.map((taluk) => (
                      <option key={taluk} value={taluk} className="bg-[#0B7A3E]">
                        {taluk}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-white font-medium mb-2 text-lg">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    readOnly
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white/80 text-lg cursor-not-allowed"
                  />
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block text-white font-medium mb-2 text-lg">Delivery Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-white/60 text-lg"
                  />
                </div>

                {/* Crop Requirements */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-white font-medium text-lg">Crop Requirements *</label>
                    <button
                      type="button"
                      onClick={addCropRequirement}
                      className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2 font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      Add Crop
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cropRequirements.map((req, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1">
                          <input
                            type="text"
                            required
                            value={req.crop}
                            onChange={(e) => updateCropRequirement(index, 'crop', e.target.value)}
                            placeholder="Crop name (e.g., Tomato)"
                            className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-lg"
                          />
                        </div>
                        <div className="w-48">
                          <input
                            type="number"
                            required
                            value={req.quantity || ''}
                            onChange={(e) => updateCropRequirement(index, 'quantity', Number(e.target.value))}
                            placeholder="Quantity (kg)"
                            className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-lg"
                          />
                        </div>
                        {cropRequirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCropRequirement(index)}
                            className="bg-red-500/80 hover:bg-red-600 text-white p-4 rounded-xl transition-all"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Matching Info */}
                <div className="bg-white/20 rounded-2xl p-6 border-2 border-white/30">
                  <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span>✨</span>
                    Smart Order Matching
                  </h3>
                  <p className="text-white/80 text-sm">
                    Multiple farmers can collaborate to fulfill your bulk order together. Our AI will match your requirements with available farmers in your area.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold text-xl py-5 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Submit Bulk Order 📦
                </button>
              </form>
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
