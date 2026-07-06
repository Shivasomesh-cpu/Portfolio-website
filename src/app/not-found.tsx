"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative min-h-screen grid place-items-center bg-background px-5 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center"
      >
        <div className="font-mono text-xs text-cyan-400 mb-4 tracking-wider">
          {"// 404.tsx"}
        </div>
        <h1 className="font-display text-7xl sm:text-9xl font-bold gradient-text-cyan text-glow-cyan mb-4">
          404
        </h1>
        <p className="text-lg text-foreground/80 mb-2">
          This route dropped its connection mid-flight.
        </p>
        <p className="text-sm text-muted-foreground mb-8 font-mono">
          The page you're looking for doesn't exist — or was never deployed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-gradient-to-r from-cyan-400 to-violet-500 text-background hover:scale-105 transition-transform"
        >
          ← Back to safety
        </Link>
      </motion.div>
    </div>
  );
}
