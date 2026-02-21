import { useState } from "react";

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    // Example static comments for demo
    { id: "1", name: "Alice", message: "Congrats!", timestamp: Date.now() },
    { id: "2", name: "Bob", message: "Best wishes!", timestamp: Date.now() },
  ]);

  // Track RSVP status per comment
  const [rsvps, setRsvps] = useState<Record<string, "accepted" | "declined" | null>>({});

  const handleRSVP = (commentId: string, status: "accepted" | "declined") => {
    setRsvps(prev => ({ ...prev, [commentId]: status }));
  };

  const fmt = (ts: number) => new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      {comments.map(c => (
        <div key={c.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "5px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{c.name}</strong>
            <span style={{ fontSize: "0.8rem", color: "#666" }}>{fmt(c.timestamp)}</span>
          </div>
          <p style={{ margin: "0.5rem 0" }}>{c.message}</p>

          {/* RSVP buttons */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => handleRSVP(c.id, "accepted")}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "3px",
                border: rsvps[c.id] === "accepted" ? "2px solid green" : "1px solid #ccc",
                backgroundColor: rsvps[c.id] === "accepted" ? "lightgreen" : "white",
                cursor: "pointer",
              }}
            >
              Accept
            </button>
            <button
              onClick={() => handleRSVP(c.id, "declined")}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "3px",
                border: rsvps[c.id] === "declined" ? "2px solid red" : "1px solid #ccc",
                backgroundColor: rsvps[c.id] === "declined" ? "#f8d7da" : "white",
                cursor: "pointer",
              }}
            >
              Decline
            </button>
          </div>

          {rsvps[c.id] && (
            <p style={{ marginTop: "0.5rem", fontStyle: "italic", color: rsvps[c.id] === "accepted" ? "green" : "red" }}>
              You {rsvps[c.id]} this invitation
            </p>
          )}
        </div>
      ))}
    </div>
  );
}