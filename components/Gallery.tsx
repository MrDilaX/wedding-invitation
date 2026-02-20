"use client";

import { useState } from "react";

// Placeholder gallery using gradient boxes with couple initials
const photos = [
  { id: 1, caption: "San Francisco, 2019", aspect: "aspect-square", col: "md:col-span-1" },
  { id: 2, caption: "Lake Tahoe Getaway", aspect: "aspect-[3/4]", col: "md:col-span-1" },
  { id: 3, caption: "Napa Valley, 2022", aspect: "aspect-[4/3]", col: "md:col-span-2" },
  { id: 4, caption: "Half Moon Bay", aspect: "aspect-[4/3]", col: "md:col-span-2" },
  { id: 5, caption: "The Proposal", aspect: "aspect-square", col: "md:col-span-1" },
  { id: 6, caption: "Engagement Session", aspect: "aspect-[3/4]", col: "md:col-span-1" },
];

const gradients = [
  "from-sage/30 to-blush/30",
  "from-blush/30 to-warm-gold/20",
  "from-dark-green/10 to-sage/20",
  "from-warm-gold/20 to-blush/20",
  "from-sage/20 to-dark-green/10",
  "from-blush/40 to-sage/20",
];

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-28 px-6 bg-dark-green">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 section-reveal">
          <p
            className="text-xs tracking-[0.4em] uppercase text-warm-gold mb-4"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            A Glimpse of Us
          </p>
          <h2
            className="text-6xl md:text-7xl font-light italic text-cream"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`relative overflow-hidden cursor-pointer group section-reveal ${photo.aspect}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Placeholder image with gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} transition-transform duration-700 group-hover:scale-105`}
                style={{ backgroundColor: "#2A3D2C" }}
              >
                {/* Decorative initials */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-4xl font-light italic text-cream/10"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    A & L
                  </span>
                </div>
                {/* Botanical corner */}
                <div className="absolute top-2 right-2 opacity-20">
                  <svg viewBox="0 0 30 40" className="w-8 h-8" fill="none">
                    <path d="M15,38 Q18,25 25,15 Q30,5 20,2" stroke="#C9A84C" strokeWidth="1" />
                    <path d="M20,20 Q28,15 30,8" stroke="#7C9A7E" strokeWidth="1" />
                    <path d="M18,28 Q10,22 5,18" stroke="#7C9A7E" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className={`absolute inset-0 bg-dark-green/60 flex items-end p-4 transition-opacity duration-300 ${
                  hoveredId === photo.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <p
                  className="text-xs tracking-[0.2em] uppercase text-cream/80"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-8 text-sm italic text-cream/30"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          * Replace these placeholders with your actual photos in the /public folder
        </p>
      </div>
    </section>
  );
}
