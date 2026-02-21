"use client";

import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 200);
  }, []);

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 1600);
  };

  if (phase === "done") return null;

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        cursor: phase === "idle" ? "pointer" : "default",
        overflow: "hidden",
        backgroundColor: "#2C1810",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Dark wooden background texture */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, #3D2314 0%, #1E0F08 100%)",
      }} />

      {/* Subtle grain */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      }} />

      {/* THE ENVELOPE — realistic proportions, centered */}
      <div style={{
        position: "relative",
        width: "min(640px, 90vw)",
        height: "min(420px, 60vw)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: "opacity 1.2s ease, transform 1.2s ease",
        filter: "drop-shadow(0 40px 100px rgba(0,0,0,0.8)) drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
      }}>

        {/* === ENVELOPE BODY === */}
        {/* Main paper */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "3px",
          overflow: "hidden",
          backgroundColor: "#F5EDD8",
        }}>
          {/* Paper texture gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #F9F2E3 0%, #EFE3C8 40%, #F5EDD8 60%, #EAD9BF 100%)",
          }} />

          {/* Left side fold shadow */}
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "50%",
            background: "linear-gradient(to right, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 30%, transparent 60%)",
          }} />
          {/* Right side fold shadow */}
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "50%",
            background: "linear-gradient(to left, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 30%, transparent 60%)",
          }} />

          {/* Bottom triangle fold */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "52%",
            clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
            background: "linear-gradient(180deg, #E8D8BC 0%, #DDC9A8 100%)",
          }} />

          {/* Bottom triangle fold line / crease */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "52%",
            clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
            background: "linear-gradient(160deg, transparent 48%, rgba(180,150,100,0.3) 49%, transparent 50%)",
          }} />

          {/* Left triangle fold */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(0 0, 0 100%, 50% 50%)",
            background: "linear-gradient(90deg, #E2CFB0 0%, #EDD9BC 100%)",
          }} />

          {/* Right triangle fold */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
            background: "linear-gradient(270deg, #E2CFB0 0%, #EDD9BC 100%)",
          }} />

          {/* Center crease lines */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(180,150,100,0.2), transparent)",
          }} />
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: "50%",
            width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(180,150,100,0.15), transparent)",
          }} />
        </div>

        {/* === WAX SEAL — center of envelope === */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 6,
          opacity: phase === "opening" ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}>
          {/* Outer ring */}
          <div style={{
            width: "76px", height: "76px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #B03030 0%, #8B1C1C 50%, #6B1212 100%)",
            border: "2px solid rgba(255,200,160,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 3px rgba(255,200,180,0.15), inset 0 -2px 4px rgba(0,0,0,0.3)",
            position: "relative",
          }}>
            {/* Inner ring */}
            <div style={{
              position: "absolute", inset: "6px",
              borderRadius: "50%",
              border: "1px solid rgba(255,200,160,0.15)",
            }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem", fontStyle: "italic",
              color: "rgba(255,235,210,0.9)",
              letterSpacing: "0.12em",
              position: "relative", zIndex: 1,
            }}>A·L</span>
          </div>
        </div>

        {/* === TOP FLAP === */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "52%",
          zIndex: 5,
          transformOrigin: "top center",
          transform: phase === "opening"
            ? "perspective(1400px) rotateX(-185deg)"
            : "perspective(1400px) rotateX(0deg)",
          transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}>
          {/* Flap front */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            backfaceVisibility: "hidden",
            background: "linear-gradient(180deg, #EDE0C8 0%, #E0CDB0 60%, #D8C4A0 100%)",
            borderRadius: "3px 3px 0 0",
          }} />
          {/* Flap crease shadow */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            backfaceVisibility: "hidden",
            background: "linear-gradient(160deg, transparent 40%, rgba(0,0,0,0.06) 50%, transparent 60%)",
          }} />
          {/* Flap back */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
            background: "linear-gradient(180deg, #D8C9B0 0%, #C8B89A 100%)",
          }} />
        </div>

        {/* Envelope outline / border */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "3px",
          border: "1px solid rgba(160,130,90,0.35)",
          pointerEvents: "none",
          zIndex: 7,
        }} />
      </div>

      {/* Tap hint */}
      {phase === "idle" && (
        <div style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "0.5rem",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1.2s ease 0.4s",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem", fontStyle: "italic",
            color: "rgba(245,237,216,0.45)",
            letterSpacing: "0.05em",
          }}>
            Tap to open
          </p>
          <div style={{
            width: "1px", height: "2rem",
            background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)",
            animation: "bounce 1.8s ease infinite",
          }} />
        </div>
      )}

      {/* Cream page transition */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: "#F8F3EC",
        opacity: phase === "opening" ? 1 : 0,
        transition: "opacity 0.7s ease 0.8s",
        zIndex: 10,
        pointerEvents: "none",
      }} />
    </div>
  );
}
