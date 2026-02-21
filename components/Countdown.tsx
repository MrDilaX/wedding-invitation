"use client";
import { useEffect, useState, useRef } from "react";

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }
function calc(t: Date): TimeLeft {
  const d = t.getTime() - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return { days: Math.floor(d/(1000*60*60*24)), hours: Math.floor((d/(1000*60*60))%24), minutes: Math.floor((d/(1000*60))%60), seconds: Math.floor((d/1000)%60) };
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  const prevRef = useRef(display);
  const [flipping, setFlipping] = useState(false);
  const [prev, setPrev] = useState(display);
  useEffect(() => {
    if (prevRef.current !== display) { setPrev(prevRef.current); setFlipping(true); const t = setTimeout(() => setFlipping(false), 400); prevRef.current = display; return () => clearTimeout(t); }
  }, [display]);
  const num: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 300, color: "var(--primary)", lineHeight: 1, userSelect: "none" };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      <div style={{ position: "relative", width: "72px", height: "90px", borderRadius: "6px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", backgroundColor: "var(--bg)", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
          <span style={{ ...num, marginBottom: "-0.08em" }}>{display}</span>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", backgroundColor: "var(--bg-alt)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflow: "hidden" }}>
          <span style={{ ...num, marginTop: "-0.08em" }}>{display}</span>
        </div>
        {flipping && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", zIndex: 3, transformOrigin: "50% 100%", animation: "flipDown 0.4s ease-in forwards", backgroundColor: "var(--bg)", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
            <span style={{ ...num, marginBottom: "-0.08em" }}>{prev}</span>
          </div>
        )}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", backgroundColor: "var(--border)", zIndex: 4 }} />
      </div>
      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

export default function Countdown() {
  const weddingDate = new Date("2026-08-31T16:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  useEffect(() => { setTimeLeft(calc(weddingDate)); const t = setInterval(() => setTimeLeft(calc(weddingDate)), 1000); return () => clearInterval(t); }, []);
  const units = [{ label: "Days", value: timeLeft?.days ?? 0 }, { label: "Hours", value: timeLeft?.hours ?? 0 }, { label: "Minutes", value: timeLeft?.minutes ?? 0 }, { label: "Seconds", value: timeLeft?.seconds ?? 0 }];
  return (
    <section className="section-reveal" style={{ padding: "5rem 1.5rem", backgroundColor: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)", backgroundSize: "36px 36px" }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Counting Down To</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, fontStyle: "italic", color: "var(--primary)", marginBottom: "3rem" }}>Our Big Day</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          {units.map(({ label, value }) => <FlipCard key={label} value={value} label={label} />)}
        </div>
        <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--border)" }} />
          <span style={{ color: "var(--accent)", fontFamily: "'Cormorant Garamond', serif" }}>✦</span>
          <div style={{ width: "3rem", height: "1px", backgroundColor: "var(--border)" }} />
        </div>
      </div>
    </section>
  );
}
