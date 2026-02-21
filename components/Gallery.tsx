"use client";

import { useState } from "react";

const photos = [
  { id: 1, caption: "C & G " , src: "/photos/photo1.webp" },
  { id: 2, caption: "C & G " , src: "/photos/photo2.webp" },
  { id: 3, caption: "C & G " , src: "/photos/photo3.webp" },
  { id: 4, caption: "C & G " , src: "/photos/photo4.webp" },
  { id: 5, caption: "C & G " , src: "/photos/photo5.webp" },
  { id: 6, caption: "C & G " , src: "/photos/photo6.webp" },
];

const gradients = [
  "linear-gradient(135deg, rgba(124,154,126,0.4), rgba(232,196,176,0.4))",
  "linear-gradient(135deg, rgba(232,196,176,0.5), rgba(196,115,138,0.3))",
  "linear-gradient(135deg, rgba(125,46,70,0.2), rgba(124,154,126,0.3))",
  "linear-gradient(135deg, rgba(196,115,138,0.3), rgba(232,196,176,0.3))",
  "linear-gradient(135deg, rgba(124,154,126,0.3), rgba(125,46,70,0.2))",
  "linear-gradient(135deg, rgba(232,196,176,0.5), rgba(124,154,126,0.3))",
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);

  const navigate = (dir: 1 | -1) => {
    if (lightbox === null) return;
    const idx = photos.findIndex((p) => p.id === lightbox);
    const next = (idx + dir + photos.length) % photos.length;
    setLightbox(photos[next].id);
  };

  const current = photos.find((p) => p.id === lightbox);

  return (
    <>
      <section id="gallery" style={{ padding: "5rem 1.5rem", backgroundColor: "#7D2E46" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div className="section-reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C4738A", marginBottom: "0.75rem" }}>
              A Glimpse of Us
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#FDF0F3" }}>
              Gallery
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="section-reveal"
                onClick={() => openLightbox(photo.id)}
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: "relative", overflow: "hidden", cursor: "pointer",
                  aspectRatio: i === 2 || i === 3 ? "16/9" : i % 3 === 1 ? "3/4" : "1/1",
                  gridColumn: i === 2 || i === 3 ? "span 2" : "span 1",
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  background: gradients[i],
                  backgroundColor: "#F5E0E8",
                  transition: "transform 0.6s ease",
                  transform: hoveredId === photo.id ? "scale(1.06)" : "scale(1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {/* Placeholder — replace with <img> when you have real photos */}
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontStyle: "italic", color: "rgba(248,243,236,0.08)" }}>C & G</span>
                </div>

                {/* Hover overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundColor: "rgba(125,46,70,0.6)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  opacity: hoveredId === photo.id ? 1 : 0,
                  transition: "opacity 0.3s",
                }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(196,115,138,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4738A" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                    </svg>
                  </div>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(248,243,236,0.8)" }}>
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(248,243,236,0.2)", fontSize: "0.85rem" }}>
            * Add your photos to /public/photos/ folder
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            backgroundColor: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeInPage 0.2s ease",
          }}
        >
          {/* Close */}
          <button onClick={closeLightbox} style={{
            position: "absolute", top: "1.5rem", right: "1.5rem",
            background: "none", border: "1px solid rgba(196,115,138,0.4)",
            color: "#C4738A", fontSize: "1.2rem", cursor: "pointer",
            width: "40px", height: "40px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>

          {/* Prev */}
          <button onClick={(e) => { e.stopPropagation(); navigate(-1); }} style={{
            position: "absolute", left: "1rem",
            background: "none", border: "1px solid rgba(196,115,138,0.3)",
            color: "#C4738A", cursor: "pointer",
            width: "44px", height: "44px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
          }}>‹</button>

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "80vw", maxHeight: "80vh", textAlign: "center" }}>
            <div style={{
              width: "min(600px, 80vw)", height: "min(420px, 60vh)",
              background: gradients[photos.findIndex(p => p.id === lightbox)],
              backgroundColor: "#F5E0E8",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "4px",
              border: "1px solid rgba(196,115,138,0.2)",
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontStyle: "italic", color: "rgba(248,243,236,0.15)" }}>C & G</span>
            </div>
            <p style={{ marginTop: "1rem", fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(248,243,236,0.5)" }}>
              {current?.caption}
            </p>
          </div>

          {/* Next */}
          <button onClick={(e) => { e.stopPropagation(); navigate(1); }} style={{
            position: "absolute", right: "1rem",
            background: "none", border: "1px solid rgba(196,115,138,0.3)",
            color: "#C4738A", cursor: "pointer",
            width: "44px", height: "44px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
          }}>›</button>
        </div>
      )}
    </>
  );
}
