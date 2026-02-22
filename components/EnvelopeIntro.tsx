"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "zoom">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");

    // Sequence: 1. Flap opens -> 2. Card slides & Zoom begins -> 3. Callback
    setTimeout(() => setPhase("zoom"), 800);
    setTimeout(() => onOpen(), 2500);
  };

  if (!mounted) return null;

  const isOpening = phase !== "idle";
  const isZooming = phase === "zoom";

  return (
    <div 
      onClick={handleOpen}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a1a] transition-all duration-[1500ms] ease-in-out ${
        isZooming ? "scale-[5] opacity-0" : "scale-100 opacity-100"
      }`}
      style={{ cursor: phase === "idle" ? "pointer" : "default" }}
    >
      {/* 3D Envelope Container */}
      <div className="relative w-[min(500px,85vw)] h-[min(330px,55vw)]" style={{ perspective: "1500px" }}>
        
        {/* 1. THE RECTANGLE BASE (The back of the envelope) */}
        <div className="absolute inset-0 bg-[#d4c7b0] rounded-sm shadow-2xl" />

        {/* 2. THE CARD (Invitation) - Slides out from the top */}
        <div 
          className="absolute inset-x-[5%] top-[5%] h-[90%] bg-white shadow-lg flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out"
          style={{ 
            zIndex: 2,
            transform: isOpening ? "translateY(-60%)" : "translateY(0)",
            transitionDelay: isOpening ? "0.4s" : "0s" 
          }}
        >
          <div className="w-[90%] h-[90%] border border-[#d4c7b0] flex flex-col items-center justify-center p-4">
             <h2 className="font-serif italic text-xl text-[#8b7355]">Wedding</h2>
             <p className="text-[10px] tracking-[0.2em] mt-2 text-gray-400">CHANAKA & GANGUNI</p>
          </div>
        </div>

        {/* 3. THE TOP FLAP (Fixed Hinge) */}
        <div 
          className="absolute top-0 left-0 w-full h-1/2 transition-transform duration-700 ease-in-out"
          style={{ 
            transformOrigin: "top", // Locks the "hinge" to the top edge
            transform: isOpening ? "rotateX(-180deg)" : "rotateX(0deg)",
            zIndex: isOpening ? 1 : 10, // Moves behind the card when open
            transformStyle: "preserve-3d"
          }}
        >
          {/* Front (Visible when closed) */}
          <div 
            className="absolute inset-0 bg-[#e8d8c0]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backfaceVisibility: "hidden" 
            }} 
          >
            {/* Wax Seal - Positioned relative to the flap tip */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#8b1c1c] rounded-full shadow-lg border-2 border-[#a62626] flex items-center justify-center">
               <span className="text-[10px] text-white font-serif italic">C&G</span>
            </div>
          </div>
          
          {/* Back (The inside of the flap when flipped up) */}
          <div 
            className="absolute inset-0 bg-[#c4b59d]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: "rotateX(180deg)", 
              backfaceVisibility: "hidden" 
            }} 
          />
        </div>

        {/* 4. THE FRONT POCKET (The triangle sides/bottom) */}
        {/* Left Side */}
        <div className="absolute inset-0 z-[4]" style={{ clipPath: "polygon(0 0, 0 100%, 50% 50%)", background: "#e0d1b8" }} />
        {/* Right Side */}
        <div className="absolute inset-0 z-[4]" style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)", background: "#e0d1b8" }} />
        {/* Bottom Face */}
        <div className="absolute inset-0 z-[5]" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)", background: "#d4c5ab" }} />

        {/* Floating Instruction */}
        {!isOpening && (
          <div className="absolute -bottom-16 w-full text-center animate-bounce">
            <span className="text-[#f5eddb]/40 font-serif italic text-sm tracking-widest">TAP ANYWHERE</span>
          </div>
        )}
      </div>
    </div>
  );
}