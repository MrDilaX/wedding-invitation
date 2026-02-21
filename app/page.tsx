"use client";

import { useEffect, useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
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
  const [opened, setOpened] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setAutoPlay(true), 800);
  };

  useEffect(() => {
    if (!opened) return;
    const reveals = document.querySelectorAll(".section-reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [opened]);

  return (
    <>
      <EnvelopeIntro onOpen={handleOpen} />
      <main style={{
        backgroundColor: "#F8F3EC",
        opacity: opened ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}>
        <FloatingPetals />
        <Nav />
        <Hero />
        <Countdown />
        <EventDetails />
        <GoogleMapSection />
        <Gallery />
        <RSVP />
        <Comments />
        <Footer />
        <MusicPlayer autoPlay={autoPlay} />
      </main>
    </>
  );
}
