"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { PROFILE, NAV_ITEMS } from "@/lib/portfolio-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/40 bg-background/60 backdrop-blur-sm">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full bg-card border border-[#0004eb]/40 shadow-[0_0_30px_rgba(0,4,235,0.3)]">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="grid place-items-center w-full h-full rounded-full hover:bg-[#0004eb]/10 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={16} className="text-[#0004eb]" />
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="grid place-items-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#0004eb]/20 to-[#0004eb]/20 border border-[#0004eb]/40">
                <span className="font-display font-bold text-sm gradient-text-blue">
                  {PROFILE.initials}
                </span>
              </div>
              <div>
                <div className="font-display text-base font-semibold">
                  {PROFILE.name}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {PROFILE.role}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              {PROFILE.tagline}
            </p>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:justify-self-center"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0004eb] mb-3 font-mono">
              Navigate
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(item.href);
                    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: "smooth" });
                  }}
                  className="text-sm text-muted-foreground hover:text-[#0004eb] transition-colors animated-underline w-fit"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:justify-self-end"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0004eb] mb-3 font-mono">
              Connect
            </div>
            <div className="flex gap-2">
              {[
                { href: PROFILE.github, icon: Github, label: "GitHub" },
                { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid place-items-center w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#0004eb]/40 hover:bg-[#0004eb]/10 hover:text-[#0004eb] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="font-mono">
            © {year} {PROFILE.name}. Built with Next.js 16 + Three.js.
          </div>
          <div className="font-mono">
            <span className="text-emerald-400">●</span> All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
