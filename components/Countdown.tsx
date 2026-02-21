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

function FlipCard({ value, label }: { value: number; label: string }) {
  const [current, setCurrent] = useState(value);
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const display = String(value).padStart(2, "0");
  const prevDisplay = String(prev).padStart(2, "0");

  useEffect(() => {
    if (value !== current) {
      setPrev(current);
      setFlipping(true);
      setTimeout(() => {
        setCurrent(value);
        setFlipping(false);
      }, 300);
    }
  }, [value]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      <div style={{ position: "relative", width: "80px", height: "96px", perspective: "400px" }}>
        {/* Static bottom half (new value) */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          backgroundColor: "#243528",
          borderRadius: "0 0 6px 6px",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          overflow: "hidden",
          borderTop: "1px solid rgba(201,168,76,0.1)",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3.5rem", fontWeight: 300,
            color: "#F8F3EC",
            lineHeight: 1,
            marginTop: "-0.05em",
          }}>{display}</span>
        </div>

        {/* Static top half (current value) */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "50%",
          backgroundColor: "#1C2B1E",
          borderRadius: "6px 6px 0 0",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3.5rem", fontWeight: 300,
            color: "#F8F3EC",
            lineHeight: 1,
            marginBottom: "-0.05em",
          }}>{display}</span>
        </div>

        {/* Flipping card */}
        {flipping && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "50%",
            backgroundColor: "#1C2B1E",
            borderRadius: "6px 6px 0 0",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            overflow: "hidden",
            transformOrigin: "bottom center",
            animation: "flipTop 0.3s ease forwards",
            zIndex: 2,
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3.5rem", fontWeight: 300,
              color: "#F8F3EC",
              lineHeight: 1,
              marginBottom: "-0.05em",
            }}>{prevDisplay}</span>
          </div>
        )}
      </div>

      <span style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "0.6rem", letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(248,243,236,0.4)",
      }}>{label}</span>
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
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
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
