import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import GreenBackground from '../components/GreenBackground';
import Navigation from '../components/Navigation';
import { Upload } from 'lucide-react';

const taluks = [
  'Mandya',
  'Maddur',
  'Malavalli',
  'Pandavapura',
  'Nagamangala',
  'Shrirangapatna',
  'Krishnarajpet'
];

export default function FarmerRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    taluk: '',
    district: 'Mandya',
    photo: ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('farmerProfile', JSON.stringify(formData));
    navigate('/farmer/profile');
  };

  return (
    <GreenBackground>
      <Navigation />

      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/30 shadow-2xl max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <span>👨‍🌾</span>
            Farmer Registration
            <span>🌾</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div className="flex flex-col items-center mb-8">
              {formData.photo ? (
                <div className="relative">
                  <img
                    src={formData.photo}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/50"
                  />
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                    <Upload className="w-5 h-5 text-[#0B7A3E]" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all px-8 py-4 rounded-2xl border-2 border-white/30 flex items-center gap-3 shadow-lg">
                  <Upload className="w-6 h-6 text-white" />
                  <span className="text-white font-medium text-lg">Upload Photo (Optional)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-white font-medium mb-2 text-lg">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-lg"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white font-medium mb-2 text-lg">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-lg"
                placeholder="Enter your phone number"
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
                placeholder="Enter your full address"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-white to-[#f0f0f0] text-[#0B7A3E] font-bold text-xl py-5 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Register as Farmer 🌱
            </button>
          </form>

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
