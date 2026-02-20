export default function EventDetails() {
  const events = [
    {
      type: "Ceremony",
      time: "4:00 PM",
      venue: "Beringer Vineyards",
      address: "2000 Main St, St Helena, CA 94574",
      note: "Outdoor ceremony among the vines. Garden attire requested.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <path d="M20 4 L20 36 M12 12 Q16 8 20 12 Q24 8 28 12" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="6" r="3" fill="#C9A84C" opacity="0.6" />
        </svg>
      ),
    },
    {
      type: "Cocktail Hour",
      time: "5:30 PM",
      venue: "Beringer Estate Gardens",
      address: "2000 Main St, St Helena, CA 94574",
      note: "Join us in the gardens for drinks, small bites, and light music.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <path d="M10 10 L20 28 L30 10 M15 10 L25 10 M20 28 L20 36" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      type: "Reception & Dinner",
      time: "7:00 PM",
      venue: "Beringer Rhine House",
      address: "2000 Main St, St Helena, CA 94574",
      note: "Dinner, dancing, and toasts in the historic Rhine House. Black tie optional.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <path d="M8 32 L8 18 Q8 8 20 8 Q32 8 32 18 L32 32 M14 16 Q14 12 20 12 Q26 12 26 16" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="details"
      className="py-28 px-6"
      style={{ background: "linear-gradient(135deg, #EEE5D8 0%, #F5EFE6 50%, #EDE4D6 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 section-reveal">
          <p
            className="text-xs tracking-[0.4em] uppercase text-warm-gold mb-4"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Mark Your Calendar
          </p>
          <h2
            className="text-6xl md:text-7xl font-light italic text-dark-green mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Event Details
          </h2>
          <p
            className="text-dark-green/60 text-sm tracking-wide"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Augest 31, 2026 · The Grand Palace, Hikkaduwa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <div
              key={event.type}
              className="bg-cream/70 backdrop-blur-sm border border-warm-gold/20 rounded-sm p-8 section-reveal hover:border-warm-gold/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="mb-6">{event.icon}</div>
              <span
                className="text-xs tracking-[0.3em] uppercase text-warm-gold block mb-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {event.time}
              </span>
              <h3
                className="text-2xl font-light italic text-dark-green mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {event.type}
              </h3>
              <p
                className="text-sm font-medium text-dark-green/80 mb-1"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {event.venue}
              </p>
              <p
                className="text-xs text-dark-green/50 mb-4"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {event.address}
              </p>
              <div className="w-8 h-px bg-warm-gold/40 mb-4" />
              <p
                className="text-xs text-dark-green/60 leading-relaxed italic"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem" }}
              >
                {event.note}
              </p>
            </div>
          ))}
        </div> 
      </div> 
    </section>
  );
}
