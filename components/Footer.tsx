export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1C2B1E", padding: "5rem 1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.05,
        backgroundImage: "radial-gradient(circle at 2px 2px, #C9A84C 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div style={{ position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", opacity: 0.25 }}>
          <svg viewBox="0 0 120 60" style={{ width: "8rem" }} fill="none">
            <path d="M60,55 Q60,30 40,15 Q20,0 10,5" stroke="#7C9A7E" strokeWidth="1" />
            <path d="M60,55 Q60,30 80,15 Q100,0 110,5" stroke="#7C9A7E" strokeWidth="1" />
            <path d="M40,25 Q30,20 20,25" stroke="#7C9A7E" strokeWidth="1" />
            <path d="M80,25 Q90,20 100,25" stroke="#7C9A7E" strokeWidth="1" />
            <circle cx="60" cy="10" r="5" fill="#C9A84C" opacity="0.5" />
          </svg>
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, fontStyle: "italic", color: "#F8F3EC", marginBottom: "0.5rem" }}>
          Adam & Lorah
        </h2>

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginTop: "1rem", marginBottom: "3rem" }}>
          August 31, 2026 · Grand Palace, Hikkaduwa
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
          <div style={{ width: "4rem", height: "1px", backgroundColor: "rgba(201,168,76,0.25)" }} />
          <span style={{ color: "rgba(201,168,76,0.35)", fontFamily: "'Cormorant Garamond', serif" }}>✦</span>
          <div style={{ width: "4rem", height: "1px", backgroundColor: "rgba(201,168,76,0.25)" }} />
        </div>

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "rgba(248,243,236,0.25)" }}>
          Questions?{" "}
          <a href="mailto:hello@adamandlorah.com" style={{ color: "rgba(201,168,76,0.55)", textDecoration: "none" }}>
            mrdilax214@gmail.com
          </a>
        </p>

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "rgba(248,243,236,0.12)", marginTop: "2rem" }}>
          Made with love ✦ 2026 ✦ next.js ✦ dilax
        </p>
      </div>
    </footer>
  );
}
