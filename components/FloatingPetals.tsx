"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  duration: string;
  delay: string;
  size: number;
  opacity: number;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${8 + Math.random() * 12}s`,
      delay: `${Math.random() * 10}s`,
      size: 10 + Math.random() * 14,
      opacity: 0.25 + Math.random() * 0.4,
    }));
    setPetals(generated);
  }, []);

  return (
    <>
      <style>{`
        @keyframes petalFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {petals.map((petal) => (
          <div
            key={petal.id}
            style={{
              position: "absolute",
              left: petal.left,
              top: "-20px",
              opacity: petal.opacity,
              animation: `petalFall ${petal.duration} ${petal.delay} linear infinite`,
            }}
          >
            <svg width={petal.size} height={petal.size} viewBox="0 0 10 14" fill="none">
              <path d="M5,1 Q10,4 8,9 Q5,13 2,9 Q0,4 5,1 Z" fill="#E8C4B0" stroke="#C4738A" strokeWidth="0.3" />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
