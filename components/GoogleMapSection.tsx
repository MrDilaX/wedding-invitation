export default function GoogleMapSection() {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9344691704628!2d80.1203400750171!3d6.139505927506475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae177539eb6d4a1%3A0x90cfbbcc38b8ceb!2sHotel%20Grand%20Palace!5e0!3m2!1sen!2slk!4v1771679060461!5m2!1sen!2slk`;
                  https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9344691704628!2d80.1203400750171!3d6.139505927506475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae177539eb6d4a1%3A0x90cfbbcc38b8ceb!2sHotel%20Grand%20Palace!5e0!3m2!1sen!2slk!4v1771679060461!5m2!1sen!2slk
  return (
    <section style={{ padding: "5rem 1.5rem", backgroundColor: "#FDF0F3" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C4738A", marginBottom: "0.75rem" }}>
            Find Us Here
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#7D2E46" }}>
            Event Location
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
      </div>
    </section>
  );
}
