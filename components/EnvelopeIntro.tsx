"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // small delay so entrance feels smoother
    const timer = setTimeout(() => setMounted(true), 180);
    return () => clearTimeout(timer);
  }, []);

  const playOpenSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;

      const tone = (freq: number, dur: number, gainVal: number, start: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(gainVal, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur);
      };

      tone(880, 0.16, 0.14, now);      // main note
      tone(1320, 0.20, 0.10, now + 0.11); // higher harmonic
      tone(660, 0.28, 0.08, now + 0.05);  // subtle low
    } catch (e) {
      // silent fail
    }
  };

  const handleClick = () => {
    if (phase !== "idle") return;
    playOpenSound();
    setPhase("opening");
    // Total animation ~1.6–1.8s → then reveal page
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 1800);
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
        {/* soft romantic glow during opening */}
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

        {/* envelope body */}
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #fdf8ef, #f0e4d0 55%, #e8d9c2)",
            }}
          />
          {/* side folds */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(0 0, 44% 48%, 0 100%)",
              background: "linear-gradient(90deg, #e3d0b2, #d9c2a4)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(100% 0, 56% 48%, 100% 100%)",
              background: "linear-gradient(270deg, #e3d0b2, #d9c2a4)",
            }}
          />
          {/* bottom triangle */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "54%",
              clipPath: "polygon(0 100%, 50% 38%, 100% 100%)",
              background: "linear-gradient(to top, #d6c2a8, #c8b498)",
            }}
          />
        </div>

        {/* letter sliding out */}
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
            transition: "transform 1.3s cubic-bezier(0.22, 0.8, 0.18, 1.05)",
            zIndex: 5,
          }}
        />

        {/* wax seal */}
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

        {/* flap – opens upward */}
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
          {/* front of flap */}
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
          {/* inside of flap (when opened) */}
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

      {/* tap hint */}
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

      {/* fade overlay to new page */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bg, #0a0906)",
          opacity: isOpening ? 1 : 0,
          transition: "opacity 0.9s ease 0.9s",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}