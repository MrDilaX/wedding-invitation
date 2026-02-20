export default function Footer() {
  return (
    <footer className="bg-dark-green py-20 px-6 text-center relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #C9A84C 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      <div className="relative z-10">
        {/* Botanical */}
        <div className="flex justify-center mb-8 opacity-30">
          <svg viewBox="0 0 120 60" className="w-32" fill="none">
            <path d="M60,55 Q60,30 40,15 Q20,0 10,5" stroke="#7C9A7E" strokeWidth="1" />
            <path d="M60,55 Q60,30 80,15 Q100,0 110,5" stroke="#7C9A7E" strokeWidth="1" />
            <path d="M40,25 Q30,20 20,25" stroke="#7C9A7E" strokeWidth="1" />
            <path d="M80,25 Q90,20 100,25" stroke="#7C9A7E" strokeWidth="1" />
            <circle cx="60" cy="10" r="5" fill="#C9A84C" opacity="0.5" />
            <circle cx="58" cy="6" r="2" fill="#E8C4B0" opacity="0.4" />
          </svg>
        </div>

        <h2
          className="text-6xl md:text-7xl font-light italic text-cream mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Chanaka & Ganguni
        </h2>

        <p
          className="text-xs tracking-[0.4em] uppercase text-warm-gold mt-4 mb-12"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Augest 31, 2026 · The Grand Palace, Hikkaduwa
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-px bg-warm-gold/30" />
          <span className="text-warm-gold/40" style={{ fontFamily: "'Cormorant Garamond', serif" }}>✦</span>
          <div className="w-16 h-px bg-warm-gold/30" />
        </div>

        <p
          className="text-cream/30 text-xs tracking-wider"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Questions? Reach us at{" "}
          <a href="mrdilax214@gmail.com" className="text-warm-gold/60 hover:text-warm-gold transition-colors">
            mrdilax214@gmail.com
          </a>
        </p>

        <p
          className="text-cream/15 text-xs mt-8"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Made with love ✦ 2026 dilax
        </p>
      </div>
    </footer>
  );
}
