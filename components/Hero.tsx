"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  return (
    <section id="top" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "linear-gradient(160deg, var(--bg) 0%, var(--bg-alt) 40%, var(--bg) 100%)", padding: "8rem 1.5rem 4rem", textAlign: "center" }}>
      <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 1.2s ease", position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>Join us</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", fontStyle: "italic", color: "var(--text)", marginBottom: "0.5rem" }}>Together with our loved friends and family</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--text-muted)", marginBottom: "2rem" }}>celebrating our wedding</p>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 12vw, 8rem)", fontWeight: 300, fontStyle: "italic", color: "var(--primary)", lineHeight: 1 }}>Chanaka</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--accent)", fontStyle: "italic", margin: "0.25rem 0" }}>&</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 12vw, 8rem)", fontWeight: 300, fontStyle: "italic", color: "var(--primary)", lineHeight: 1 }}>Ganguni</h1>
        </div>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "var(--primary)", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Grand Palace, Hikkaduwa</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>Aug 31, 2026</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontStyle: "italic", color: "var(--accent)", marginTop: "1.5rem" }}>Save the date</p>
        <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, var(--accent), transparent)", animation: "bounce 2s ease infinite" }} />
        </div>
      </div>
    </section>
  );
}
