"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeStyle = (delay: string, extraStyle?: React.CSSProperties): React.CSSProperties => ({
    transition: "opacity 1s ease, transform 1s ease",
    transitionDelay: delay,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    ...extraStyle,
  });

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(160deg, #F8F3EC 0%, #EEE5D8 40%, #E8D9C8 100%)",
      }}
    >
      {/* Botanical corners */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "16rem", opacity: 0.15, pointerEvents: "none" }}>
        <BotanicalLeft />
      </div>
      <div style={{ position: "absolute", top: 0, right: 0, width: "16rem", opacity: 0.15, pointerEvents: "none", transform: "scaleX(-1)" }}>
        <BotanicalLeft />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ ...fadeStyle("0.2s"), fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "2rem" }}>
          Together with their families
        </p>

        <h1 style={{ ...fadeStyle("0.4s"), fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(5rem, 15vw, 12rem)", fontWeight: 300, lineHeight: 1, color: "#1C2B1E", letterSpacing: "-0.02em", margin: 0 }}>
          Chanaka
        </h1>

        <div style={{ ...fadeStyle("0.6s"), display: "flex", alignItems: "center", gap: "1.5rem", margin: "0.5rem 0", width: "100%", maxWidth: "28rem" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #C9A84C)" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#C9A84C", fontStyle: "italic" }}>&amp;</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #C9A84C)" }} />
        </div>

        <h1 style={{ ...fadeStyle("0.8s"), fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(5rem, 15vw, 12rem)", fontWeight: 300, lineHeight: 1, color: "#1C2B1E", letterSpacing: "-0.02em", margin: 0 }}>
          Ganguni
        </h1>

        <p style={{ ...fadeStyle("1s"), fontFamily: "'Jost', sans-serif", fontSize: "1rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(28,43,30,0.55)", marginTop: "2.5rem" }}>
          August 31, 2026
        </p>

        <p style={{ ...fadeStyle("1.1s"), fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C9A7E", marginTop: "0.5rem" }}>
          Napa Valley, California
        </p>

        {/* Scroll cue */}
        <div style={{ ...fadeStyle("1.4s"), display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", marginTop: "5rem" }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(28,43,30,0.35)" }}>
            Scroll
          </span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, rgba(28,43,30,0.35), transparent)", animation: "bounce 2s infinite" }} />
        </div>
      </div>

      {/* Bottom botanical */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
        <div style={{ width: "12rem", opacity: 0.12, transform: "rotate(180deg)" }}>
          <BotanicalLeft />
        </div>
        <div style={{ width: "12rem", opacity: 0.12, transform: "rotate(180deg) scaleX(-1)" }}>
          <BotanicalLeft />
        </div>
      </div>
    </section>
  );
}

function BotanicalLeft() {
  return (
    <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,280 Q40,200 80,150 Q120,100 100,20" stroke="#7C9A7E" strokeWidth="1.5" fill="none" />
      <path d="M80,150 Q50,130 20,100" stroke="#7C9A7E" strokeWidth="1" fill="none" />
      <ellipse cx="18" cy="96" rx="20" ry="12" transform="rotate(-30 18 96)" fill="#7C9A7E" opacity="0.5" />
      <path d="M80,150 Q110,120 140,80" stroke="#7C9A7E" strokeWidth="1" fill="none" />
      <ellipse cx="143" cy="76" rx="20" ry="12" transform="rotate(30 143 76)" fill="#7C9A7E" opacity="0.5" />
      <path d="M60,200 Q30,180 10,160" stroke="#7C9A7E" strokeWidth="1" fill="none" />
      <ellipse cx="8" cy="157" rx="18" ry="10" transform="rotate(-20 8 157)" fill="#7C9A7E" opacity="0.4" />
      <path d="M70,180 Q100,160 120,130" stroke="#7C9A7E" strokeWidth="1" fill="none" />
      <ellipse cx="122" cy="127" rx="16" ry="9" transform="rotate(25 122 127)" fill="#7C9A7E" opacity="0.4" />
      <circle cx="100" cy="18" r="8" fill="#C9A84C" opacity="0.6" />
      <circle cx="96" cy="10" r="4" fill="#C9A84C" opacity="0.4" />
      <circle cx="104" cy="12" r="3" fill="#E8C4B0" opacity="0.6" />
    </svg>
  );
}
