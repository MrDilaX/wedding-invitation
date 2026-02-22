"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Step 1: Flap opens (0.6s)
    // Step 2: Fade out to the actual invitation
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  if (!isRendered) return null;

  return (
    <div 
      onClick={handleOpen}
      className="fixed inset-0 z-[100] bg-[#1a1a1a] flex items-center justify-center cursor-pointer overflow-hidden transition-opacity duration-500"
      style={{ opacity: isOpen ? 0.9 : 1 }}
    >
      {/* Container with Perspective for 3D Flap */}
      <div className="relative w-[min(500px,85vw)] h-[min(350px,60vw)] transition-transform duration-700"
           style={{ perspective: "1000px" }}>
        
        {/* 1. BACK BOX (The "inside" of the envelope) */}
        <div className="absolute inset-0 bg-[#d4c7b0] rounded-sm shadow-2xl" />

        {/* 2. THE TOP FLAP (The Triangle that opens) */}
        <div 
          className="absolute top-0 left-0 w-full h-1/2 z-[10] transition-transform duration-700 ease-in-out"
          style={{ 
            transformOrigin: "top", 
            transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Front of Flap (Face Down) */}
          <div 
            className="absolute inset-0 bg-[#e8d8c0]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backfaceVisibility: "hidden",
              zIndex: 2
            }} 
          >
            {/* Wax Seal */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#8b1c1c] rounded-full shadow-md flex items-center justify-center border-2 border-[#6b1212]">
                <span className="text-[10px] text-[#f5eddb] font-serif italic">C&G</span>
            </div>
          </div>

          {/* Back of Flap (Visible when open) */}
          <div 
            className="absolute inset-0 bg-[#c4b59d]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden"
            }} 
          />
        </div>

        {/* 3. SIDE & BOTTOM TRIANGLES (The "Front" of the envelope) */}
        {/* Left Side */}
        <div 
          className="absolute inset-0 z-[5]" 
          style={{ clipPath: "polygon(0 0, 0 100%, 50% 50%)", background: "#e0d1b8" }} 
        />
        {/* Right Side */}
        <div 
          className="absolute inset-0 z-[5]" 
          style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)", background: "#e0d1b8" }} 
        />
        {/* Bottom Face */}
        <div 
          className="absolute inset-0 z-[6]" 
          style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)", background: "#d4c5ab" }} 
        />

        {/* 4. TAP INDICATOR */}
        {!isOpen && (
          <div className="absolute -bottom-16 left-0 w-full text-center animate-bounce">
            <span className="text-[#f5eddb]/40 font-serif italic tracking-widest text-sm">TAP ANYWHERE</span>
          </div>
        )}
      </div>
    </div>
  );
}