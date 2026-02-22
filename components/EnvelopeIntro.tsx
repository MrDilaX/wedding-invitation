"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  // idle -> opening (flap flips) -> fading (envelope hides) -> done (unmounts)
  const [phase, setPhase] = useState<"idle" | "opening" | "fading" | "done">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    
    // Step 1: Flap finishes opening, start fading out everything
    setTimeout(() => {
      setPhase("fading");
    }, 800); // Wait for flap animation (0.8s)

    // Step 2: Fade out complete, unmount and trigger the actual invite
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 1500); // 0.8s open + 0.7s fade
  };

  if (phase === "done") return null;

  const isOpen = phase === "opening" || phase === "fading";
  const isHidden = phase === "fading";

  return (
    <div 
      onClick={handleOpen}
      className="fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-700 bg-[#1a1a1a]"
      style={{ 
        cursor: phase === "idle" ? "pointer" : "default",
        opacity: isHidden ? 0 : 1, // Fades out the entire screen before onOpen
        transition: "opacity 0.7s ease-in-out" 
      }}
    >
      {/* 3D Container */}
      <div 
        className="relative w-[min(600px,90vw)] h-[min(400px,60vw)] transition-all duration-1000 ease-out"
        style={{ 
          perspective: "1500px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(0.95)"
        }}
      >
        
        {/* 1. BACK BOX (The inside of the envelope) */}
        <div className="absolute inset-0 bg-[#d4c7b0] rounded-sm shadow-2xl" />

        {/* 2. SIDE & BOTTOM TRIANGLES (The front pocket) 
            Slightly larger than 50% to prevent tiny gaps in the middle */}
        <div 
          className="absolute inset-0 z-[5]" 
          style={{ clipPath: "polygon(0 0, 0 100%, 51% 51%)", background: "#e0d1b8" }} 
        />
        <div 
          className="absolute inset-0 z-[5]" 
          style={{ clipPath: "polygon(100% 0, 100% 100%, 49% 51%)", background: "#e0d1b8" }} 
        />
        <div 
          className="absolute inset-0 z-[6]" 
          style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 49%)", background: "#d4c5ab" }} 
        />

        {/* 3. THE FLAP */}
        <div 
          className="absolute top-0 left-0 w-full h-[55%] z-[10] transition-transform duration-700 ease-in-out"
          style={{ 
            transformOrigin: "top", 
            // -180deg ensures it swings UP and AWAY from the front, instead of into the envelope
            transform: isOpen ? "rotateX(-180deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Front of Flap (Visible when closed) */}
          <div 
            className="absolute inset-0 bg-[#e8d8c0]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backfaceVisibility: "hidden"
            }} 
          >
            {/* Wax Seal */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#c03535] to-[#651010] rounded-full shadow-lg flex items-center justify-center border border-[#ffc8a0]/20">
                <span className="text-sm text-[#f5eddb]/90 font-serif italic tracking-widest">C.G</span>
            </div>
          </div>

          {/* Back of Flap (Visible when open) */}
          <div 
            className="absolute inset-0 bg-[#c4b59d]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              // Rotated so it faces the right way when the parent flips
              transform: "rotateX(-180deg)", 
              backfaceVisibility: "hidden"
            }} 
          />
        </div>

        {/* 4. TAP INDICATOR */}
        {phase === "idle" && mounted && (
          <div className="absolute -bottom-16 left-0 w-full flex flex-col items-center gap-2 animate-pulse">
            <span className="text-[#f5eddb]/60 font-serif italic tracking-widest text-lg">Tap anywhere to open</span>
          </div>
        )}
      </div>
    </div>
  );
}