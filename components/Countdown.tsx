"use client";

import { useEffect, useState } from "react";

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

export default function Countdown() {
  const weddingDate = new Date("2026-08-31T16:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Only start on client to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft(weddingDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft?.days ?? 0 },
    { label: "Hours", value: timeLeft?.hours ?? 0 },
    { label: "Minutes", value: timeLeft?.minutes ?? 0 },
    { label: "Seconds", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <section
      className="section-reveal"
      style={{
        padding: "6rem 1.5rem",
        backgroundColor: "#1C2B1E",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, opacity: 0.05,
        backgroundImage: "radial-gradient(circle at 2px 2px, #C9A84C 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>
          Counting Down To
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#F8F3EC", marginBottom: "4rem" }}>
          Our Big Day
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem" }}>
          {units.map(({ label, value }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <span
                  suppressHydrationWarning
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(4rem, 8vw, 6rem)", fontWeight: 300, color: "#F8F3EC", fontVariantNumeric: "tabular-nums" }}
                >
                  {timeLeft ? String(value).padStart(2, "0") : "--"}
                </span>
                <div style={{ position: "absolute", bottom: "-0.5rem", left: 0, right: 0, height: "1px", backgroundColor: "rgba(201,168,76,0.25)" }} />
              </div>
              <span style={{ marginTop: "1rem", fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(248,243,236,0.35)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <div style={{ width: "4rem", height: "1px", backgroundColor: "rgba(201,168,76,0.3)" }} />
          <span style={{ color: "rgba(201,168,76,0.5)", fontSize: "1.2rem", fontFamily: "'Cormorant Garamond', serif" }}>✦</span>
          <div style={{ width: "4rem", height: "1px", backgroundColor: "rgba(201,168,76,0.3)" }} />
        </div>
      </div>
    </section>
  );
}