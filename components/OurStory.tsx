export default function OurStory() {
  const milestones = [
    {
      year: "2019",
      title: "First Meeting",
      description:
        "A chance encounter at a mutual friend's art gallery opening in San Francisco. Adam spotted Lorah across the room and somehow found the courage to introduce himself.",
    },
    {
      year: "2020",
      title: "First Date",
      description:
        "A long Sunday brunch that turned into a sunset walk along the Embarcadero — and somehow ended with a spontaneous drive to Half Moon Bay.",
    },
    {
      year: "2022",
      title: "Moving In Together",
      description:
        "A tiny apartment in Hayes Valley became their first home. They survived IKEA, the pandemic, and a very demanding cat named Biscuit.",
    },
    {
      year: "2024",
      title: "The Proposal",
      description:
        "Adam proposed at the Napa winery where they had their first weekend getaway — down on one knee between the vines at golden hour.",
    },
  ];

  return (
    <section id="story" className="py-28 px-6 bg-cream">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 section-reveal">
          <p
            className="text-xs tracking-[0.4em] uppercase text-warm-gold mb-4"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            How It All Began
          </p>
          <h2
            className="text-6xl md:text-7xl font-light italic text-dark-green"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our Story
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-warm-gold/0 via-warm-gold/30 to-warm-gold/0 hidden md:block" />

          <div className="flex flex-col gap-16">
            {milestones.map((milestone, i) => (
              <div
                key={milestone.year}
                className={`flex items-center gap-8 md:gap-16 section-reveal ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span
                    className="text-xs tracking-[0.3em] uppercase text-warm-gold block mb-2"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {milestone.year}
                  </span>
                  <h3
                    className="text-3xl font-light italic text-dark-green mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {milestone.title}
                  </h3>
                  <p
                    className="text-dark-green/60 leading-relaxed text-sm"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {milestone.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full border border-warm-gold/40 bg-cream">
                  <div className="w-3 h-3 rounded-full bg-warm-gold" />
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="mt-28 text-center section-reveal">
          <div className="ornament mb-8">
            <span
              className="text-4xl italic text-dark-green/30"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "
            </span>
          </div>
          <blockquote
            className="text-3xl md:text-4xl font-light italic text-dark-green max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            I knew from the very first moment. I just had to wait for him to catch up.
          </blockquote>
          <p
            className="mt-6 text-sm tracking-widest uppercase text-warm-gold"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            — Lorah
          </p>
        </div>
      </div>
    </section>
  );
}
