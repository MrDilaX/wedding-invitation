"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 2000);
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const bars = [1, 2, 3, 4, 5];

  return (
    <>
      {/* Replace src with your actual music file in /public */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div
        onClick={toggle}
        style={{
          position: "fixed", bottom: "2rem", right: "2rem",
          zIndex: 50,
          width: "52px", height: "52px",
          borderRadius: "50%",
          backgroundColor: "#1C2B1E",
          border: "1px solid rgba(201,168,76,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s, transform 0.2s",
          transform: visible ? "scale(1)" : "scale(0.8)",
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = "#C9A84C"}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          /* Animated bars */
          <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "20px" }}>
            {bars.map((b) => (
              <div key={b} style={{
                width: "3px",
                height: `${8 + Math.random() * 12}px`,
                backgroundColor: "#C9A84C",
                borderRadius: "2px",
                animation: `pulse ${0.5 + b * 0.15}s ease-in-out infinite alternate`,
              }} />
            ))}
          </div>
        ) : (
          /* Play icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#C9A84C">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </div>
    </>
  );
}
