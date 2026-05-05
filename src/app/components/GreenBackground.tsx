export default function GreenBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0B7A3E] via-[#1FAF5A] to-[#0B7A3E]">
      {/* Decorative plant patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl">🌿</div>
        <div className="absolute top-32 right-20 text-5xl">🍃</div>
        <div className="absolute bottom-20 left-1/4 text-7xl">🌾</div>
        <div className="absolute top-1/3 right-10 text-6xl">🌱</div>
        <div className="absolute bottom-40 right-1/3 text-5xl">🌿</div>
        <div className="absolute top-2/3 left-10 text-6xl">🍃</div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
