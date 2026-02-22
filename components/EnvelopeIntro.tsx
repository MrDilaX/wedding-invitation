"use client";

import { useState } from "react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [opened, setOpened] = useState(false);
  const [done, setDone] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      setDone(true);
      onOpen();
    }, 1800);
  };

  if (done) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        backgroundColor: "#1C2B1E",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        animation: opened ? "fadeOut 0.5s ease 1.6s forwards" : "none",
        cursor: opened ? "default" : "pointer",
      }}
      onClick={handleOpen}
    >
      {/* Stars background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            borderRadius: "50%",
            backgroundColor: "#C9A84C",
            opacity: 0.2 + Math.random() * 0.5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }} />
        ))}
      </div>

      {/* Envelope */}
      <div style={{ position: "relative", width: "280px", height: "200px", perspective: "1000px" }}>
        {/* Envelope body */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "#F8F3EC",
          borderRadius: "4px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}>
          {/* Bottom triangle fold lines */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "100%",
            background: "linear-gradient(135deg, #EDE4D6 50%, transparent 50%)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "100%",
            background: "linear-gradient(225deg, #EDE4D6 50%, transparent 50%)",
          }} />
          {/* Center seal */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40px", height: "40px",
            borderRadius: "50%",
            backgroundColor: "#C9A84C",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", color: "#F8F3EC",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            zIndex: 2,
          }}>
            A&L
          </div>
        </div>

        {/* Envelope flap */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "50%",
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          animation: opened ? "envelopeOpen 0.8s ease 0.2s forwards" : "none",
          zIndex: 3,
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, #EDE4D6 0%, #F8F3EC 100%)",
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            borderRadius: "4px 4px 0 0",
          }} />
        </div>

        {/* Letter rising */}
        {opened && (
          <div style={{
            position: "absolute", left: "10%", right: "10%",
            bottom: "10px", height: "80%",
            backgroundColor: "#F8F3EC",
            borderRadius: "2px",
            animation: "letterRise 0.8s ease 0.8s forwards",
            opacity: 0,
            zIndex: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: "4px",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
          }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", color: "#1C2B1E" }}>
              Adam & Lorah
            </span>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#C9A84C" }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(28,43,30,0.5)" }}>
              Wedding Invitation
            </span>
          </div>
        )}
      </div>

      {/* Click prompt */}
      {!opened && (
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem", fontStyle: "italic",
            color: "rgba(248,243,236,0.7)",
            marginBottom: "0.5rem",
          }}>
            You are cordially invited
          </p>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.65rem", letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A84C",
            animation: "pulse 2s ease infinite",
          }}>
            Tap to open
          </p>
        </div>
      )}
    </div>
  );
}