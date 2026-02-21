const milestones = [
  { year: "2019", title: "First Meeting", description: "A chance encounter at a mutual friend's art gallery opening in San Francisco. Adam spotted Lorah across the room and somehow found the courage to introduce himself." },
  { year: "2020", title: "First Date", description: "A long Sunday brunch that turned into a sunset walk along the Embarcadero — and somehow ended with a spontaneous drive to Half Moon Bay." },
  { year: "2022", title: "Moving In Together", description: "A tiny apartment in Hayes Valley became their first home. They survived IKEA, the pandemic, and a very demanding cat named Biscuit." },
  { year: "2024", title: "The Proposal", description: "Adam proposed at the Napa winery where they had their first weekend getaway — down on one knee between the vines at golden hour." },
];

export default function OurStory() {
  return (
    <section id="story" style={{ padding: "7rem 1.5rem", backgroundColor: "#F8F3EC" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>
            How It All Began
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E" }}>
            Our Story
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)" }} className="hidden md:block" />

          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="section-reveal"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4rem",
                  flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                }}
              >
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? "right" : "left" }}>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", display: "block", marginBottom: "0.5rem" }}>
                    {m.year}
                  </span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E", marginBottom: "0.75rem" }}>
                    {m.title}
                  </h3>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(28,43,30,0.6)" }}>
                    {m.description}
                  </p>
                </div>
                <div className="hidden md:flex" style={{ flexShrink: 0, width: "3rem", height: "3rem", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.4)", backgroundColor: "#F8F3EC", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", backgroundColor: "#C9A84C" }} />
                </div>
                <div style={{ flex: 1 }} className="hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="section-reveal" style={{ marginTop: "7rem", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontStyle: "italic", color: "rgba(28,43,30,0.3)" }}>"</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>
          <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.6 }}>
            I knew from the very first moment. I just had to wait for him to catch up.
          </blockquote>
          <p style={{ marginTop: "1.5rem", fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C" }}>
            — Lorah
          </p>
        </div>
      </div>
    </section>
  );
}
