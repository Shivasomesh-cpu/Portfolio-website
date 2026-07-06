"use client";

import { motion } from "framer-motion";
import { Briefcase, BookOpen } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { EXPERIENCE, ACHIEVEMENTS } from "@/lib/portfolio-data";
import { Trophy, FileText } from "lucide-react";

const TYPE_ICON: Record<string, React.ElementType> = {
  Leadership: Briefcase,
  Research: BookOpen,
};

const ACHIEVEMENT_ICON: Record<string, React.ElementType> = {
  trophy: Trophy,
  filetext: FileText,
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          title="Experience & Recognition"
          subtitle="Where I've contributed, reviewed, and shipped — plus the wins that came with it."
        />

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Experience timeline */}
          <div className="lg:col-span-2">
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-violet-400/40 to-transparent" />

              {EXPERIENCE.map((exp, i) => {
                const Icon = TYPE_ICON[exp.type] || Briefcase;
                return (
                  <motion.div
                    key={exp.role + exp.org}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="relative pb-10 last:pb-0"
                  >
                    {/* Node */}
                    <div className="absolute -left-[1.65rem] top-1 grid place-items-center w-7 h-7 rounded-full bg-card border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(125,211,252,0.3)]">
                      <Icon size={12} className="text-cyan-400" />
                    </div>

                    <div className="p-5 sm:p-6 rounded-2xl glass glass-hover">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <h3 className="font-display text-lg font-semibold">
                          {exp.role}
                        </h3>
                        <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-sm text-violet-300 font-medium mb-3">
                        {exp.org}
                      </div>
                      <ul className="space-y-2">
                        {exp.points.map((p, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-foreground/75 leading-relaxed">
                            <span className="text-cyan-400 mt-0.5">▸</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Achievements column */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-amber-400" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
                Achievements
              </h3>
            </div>

            {ACHIEVEMENTS.map((a, i) => {
              const Icon = ACHIEVEMENT_ICON[a.icon] || Trophy;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group relative p-5 rounded-2xl glass glass-hover overflow-hidden"
                >
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-amber-400/10 blur-2xl group-hover:bg-amber-400/20 transition-colors" />
                  <div className="relative">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/30 to-orange-500/30 border border-amber-400/40 shrink-0">
                        <Icon size={18} className="text-amber-300" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display text-sm font-semibold leading-tight">
                          {a.title}
                        </h4>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {a.org}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      {a.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Code snippet card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-5 rounded-2xl bg-[#0a0e1a] border border-border/60 font-mono text-xs leading-relaxed"
            >
              <div className="flex gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <div className="space-y-0.5">
                <div className="text-muted-foreground">
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-cyan-400">engineer</span>{" "}
                  <span className="text-muted-foreground">=</span> {`{`}
                </div>
                <div className="pl-4 text-foreground/80">
                  name: <span className="text-emerald-400">"Shiva Somesh"</span>,
                </div>
                <div className="pl-4 text-foreground/80">
                  focus: <span className="text-emerald-400">"concurrency"</span>,
                </div>
                <div className="pl-4 text-foreground/80">
                  ships: <span className="text-amber-400">true</span>,
                </div>
                <div className="pl-4 text-foreground/80">
                  available: <span className="text-amber-400">"Summer 2027"</span>,
                </div>
                <div className="text-muted-foreground">{`}`}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
