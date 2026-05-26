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

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/bulk-orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cropRequirements
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Bulk Order Submitted Successfully 📦");
        console.log(data);

        setOrderSubmitted(true);

        // ✅ notification flow INSIDE function
        setTimeout(() => {
          setShowAcceptedNotification(true);

          setTimeout(() => {
            setShowAcceptedNotification(false);
            setOrderSubmitted(false);

            // reset form
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

      } else {
        alert("Failed ❌");
        console.log(data);
      }

    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
  };

  return (
    <GreenBackground>
      <Navigation />

      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-5xl font-bold text-white mb-4 text-center flex items-center justify-center gap-3">
            <Building2 className="w-12 h-12" />
            Bulk Order 📦
          </h1>

          <p className="text-xl text-white/90 text-center mb-12">
            Order large quantities for your organization
          </p>

          {/* ================= SUCCESS UI ================= */}
          {showAcceptedNotification ? (
            <div className="bg-white/10 p-12 text-center text-white rounded-3xl border border-green-500">
              <h2 className="text-3xl font-bold">Order Accepted 🎉</h2>
              <p className="mt-4">Farmers accepted your order</p>
            </div>
          ) : orderSubmitted ? (
            <div className="bg-white/10 p-12 text-center text-white rounded-3xl">
              <h2 className="text-3xl font-bold">Order Submitted ✅</h2>
              <p className="mt-4">Waiting for farmer confirmation...</p>
            </div>
          ) : (

            // ================= FORM =================
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 p-10 rounded-3xl">

              {/* Organization Type */}
              <select
                required
                value={formData.organizationType}
                onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                className="w-full p-4 rounded-xl"
              >
                <option value="">Select Type</option>
                {organizationTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Name */}
              <input
                type="text"
                placeholder="Organization Name"
                required
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                className="w-full p-4 rounded-xl"
              />

              {/* Address */}
              <textarea
                placeholder="Address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-4 rounded-xl"
              />

              {/* Taluk */}
              <select
                required
                value={formData.taluk}
                onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                className="w-full p-4 rounded-xl"
              >
                <option value="">Select Taluk</option>
                {taluks.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Delivery Date */}
              <input
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full p-4 rounded-xl"
              />

              {/* Crop Requirements */}
              {cropRequirements.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    placeholder="Crop"
                    value={item.crop}
                    onChange={(e) => updateCropRequirement(index, 'crop', e.target.value)}
                    className="flex-1 p-3 rounded-xl"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity || ''}
                    onChange={(e) => updateCropRequirement(index, 'quantity', Number(e.target.value))}
                    className="w-32 p-3 rounded-xl"
                  />
                  <button type="button" onClick={() => removeCropRequirement(index)}>
                    <Trash2 />
                  </button>
                </div>
              ))}

              <button type="button" onClick={addCropRequirement} className="text-white">
                <Plus /> Add Crop
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-white text-green-700 font-bold p-4 rounded-xl"
              >
                Submit Bulk Order
              </button>

            </form>
          )}

          {/* Navigation */}
          <div className="flex gap-6 justify-center mt-10">
            <Link to="/" className="text-white">Home</Link>
          </div>

        </div>
      </div>
    </GreenBackground>
  );
}