"use client";

import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 150);
  }, []);

  const playSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playRustle = (start: number, dur: number, gain: number) => {
        const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 0.6);
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const g = ctx.createGain();
        g.gain.setValueAtTime(gain, start);
        g.gain.exponentialRampToValueAtTime(0.001, start + dur);
        const f = ctx.createBiquadFilter();
        f.type = "bandpass"; f.frequency.value = 3500; f.Q.value = 0.6;
        src.connect(f); f.connect(g); g.connect(ctx.destination);
        src.start(start);
      };
      const t = ctx.currentTime;
      playRustle(t, 0.25, 0.45);
      playRustle(t + 0.12, 0.35, 0.3);
      playRustle(t + 0.35, 0.4, 0.2);
    } catch {}
  };

  const handleClick = () => {
    if (phase !== "idle") return;
    playSound();
    setPhase("opening");
    setTimeout(() => { setPhase("done"); onOpen(); }, 1500);
  };

  if (phase === "done") return null;
  const isOpening = phase === "opening";

  // Envelope dimensions — we use SVG for the flap so triangle never clips
  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        cursor: phase === "idle" ? "pointer" : "default",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(ellipse at center, #3D2314 0%, #1A0E07 100%)",
      }}
    >
      {/* Envelope wrapper — no overflow hidden so flap can rotate freely */}
      <div style={{
        position: "relative",
        width: "min(640px, 88vw)",
        height: "min(420px, 60vw)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "scale(1)" : "scale(0.96)",
        transition: "opacity 1s ease, transform 1s ease",
        willChange: "transform",
        // Critical: overflow visible so rotated flap shows above envelope
        overflow: "visible",
      }}>

        {/* ── ENVELOPE BODY (clips its own children) ── */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "3px",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.75), 0 6px 20px rgba(0,0,0,0.4)",
          background: "#F0E8D8",
        }}>
          {/* Paper texture */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #FAF3E4 0%, #EEE2C8 50%, #F2E8D2 100%)" }} />
          {/* Left diagonal fold */}
          <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0, 0 100%, 50% 50%)", background: "linear-gradient(90deg, #D8CAB0 0%, #E8D8C0 100%)" }} />
          {/* Right diagonal fold */}
          <div style={{ position: "absolute", inset: 0, clipPath: "polygon(100% 0, 100% 100%, 50% 50%)", background: "linear-gradient(270deg, #D8CAB0 0%, #E8D8C0 100%)" }} />
          {/* Bottom V fold */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "52%", clipPath: "polygon(0 100%, 50% 0%, 100% 100%)", background: "linear-gradient(180deg, #E0D0B8 0%, #CEC0A4 100%)" }} />
          {/* Subtle center lines */}
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "rgba(150,120,80,0.15)" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "1px", background: "rgba(150,120,80,0.1)" }} />
          {/* Border */}
          <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(150,120,80,0.3)", borderRadius: "3px", pointerEvents: "none" }} />
        </div>

        {/* ── WAX SEAL ── */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -5%)",
          zIndex: 6,
          opacity: isOpening ? 0 : 1,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
        }}>
          <div style={{
            width: "74px", height: "74px", borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #C03535 0%, #8B1C1C 55%, #651010 100%)",
            border: "2px solid rgba(255,200,160,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,0.5), inset 0 1px 3px rgba(255,200,180,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)",
            position: "relative",
          }}>
            <div style={{ position: "absolute", inset: "7px", borderRadius: "50%", border: "1px solid rgba(255,200,160,0.18)" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(255,235,210,0.92)", letterSpacing: "0.1em", position: "relative", zIndex: 1 }}>A·L</span>
          </div>
        </div>

        {/* ── TOP FLAP ── 
            Key fix: This sits OUTSIDE the body's overflow:hidden
            Uses transformStyle preserve-3d with backface so back shows correctly
        ── */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "52%",
          zIndex: 10,
          // Rotate from the very top edge
          transformOrigin: "50% 0%",
          transform: isOpening
            ? "perspective(1000px) rotateX(-179deg)"
            : "perspective(1000px) rotateX(0deg)",
          transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
          transformStyle: "preserve-3d",
          // No overflow hidden — triangle fully visible
        }}>
          {/* Front face */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            background: "linear-gradient(170deg, #EEE2CC 0%, #E0CEB0 65%, #D4BFA0 100%)",
            backfaceVisibility: "hidden",
          }} />
          {/* Back face — rotated 180 so it shows when flap flips over */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            background: "linear-gradient(180deg, #C4B090 0%, #B4A080 100%)",
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
          }} />
        </div>
      </div>

      {/* Tap hint */}
      {phase === "idle" && (
        <div style={{
          position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          opacity: mounted ? 1 : 0, transition: "opacity 1s ease 0.5s",
          pointerEvents: "none",
        }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", color: "rgba(245,237,216,0.4)" }}>
            Tap to open
          </p>
          <div style={{ width: "1px", height: "2rem", background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)", animation: "bounce 1.8s ease infinite" }} />
        </div>
      )}

      {/* Cream page transition overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: "#F8F3EC",
        opacity: isOpening ? 1 : 0,
        transition: "opacity 0.6s ease 0.85s",
        zIndex: 20, pointerEvents: "none",
      }} />
    </div>
  );
}
