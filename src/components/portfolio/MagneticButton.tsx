"use client";

import { useRef, useCallback, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic button — element subtly pulls toward the cursor on hover.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  as: Component = "button",
  href,
  onClick,
  target,
  rel,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }, [strength, x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const motionProps = {
    ref: ref as any,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { x: sx, y: sy },
    className,
    onClick,
    "data-cursor": "hover",
    "aria-label": ariaLabel,
  };

  if (Component === "a") {
    return (
      <motion.a {...motionProps} href={href} target={target} rel={rel}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button {...motionProps} type="button">
      {children}
    </motion.button>
  );
}
