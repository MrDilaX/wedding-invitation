"use client";

import { useState } from "react";

type AttendingStatus = "yes" | "no" | "";

interface FormData {
  name: string;
  email: string;
  attending: AttendingStatus;
  guests: string;
  dietary: string;
  message: string;
}

export default function RSVP() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    attending: "",
    guests: "1",
    dietary: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-dark-green/20 focus:border-warm-gold outline-none py-3 text-dark-green placeholder:text-dark-green/30 transition-colors duration-300 text-sm";

  return (
    <section
      id="rsvp"
      className="py-28 px-6"
      style={{ background: "linear-gradient(160deg, #F8F3EC 0%, #EDE4D6 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16 section-reveal">
          <p
            className="text-xs tracking-[0.4em] uppercase text-warm-gold mb-4"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Kindly Reply By August 1, 2025
          </p>
          <h2
            className="text-6xl md:text-7xl font-light italic text-dark-green"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            RSVP
          </h2>
        </div>

        {submitted ? (
          <div className="text-center py-16 section-reveal visible">
            <div className="text-6xl mb-6 text-warm-gold">✦</div>
            <h3
              className="text-4xl font-light italic text-dark-green mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Thank You, {form.name.split(" ")[0]}!
            </h3>
            <p
              className="text-dark-green/60 text-sm leading-relaxed"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {form.attending === "yes"
                ? "We're so excited to celebrate with you! We'll be in touch with more details soon."
                : "We'll miss you dearly. Thank you for letting us know."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-10 section-reveal"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <label className="text-xs tracking-widest uppercase text-dark-green/50 block mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-dark-green/50 block mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Attending */}
            <div>
              <label className="text-xs tracking-widest uppercase text-dark-green/50 block mb-4">
                Will You Attend? *
              </label>
              <div className="flex gap-4">
                {(["yes", "no"] as AttendingStatus[]).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm({ ...form, attending: val })}
                    className={`flex-1 py-3 border text-sm tracking-widest uppercase transition-all duration-300 ${
                      form.attending === val
                        ? "bg-dark-green text-cream border-dark-green"
                        : "border-dark-green/20 text-dark-green/60 hover:border-warm-gold hover:text-warm-gold"
                    }`}
                  >
                    {val === "yes" ? "Joyfully Accepts" : "Regretfully Declines"}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests - only if attending */}
            {form.attending === "yes" && (
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="text-xs tracking-widest uppercase text-dark-green/50 block mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className={inputClass + " cursor-pointer"}
                  >
                    {["1", "2", "3", "4"].map((n) => (
                      <option key={n} value={n} className="bg-cream text-dark-green">
                        {n} {n === "1" ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-dark-green/50 block mb-2">
                    Dietary Restrictions
                  </label>
                  <input
                    type="text"
                    value={form.dietary}
                    onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                    placeholder="Vegetarian, gluten-free, etc."
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="text-xs tracking-widest uppercase text-dark-green/50 block mb-2">
                A Note for the Couple
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Share your wishes..."
                className={inputClass + " resize-none"}
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={!form.attending || loading}
                className="px-16 py-4 bg-dark-green text-cream text-xs tracking-[0.3em] uppercase hover:bg-warm-gold transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send RSVP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
