"use client";

import { useEffect, useRef } from "react";

/**
 * Bitfalk-style 3-layer cursor.
 *
 * 1. .cursor-dot       — 6px solid white, mix-blend-mode: difference (inverts underneath)
 * 2. .cursor-outline   — 30px white-bordered ring, mix-blend-mode: difference, expands to 60px on hover
 * 3. .cursor-progress  — 30px SVG ring rotated -90deg, stroke-dashoffset mapped to scroll progress
 *
 * The dot/ring invert colors underneath (the "negative" effect). The progress
 * ring is electric blue and sits on top, showing scroll position.
 *
 * Touch devices: all three layers are hidden via CSS @media.
 */

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGSVGElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch-primary devices
    const isTouchPrimary =
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(hover: hover)").matches;
    if (isTouchPrimary) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    const progressCircle = progressCircleRef.current;
    if (!dot || !outline || !progressCircle) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    // Outline lags behind with spring physics
    let outlineX = mouseX;
    let outlineY = mouseY;
    let raf = 0;

    // SVG ring circumference: r=13, C = 2πr ≈ 81.68
    const CIRCUMFERENCE = 2 * Math.PI * 13;
    progressCircle.style.strokeDasharray = `${CIRCUMFERENCE}`;
    progressCircle.style.strokeDashoffset = `${CIRCUMFERENCE}`;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']")) {
        outline.classList.add("hovering");
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']")) {
        outline.classList.remove("hovering");
      }
    };

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      const offset = CIRCUMFERENCE * (1 - progress);
      progressCircle.style.strokeDashoffset = `${offset}`;
      // Scale the progress ring slightly to match outline hover state
      const outlineSize = outline.classList.contains("hovering") ? 60 : 30;
      if (progressRef.current) {
        progressRef.current.style.width = `${outlineSize}px`;
        progressRef.current.style.height = `${outlineSize}px`;
      }
    };

    const render = () => {
      // Spring physics for outline
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      if (progressRef.current) {
        progressRef.current.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%) rotate(-90deg)`;
      }
      raf = requestAnimationFrame(render);
    };
    render();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial call
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={outlineRef} className="cursor-outline" aria-hidden />
      <svg
        ref={progressRef}
        className="cursor-progress"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        aria-hidden
      >
        <circle
          ref={progressCircleRef}
          cx="15"
          cy="15"
          r="13"
        />
      </svg>
    </>
  );
}
