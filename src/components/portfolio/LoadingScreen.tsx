"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Noomo-style loader: 0-100% counter + self-drawing "SS" logo.
 * The number is huge, bottom-left aligned. Beside it, two circles
 * and an animated "SS" that draws itself in.
 */
export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 600);
      }
      setProgress(p);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-[#050516] flex flex-col justify-between p-6 sm:p-10"
        >
          {/* Top-left label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
              Shiva Somesh
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
              Portfolio 2026
            </span>
          </motion.div>

          {/* Center — self-drawing SS logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              <svg width="180" height="80" viewBox="0 0 180 80" fill="none" className="overflow-visible">
                {/* Left circle */}
                <motion.circle
                  cx="30" cy="40" r="22"
                  stroke="#0004eb" strokeWidth="1.5" fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* First S — drawn via stroke-dasharray */}
                <motion.text
                  x="30" y="52"
                  textAnchor="middle"
                  fontFamily="var(--font-display), sans-serif"
                  fontSize="32"
                  fontWeight="800"
                  fill="#d2e0ff"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  S
                </motion.text>
                {/* Animated bar between the two circles */}
                <motion.rect
                  x="52" y="38"
                  width="0" height="4"
                  fill="#0004eb"
                  initial={{ width: 0 }}
                  animate={{ width: 76 }}
                  transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Right circle */}
                <motion.circle
                  cx="150" cy="40" r="22"
                  stroke="#0004eb" strokeWidth="1.5" fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Second S */}
                <motion.text
                  x="150" y="52"
                  textAnchor="middle"
                  fontFamily="var(--font-display), sans-serif"
                  fontSize="32"
                  fontWeight="800"
                  fill="#d2e0ff"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                >
                  S
                </motion.text>
              </svg>
            </div>
          </motion.div>

          {/* Bottom-left — huge counter */}
          <div className="flex items-end justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-display font-bold leading-none text-[20vw] sm:text-[14vw] tracking-tighter"
              style={{ transform: "translateX(-1vw)" }}
            >
              <span className="gradient-text-blue">{Math.floor(progress)}</span>
              <span className="text-foreground/40">%</span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="hidden sm:block w-48"
            >
              <div className="h-px w-full bg-white/10 overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-[#0004eb]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>Loading assets</span>
                <span>{Math.floor(progress)}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
