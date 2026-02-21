"use client";

import { useEffect, useState, useRef } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  const prevRef = useRef(display);
  const [flipping, setFlipping] = useState(false);
  const [prevDisplay, setPrevDisplay] = useState(display);

  useEffect(() => {
    if (prevRef.current !== display) {
      setPrevDisplay(prevRef.current);
      setFlipping(true);
      const t = setTimeout(() => setFlipping(false), 350);
      prevRef.current = display;
      return () => clearTimeout(t);
    }
  }, [display]);

  const numStyle: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(2.2rem, 5vw, 3rem)",
    fontWeight: 300,
    color: "#F8F3EC",
    lineHeight: 1,
    userSelect: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      <div style={{
        position: "relative",
        width: "72px", height: "90px",
        borderRadius: "6px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}>
        {/* Top half — current value */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(180deg, #2A3D2C 0%, #1F2E21 100%)",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(0,0,0,0.4)",
        }}>
          <span style={{ ...numStyle, marginBottom: "-0.08em" }}>{display}</span>
        </div>

        {/* Bottom half — current value */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(180deg, #1C2B1E 0%, #243528 100%)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          overflow: "hidden",
        }}>
          <span style={{ ...numStyle, marginTop: "-0.08em" }}>{display}</span>
        </div>

        {/* Flipping top — old value folds down from bottom edge */}
        {flipping && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "50%",
            zIndex: 3,
            transformOrigin: "50% 100%",
            animation: "flipDown 0.4s ease-in forwards",
            background: "linear-gradient(180deg, #2A3D2C 0%, #1F2E21 100%)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            overflow: "hidden",
          }}>
            <span style={{ ...numStyle, marginBottom: "-0.08em" }}>{prevDisplay}</span>
          </div>
        )}

        {/* Center seam */}
        <div style={{
          position: "absolute", top: "50%", left: 0, right: 0,
          height: "1px", backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 4, pointerEvents: "none",
        }} />
      </div>

      <span style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "0.58rem", letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(248,243,236,0.35)",
      }}>{label}</span>

      <style>{`
        @keyframes flipDown {
          0%   { transform: perspective(200px) rotateX(0deg); }
          100% { transform: perspective(200px) rotateX(-90deg); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

export default function Countdown() {
  const weddingDate = new Date("2026-08-31T16:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(weddingDate));
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(weddingDate)), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft?.days ?? 0 },
    { label: "Hours", value: timeLeft?.hours ?? 0 },
    { label: "Minutes", value: timeLeft?.minutes ?? 0 },
    { label: "Seconds", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <section className="section-reveal" style={{
      padding: "5rem 1.5rem",
      backgroundColor: "#1C2B1E",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "radial-gradient(circle at 2px 2px, #C9A84C 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.75rem" }}>
          Counting Down To
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, fontStyle: "italic", color: "#F8F3EC", marginBottom: "3rem" }}>
          Our Big Day
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          {units.map(({ label, value }) => (
            <FlipCard key={label} value={value} label={label} />
          ))}
        </div>
        <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "rgba(201,168,76,0.3)" }} />
          <span style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'Cormorant Garamond', serif" }}>✦</span>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "rgba(201,168,76,0.3)" }} />
        </div>
      </div>
    </section>
  );
}
