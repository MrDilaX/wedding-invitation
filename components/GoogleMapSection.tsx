export default function GoogleMapSection() {
  // Replace the src with your actual venue coordinates
  const mapSrc = `https://maps.app.goo.gl/HKizVLa7x9bGDr6s5`;

  return (
    <section style={{ padding: "5rem 1.5rem", backgroundColor: "#F8F3EC" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.75rem" }}>
            Find Us Here
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E" }}>
            Venue Location
          </h2>
        </div>

        <div className="section-reveal" style={{ position: "relative", borderRadius: "4px", overflow: "hidden", boxShadow: "0 20px 60px rgba(28,43,30,0.15)" }}>
          {/* Gold border frame */}
          <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(201,168,76,0.3)", zIndex: 1, pointerEvents: "none", borderRadius: "4px" }} />
          <iframe
            src={mapSrc}
            width="100%"
            height="420"
            style={{ border: "none", display: "block", filter: "grayscale(20%) contrast(1.05)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Address cards */}
        <div className="section-reveal" style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {[
          ].map((item) => (
            <div key={item.label} style={{
              padding: "1.25rem",
              backgroundColor: "rgba(248,243,236,0.8)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "2px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{item.icon}</div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.4rem" }}>{item.label}</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "rgba(28,43,30,0.7)", lineHeight: 1.5 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
