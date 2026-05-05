import { Link } from 'react-router';
import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function Navigation() {
  const [logo, setLogo] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(true);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
        setShowUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-6">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        {showUpload && !logo ? (
          <label className="cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all px-6 py-3 rounded-2xl border border-white/30 flex items-center gap-2 shadow-lg">
            <Upload className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Upload Logo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        ) : logo ? (
          <img src={logo} alt="Logo" className="h-16 object-contain" />
        ) : null}
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-white font-medium hover:text-white/80 transition-colors text-lg"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="text-white font-medium hover:text-white/80 transition-colors text-lg"
        >
          Login
        </Link>
        <Link
          to="/market"
          className="text-white font-medium hover:text-white/80 transition-colors text-lg"
        >
          Real Time Market
        </Link>
        <Link
          to="/bulk-order"
          className="text-white font-medium hover:text-white/80 transition-colors text-lg"
        >
          Bulk Order
        </Link>
        <Link
          to="/about"
          className="text-white font-medium hover:text-white/80 transition-colors text-lg"
        >
          About
        </Link>
      </div>
    </nav>
  );
}
