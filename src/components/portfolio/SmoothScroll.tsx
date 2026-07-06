"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll provider — installs on mount, integrates with
 * GSAP ScrollTrigger via requestAnimationFrame sync.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // Sync with GSAP ScrollTrigger if present
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.__lenis = lenis;
      lenis.on("scroll", () => {
        if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.update();
        }
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (typeof window !== "undefined") {
        // @ts-ignore
        delete window.__lenis;
      }
    };
  }, []);

  return null;
}
