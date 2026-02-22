"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "zoom">("idle");

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");

    // Start the zoom-in transition after the flap is fully open
    setTimeout(() => setPhase("zoom"), 1000);
    // Finally trigger the main site
    setTimeout(() => onOpen(), 2200);
  };

  return (
    <div 
      onClick={handleOpen}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a1a] transition-all duration-1000 ease-in-out ${
        phase === "zoom" ? "scale-[4] opacity-0" : "scale-100 opacity-100"
      }`}
      style={{ cursor: phase === "idle" ? "pointer" : "default" }}
    >
      {/* Envelope Wrapper */}
      <div className="relative w-[min(450px,85vw)] h-[min(300px,55vw)]" style={{ perspective: "1200px" }}>
        
        {/* 1. THE FLAP (Hinged at the very top) */}
        <div 
          className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
          style={{ 
            transformOrigin: "top", // Essential: Keeps flap attached to the top edge
            transform: phase !== "idle" ? "rotateX(180deg)" : "rotateX(0deg)",
            zIndex: phase === "idle" ? 10 : 1, // Moves behind the card once opened
            transformStyle: "preserve-3d"
          }}
        >
          {/* Front of Flap */}
          <div 
            className="absolute inset-0 bg-[#e8d8c0]" 
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%)", backfaceVisibility: "hidden" }} 
          >
            {/* Wax Seal */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-12 h-12 bg-[#8b1c1c] rounded-full shadow-xl flex items-center justify-center border-2 border-[#a62626]">
              <span className="text-[10px] text-white font-serif italic">C&G</span>
            </div>
          </div>
          {/* Back of Flap (Visible when flipped up) */}
          <div 
            className="absolute inset-0 bg-[#d4c7b0]" 
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%)", transform: "rotateX(180deg)", backfaceVisibility: "hidden" }} 
          />
        </div>

        {/* 2. THE CARD (Slides UP) */}
        <div 
          className="absolute inset-x-[4%] bottom-[5%] h-[90%] bg-white shadow-md z-[3] flex flex-col items-center justify-center p-4 transition-transform duration-1000 ease-in-out"
          style={{ 
            transform: phase !== "idle" ? "translateY(-65%)" : "translateY(0)",
            transitionDelay: "0.5s" 
          }}
        >
          <div className="w-full h-full border border-[#d4c7b0] flex flex-col items-center justify-center">
            <h2 className="font-serif italic text-lg text-[#8b7355]">Wedding</h2>
            <p className="text-[8px] tracking-[0.3em] uppercase mt-2">Chanaka & Ganguni</p>
          </div>
        </div>

        {/* 3. ENVELOPE BODY (Sides and Bottom pocket) */}
        {/* Main Back */}
        <div className="absolute inset-0 bg-[#f2e8d2] shadow-2xl z-[0] rounded-sm" />
        
        {/* Left/Right/Bottom Triangles (Layered over the card) */}
        <div className="absolute inset-0 z-[4]" style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)", background: "#e8d8c0" }} />
        <div className="absolute inset-0 z-[4]" style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)", background: "#e8d8c0" }} />
        <div className="absolute inset-0 z-[5]" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)", background: "#decba4" }} />

        {/* Instruction */}
        {phase === "idle" && (
          <div className="absolute -bottom-12 w-full text-center">
            <p className="text-[#f5eddb]/50 font-serif italic text-xs animate-pulse">Click to open</p>
          </div>
        )}
      </div>
    </div>
  );
}