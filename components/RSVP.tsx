"use client";

import { useState } from "react";

type AttendingStatus = "yes" | "no" | "";

interface WeddingFormData {
  name: string;
  email: string;
  attending: AttendingStatus;
  guests: string;
  dietary: string;
  message: string;
}

export default function RSVP() {
  const [form, setForm] = useState<WeddingFormData>({
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
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "transparent",
    borderBottom: "1px solid rgba(28,43,30,0.2)",
    outline: "none",
    padding: "0.75rem 0",
    color: "#1C2B1E",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.85rem",
    transition: "border-color 0.3s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(28,43,30,0.5)",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <section
      id="rsvp"
      style={{ padding: "7rem 1.5rem", background: "linear-gradient(160deg, #F8F3EC 0%, #EDE4D6 100%)" }}
    >
      <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>
            Kindly Reply By August 1, 2025
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E" }}>
            RSVP
          </h2>
        </div>

        {submitted ? (
          <div className="section-reveal visible" style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1.5rem", color: "#C9A84C" }}>✦</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E", marginBottom: "1rem" }}>
              Thank You, {form.name.split(" ")[0]}!
            </h3>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "rgba(28,43,30,0.6)", lineHeight: 1.8 }}>
              {form.attending === "yes"
                ? "We're so excited to celebrate with you! We'll be in touch with more details soon."
                : "We'll miss you dearly. Thank you for letting us know."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="section-reveal" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Name & Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={inputStyle} />
              </div>
            </div>

            {/* Attending */}
            <div>
              <label style={labelStyle}>Will You Attend? *</label>
              <div style={{ display: "flex", gap: "1rem" }}>
                {(["yes", "no"] as AttendingStatus[]).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm({ ...form, attending: val })}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      border: `1px solid ${form.attending === val ? "#1C2B1E" : "rgba(28,43,30,0.2)"}`,
                      backgroundColor: form.attending === val ? "#1C2B1E" : "transparent",
                      color: form.attending === val ? "#F8F3EC" : "rgba(28,43,30,0.6)",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  >
                    {val === "yes" ? "Joyfully Accepts" : "Regretfully Declines"}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests - only if attending */}
            {form.attending === "yes" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div>
                  <label style={labelStyle}>Number of Guests</label>
                  <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                    {["1", "2", "3", "4"].map((n) => (
                      <option key={n} value={n}>{n} {n === "1" ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Dietary Restrictions</label>
                  <input type="text" value={form.dietary} onChange={(e) => setForm({ ...form, dietary: e.target.value })} placeholder="Vegetarian, gluten-free, etc." style={inputStyle} />
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label style={labelStyle}>A Note for the Couple</label>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Share your wishes..." style={{ ...inputStyle, resize: "none" }} />
            </div>

            {/* Submit */}
            <div style={{ textAlign: "center", paddingTop: "1rem" }}>
              <button
                type="submit"
                disabled={!form.attending || loading}
                style={{
                  padding: "1rem 4rem",
                  backgroundColor: "#1C2B1E",
                  color: "#F8F3EC",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: form.attending && !loading ? "pointer" : "not-allowed",
                  opacity: !form.attending || loading ? 0.4 : 1,
                  transition: "all 0.5s",
                }}
                onMouseEnter={(e) => { if (form.attending && !loading) e.currentTarget.style.backgroundColor = "#C9A84C"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1C2B1E"; }}
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
