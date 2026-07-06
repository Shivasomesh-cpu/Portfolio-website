"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, PROFILE } from "@/lib/portfolio-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("#about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.querySelector(i.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).offsetTop - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 3.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-[#050516]/70 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="group flex items-center gap-3"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 grid place-items-center rounded-md border border-[#0004eb]/40">
              <span className="font-display font-bold text-sm text-[#6e7bff]">
                {PROFILE.initials}
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-sm font-medium tracking-wide">
                {PROFILE.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                {PROFILE.role}
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 hover-weight ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="group relative px-5 py-2.5 rounded-full text-sm font-medium bg-[#0004eb] text-white overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10">GitHub</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[#050516]/90 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#0a0a1f] border-l border-white/5 p-6 pt-24 flex flex-col gap-2"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-[#0004eb]/10 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="mt-4 px-5 py-3 rounded-full text-center text-sm font-medium bg-[#0004eb] text-white"
              >
                View GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
