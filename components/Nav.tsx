"use client";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "background 0.4s, box-shadow 0.4s", backgroundColor: scrolled ? "color-mix(in srgb, var(--bg) 95%, transparent)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "1.1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontStyle: "italic", color: "var(--primary)", textDecoration: "none", letterSpacing: "0.04em" }}>C & G</a>
        <ul style={{ display: "flex", alignItems: "center", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.25s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
