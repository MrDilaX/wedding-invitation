"use client";

const events = [
  {
    type: "Ceremony",
    time: "4:00 PM",
    venue: "Beringer Vineyards",
    address: "2000 Main St, St Helena, CA 94574",
    note: "Outdoor ceremony among the vines. Garden attire requested.",
  },
  {
    type: "Cocktail Hour",
    time: "5:30 PM",
    venue: "Beringer Estate Gardens",
    address: "2000 Main St, St Helena, CA 94574",
    note: "Join us in the gardens for drinks, small bites, and light music.",
  },
  {
    type: "Reception & Dinner",
    time: "7:00 PM",
    venue: "Beringer Rhine House",
    address: "2000 Main St, St Helena, CA 94574",
    note: "Dinner, dancing, and toasts in the historic Rhine House. Black tie optional.",
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

  const btnStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.6rem 1.25rem",
    fontFamily: "'Jost', sans-serif", fontSize: "0.65rem",
    letterSpacing: "0.15em", textTransform: "uppercase",
    textDecoration: "none", border: "1px solid rgba(201,168,76,0.4)",
    color: "#C9A84C", backgroundColor: "transparent",
    cursor: "pointer", transition: "all 0.3s", borderRadius: "2px",
  };

  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2.5rem" }}>
      <a
        href={googleUrl} target="_blank" rel="noopener noreferrer"
        style={btnStyle}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C9A84C"; e.currentTarget.style.color = "#1C2B1E"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C9A84C"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 18H5V8h14v13zM7 10h5v5H7z"/></svg>
        Google Calendar
      </a>
      <a
        href={icsUrl} download="adam-lorah-wedding.ics"
        style={btnStyle}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C9A84C"; e.currentTarget.style.color = "#1C2B1E"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C9A84C"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z"/></svg>
        Apple / Outlook
      </a>
    </div>
  );
}

export default function EventDetails() {
  return (
    <section id="details" style={{ padding: "5rem 1.5rem", background: "linear-gradient(135deg, #EEE5D8 0%, #F5EFE6 50%, #EDE4D6 100%)" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.75rem" }}>
            Mark Your Calendar
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E", marginBottom: "0.5rem" }}>
            Event Details
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "rgba(28,43,30,0.5)" }}>
            August 31, 2026 · Napa Valley, California
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {events.map((event, i) => (
            <div key={event.type} className="section-reveal" style={{
              backgroundColor: "rgba(248,243,236,0.7)",
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "2rem", transition: "border-color 0.4s, box-shadow 0.4s, transform 0.4s",
              transitionDelay: `${i * 0.15}s`,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", display: "block", marginBottom: "0.5rem" }}>{event.time}</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E", marginBottom: "0.75rem" }}>{event.type}</h3>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", fontWeight: 500, color: "rgba(28,43,30,0.8)", marginBottom: "0.25rem" }}>{event.venue}</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.72rem", color: "rgba(28,43,30,0.4)", marginBottom: "1rem" }}>{event.address}</p>
              <div style={{ width: "2rem", height: "1px", backgroundColor: "rgba(201,168,76,0.4)", marginBottom: "1rem" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic", color: "rgba(28,43,30,0.6)", lineHeight: 1.6 }}>{event.note}</p>
            </div>
          ))}
        </div>

        {/* Add to Calendar */}
        <div className="section-reveal" style={{ textAlign: "center" }}>
          <AddToCalendarButtons />
        </div>       
      </div>
    </section>
  );
}
