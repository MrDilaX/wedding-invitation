export default function Footer() {
  return (
    <footer style={{ padding: "3rem 1.5rem", backgroundColor: "var(--bg-dark)", textAlign: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontStyle: "italic", fontWeight: 300, color: "var(--bg)", marginBottom: "0.5rem" }}>Adam & Lorah</p>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>August 31, 2026 · Napa Valley</p>
      <div style={{ width: "3rem", height: "1px", backgroundColor: "rgba(255,255,255,0.15)", margin: "0 auto 1.5rem" }} />
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>Made with love ♡</p>
    </footer>
  );
}
