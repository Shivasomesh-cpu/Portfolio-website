"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Calendar, Mail, Zap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PROFILE, COURSEWORK, PROJECTS } from "@/lib/portfolio-data";

export default function About() {
  // Pull a couple of "currently building" mentions from featured projects
  const currentlyBuilding = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="about" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          title="About"
          subtitle="The problems that interest me most are the ones where correctness under concurrency isn't a nice-to-have."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: bio */}
          <div className="lg:col-span-7 space-y-6">
            {PROFILE.bio.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-base sm:text-lg text-foreground/80 leading-relaxed"
              >
                {para}
              </motion.p>
            ))}

            {/* Quick facts — removed CGPA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid sm:grid-cols-2 gap-3 pt-6"
            >
              {[
                { icon: GraduationCap, label: "Education", value: PROFILE.school },
                { icon: Calendar, label: "Currently", value: PROFILE.degree },
                { icon: MapPin, label: "Location", value: PROFILE.location },
                { icon: Mail, label: "Email", value: PROFILE.email },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-xl glass glass-hover"
                >
                  <div className="mt-0.5 grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#0004eb]/20 to-[#0004eb]/20 border border-[#0004eb]/30 shrink-0">
                    <Icon size={16} className="text-[#0004eb]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {label}
                    </div>
                    <div className="text-sm font-medium text-foreground truncate">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: currently building + coursework (no CGPA card) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Currently building card — replaces the CGPA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative p-6 rounded-2xl glass overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-[#0004eb]/20 to-[#0004eb]/20 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={14} className="text-[#0004eb]" />
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#0004eb] font-mono">
                    Currently building
                  </div>
                </div>
                <div className="space-y-2.5">
                  {currentlyBuilding.map((p, i) => (
                    <div key={p.slug} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-sm font-semibold truncate">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {p.tagline}
                        </div>
                      </div>
                      <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${p.accent}`} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-6 rounded-2xl glass"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-6 bg-[#0004eb]" />
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider">
                  Coursework
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {COURSEWORK.map((c, i) => (
                  <motion.span
                    key={c}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="px-3 py-1.5 text-xs font-mono rounded-md bg-[#0004eb]/5 border border-[#0004eb]/15 text-foreground/80 hover:border-[#0004eb]/40 hover:bg-[#0004eb]/10 transition-colors"
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
