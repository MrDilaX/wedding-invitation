"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
  opacity: number;
  shape: number;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: `${10 + Math.random() * 16}px`,
      opacity: 0.3 + Math.random() * 0.4,
      shape: Math.floor(Math.random() * 3),
    }));
    setPetals(generated);
  }, []);

  const petalShapes = [
    // Oval petal
    "M 0,10 Q 5,0 10,10 Q 5,20 0,10 Z",
    // Round petal
    "M 5,0 Q 12,5 10,12 Q 5,16 0,12 Q -2,5 5,0 Z",
    // Leaf-like
    "M 5,1 Q 11,4 9,11 Q 5,15 1,11 Q -1,4 5,1 Z",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute petal"
          style={{
            left: petal.left,
            top: "-20px",
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 10 16"
            fill="none"
          >
            <path
              d={petalShapes[petal.shape]}
              fill="#E8C4B0"
              stroke="#C9A84C"
              strokeWidth="0.3"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
