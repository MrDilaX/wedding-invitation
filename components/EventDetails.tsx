"use client";
const events = [
  { time:"9:41 AM", title:"Couple's Arrival", desc:"Exchange of vows", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { time:"5:30 PM", title:"Cocktail Hour", desc:"Drinks and hors d'oeuvres in the garden", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 22h8M12 11v11M5 2l7 9 7-9"/></svg> },
  { time:"7:00 PM", title:"Dinner", desc:"Three-course dinner", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg> },
  { time:"9:00 PM", title:"First Dance", desc:"Couple's first dance", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> },
  { time:"10:00 PM", title:"Reception", desc:"Dance the night away with us", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
];
export default function EventDetails() {
  const googleUrl=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Chanaka & Ganguni's Wedding")}&dates=20260831T160000/20260831T230000&location=${encodeURIComponent("Grand Palace")}`;
  const icsUrl=`data:text/calendar;charset=utf8,${encodeURIComponent("BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20260831T160000\nDTEND:20260831T230000\nSUMMARY:Chanaka & Ganguni's Wedding\nLOCATION:Grand Palace\nEND:VEVENT\nEND:VCALENDAR")}`;
  const btn: React.CSSProperties = { display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.65rem 1.5rem", fontFamily:"'Jost', sans-serif", fontSize:"0.62rem", letterSpacing:"0.15em", textTransform:"uppercase", textDecoration:"none", border:"1px solid var(--border)", color:"var(--accent)", backgroundColor:"transparent", cursor:"pointer", transition:"all 0.25s", borderRadius:"100px" };
  return (
    <section id="details" style={{ padding:"5rem 1.5rem", backgroundColor:"var(--bg)" }}>
      <div style={{ maxWidth:"40rem", margin:"0 auto" }}>
        <div className="section-reveal" style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <p style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.62rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"0.75rem" }}>Mark Your Calendar</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(2.5rem,6vw,3.8rem)", fontWeight:300, fontStyle:"italic", color:"var(--primary)", marginBottom:"0.5rem" }}>Schedule of Events</h2>
          <p style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.78rem", color:"var(--text-muted)" }}>August 31, 2026 · Grand Palace, Hikkaduwa</p>
        </div>
        <div className="section-reveal" style={{ position:"relative" }}>
          <div style={{ position:"absolute", left:"36px", top:"36px", bottom:"36px", width:"1px", background:"linear-gradient(to bottom, transparent, var(--border) 10%, var(--border) 90%, transparent)" }} />
          {events.map((ev,i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"1.5rem", padding:"1.25rem 0" }}>
              <div style={{ flexShrink:0, width:"72px", height:"72px", borderRadius:"50%", backgroundColor:"var(--bg-alt)", border:"1px solid var(--border)", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--accent)", position:"relative", zIndex:1 }}>{ev.icon}</div>
              <div style={{ paddingTop:"0.85rem", flex:1 }}>
                <div style={{ display:"inline-block", backgroundColor:"var(--accent)", color:"var(--bg)", fontFamily:"'Jost', sans-serif", fontSize:"0.72rem", fontWeight:500, padding:"0.3rem 0.9rem", borderRadius:"100px", marginBottom:"0.6rem" }}>{ev.time}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.7rem", fontWeight:400, color:"var(--primary)", lineHeight:1.1, marginBottom:"0.3rem" }}>{ev.title}</h3>
                <p style={{ fontFamily:"'Jost', sans-serif", fontSize:"0.82rem", color:"var(--text-muted)", lineHeight:1.6 }}>{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="section-reveal" style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", justifyContent:"center", marginTop:"3rem" }}>
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" style={btn} onMouseEnter={e=>{e.currentTarget.style.backgroundColor="var(--accent)";e.currentTarget.style.color="var(--bg)";}} onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent";e.currentTarget.style.color="var(--accent)";}}>Google Calendar</a>
          <a href={icsUrl} download="wedding.ics" style={btn} onMouseEnter={e=>{e.currentTarget.style.backgroundColor="var(--accent)";e.currentTarget.style.color="var(--bg)";}} onMouseLeave={e=>{e.currentTarget.style.backgroundColor="transparent";e.currentTarget.style.color="var(--accent)";}}>Apple / Outlook</a>
        </div>
      </div>
    </section>
  );
}
