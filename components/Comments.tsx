"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch("/api/comments")
      .then((r) => r.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]))
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const newComment = await res.json();
      if (res.ok) {
        setComments((prev) => [newComment, ...prev]);
        setName("");
        setMessage("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch {}
    setLoading(false);
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const inputStyle: React.CSSProperties = {
    width: "100%", backgroundColor: "transparent",
    borderBottom: "1px solid rgba(28,43,30,0.2)",
    outline: "none", padding: "0.75rem 0",
    color: "#1C2B1E", fontFamily: "'Jost', sans-serif",
    fontSize: "0.85rem", transition: "border-color 0.3s",
  };

  return (
    <section style={{ padding: "5rem 1.5rem", background: "linear-gradient(160deg, #EDE4D6 0%, #F8F3EC 100%)" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <div className="section-reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.75rem" }}>
            Leave Your Wishes
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#1C2B1E" }}>
            Messages & Wishes
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="section-reveal" style={{ marginBottom: "3rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <label style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(28,43,30,0.5)", display: "block", marginBottom: "0.5rem" }}>
                Your Name *
              </label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              {submitted && (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#7C9A7E", fontSize: "1rem" }}>
                  ✦ Thank you for your wishes!
                </p>
              )}
            </div>
          </div>
          <div>
            <label style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(28,43,30,0.5)", display: "block", marginBottom: "0.5rem" }}>
              Your Message *
            </label>
            <textarea rows={3} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Share your wishes for the couple..." style={{ ...inputStyle, resize: "none" }} />
          </div>
          <div>
            <button type="submit" disabled={loading} style={{
              padding: "0.75rem 3rem",
              backgroundColor: "#1C2B1E", color: "#F8F3EC",
              fontFamily: "'Jost', sans-serif", fontSize: "0.65rem",
              letterSpacing: "0.3em", textTransform: "uppercase",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1, transition: "background-color 0.3s",
            }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#C9A84C"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1C2B1E"; }}
            >
              {loading ? "Posting..." : "Post Wish"}
            </button>
          </div>
        </form>

        {/* Comments list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {fetching ? (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(28,43,30,0.4)", textAlign: "center", fontSize: "1rem" }}>
              Loading wishes...
            </p>
          ) : comments.length === 0 ? (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(28,43,30,0.4)", textAlign: "center", fontSize: "1.1rem" }}>
              Be the first to leave a wish! 💛
            </p>
          ) : (
            comments.map((c) => (
              <div key={c.id} style={{
                padding: "1.25rem 1.5rem",
                backgroundColor: "rgba(248,243,236,0.8)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderLeft: "3px solid #C9A84C",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "#1C2B1E" }}>{c.name}</span>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", color: "rgba(28,43,30,0.4)" }}>{formatDate(c.timestamp)}</span>
                </div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "rgba(28,43,30,0.7)", lineHeight: 1.7 }}>{c.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
