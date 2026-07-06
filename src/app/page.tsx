"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import PhysicsPlayground from "@/components/portfolio/PhysicsPlayground";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import CommandPalette from "@/components/portfolio/CommandPalette";
import AudioToggle from "@/components/portfolio/AudioToggle";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

const CustomCursor = dynamic(() => import("@/components/portfolio/CustomCursor"), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#050516] overflow-hidden grain grayscale-universe">
      <SmoothScroll />
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <CommandPalette />
      <AudioToggle />
      <Navbar />

      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <PhysicsPlayground />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
