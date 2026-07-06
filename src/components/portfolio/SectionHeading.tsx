"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  index,
  title,
  subtitle,
  align = "left",
}: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} gap-3 mb-12 sm:mb-16`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <span className="font-mono text-sm text-[#0004eb]">{index}</span>
        <span className="h-px w-12 bg-[#0004eb]" />
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
          Section
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
