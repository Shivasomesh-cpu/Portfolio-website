"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Typewriter effect — cycles through phrases.
 */
export default function TypeWriter({
  phrases,
  className = "",
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 1800,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}) {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = phrases[phraseIdx];

    if (!deleting && display === current) {
      timer.current = setTimeout(() => setDeleting(true), pauseTime);
      return () => timer.current && clearTimeout(timer.current);
    }

    if (deleting && display === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
      return;
    }

    const next = deleting
      ? current.substring(0, display.length - 1)
      : current.substring(0, display.length + 1);

    timer.current = setTimeout(() => {
      setDisplay(next);
    }, deleting ? deleteSpeed : typeSpeed);

    return () => timer.current && clearTimeout(timer.current);
  }, [display, deleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {display}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
        className="inline-block ml-0.5 w-[2px] h-[0.9em] -mb-[0.1em] bg-[#0004eb] align-middle"
        aria-hidden
      />
    </span>
  );
}
