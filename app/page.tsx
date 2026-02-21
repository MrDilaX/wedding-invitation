"use client";

import { useEffect, useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import OurStory from "@/components/OurStory";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import GoogleMapSection from "@/components/GoogleMapSection";
import RSVP from "@/components/RSVP";
import Comments from "@/components/Comments";
import Footer from "@/components/Footer";
import FloatingPetals from "@/components/FloatingPetals";
import Nav from "@/components/Nav";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  useEffect(() => {
    // Show skeleton briefly while fonts/assets load
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!envelopeOpened) return;
    const reveals = document.querySelectorAll(".section-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [envelopeOpened]);

  if (!ready) return <LoadingSkeleton />;

  return (
    <>
      <EnvelopeIntro onOpen={() => setEnvelopeOpened(true)} />
      <main style={{
        backgroundColor: "#F8F3EC",
        opacity: envelopeOpened ? 1 : 0,
        animation: envelopeOpened ? "fadeInPage 0.8s ease forwards" : "none",
      }}>
        <FloatingPetals />
        <Nav />
        <Hero />
        <Countdown />
        <OurStory />
        <EventDetails />
        <GoogleMapSection />
        <Gallery />
        <RSVP />
        <Comments />
        <Footer />
        <MusicPlayer />
      </main>
    </>
  );
}
