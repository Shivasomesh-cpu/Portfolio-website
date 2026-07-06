"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { PROFILE, STATS } from "@/lib/portfolio-data";

// Dynamically import the Three.js scene (client-only, no SSR)
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Noomo-style hero: a tall (600vh) container drives a GSAP-style
 * scroll timeline. The 3D scene is position:sticky so it stays pinned
 * while the text scrolls past, fading and translating as you go.
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text fades out in the first 40% of scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  // Scroll hint disappears immediately
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky 3D scene — stays pinned while we scroll through the 500vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>

        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(5,5,22,0.5) 70%, rgba(5,5,22,0.9) 100%)",
          }}
        />

        {/* Foreground text */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 md:px-16"
        >
          <div className="max-w-7xl mx-auto w-full">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#0004eb] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0004eb]" />
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {PROFILE.availability}
              </span>
            </motion.div>

            {/* Name — massive, Noomo-style */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold leading-[0.85] tracking-tighter text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw]"
            >
              <span className="block text-foreground">Shiva</span>
              <span className="block gradient-text-neon text-glow-blue">
                Somesh
              </span>
            </motion.h1>

            {/* Role + tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.0 }}
              className="mt-6 max-w-2xl"
            >
              <p className="font-display text-lg sm:text-xl md:text-2xl font-medium text-foreground/90 leading-tight">
                Distributed Systems Engineer
              </p>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {PROFILE.tagline}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector("#projects");
                  if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 60, behavior: "smooth" });
                }}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black overflow-hidden transition-transform hover:scale-105 glow-cyan"
              >
                <span className="relative z-10 font-semibold">Explore Work</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm glass glass-hover"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm glass glass-hover"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.4 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
            >
              {STATS.map((s) => (
                <div key={s.label} className="border-l border-[#0004eb]/40 pl-4">
                  <div className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                    {s.value}
                    <span className="text-lg">{s.suffix}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-mono">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="shimmer-text text-[10px] uppercase tracking-[0.3em] font-mono">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-foreground/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
