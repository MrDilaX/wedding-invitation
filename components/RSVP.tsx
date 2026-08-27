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
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // Updated classes using the new primary and accent colors
  const inputClass =
    "w-full bg-transparent border-b border-[#C4738A]/30 focus:border-[#7D2E46] outline-none py-3 text-[#7D2E46] placeholder:text-[#7D2E46]/30 transition-colors duration-300 text-sm";

  return (
    <section
      id="rsvp"
      className="py-28 px-6"
      // Gradient updated to match --bg (#FDF0F3) and --bg-alt (#FAE4EA)
      style={{ background: "linear-gradient(160deg, #FDF0F3 0%, #FAE4EA 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16 section-reveal">
          <p
            className="text-xs tracking-[0.4em] uppercase text-[#C4738A] mb-4"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Please Respond
          </p>
          <h2
            className="text-6xl md:text-7xl font-light italic text-[#7D2E46]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            RSVP
          </h2>
        </div>

        {submitted ? (
          <div className="text-center py-16 section-reveal visible">
            <div className="text-6xl mb-6 text-[#C4738A]">✦</div>
            <h3
              className="text-4xl font-light italic text-[#7D2E46] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Thank You, {form.name.split(" ")[0]}!
            </h3>
            <p
              className="text-[#7D2E46]/60 text-sm leading-relaxed"
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
                <label className="text-xs tracking-widest uppercase text-[#7D2E46]/50 block mb-2">
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
                <label className="text-xs tracking-widest uppercase text-[#7D2E46]/50 block mb-2">
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
              <label className="text-xs tracking-widest uppercase text-[#7D2E46]/50 block mb-4">
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
                        ? "bg-[#7D2E46] text-[#FDF0F3] border-[#7D2E46]"
                        : "border-[#7D2E46]/20 text-[#7D2E46]/60 hover:border-[#C4738A] hover:text-[#C4738A]"
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
                  <label className="text-xs tracking-widest uppercase text-[#7D2E46]/50 block mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className={inputClass + " cursor-pointer"}
                  >
                    {["1", "2", "3", "4"].map((n) => (
                      <option key={n} value={n} className="bg-[#FDF0F3] text-[#7D2E46]">
                        {n} {n === "1" ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-[#7D2E46]/50 block mb-2">
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
              <label className="text-xs tracking-widest uppercase text-[#7D2E46]/50 block mb-2">
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

            {/* Error message */}
            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={!form.attending || loading}
                className="px-16 py-4 bg-[#7D2E46] text-[#FDF0F3] text-xs tracking-[0.3em] uppercase hover:bg-[#C4738A] transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
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