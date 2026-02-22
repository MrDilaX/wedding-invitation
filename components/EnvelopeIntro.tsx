"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "zoom" | "done">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") return;
    
    setPhase("opening");

    // Phase 1: Flap opens and Card starts sliding up
    setTimeout(() => {
      setPhase("zoom");
    }, 800);

    // Phase 2: Camera "zooms into" the card, then switches to main content
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 2000);
  };

  if (phase === "done") return null;

  const isOpening = phase !== "idle";
  const isZooming = phase === "zoom";

  return (
    <div 
      onClick={handleOpen}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-all duration-1000 bg-[#1a1a1a] ${
        isZooming ? "scale-[3] opacity-0" : "scale-100 opacity-100"
      }`}
      style={{ cursor: phase === "idle" ? "pointer" : "default" }}
    >
      {/* Container that handles the 3D depth */}
      <div 
        className={`relative w-[min(540px,90vw)] h-[min(380px,65vw)] transition-transform duration-1000 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        style={{ perspective: "1200px" }}
      >
        
        {/* 1. THE CARD (The invitation itself) */}
        <div 
          className="absolute inset-x-[5%] bottom-0 h-[90%] bg-white shadow-lg z-[2] flex flex-col items-center justify-center p-8 transition-transform duration-[1200ms] ease-in-out"
          style={{ 
            transform: isOpening ? "translateY(-60%)" : "translateY(0)",
            boxShadow: "0 -5px 15px rgba(0,0,0,0.1)"
          }}
        >
          <div className="w-full h-full border border-[#d4c7b0] flex flex-col items-center justify-center text-center">
            <h2 className="font-serif italic text-2xl text-[#8b7355]">Wedding</h2>
            <div className="w-12 h-[1px] bg-[#d4c7b0] my-2" />
            <p className="font-serif text-xs tracking-widest text-[#a89b82]">SAVE THE DATE</p>
          </div>
        </div>

        {/* 2. ENVELOPE BACK (Inner wall) */}
        <div className="absolute inset-0 bg-[#f2e8d2] shadow-2xl z-[1] rounded-sm" />

        {/* 3. ENVELOPE FRONT (The pocket) */}
        {/* Left wing */}
        <div className="absolute inset-0 z-[4]" 
             style={{ clipPath: "polygon(0 0, 0 100%, 50% 50%)", background: "#e8d8c0" }} />
        {/* Right wing */}
        <div className="absolute inset-0 z-[4]" 
             style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)", background: "#e8d8c0" }} />
        {/* Bottom wing */}
        <div className="absolute inset-0 z-[5]" 
             style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)", background: "#decba4" }} />

        {/* 4. THE FLAP */}
        <div 
          className={`absolute top-0 left-0 w-full h-1/2 transition-transform duration-700 ease-in-out ${
            isOpening ? "z-[0]" : "z-[6]"
          }`}
          style={{ 
            transformOrigin: "top",
            transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Front of Flap (Wax seal side) */}
          <div className="absolute inset-0 bg-[#eee2cc] z-[2]" 
               style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }}>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#8b1c1c] rounded-full shadow-lg flex items-center justify-center border-2 border-[#a62626]">
              <span className="text-white font-serif italic text-sm">C&G</span>
            </div>
          </div>
          
          {/* Back of Flap (Inside color) */}
          <div className="absolute inset-0 bg-[#d4c7b0]" 
               style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transform: "rotateX(180deg)", backfaceVisibility: "hidden" }} />
        </div>

        {/* Instruction */}
        {!isOpening && (
          <div className="absolute -bottom-20 left-0 w-full text-center animate-pulse">
            <p className="text-[#d4c7b0] font-serif italic tracking-[0.2em] uppercase text-xs">Click to Open</p>
          </div>
        )}
      </div>
    </div>
  );
}