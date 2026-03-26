"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Technology from "@/components/Technology";
import Solutions from "@/components/Solutions";
import Global from "@/components/Global";
import Clients from "@/components/Clients";
import History from "@/components/History";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-visible");
        }
      });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll(
      ".scroll-hidden, .scroll-hidden-left, .scroll-hidden-right, .scroll-hidden-scale"
    );
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Technology />
      <Solutions />
      <Global />
      <Clients />
      <History />
      <Contact />
      <Footer />
    </main>
  );
}
