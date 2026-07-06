"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, User, Code, Rocket, Mail, Github, Linkedin, ArrowUp, CornerDownLeft,
} from "lucide-react";
import { COMMANDS } from "@/lib/portfolio-data";

const ICONS: Record<string, React.ElementType> = {
  user: User,
  code: Code,
  rocket: Rocket,
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  "arrow-up": ArrowUp,
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.hint.toLowerCase().includes(query.toLowerCase())
  );

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const runCommand = useCallback((cmd: typeof COMMANDS[number]) => {
    if (cmd.section) {
      scrollTo(cmd.section);
    } else if (cmd.url) {
      window.open(cmd.url, "_blank", "noreferrer");
    }
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      // Escape closes
      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
      }
      // Arrow navigation
      if (open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        setActive((a) => {
          if (e.key === "ArrowDown") return Math.min(a + 1, filtered.length - 1);
          return Math.max(a - 1, 0);
        });
      }
      // Enter
      if (open && e.key === "Enter" && filtered[active]) {
        e.preventDefault();
        runCommand(filtered[active]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, runCommand]);

  // Reset active when query changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(0);
  }, [query]);

  return (
    <>
      {/* Trigger hint — floating badge bottom-right */}
      {!open && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          onClick={() => setOpen(true)}
          className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-3 py-2 rounded-lg glass glass-hover text-xs font-mono"
          aria-label="Open command palette"
        >
          <Search size={12} className="text-[#0004eb]" />
          <span className="text-muted-foreground">Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[10px]">⌘K</kbd>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-start justify-center pt-[15vh] px-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/70 backdrop-blur-md"
              onClick={() => { setOpen(false); setQuery(""); }}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-xl rounded-2xl glass border border-border/60 bg-card/95 overflow-hidden shadow-2xl"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/50">
                <Search size={16} className="text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, sections, links…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
                />
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[10px] font-mono text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No matches for "{query}"
                  </div>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = ICONS[cmd.icon] || Search;
                    const isActive = i === active;
                    return (
                      <button
                        key={cmd.id}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => runCommand(cmd)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          isActive ? "bg-[#0004eb]/10" : "hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className={`grid place-items-center w-8 h-8 rounded-md shrink-0 ${
                          isActive ? "bg-gradient-to-br from-[#0004eb]/30 to-[#0004eb]/30 border border-[#0004eb]/40" : "bg-white/[0.04] border border-white/10"
                        }`}>
                          <Icon size={14} className={isActive ? "text-[#0004eb]" : "text-muted-foreground"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {cmd.label}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {cmd.hint}
                          </div>
                        </div>
                        {isActive && (
                          <CornerDownLeft size={12} className="text-[#0004eb] shrink-0" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border/50 text-[10px] font-mono text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span><kbd className="px-1 py-0.5 rounded bg-white/10">↑↓</kbd> navigate</span>
                  <span><kbd className="px-1 py-0.5 rounded bg-white/10">↵</kbd> select</span>
                </div>
                <span>Shiva Somesh</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
