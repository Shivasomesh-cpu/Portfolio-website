"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Parallax wrapper — children move at a different rate than the scroll.
 * `speed` > 0 = moves up slower than scroll (background feel).
 * `speed` < 0 = moves down (foreground feel).
 */
export function Parallax({
  children,
  speed = 0.3,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const smoothY = useSpring(y, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Reveal-on-scroll wrapper. Animates children in from below when in view.
 */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale-on-scroll — element scales down as user scrolls past it.
 */
export function ScaleOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.5]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * TextReveal — splits text into words and reveals each one in sequence.
 */
export function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * HorizontalScroll — pinned vertical scroll translates to horizontal movement.
 * Useful for showcasing project cards in a horizontal track.
 */
export function HorizontalScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Move horizontally as user scrolls vertically through this section
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);
  const smoothX = useSpring(x, { stiffness: 80, damping: 25, restDelta: 0.001 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ x: smoothX }} className="flex gap-6 will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ScrollSectionIndicator — fixed dots on the right showing current section.
 */
export function ScrollSectionIndicator({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(s.id);
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
          }}
          className="group flex items-center gap-2 justify-end"
          aria-label={s.label}
        >
          <span
            className={`text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
              active === s.id
                ? "text-[#0004eb] opacity-100"
                : "text-muted-foreground opacity-0 group-hover:opacity-70"
            }`}
          >
            {s.label}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === s.id
                ? "w-2 h-8 bg-gradient-to-b from-[#0004eb] to-[#0004eb]"
                : "w-2 h-2 bg-white/20 group-hover:bg-white/40"
            }`}
          />
        </a>
      ))}
    </div>
  );
}
