"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #F8F3EC 0%, #EEE5D8 40%, #E8D9C8 100%)",
      }}
    >
      {/* Decorative botanical SVG top */}
      <div className="absolute top-0 left-0 w-64 opacity-20 pointer-events-none">
        <BotanicalLeft />
      </div>
      <div className="absolute top-0 right-0 w-64 opacity-20 pointer-events-none scale-x-[-1]">
        <BotanicalLeft />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Small label */}
        <p
          className={`text-xs tracking-[0.4em] uppercase text-warm-gold mb-8 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "'Jost', sans-serif", transitionDelay: "0.2s" }}
        >
          Together with their families
        </p>

        {/* Names */}
        <h1
          className={`text-8xl md:text-[10rem] lg:text-[12rem] font-light leading-none text-dark-green transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "-0.02em",
            transitionDelay: "0.4s",
          }}
        >
          Chanuka
        </h1>

        {/* Ampersand with flourish */}
        <div
          className={`flex items-center gap-6 my-2 w-full max-w-md transition-all duration-1000 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-warm-gold" />
          <span
            className="text-5xl text-warm-gold italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            &amp;
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-warm-gold" />
        </div>

        <h1
          className={`text-8xl md:text-[10rem] lg:text-[12rem] font-light leading-none text-dark-green transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "-0.02em",
            transitionDelay: "0.8s",
          }}
        >
          Ganguni
        </h1>

        {/* Date */}
        <p
          className={`mt-10 text-lg tracking-[0.3em] uppercase text-dark-green/60 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "'Jost', sans-serif", transitionDelay: "1s" }}
        >
          August 31, 2026
        </p>

        <p
          className={`mt-2 text-sm tracking-widest uppercase text-sage transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "'Jost', sans-serif", transitionDelay: "1.1s" }}
        >
          The Grand Palace, Hikkaduwa
        </p>

        {/* Scroll cue */}
        <div
          className={`mt-20 flex flex-col items-center gap-2 transition-all duration-1000 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1.4s" }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase text-dark-green/40"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-dark-green/40 to-transparent animate-bounce" />
        </div>
      </div>

      {/* Bottom botanical */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between pointer-events-none">
        <div className="w-48 opacity-15 rotate-180">
          <BotanicalLeft />
        </div>
        <div className="w-48 opacity-15 rotate-180 scale-x-[-1]">
          <BotanicalLeft />
        </div>
      </div>
    </section>
  );
}

function BotanicalLeft() {
  return (
    <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,280 Q40,200 80,150 Q120,100 100,20" stroke="#7C9A7E" strokeWidth="1.5" fill="none" />
      <path d="M80,150 Q50,130 20,100" stroke="#7C9A7E" strokeWidth="1" fill="none" />
      <ellipse cx="18" cy="96" rx="20" ry="12" transform="rotate(-30 18 96)" fill="#7C9A7E" opacity="0.5" />
      <path d="M80,150 Q110,120 140,80" stroke="#7C9A7E" strokeWidth="1" fill="none" />
      <ellipse cx="143" cy="76" rx="20" ry="12" transform="rotate(30 143 76)" fill="#7C9A7E" opacity="0.5" />
      <path d="M60,200 Q30,180 10,160" stroke="#7C9A7E" strokeWidth="1" fill="none" />
      <ellipse cx="8" cy="157" rx="18" ry="10" transform="rotate(-20 8 157)" fill="#7C9A7E" opacity="0.4" />
      <path d="M70,180 Q100,160 120,130" stroke="#7C9A7E" strokeWidth="1" fill="none" />
      <ellipse cx="122" cy="127" rx="16" ry="9" transform="rotate(25 122 127)" fill="#7C9A7E" opacity="0.4" />
      <circle cx="100" cy="18" r="8" fill="#C9A84C" opacity="0.6" />
      <circle cx="96" cy="10" r="4" fill="#C9A84C" opacity="0.4" />
      <circle cx="104" cy="12" r="3" fill="#E8C4B0" opacity="0.6" />
    </svg>
  );
}
