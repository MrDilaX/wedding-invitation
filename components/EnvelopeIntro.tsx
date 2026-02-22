"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const playSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const r = (start: number, dur: number, gain: number) => {
        const b = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
        const d = b.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 0.6);
        const s = ctx.createBufferSource();
        s.buffer = b;
        const g = ctx.createGain();
        g.gain.setValueAtTime(gain, start);
        g.gain.exponentialRampToValueAtTime(0.001, start + dur);
        const f = ctx.createBiquadFilter();
        f.type = "bandpass";
        f.frequency.value = 3500;
        s.connect(f);
        f.connect(g);
        g.connect(ctx.destination);
        s.start(start);
      };
      const t = ctx.currentTime;
      r(t, 0.25, 0.4);
      r(t + 0.1, 0.2, 0.2);
    } catch (e) {}
  };

  const handleOpen = () => {
    if (phase !== "idle") return;
    playSound();
    setPhase("opening");
    
    // Duration of the flap animation + a small delay before transition
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 1200);
  };

  if (phase === "done") return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-1000 ${
        phase === "opening" ? "bg-opacity-0" : "bg-[#1a1a1a]"
      }`}
      onClick={handleOpen}
      style={{ cursor: phase === "idle" ? "pointer" : "default" }}
    >
      {/* Container */}
      <div 
        className={`relative w-[min(600px,90vw)] h-[min(400px,60vw)] transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ perspective: "1500px" }}
      >
        
        {/* ENVELOPE BACK & SIDES */}
        <div className="absolute inset-0 bg-[#f2e8d2] shadow-2xl rounded-sm">
          {/* Left Wing */}
          <div 
            className="absolute inset-0 z-[3]" 
            style={{ clipPath: "polygon(0 0, 0 100%, 50% 50%)", background: "#e8d8c0" }} 
          />
          {/* Right Wing */}
          <div 
            className="absolute inset-0 z-[3]" 
            style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)", background: "#e8d8c0" }} 
          />
          {/* Bottom Wing */}
          <div 
            className="absolute inset-0 z-[4]" 
            style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)", background: "#decba4" }} 
          />
        </div>

        {/* THE FLAP */}
        <div 
          className={`absolute top-0 left-0 w-full h-1/2 z-[5] transition-transform duration-700 ease-in-out`}
          style={{ 
            transformOrigin: "top",
            transform: phase === "opening" ? "rotateX(180deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Outer Flap (Visible when closed) */}
          <div 
            className="absolute inset-0 bg-[#eee2cc]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backfaceVisibility: "hidden"
            }} 
          >
            {/* Wax Seal */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
               <div className="w-16 h-16 rounded-full bg-[#8b1c1c] shadow-lg border-2 border-[#a62626] flex items-center justify-center">
                  <span className="text-[#f5eddb]/80 italic font-serif text-sm">C.G</span>
               </div>
            </div>
          </div>

          {/* Inner Flap (Visible when opened) */}
          <div 
            className="absolute inset-0 bg-[#d4bfa0]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden"
            }} 
          />
        </div>

        {/* INSTRUCTION TEXT */}
        {phase === "idle" && (
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center animate-pulse">
            <p className="text-[#f5eddb]/60 font-serif italic tracking-widest">Click to Open</p>
          </div>
        )}
      </div>
    </div>
  );
}