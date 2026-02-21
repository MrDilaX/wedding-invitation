"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "background 0.4s, box-shadow 0.4s",
      backgroundColor: scrolled ? "rgba(248,243,236,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.07)" : "none",
    }}>
      <div style={{
        maxWidth: "72rem", margin: "0 auto",
        padding: "1.1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo left */}
        <a href="#" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.4rem", fontStyle: "italic",
          color: "#1C2B1E", textDecoration: "none",
          letterSpacing: "0.04em",
        }}>
          A & L
        </a>

        {/* Links always on right, no hamburger */}
        <ul style={{
          display: "flex", alignItems: "center", gap: "2.5rem",
          listStyle: "none", margin: 0, padding: 0,
        }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.68rem", letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(28,43,30,0.6)",
                  textDecoration: "none",
                  transition: "color 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(28,43,30,0.6)")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
