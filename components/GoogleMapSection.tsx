export default function GoogleMapSection() {
  // Replace the src with your actual venue coordinates
  const mapSrc = `https://<div class="embed-map-fixed"><div class="embed-map-container"><iframe class="embed-map-frame" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&height=400&hl=en&q=grand%20palace%20hikkaduwa&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe><a href="https://funclicker.org" style="font-size:2px!important;color:gray!important;position:absolute;bottom:0;left:0;z-index:1;max-height:1px;overflow:hidden">Fun Clicker</a></div><style>.embed-map-fixed{position:relative;text-align:right;width:600px;height:400px;}.embed-map-container{overflow:hidden;background:none!important;width:600px;height:400px;}.embed-map-frame{width:600px!important;height:400px!important;}</style></div>.google.<div class="embed-map-fixed"><div class="embed-map-container"><iframe class="embed-map-frame" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&height=400&hl=en&q=grand%20palace%20hikkaduwa&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe><a href="https://funclicker.org" style="font-size:2px!important;color:gray!important;position:absolute;bottom:0;left:0;z-index:1;max-height:1px;overflow:hidden">Fun Clicker</a></div><style>.embed-map-fixed{position:relative;text-align:right;width:600px;height:400px;}.embed-map-container{overflow:hidden;background:none!important;width:600px;height:400px;}.embed-map-frame{width:600px!important;height:400px!important;}</style></div>/maps/embed?pb=!1m18!1m12!1m3!1d3115.123456!2d-122.4787!3d38.5025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085a9b5e5b5e5b5%3A0x1234567890abcdef!2sBeringer%20Vineyards!5e0!3m2!1sen!2sus!4v1234567890`;

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
      </div>
    </section>
  );
}
