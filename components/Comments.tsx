"use client";
import { useState, useEffect } from "react";
interface Comment { id: string; name: string; message: string; timestamp: number; }
export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState(""); const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); const [loading, setLoading] = useState(false); const [fetching, setFetching] = useState(true);
  useEffect(() => { fetch("/api/comments").then(r=>r.json()).then(d=>setComments(Array.isArray(d)?d:[])).catch(()=>setComments([])).finally(()=>setFetching(false)); }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!name.trim()||!message.trim()) return; setLoading(true);
    try { const res = await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,message})}); const c=await res.json(); if(res.ok){setComments(p=>[c,...p]);setName("");setMessage("");setSubmitted(true);setTimeout(()=>setSubmitted(false),3000);} } catch {}
    setLoading(false);
  };
  const fmt = (ts: number) => new Date(ts).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  const input: React.CSSProperties = { width:"100%", backgroundColor:"transparent", borderBottom:"1px solid var(--border)", outline:"none", padding:"0.75rem 0", color:"var(--primary)", fontFamily:"'Jost', sans-serif", fontSize:"0.85rem" };
  return (
    <section style={{ id="comments", padding:"5rem 1.5rem", backgroundColor:"var(--bg)" }}>
      <div style={{ maxWidth:"48rem", margin:"0 auto" }}>
        <div className="section-reveal" style={{ textAlign:"center", marginBottom:"3rem" }}>
          <p style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.65rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"0.75rem" }}>Leave Your Wishes</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(2.5rem,6vw,4rem)", fontWeight:300, fontStyle:"italic", color:"var(--primary)" }}>Messages & Wishes</h2>
        </div>
        <form onSubmit={handleSubmit} className="section-reveal" style={{ marginBottom:"3rem", display:"flex", flexDirection:"column", gap:"1.5rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
            <div>
              <label style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--text-muted)", display:"block", marginBottom:"0.5rem" }}>Your Name *</label>
              <input type="text" required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={input} />
            </div>
            <div style={{ display:"flex", alignItems:"flex-end" }}>
              {submitted && <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", color:"var(--accent)", fontSize:"1rem" }}>✦ Thank you for your wishes!</p>}
            </div>
          </div>
          <div>
            <label style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--text-muted)", display:"block", marginBottom:"0.5rem" }}>Your Message *</label>
            <textarea rows={3} required value={message} onChange={e=>setMessage(e.target.value)} placeholder="Share your wishes for the couple..." style={{...input,resize:"none"}} />
          </div>
          <button type="submit" disabled={loading} style={{ alignSelf:"flex-start", padding:"0.75rem 3rem", backgroundColor:"var(--accent)", color:"var(--bg)", fontFamily:"'Jost', sans-serif", fontSize:"0.65rem", letterSpacing:"0.3em", textTransform:"uppercase", border:"none", cursor:loading?"not-allowed":"pointer", opacity:loading?0.7:1, borderRadius:"2px" }}>
            {loading?"Posting...":"Post Wish"}
          </button>
        </form>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {fetching ? <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", color:"var(--text-muted)", textAlign:"center" }}>Loading wishes...</p>
          : comments.length===0 ? <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", color:"var(--text-muted)", textAlign:"center", fontSize:"1.1rem" }}>Be the first to leave a wish! 🌸</p>
          : comments.map(c=>(
            <div key={c.id} style={{ padding:"1.25rem 1.5rem", backgroundColor:"var(--bg-alt)", border:"1px solid var(--border)", borderLeft:"3px solid var(--accent)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.5rem" }}>
                <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.1rem", fontStyle:"italic", color:"var(--primary)" }}>{c.name}</span>
                <span style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.65rem", color:"var(--text-muted)" }}>{fmt(c.timestamp)}</span>
              </div>
              <p style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.85rem", color:"var(--text)", lineHeight:1.7 }}>{c.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
