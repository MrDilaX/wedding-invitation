"use client";
import { useState, useEffect } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  // idle -> opening (animations play) -> fading (transition out)
  const [phase, setPhase] = useState<"idle" | "opening" | "fading">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    
    // Let the letter slide up and hearts float for 3 seconds, then fade out
    setTimeout(() => {
      setPhase("fading");
    }, 3500);

    // After fade is complete, trigger the main invitation
    setTimeout(() => {
      onOpen();
    }, 4500); 
  };

  if (!mounted) return null;

  const isOpen = phase === "opening" || phase === "fading";
  const isFading = phase === "fading";

  return (
    <div 
      onClick={handleOpen}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a1a] transition-opacity duration-1000 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      style={{ cursor: phase === "idle" ? "pointer" : "default" }}
    >
      {/* INLINE STYLES FOR THE HEARTS:
        Replicating the famous sway and float-up keyframes
      */}
      <style>{`
        .heart-1 { animation: floatUp 3s linear forwards, sway 1.5s ease-in-out infinite alternate; animation-delay: 0.5s; opacity: 0; }
        .heart-2 { animation: floatUp 4s linear forwards, sway 2s ease-in-out infinite alternate-reverse; animation-delay: 0.7s; opacity: 0; }
        .heart-3 { animation: floatUp 3.5s linear forwards, sway 1.2s ease-in-out infinite alternate; animation-delay: 0.9s; opacity: 0; }
        
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-400px) scale(0.8); opacity: 0; }
        }
        @keyframes sway {
          0% { margin-left: -30px; }
          100% { margin-left: 30px; }
        }
      `}</style>

      {/* 3D Envelope Container */}
      <div 
        className="relative w-[min(500px,85vw)] h-[min(350px,60vw)]"
        style={{ perspective: "1500px" }}
      >
        
        {/* 1. BACK OF ENVELOPE (Inside wall) */}
        <div className="absolute inset-0 bg-[#d4c7b0] rounded-sm shadow-2xl z-[1]" />

        {/* 2. THE LETTER (Slides up from inside) */}
        <div 
          className="absolute bottom-0 left-[5%] w-[90%] h-[95%] bg-[#fcf9f2] rounded-t-md shadow-inner flex flex-col items-center pt-8 gap-4 z-[3] transition-transform duration-1000 ease-out"
          style={{ 
            transform: isOpen ? "translateY(-45%)" : "translateY(0)",
            transitionDelay: isOpen ? "0.4s" : "0s" // Waits for flap to open
          }}
        >
          {/* Decorative lines to look like a formal letter */}
          <div className="w-1/2 h-2 bg-[#e0d5c1] rounded-full" />
          <div className="w-3/4 h-2 bg-[#e0d5c1] rounded-full" />
          <div className="w-3/4 h-2 bg-[#e0d5c1] rounded-full" />
          <div className="w-16 h-16 mt-4 border border-[#d4c7b0] rounded-full flex items-center justify-center">
            <span className="text-[#a89b82] font-serif italic text-sm">C&G</span>
          </div>
        </div>

        {/* 3. FLOATING HEARTS */}
        <div className="absolute top-[20%] left-0 w-full h-full z-[4] pointer-events-none flex justify-center">
          {isOpen && (
            <>
              <svg className="heart-1 absolute w-10 h-10 text-[#c03535] drop-shadow-md ml-[-40px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <svg className="heart-2 absolute w-8 h-8 text-[#8b1c1c] drop-shadow-md ml-[30px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <svg className="heart-3 absolute w-12 h-12 text-[#e05a5a] drop-shadow-md ml-[-10px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </>
          )}
        </div>

        {/* 4. FRONT POCKET (Sides and Bottom, sits over the letter) */}
        <div 
          className="absolute inset-0 z-[5] pointer-events-none" 
          style={{ clipPath: "polygon(0 0, 0 100%, 51% 51%)", background: "#e0d1b8" }} 
        />
        <div 
          className="absolute inset-0 z-[5] pointer-events-none" 
          style={{ clipPath: "polygon(100% 0, 100% 100%, 49% 51%)", background: "#e0d1b8" }} 
        />
        <div 
          className="absolute inset-0 z-[6] pointer-events-none" 
          style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 49%)", background: "#d4c5ab" }} 
        />

        {/* 5. THE FLAP (Moves behind the letter when opened) */}
        <div 
          className={`absolute top-0 left-0 w-full h-[55%] transition-transform duration-500 ease-in-out pointer-events-none ${
            isOpen ? "z-[2]" : "z-[10]" // Magic trick: Drops to the back once opened
          }`}
          style={{ 
            transformOrigin: "top", 
            transform: isOpen ? "rotateX(-180deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Outside of the flap */}
          <div 
            className="absolute inset-0 bg-[#e8d8c0]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backfaceVisibility: "hidden"
            }} 
          >
            {/* Wax Seal */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#c03535] to-[#651010] rounded-full shadow-lg flex items-center justify-center border border-[#ffc8a0]/20 pointer-events-auto">
                <span className="text-xs text-[#f5eddb]/90 font-serif italic tracking-widest">C.G</span>
            </div>
          </div>

          {/* Inside of the flap */}
          <div 
            className="absolute inset-0 bg-[#c4b59d]" 
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: "rotateX(-180deg)", 
              backfaceVisibility: "hidden"
            }} 
          />
        </div>

        {/* TAP INSTRUCTION */}
        {phase === "idle" && (
          <div className="absolute -bottom-16 left-0 w-full flex flex-col items-center gap-2 animate-pulse pointer-events-none">
            <span className="text-[#f5eddb]/60 font-serif italic tracking-widest text-lg">Tap anywhere to open</span>
          </div>
        )}
      </div>
    </div>
  );
}