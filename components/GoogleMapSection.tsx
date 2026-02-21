export default function GoogleMapSection() {
  // Replace the src with your actual venue coordinates
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.123456!2d-122.4787!3d38.5025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085a9b5e5b5e5b5%3A0x1234567890abcdef!2sBeringer%20Vineyards!5e0!3m2!1sen!2sus!4v1234567890`;

  return (
    <section style={{ padding: "5rem 1.5rem", backgroundColor: "#FDF0F3" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C4738A", marginBottom: "0.75rem" }}>
            Find Us Here
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#7D2E46" }}>
            Venue Location
          </h2>
        </div>

        <div className="section-reveal" style={{ position: "relative", borderRadius: "4px", overflow: "hidden", boxShadow: "0 20px 60px rgba(125,46,70,0.15)" }}>
          {/* Gold border frame */}
          <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(196,115,138,0.3)", zIndex: 1, pointerEvents: "none", borderRadius: "4px" }} />
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
          {([
            { icon: "📍", label: "Address", value: "2000 Main St, St Helena, CA 94574" },
            { icon: "🚗", label: "Parking", value: "Free valet parking available on site" },
            { icon: "✈️", label: "Nearest Airport", value: "San Francisco International (SFO) — 75 min" },
          ] as { icon: string; label: string; value: string }[]).map((item) => (
            <div key={item.label} style={{
              padding: "1.25rem",
              backgroundColor: "rgba(248,243,236,0.8)",
              border: "1px solid rgba(196,115,138,0.2)",
              borderRadius: "2px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{item.icon}</div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4738A", marginBottom: "0.4rem" }}>{item.label}</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "rgba(125,46,70,0.7)", lineHeight: 1.5 }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
