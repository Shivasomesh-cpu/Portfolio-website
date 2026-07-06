"use client";

import { motion } from "framer-motion";
import {
  Code2, Layout, Brain, Server, Cloud, Wrench,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { SKILL_GROUPS } from "@/lib/portfolio-data";

const ICONS: Record<string, React.ElementType> = {
  code: Code2,
  layout: Layout,
  brain: Brain,
  server: Server,
  cloud: Cloud,
  wrench: Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 px-5 sm:px-8">
      {/* Decorative bg */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#0004eb]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          title="Capabilities"
          subtitle="A systems-first toolkit: from distributed backends to ML research, all wired up with CI/CD."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group, i) => {
            const Icon = ICONS[group.icon] || Code2;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group relative p-6 rounded-2xl glass glass-hover overflow-hidden"
              >
                {/* Gradient glow on hover */}
                <div
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${group.accent} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br ${group.accent} bg-opacity-20`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold mb-4">
                    {group.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.03] border border-white/10 text-foreground/75 group-hover:border-white/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech philosophy strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl glass relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#0004eb]/10 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.25em] text-[#0004eb] mb-2 font-mono">
                Engineering Philosophy
              </div>
              <p className="font-display text-xl sm:text-2xl font-medium leading-snug">
                <span className="gradient-text-blue">Design for correctness</span>
                {" "}and{" "}
                <span className="gradient-text-blue">collaboration</span>
                {" "}simultaneously — that's the only way both move at full speed.
              </p>
            </div>
            <div className="font-mono text-sm text-muted-foreground shrink-0">
              <div className="text-[#0004eb]">~/$</div>
              <div>git push origin main</div>
              <div className="text-emerald-400">✓ all checks passed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
