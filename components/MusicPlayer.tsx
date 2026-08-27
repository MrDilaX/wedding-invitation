"use client";
import { useEffect, useRef, useState } from "react";
interface Props { autoPlay?: boolean; }
export default function MusicPlayer({ autoPlay = false }: Props) {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => { setTimeout(() => setVisible(true), 500); }, []);
  useEffect(() => { if (autoPlay && audioRef.current) { audioRef.current.play().catch(() => {}); setPlaying(true); } }, [autoPlay]);
  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); } else { audioRef.current.play().catch(() => {}); setPlaying(true); }
  };
  return (
    <>
      <audio ref={audioRef} loop><source src="/music.mp3" type="audio/mpeg" /></audio>
      <button onClick={toggle} title={playing ? "Pause" : "Play"} style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 50, width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "var(--accent)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", opacity: visible ? 1 : 0, transition: "opacity 0.5s", padding: 0 }}>
        {playing ? (
          <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "20px" }}>
            {[1,2,3,4,5].map((b) => <div key={b} style={{ width: "3px", backgroundColor: "var(--bg)", borderRadius: "2px", animation: `musicBar ${0.4+b*0.1}s ease-in-out infinite alternate`, height: "12px" }} />)}
          </div>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
    </>
  );
}
