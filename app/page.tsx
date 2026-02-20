"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import OurStory from "@/components/OurStory";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import FloatingPetals from "@/components/FloatingPetals";
import Nav from "@/components/Nav";

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".section-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen bg-cream">
      <FloatingPetals />
      <Nav />
      <Hero />
      <Countdown />
      <OurStory />
      <EventDetails />
      <Gallery />
      <Footer />
    </main>
  );
}
