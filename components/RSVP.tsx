"use client";
import { useState } from "react";

type Status = "yes"|"no"|"";
interface Form { name:string; email:string; attending:Status; guests:string; dietary:string; message:string; }

export default function RSVP() {
  const [form, setForm] = useState<Form>({ name:"", email:"", attending:"", guests:"1", dietary:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(p=>({...p,[e.target.name]:e.target.value}));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      await fetch("/api/rsvp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      setSubmitted(true);
    } catch {}
    setLoading(false);
  };

  const inp: React.CSSProperties = { width:"100%", backgroundColor:"transparent", borderBottom:"1px solid var(--border)", outline:"none", padding:"0.75rem 0", color:"var(--primary)", fontFamily:"'Jost',sans-serif", fontSize:"0.85rem" };
  const lbl: React.CSSProperties = { fontFamily:"'Jost',sans-serif", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--text-muted)", display:"block", marginBottom:"0.5rem" };

  if (submitted) return (
    <section id="rsvp" style={{ padding:"6rem 1.5rem", backgroundColor:"var(--bg-alt)", textAlign:"center" }}>
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", fontStyle:"italic", color:"var(--primary)", marginBottom:"1rem" }}>Thank You! 🌸</p>
      <p style={{ fontFamily:"'Jost',sans-serif", color:"var(--text)", fontSize:"0.85rem" }}>Your RSVP has been received. We can't wait to celebrate with you!</p>
    </section>
  );

  return (
    <section id="rsvp" style={{ padding:"5rem 1.5rem", backgroundColor:"var(--bg-alt)" }}>
      <div style={{ maxWidth:"42rem", margin:"0 auto" }}>
        <div className="section-reveal" style={{ textAlign:"center", marginBottom:"3rem" }}>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"0.75rem" }}>Kindly Reply By July 1, 2026</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,6vw,4rem)", fontWeight:300, fontStyle:"italic", color:"var(--primary)" }}>RSVP</h2>
        </div>
        <form onSubmit={handleSubmit} className="section-reveal" style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
            <div><label style={lbl}>Full Name *</label><input name="name" type="text" required value={form.name} onChange={set} placeholder="Your full name" style={inp} /></div>
            <div><label style={lbl}>Email *</label><input name="email" type="email" required value={form.email} onChange={set} placeholder="your@email.com" style={inp} /></div>
          </div>
          <div>
            <label style={lbl}>Will you attend? *</label>
            <div style={{ display:"flex", gap:"1.5rem", marginTop:"0.5rem" }}>
              {[{v:"yes",l:"Joyfully Accepts"},{v:"no",l:"Regretfully Declines"}].map(({v,l})=>(
                <label key={v} style={{ display:"flex", alignItems:"center", gap:"0.5rem", cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:"0.82rem", color:form.attending===v?"var(--accent)":"var(--text)" }}>
                  <input type="radio" name="attending" value={v} required checked={form.attending===v} onChange={set} style={{ accentColor:"var(--accent)" }} />{l}
                </label>
              ))}
            </div>
          </div>
          {form.attending==="yes" && <>
            <div>
              <label style={lbl}>Number of Guests</label>
              <select name="guests" value={form.guests} onChange={set} style={{ ...inp, cursor:"pointer" }}>
                {["1","2","3","4","5"].map(n=><option key={n} value={n}>{n} guest{n!=="1"?"s":""}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Dietary Requirements</label><input name="dietary" type="text" value={form.dietary} onChange={set} placeholder="Vegetarian, allergies, etc." style={inp} /></div>
          </>}
          <div><label style={lbl}>Message for the Couple</label><textarea name="message" rows={3} value={form.message} onChange={set} placeholder="Share your wishes..." style={{ ...inp, resize:"none" }} /></div>
          <button type="submit" disabled={loading} style={{ alignSelf:"flex-start", padding:"0.85rem 3.5rem", backgroundColor:"var(--accent)", color:"white", fontFamily:"'Jost',sans-serif", fontSize:"0.65rem", letterSpacing:"0.3em", textTransform:"uppercase", border:"none", cursor:loading?"not-allowed":"pointer", opacity:loading?0.7:1 }}>
            {loading?"Sending...":"Send RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}
