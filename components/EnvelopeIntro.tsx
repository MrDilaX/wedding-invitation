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
    }, 1400);
  };

  if (phase === "done") return null;

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* ── ENVELOPE BODY — fills entire screen ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: "#EDE1CF",
      }}>
        {/* Left diagonal fold */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom right, #E0D3BE 50%, transparent 50%)",
        }} />
        {/* Right diagonal fold */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom left, #E0D3BE 50%, transparent 50%)",
        }} />
        {/* Bottom V fold */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "55%",
          background: "linear-gradient(to top, #D4C5AE 0%, transparent 100%)",
          clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
        }} />

        {/* Center content */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "2rem",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "all 1s ease",
        }}>
          {/* Wax seal */}
          <div style={{
            width: "90px", height: "90px",
            borderRadius: "50%",
            backgroundColor: "#8B1C1C",
            border: "3px solid rgba(255,220,180,0.25)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25), inset 0 1px 3px rgba(255,255,255,0.1)",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem", fontStyle: "italic",
              color: "rgba(255,240,215,0.95)",
              letterSpacing: "0.1em",
            }}>A·L</span>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "rgba(28,43,30,0.45)",
              marginBottom: "0.75rem",
            }}>
              You are cordially invited
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300, fontStyle: "italic",
              color: "#1C2B1E",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}>
              Adam & Lorah
            </h1>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.7rem", letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(28,43,30,0.45)",
              marginTop: "0.75rem",
            }}>
              August 31, 2026 · Napa Valley
            </p>
          </div>

          {/* Tap prompt */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "0.5rem",
            marginTop: "1rem",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem", fontStyle: "italic",
              color: "rgba(28,43,30,0.4)",
            }}>
              Tap to open
            </p>
            <div style={{
              width: "1px", height: "2.5rem",
              background: "linear-gradient(to bottom, rgba(201,168,76,0.7), transparent)",
              animation: "bounce 1.8s ease infinite",
            }} />
          </div>
        </div>
      </div>

      {/* ── TOP FLAP — animates open on click ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "52%",
        transformOrigin: "top center",
        transform: phase === "opening"
          ? "perspective(1200px) rotateX(-185deg)"
          : "perspective(1200px) rotateX(0deg)",
        transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 5,
        transformStyle: "preserve-3d",
      }}>
        {/* Front of flap */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "#E8DBC8",
          clipPath: "polygon(0 0, 50% 100%, 100% 0)",
          backfaceVisibility: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }} />
        {/* Back of flap */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "#D8C9B4",
          clipPath: "polygon(0 0, 50% 100%, 100% 0)",
          transform: "rotateX(180deg)",
          backfaceVisibility: "hidden",
        }} />
      </div>

      {/* ── CREAM FADE OVERLAY — transitions to main page ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: "#F8F3EC",
        opacity: phase === "opening" ? 1 : 0,
        transition: "opacity 0.6s ease 0.7s",
        zIndex: 10,
        pointerEvents: "none",
      }} />
    </div>
  );
}
