"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, Trophy, FileText, Calendar } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PROJECTS } from "@/lib/portfolio-data";

type Project = (typeof PROJECTS)[number];

function ProjectCard({ project, index, onOpen }: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ ry: px * 10, rx: -py * 10 });
  }, []);

  const handleLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
      className="h-full"
      style={{ perspective: 1200 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onOpen}
        className="group relative h-full cursor-pointer rounded-2xl glass overflow-hidden transition-all duration-500"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
        }}
      >
        {/* Gradient accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.accent}`} />

        {/* Glow on hover */}
        <div
          className={`absolute -inset-1 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 pointer-events-none`}
        />

        <div className="relative p-6 sm:p-8 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br ${project.accent} text-background font-display font-bold text-lg`}
                style={{ transform: "translateZ(40px)" }}
              >
                {project.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold leading-tight">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={11} className="text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid place-items-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#0004eb]/20 group-hover:border-[#0004eb]/40 transition-all">
              <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-[#0004eb] group-hover:rotate-12 transition-all" />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-sm text-foreground/85 mb-4 leading-relaxed">
            {project.tagline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/10 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/10 text-muted-foreground">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Award badge */}
          {project.award && (
            <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border-[#0004eb]/10 border border-[#0004eb]/30 text-[#6e7bff] text-xs font-medium">
              <Trophy size={11} />
              <span className="truncate">{project.award}</span>
            </div>
          )}

          {/* Metrics */}
          <div className="mt-auto grid grid-cols-3 gap-2 pt-4 border-t border-border/40">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display text-sm font-bold text-foreground">
                  {m.value}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="mt-4 text-[11px] font-mono text-[#0004eb]/80 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view details →
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl glass border border-border/60 bg-card/95"
      >
        {/* Header */}
        <div className={`h-2 w-full bg-gradient-to-r ${project.accent}`} />
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div
                className={`grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br ${project.accent} text-background font-display font-bold text-2xl`}
              >
                {project.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {project.tagline}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="grid place-items-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {project.award && (
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-[#0004eb]/10 border border-[#0004eb]/30 text-[#6e7bff] text-sm font-medium">
              {project.award.includes("IEEE") ? <FileText size={14} /> : <Trophy size={14} />}
              <span>{project.award}</span>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0004eb] mb-2 font-mono">
              Overview
            </div>
            <p className="text-foreground/85 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0004eb] mb-3 font-mono">
              Highlights
            </div>
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                  <span className="text-[#0004eb] font-mono shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0004eb] mb-3 font-mono">
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-[#0004eb]/5 border border-[#0004eb]/20 text-foreground/85"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="font-display text-xl font-bold gradient-text-blue">
                  {m.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium glass glass-hover"
            >
              <Github size={16} />
              View Code
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#0004eb] to-[#0004eb] text-background"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#0004eb]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#0004eb]/8 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          title="Selected Work"
          subtitle="Full-stack systems, multi-agent engines, and production mobile apps — each shipped with CI/CD and validated under real load."
        />

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              onOpen={() => setActive(p)}
            />
          ))}
        </div>

        {/* See more on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Shivasomesh-cpu?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm glass glass-hover"
          >
            <Github size={16} />
            See all repositories on GitHub
            <ArrowUpRight size={14} className="text-[#0004eb]" />
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
