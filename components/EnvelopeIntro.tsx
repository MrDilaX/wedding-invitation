"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 180);
    return () => clearTimeout(timer);
  }, []);

  const playDramaticSound = () => {
    // Try realistic sound first
    const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_6d4c8d7e0d.mp3?filename=envelope-38344.mp3");
    // Fallback: your original synth tones if load fails or blocked
    audio.onerror = () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const now = ctx.currentTime;
        const tone = (f: number, d: number, g: number, s: number) => {
          const o = ctx.createOscillator();
          const gn = ctx.createGain();
          o.type = "sine";
          o.frequency.value = f;
          gn.gain.setValueAtTime(g, s);
          gn.gain.exponentialRampToValueAtTime(0.001, s + d);
          o.connect(gn); gn.connect(ctx.destination);
          o.start(s); o.stop(s + d);
        };
        tone(880, 0.16, 0.14, now);
        tone(1320, 0.20, 0.10, now + 0.11);
        tone(660, 0.28, 0.08, now + 0.05);
      } catch {}
    };
    audio.volume = 0.7;
    audio.play().catch(() => {}); // autoplay may be blocked → silent fail
  };

  const handleClick = () => {
    if (phase !== "idle") return;
    playDramaticSound();
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 2200); // longer to let hearts & text breathe
  };

  if (phase === "done") return null;

  const isOpening = phase === "opening";

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--envelope-bg, #0f0c08)",
        cursor: phase === "idle" ? "pointer" : "default",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(680px, 92vw)",
          height: "min(460px, 64vw)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(0.92)",
          transition: "all 1.2s ease-out",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            inset: "-60px",
            background: "radial-gradient(circle at center, rgba(255,220,180,0.28), transparent 65%)",
            opacity: isOpening ? 0.9 : 0,
            transition: "opacity 1.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* envelope body (same as before) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#f9f1e4",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.65)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #fdf8ef, #f0e4d0 55%, #e8d9c2)" }} />
          <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0, 44% 48%, 0 100%)", background: "linear-gradient(90deg, #e3d0b2, #d9c2a4)" }} />
          <div style={{ position: "absolute", inset: 0, clipPath: "polygon(100% 0, 56% 48%, 100% 100%)", background: "linear-gradient(270deg, #e3d0b2, #d9c2a4)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "54%", clipPath: "polygon(0 100%, 50% 38%, 100% 100%)", background: "linear-gradient(to top, #d6c2a8, #c8b498)" }} />
        </div>

        {/* letter with text + hearts */}
        <div
          style={{
            position: "absolute",
            left: "7%",
            right: "7%",
            bottom: "9%",
            height: "76%",
            borderRadius: "4px",
            background: "linear-gradient(to bottom, #fffef9, #f8f2e8)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
            transform: isOpening ? "translateY(-160%) scale(1.04)" : "translateY(0)",
            transition: "transform 1.4s cubic-bezier(0.22, 0.8, 0.18, 1.05)",
            zIndex: 5,
            overflow: "hidden",
          }}
        >
          {/* romantic text inside letter */}
          <div
            style={{
              position: "absolute",
              inset: "10%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              opacity: isOpening ? 1 : 0,
              transition: "opacity 1.2s ease 0.4s",
              color: "#4a2c0d",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            <p style={{ fontSize: "1.8rem", margin: "0 0 1rem 0", fontStyle: "italic" }}>
              To my dearest...
            </p>
            <p style={{ fontSize: "1.3rem", maxWidth: "80%", lineHeight: 1.5 }}>
              Every beat of my heart whispers your name. Forever yours.
            </p>
          </div>

          {/* floating hearts (appear during opening) */}
          {isOpening && (
            <>
              <div className="heart" style={heartStyle(10, 20, 0.8)} />
              <div className="heart" style={heartStyle(35, 40, 1.1)} />
              <div className="heart" style={heartStyle(60, 15, 0.9)} />
              <div className="heart" style={heartStyle(80, 55, 1.0)} />
              <div className="heart" style={heartStyle(25, 70, 0.7)} />
            </>
          )}
        </div>

        {/* wax seal (same) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -8%) scale(${isOpening ? 0.1 : 1})`,
            opacity: isOpening ? 0 : 1,
            transition: "all 0.5s ease",
            zIndex: 10,
          }}
        >
          {/* ... wax seal content unchanged ... */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 38% 32%, #d12c2c, #9b1e1e 60%, #6b0f0f)",
              border: "2.5px solid rgba(255,210,170,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.55)",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "rgba(255,240,220,0.94)",
                letterSpacing: "0.12em",
              }}
            >
              A · L
            </span>
          </div>
        </div>

        {/* flap (same) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "54%",
            transformOrigin: "50% 0%",
            transform: isOpening
              ? "perspective(1000px) rotateX(-168deg)"
              : "perspective(1000px) rotateX(0deg)",
            transition: "transform 1s cubic-bezier(0.3, 0.0, 0.1, 1)",
            transformStyle: "preserve-3d",
            zIndex: 12,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              background: "linear-gradient(165deg, #f5e9d2, #e3d1b5 60%, #d4bfa3)",
              backfaceVisibility: "hidden",
              boxShadow: isOpening ? "inset 0 -40px 60px rgba(0,0,0,0.25)" : "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              background: "linear-gradient(180deg, #d9c7b0, #c7b39a)",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </div>

      {/* tap hint (same) */}
      {phase === "idle" && (
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: mounted ? 0.7 : 0,
            transition: "opacity 1.4s ease 0.6s",
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.3rem",
              color: "rgba(245,235,210,0.55)",
              margin: 0,
            }}
          >
            tap to open
          </p>
        </div>
      )}

      {/* fade overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bg, #0a0906)",
          opacity: isOpening ? 1 : 0,
          transition: "opacity 0.9s ease 1.1s",
          pointerEvents: "none",
        }}
      />

      {/* simple CSS hearts animation */}
      <style jsx>{`
        .heart {
          position: absolute;
          font-size: 2.2rem;
          color: #e63946;
          opacity: 0;
          animation: floatHeart 3s ease-out forwards;
          pointer-events: none;
        }
        @keyframes floatHeart {
          0%   { opacity: 0; transform: translateY(0) scale(0.4) rotate(0deg); }
          20%  { opacity: 0.9; transform: translateY(-40%) scale(1.1) rotate(15deg); }
          100% { opacity: 0; transform: translateY(-180%) scale(0.6) rotate(-30deg); }
        }
      `}</style>
    </div>
  );
}

// Helper for random-ish heart positions/delays
const heartStyle = (leftPercent: number, delaySec: number, scale: number) => ({
  left: `${leftPercent}%`,
  bottom: "20%",
  animationDelay: `${delaySec * 0.15}s`,
  transform: `scale(${scale})`,
});