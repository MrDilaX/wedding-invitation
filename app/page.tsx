"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import OurStory from "@/components/OurStory";
import EventDetails from "@/components/EventDetails";
import GoogleMapSection from "@/components/GoogleMapSection";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Comments from "@/components/Comments";
import Footer from "@/components/Footer";
import FloatingPetals from "@/components/FloatingPetals";
import Nav from "@/components/Nav";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".section-reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ backgroundColor: "var(--bg)" }}>
      <FloatingPetals />
      <Nav />
      <Hero />
      <Countdown />
      {/* <OurStory /> */}
      <EventDetails />
      <GoogleMapSection />
      <Gallery />
      <RSVP />
      {/* <Comments /> */}
      <Footer />
      <MusicPlayer />
    </main>
  );
}