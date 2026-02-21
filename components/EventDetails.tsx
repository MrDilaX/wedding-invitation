"use client";

const events = [
  {
    time: "4:00 PM",
    title: "The Ceremony",
    desc: "Exchange of vows",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    time: "5:30 PM",
    title: "Cocktail Hour",
    desc: "Drinks and hors d'oeuvres in the garden",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 22h8M12 11v11M5 2l7 9 7-9"/>
      </svg>
    ),
  },
  {
    time: "7:00 PM",
    title: "Dinner",
    desc: "Three-course dinner",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
  },
  {
    time: "9:00 PM",
    title: "First Dance",
    desc: "Couple's first dance",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    ),
  },
  {
    time: "10:00 PM",
    title: "Reception & Dancing",
    desc: "Dance the night away with us",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
];

function AddToCalendarButtons() {
  const title = "Adam & Lorah's Wedding";
  const location = "Beringer Vineyards, 2000 Main St, St Helena, CA 94574";
  const details = "Join us as we celebrate our wedding day!";
  const startDate = "20260831T160000";
  const endDate = "20260831T230000";

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${startDate}\nDTEND:${endDate}\nSUMMARY:${title}\nDESCRIPTION:${details}\nLOCATION:${location}\nEND:VEVENT\nEND:VCALENDAR`;
  const icsUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;

  const btn: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.65rem 1.5rem",
    fontFamily: "'Jost', sans-serif", fontSize: "0.62rem",
    letterSpacing: "0.15em", textTransform: "uppercase",
    textDecoration: "none",
    border: "1px solid rgba(201,168,76,0.35)",
    color: "#C9A84C", backgroundColor: "transparent",
    cursor: "pointer", transition: "all 0.25s", borderRadius: "100px",
  };

  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "3rem" }}>
      <a href={googleUrl} target="_blank" rel="noopener noreferrer" style={btn}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C9A84C"; e.currentTarget.style.color = "#1C2B1E"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C9A84C"; }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/></svg>
        Google Calendar
      </a>
      <a href={icsUrl} download="adam-lorah-wedding.ics" style={btn}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C9A84C"; e.currentTarget.style.color = "#1C2B1E"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C9A84C"; }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z"/></svg>
        Apple / Outlook
      </a>
    </div>
  );
}

export default function EventDetails() {
  return (
    <section id="details" style={{ padding: "5rem 1.5rem", backgroundColor: "#F5EFE6" }}>
      <div style={{ maxWidth: "40rem", margin: "0 auto" }}>

        {/* Header */}
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.75rem" }}>
            Mark Your Calendar
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 3.8rem)", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E", marginBottom: "0.5rem" }}>
            Schedule of Events
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", color: "rgba(28,43,30,0.45)" }}>
            August 31, 2026 · Beringer Vineyards, Napa Valley
          </p>
        </div>

        {/* Timeline */}
        <div className="section-reveal" style={{ position: "relative" }}>

          {/* Vertical connecting line */}
          <div style={{
            position: "absolute",
            left: "36px",
            top: "36px",
            bottom: "36px",
            width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.25) 10%, rgba(201,168,76,0.25) 90%, transparent)",
          }} />

          {/* Events */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {events.map((event, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "1.5rem",
                padding: "1.25rem 0",
              }}>
                {/* Icon circle */}
                <div style={{
                  flexShrink: 0,
                  width: "72px", height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "#FAF6EE",
                  border: "1px solid rgba(201,168,76,0.15)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#C9A84C",
                  position: "relative", zIndex: 1,
                }}>
                  {event.icon}
                </div>

                {/* Content */}
                <div style={{ paddingTop: "0.85rem", flex: 1 }}>
                  {/* Time badge */}
                  <div style={{
                    display: "inline-block",
                    backgroundColor: "#C9A84C",
                    color: "#FAF6EE",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    padding: "0.3rem 0.9rem",
                    borderRadius: "100px",
                    marginBottom: "0.6rem",
                  }}>
                    {event.time}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.7rem", fontWeight: 400,
                    color: "#1C2B1E",
                    lineHeight: 1.1,
                    marginBottom: "0.3rem",
                  }}>
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(28,43,30,0.45)",
                    lineHeight: 1.6,
                  }}>
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add to calendar */}
        <div className="section-reveal">
          <AddToCalendarButtons />
        </div>

      </div>
    </section>
  );
}
