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

  // ✅ CONNECTED TO BACKEND (MONGODB)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/farmers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Farmer Registered Successfully 🌱");
        console.log("Saved to MongoDB:", data);

        navigate('/farmer/profile');
      } else {
        alert("Registration Failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
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
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer">
                    <Upload className="w-5 h-5 text-green-700" />
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer bg-white/20 px-8 py-4 rounded-2xl text-white flex items-center gap-3">
                  <Upload />
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>

            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 rounded bg-white/20 text-white"
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 rounded bg-white/20 text-white"
            />

            {/* Address */}
            <textarea
              placeholder="Address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-3 rounded bg-white/20 text-white"
            />

            {/* Taluk */}
            <select
              required
              value={formData.taluk}
              onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
              className="w-full p-3 rounded bg-white/20 text-white"
            >
              <option value="">Select Taluk</option>
              {taluks.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* District */}
            <input
              type="text"
              value={formData.district}
              readOnly
              className="w-full p-3 rounded bg-white/10 text-white"
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-white text-green-700 font-bold py-3 rounded hover:scale-105 transition"
            >
              Register Farmer 🌱
            </button>

          </form>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button onClick={() => window.history.back()} className="text-white">
              ← Back
            </button>

            <Link to="/" className="text-white">
              Home 🏠
            </Link>
          </div>

        </div>
      </div>
    </GreenBackground>
  );
}