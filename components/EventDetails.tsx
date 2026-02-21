"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const playDramaticSound = () => {
    const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_6d4c8d7e0d.mp3?filename=envelope-38344.mp3");
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
        tone(880, 0.18, 0.15, now);
        tone(1320, 0.22, 0.12, now + 0.12);
        tone(660, 0.30, 0.10, now + 0.06);
      } catch {}
    };
    audio.volume = 0.75;
    audio.play().catch(() => {});
  };

  const handleClick = () => {
    if (phase !== "idle") return;
    playDramaticSound();
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 2800); // Extended for more dramatic reveal
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
        background: "var(--envelope-bg, #1a140e)",
        cursor: phase === "idle" ? "pointer" : "default",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(720px, 94vw)",
          height: "min(480px, 66vw)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(0.9)",
          transition: "all 1.4s ease-out",
        }}
      >
        {/* Enhanced glow with pulse */}
        <div
          style={{
            position: "absolute",
            inset: "-80px",
            background: "radial-gradient(circle at center, rgba(255,230,190,0.32), transparent 60%)",
            opacity: isOpening ? 1 : 0,
            animation: isOpening ? "pulseGlow 2s ease-in-out infinite alternate" : "none",
            transition: "opacity 1.6s ease",
            pointerEvents: "none",
          }}
        />

        {/* Redesigned envelope body – more rectangular, like a classic letter envelope */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#f4eade",
            borderRadius: "2px",
            overflow: "hidden",
            boxShadow: "0 50px 120px rgba(0,0,0,0.7)",
            border: "1px solid #d9c8b4",
          }}
        >
          {/* Paper texture overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAADBJREFUKFNj/P///38GRkYGAgDxSgIu1vTVAAAAAElFTkSuQmCC') repeat", // subtle paper texture
              opacity: 0.08,
            }}
          />
          {/* Left flap fold */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "45%",
              background: "linear-gradient(to right, #e8d7c2, #f4eade 80%)",
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            }}
          />
          {/* Right flap fold */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: "45%",
              background: "linear-gradient(to left, #e8d7c2, #f4eade 80%)",
              clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
            }}
          />
          {/* Bottom flap */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(to top, #e0ccb6, #f4eade 70%)",
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
            }}
          />
        </div>

        {/* Letter inside – now reveals by sliding up, but envelope "opens" first */}
        <div
          style={{
            position: "absolute",
            left: "4%",
            right: "4%",
            top: "50%",
            height: "90%",
            transform: "translateY(-50%)",
            borderRadius: "2px",
            background: "linear-gradient(to bottom, #fffef8, #f7f0e6)",
            boxShadow: "0 15px 50px rgba(0,0,0,0.35)",
            transformOrigin: "bottom",
            transform: isOpening ? "translateY(-120%) scaleY(1.6)" : "translateY(0) scaleY(1)",
            transition: "transform 1.6s cubic-bezier(0.25, 0.8, 0.2, 1.1) 0.4s",
            zIndex: 4,
            overflow: "hidden",
          }}
        >
          {/* Text content fades in */}
          <div
            style={{
              position: "absolute",
              inset: "12%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              opacity: isOpening ? 1 : 0,
              transition: "opacity 1.4s ease 0.8s",
              color: "#5a3a1a",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
              lineHeight: 1.6,
            }}
          >
            <p style={{ fontSize: "2rem", margin: "0 0 1.2rem 0", fontStyle: "italic" }}>
              My Beloved,
            </p>
            <p>
              In the quiet moments, your memory dances like light on water. I await our reunion.
            </p>
          </div>

          {/* Hearts/confetti emerging */}
          {isOpening && (
            <>
              <div className="heart" style={heartStyle(15, 0.2, 1.2)} >❤️</div>
              <div className="heart" style={heartStyle(40, 0.4, 0.9)} >💕</div>
              <div className="heart" style={heartStyle(65, 0.3, 1.1)} >❤️</div>
              <div className="heart" style={heartStyle(85, 0.5, 0.8)} >💖</div>
              <div className="heart" style={heartStyle(30, 0.6, 1.0)} >💞</div>
            </>
          )}
        </div>

        {/* Wax seal – breaks and fades */}
        <div
          style={{
            position: "absolute",
            bottom: "24%",
            left: "50%",
            transform: "translate(-50%, 0)",
            opacity: isOpening ? 0 : 1,
            transform: isOpening ? "scale(0.05) rotate(20deg)" : "scale(1)",
            transition: "all 0.6s ease 0.2s",
            zIndex: 8,
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, #c92a2a, #961b1b 65%, #680e0e)",
              border: "3px solid rgba(255,220,180,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem",
                fontStyle: "italic",
                color: "rgba(255,245,230,0.96)",
                letterSpacing: "0.15em",
              }}
            >
              A ⋆ L
            </span>
          </div>
        </div>

        {/* Top flap – now opens more realistically, folding outward */}
        <div
          style={{
            position: "absolute",
            top: "-2%",
            left: 0,
            right: 0,
            height: "52%",
            transformOrigin: "top",
            transform: isOpening
              ? "perspective(1200px) rotateX(165deg)"
              : "perspective(1200px) rotateX(0deg)",
            transition: "transform 1.2s cubic-bezier(0.35, 0.1, 0.15, 1) 0.1s",
            transformStyle: "preserve-3d",
            zIndex: 10,
          }}
        >
          {/* Outer side of flap */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)", // Inverted for top flap
              background: "linear-gradient(to bottom, #f0e0ca, #decab2 60%, #d1b89a)",
              backfaceVisibility: "hidden",
              boxShadow: isOpening ? "0 50px 80px rgba(0,0,0,0.3)" : "none",
            }}
          />
          {/* Inner side of flap */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
              background: "linear-gradient(to top, #ccb89e, #bca68c)",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </div>

      {/* Tap prompt with subtle animation */}
      {phase === "idle" && (
        <div
          style={{
            position: "absolute",
            bottom: "4rem",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: mounted ? 0.75 : 0,
            transition: "opacity 1.6s ease 0.7s",
            pointerEvents: "none",
            textAlign: "center",
            animation: "fadePulse 2s ease-in-out infinite",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.5rem",
              color: "rgba(250,240,220,0.6)",
              margin: 0,
            }}
          >
            Touch to unveil
          </p>
        </div>
      )}

      {/* Fade to content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bg, #120f0a)",
          opacity: isOpening ? 1 : 0,
          transition: "opacity 1.1s ease 1.5s",
          pointerEvents: "none",
        }}
      />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes pulseGlow {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes fadePulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 0.45; }
        }
        .heart {
          position: absolute;
          font-size: 2.5rem;
          opacity: 0;
          animation: floatHeart 3.5s ease-out forwards;
          pointerEvents: none;
        }
        @keyframes floatHeart {
          0% { opacity: 0; transform: translateY(20%) scale(0.5) rotate(0deg); }
          30% { opacity: 1; transform: translateY(-60%) scale(1.2) rotate(20deg); }
          100% { opacity: 0; transform: translateY(-220%) scale(0.7) rotate(-40deg); }
        }
      `}</style>
    </div>
  );
}

// Heart position helper
const heartStyle = (leftPercent: number, delaySec: number, scale: number) => ({
  left: `${leftPercent}%`,
  top: "60%",
  animationDelay: `${delaySec}s`,
  transform: `scale(${scale})`,
});