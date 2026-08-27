"use client";
import { useState, useEffect } from "react";

const photos = [
  { src:"/photos/photo1.jpg", caption:"C & G" },
  { src:"/photos/photo2.jpg", caption:"C & G" },
  { src:"/photos/photo3.jpg", caption:"C & G" },
  { src:"/photos/photo4.jpg", caption:"C & G" },
  { src:"/photos/photo5.jpg", caption:"C & G" },
  { src:"/photos/photo6.jpg", caption:"C & G" },
];

const spans = ["span 1","span 1","span 2","span 2","span 1","span 1"];
const ratios = ["1/1","3/4","16/9","16/9","1/1","3/4"];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number|null>(null);
  const [hovered, setHovered] = useState<number|null>(null);
  const [errors, setErrors] = useState<Record<number,boolean>>({});

  const nav = (d: 1|-1) => setLightbox(l => l===null ? null : (l+d+photos.length)%photos.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox===null) return;
      if (e.key==="ArrowLeft") nav(-1);
      if (e.key==="ArrowRight") nav(1);
      if (e.key==="Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <section id="gallery" style={{ padding:"5rem 1.5rem", backgroundColor:"var(--bg-alt)" }}>
        <div style={{ maxWidth:"64rem", margin:"0 auto" }}>
          <div className="section-reveal" style={{ textAlign:"center", marginBottom:"3rem" }}>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"0.75rem" }}>A Glimpse of Us</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,6vw,4rem)", fontWeight:300, fontStyle:"italic", color:"var(--primary)" }}>Gallery</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.5rem" }}>
            {photos.map((p,i) => (
              <div key={i} onClick={()=>setLightbox(i)} onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}
                style={{ position:"relative", overflow:"hidden", cursor:"pointer", aspectRatio:ratios[i], gridColumn:spans[i] }}>
                {errors[i] ? (
                  <div style={{ position:"absolute", inset:0, backgroundColor:"var(--bg-alt)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ color:"var(--text-muted)", fontSize:"0.75rem" }}>No photo</span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.src} alt={p.caption} onError={()=>setErrors(prev=>({...prev,[i]:true}))}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s ease", transform:hovered===i?"scale(1.06)":"scale(1)" }} />
                )}
                <div style={{ position:"absolute", inset:0, backgroundColor:"rgba(0,0,0,0.38)", opacity:hovered===i?1:0, transition:"opacity 0.3s", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"white" }}>{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div style={{ position:"fixed", inset:0, zIndex:200, backgroundColor:"rgba(0,0,0,0.95)", display:"flex", alignItems:"center", justifyContent:"center" }} onClick={()=>setLightbox(null)}>
          <button onClick={()=>setLightbox(null)} style={{ position:"absolute", top:"1.5rem", right:"1.5rem", background:"none", border:"1px solid rgba(255,255,255,0.2)", color:"white", width:"40px", height:"40px", borderRadius:"50%", cursor:"pointer", fontSize:"1rem" }}>✕</button>
          <button onClick={e=>{e.stopPropagation();nav(-1);}} style={{ position:"absolute", left:"1rem", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.15)", color:"white", width:"48px", height:"48px", borderRadius:"50%", cursor:"pointer", fontSize:"1.5rem", display:"flex", alignItems:"center", justifyContent:"center" }}>‹</button>
          <div onClick={e=>e.stopPropagation()} style={{ maxWidth:"80vw", maxHeight:"80vh", textAlign:"center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[lightbox].src} alt={photos[lightbox].caption} style={{ maxWidth:"80vw", maxHeight:"72vh", objectFit:"contain" }} />
            <p style={{ marginTop:"1rem", fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", letterSpacing:"0.2em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase" }}>{photos[lightbox].caption} · {lightbox+1}/{photos.length}</p>
          </div>
          <button onClick={e=>{e.stopPropagation();nav(1);}} style={{ position:"absolute", right:"1rem", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.15)", color:"white", width:"48px", height:"48px", borderRadius:"50%", cursor:"pointer", fontSize:"1.5rem", display:"flex", alignItems:"center", justifyContent:"center" }}>›</button>
        </div>
      )}
    </>
  );
}
