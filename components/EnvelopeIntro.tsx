"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 150);
  }, []);

  const playEnvelopeSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioRef.current = ctx;

      // Paper rustle — layered noise bursts
      const playRustle = (startTime: number, duration: number, gain: number) => {
        const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 0.5);
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(gain, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 3000;
        filter.Q.value = 0.5;
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(startTime);
      };

      const now = ctx.currentTime;
      playRustle(now, 0.3, 0.4);
      playRustle(now + 0.15, 0.4, 0.3);
      playRustle(now + 0.4, 0.5, 0.25);
      playRustle(now + 0.7, 0.3, 0.15);
    } catch {}
  };

  const handleClick = () => {
    if (phase !== "idle") return;
    playEnvelopeSound();
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
        cursor: phase === "idle" ? "pointer" : "default",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(ellipse at center, #3D2314 0%, #1E0F08 100%)",
      }}
    >
      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
      }} />

      {/* ENVELOPE */}
      <div style={{
        position: "relative",
        width: "min(600px, 88vw)",
        height: "min(400px, 58vw)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "scale(1)" : "scale(0.96)",
        transition: "opacity 1s ease, transform 1s ease",
        willChange: "transform",
      }}>

        {/* Body */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "3px",
          background: "linear-gradient(135deg, #F9F2E3 0%, #EFE3C8 40%, #F5EDD8 60%, #EAD9BF 100%)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 8px 20px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}>
          {/* Left fold */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(0 0, 0 100%, 50% 50%)",
            background: "linear-gradient(90deg, #DDD0B8 0%, #EDD9BE 100%)",
          }} />
          {/* Right fold */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
            background: "linear-gradient(270deg, #DDD0B8 0%, #EDD9BE 100%)",
          }} />
          {/* Bottom fold */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "52%",
            clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
            background: "linear-gradient(180deg, #E4D4B8 0%, #D8C4A4 100%)",
          }} />
        </div>

        {/* Wax seal */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -20%)",
          zIndex: 6,
          opacity: phase === "opening" ? 0 : 1,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #C03535 0%, #8B1C1C 55%, #6B1212 100%)",
            border: "2px solid rgba(255,200,160,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 18px rgba(0,0,0,0.5), inset 0 1px 3px rgba(255,200,180,0.2)",
            position: "relative",
          }}>
            <div style={{ position: "absolute", inset: "6px", borderRadius: "50%", border: "1px solid rgba(255,200,160,0.15)" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(255,235,210,0.92)", letterSpacing: "0.1em", position: "relative", zIndex: 1 }}>A·L</span>
          </div>
        </div>

        {/* TOP FLAP — smooth GPU-accelerated flip */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "52%",
          zIndex: 5,
          transformOrigin: "50% 0%",
          // Use scaleY for smoother performance than rotateX
          transform: phase === "opening"
            ? "perspective(900px) rotateX(-178deg)"
            : "perspective(900px) rotateX(0deg)",
          transition: "transform 0.65s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          overflow: "hidden",
          borderRadius: "3px 3px 0 0",
        }}>
          {/* Front */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            background: "linear-gradient(170deg, #EDE0C8 0%, #E0CDB0 70%, #D8C4A0 100%)",
            backfaceVisibility: "hidden",
          }} />
          {/* Back */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            background: "linear-gradient(180deg, #C8B89A 0%, #B8A882 100%)",
            transform: "rotateX(180deg)",
            backfaceVisibility: "hidden",
          }} />
        </div>

        {/* Envelope border */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "3px",
          border: "1px solid rgba(160,130,90,0.3)",
          zIndex: 7, pointerEvents: "none",
        }} />
      </div>

      {/* Tap hint */}
      {phase === "idle" && (
        <div style={{
          position: "absolute", bottom: "2.5rem",
          left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          opacity: mounted ? 1 : 0, transition: "opacity 1s ease 0.5s",
        }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", color: "rgba(245,237,216,0.4)" }}>
            Tap to open
          </p>
          <div style={{ width: "1px", height: "2rem", background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)", animation: "bounce 1.8s ease infinite" }} />
        </div>
      )}

      {/* Cream transition */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: "#F8F3EC",
        opacity: phase === "opening" ? 1 : 0,
        transition: "opacity 0.6s ease 0.75s",
        zIndex: 10, pointerEvents: "none",
      }} />
    </div>
  );
}
