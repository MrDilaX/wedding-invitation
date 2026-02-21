"use client";
import { useState, useEffect } from "react";

interface RSVP {
  id: string; name: string; email: string; attending: string;
  guests: number; dietary: string; message: string; created_at: number;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all"|"yes"|"no">("all");

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "dilaxisthebest" && password === "7878") {
      setAuthed(true); setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch("/api/rsvp").then(r=>r.json()).then(setRsvps).catch(()=>{}).finally(()=>setLoading(false));
  }, [authed]);

  const filtered = filter === "all" ? rsvps : rsvps.filter(r => r.attending === filter);
  const yes = rsvps.filter(r => r.attending === "yes");
  const totalGuests = yes.reduce((s, r) => s + (r.guests || 1), 0);
  const fmt = (ts: number) => new Date(ts).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });

  const th: React.CSSProperties = { padding:"0.75rem 1rem", textAlign:"left", fontSize:"0.6rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--text-muted)", whiteSpace:"nowrap" as const, borderBottom:"2px solid var(--border)" };
  const td: React.CSSProperties = { padding:"0.8rem 1rem", fontSize:"0.82rem", color:"var(--text)", borderBottom:"1px solid var(--border)" };

  if (!authed) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"var(--bg)" }}>
      <div style={{ width:"100%", maxWidth:"360px", padding:"2.5rem", backgroundColor:"white", boxShadow:"0 8px 40px rgba(0,0,0,0.1)", borderTop:"3px solid var(--accent)" }}>
        <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"2rem", fontStyle:"italic", color:"var(--primary)", marginBottom:"0.25rem" }}>Admin</h1>
        <p style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.7rem", color:"var(--text-muted)", letterSpacing:"0.1em", marginBottom:"2rem" }}>RSVP Dashboard</p>
        <form onSubmit={login} style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
          {[{label:"Username",type:"text",val:username,set:setUsername},{label:"Password",type:"password",val:password,set:setPassword}].map(f=>(
            <div key={f.label}>
              <label style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--text-muted)", display:"block", marginBottom:"0.4rem" }}>{f.label}</label>
              <input type={f.type} required value={f.val} onChange={e=>f.set(e.target.value)} style={{ width:"100%", padding:"0.6rem 0", borderBottom:"1px solid var(--border)", outline:"none", fontSize:"0.9rem", color:"var(--primary)", backgroundColor:"transparent" }} />
            </div>
          ))}
          {error && <p style={{ color:"#c62828", fontSize:"0.8rem" }}>{error}</p>}
          <button type="submit" style={{ padding:"0.75rem", backgroundColor:"var(--accent)", color:"white", border:"none", cursor:"pointer", fontFamily:"'Jost', sans-serif", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase" }}>Sign In</button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#f4f4f5", fontFamily:"'Jost', sans-serif" }}>
      {/* Header */}
      <div style={{ backgroundColor:"var(--bg-dark)", padding:"1.25rem 2rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.6rem", fontStyle:"italic", color:"white", lineHeight:1 }}>Chanaka & Ganguni</h1>
          <p style={{ fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginTop:"0.2rem" }}>RSVP Dashboard</p>
        </div>
        <button onClick={()=>setAuthed(false)} style={{ background:"none", border:"1px solid rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.5)", padding:"0.4rem 1rem", cursor:"pointer", fontSize:"0.65rem", letterSpacing:"0.1em" }}>Sign Out</button>
      </div>

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"2rem 1.5rem" }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", marginBottom:"2rem" }}>
          {[
            { label:"Total RSVPs", value:rsvps.length, color:"var(--primary)" },
            { label:"Attending", value:yes.length, color:"#2e7d32" },
            { label:"Not Attending", value:rsvps.length-yes.length, color:"#c62828" },
            { label:"Total Guests", value:totalGuests, color:"var(--accent)" },
          ].map(s=>(
            <div key={s.label} style={{ backgroundColor:"white", padding:"1.25rem", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", borderTop:`3px solid ${s.color}` }}>
              <p style={{ fontSize:"0.6rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"#888", marginBottom:"0.5rem" }}>{s.label}</p>
              <p style={{ fontSize:"2rem", fontFamily:"'Cormorant Garamond', serif", color:s.color, lineHeight:1 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1rem" }}>
          {(["all","yes","no"] as const).map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{ padding:"0.4rem 1.1rem", fontSize:"0.65rem", letterSpacing:"0.1em", textTransform:"uppercase", border:"1px solid var(--border)", cursor:"pointer", backgroundColor:filter===f?"var(--accent)":"white", color:filter===f?"white":"#888", transition:"all 0.2s" }}>
              {f==="all"?"All RSVPs":f==="yes"?"✓ Attending":"✗ Not Attending"}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ backgroundColor:"white", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", overflowX:"auto" }}>
          {loading ? (
            <p style={{ padding:"3rem", textAlign:"center", color:"#aaa" }}>Loading...</p>
          ) : filtered.length === 0 ? (
            <p style={{ padding:"3rem", textAlign:"center", color:"#aaa" }}>No RSVPs yet.</p>
          ) : (
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>
                {["Name","Email","Attending","Guests","Dietary","Message","Date"].map(h=><th key={h} style={th}>{h}</th>)}
              </tr></thead>
              <tbody>
                {filtered.map((r,i)=>(
                  <tr key={r.id} style={{ backgroundColor:i%2===0?"white":"#fafafa" }}>
                    <td style={{ ...td, fontWeight:600, color:"var(--primary)", whiteSpace:"nowrap" as const }}>{r.name}</td>
                    <td style={td}>{r.email}</td>
                    <td style={td}>
                      <span style={{ padding:"0.2rem 0.65rem", borderRadius:"100px", fontSize:"0.65rem", fontWeight:600, backgroundColor:r.attending==="yes"?"#e8f5e9":"#ffebee", color:r.attending==="yes"?"#2e7d32":"#c62828" }}>
                        {r.attending==="yes"?"✓ Yes":"✗ No"}
                      </span>
                    </td>
                    <td style={{ ...td, textAlign:"center" as const }}>{r.attending==="yes"?r.guests:"—"}</td>
                    <td style={{ ...td, maxWidth:"150px", overflow:"hidden" as const, textOverflow:"ellipsis" as const, whiteSpace:"nowrap" as const }}>{r.dietary||"—"}</td>
                    <td style={{ ...td, maxWidth:"200px", overflow:"hidden" as const, textOverflow:"ellipsis" as const, whiteSpace:"nowrap" as const }}>{r.message||"—"}</td>
                    <td style={{ ...td, color:"#aaa", fontSize:"0.75rem", whiteSpace:"nowrap" as const }}>{fmt(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
