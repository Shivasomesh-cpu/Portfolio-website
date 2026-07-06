"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, MapPin, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PROFILE } from "@/lib/portfolio-data";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    // Open user's email client with prefilled mailto link
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client…");
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  const socials = [
    { label: "GitHub", href: PROFILE.github, handle: PROFILE.githubHandle, icon: Github },
    { label: "LinkedIn", href: PROFILE.linkedin, handle: PROFILE.linkedinHandle, icon: Linkedin },
    { label: "Email", href: `mailto:${PROFILE.email}`, handle: PROFILE.email, icon: Mail },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-br from-[#0004eb]/15 to-[#0004eb]/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          index="05"
          title="Let's Build"
          subtitle="Open for Summer 2027 internships and ambitious side-projects. If you're shipping something where correctness matters, I want to hear about it."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
          {/* Left: contact info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <div className="p-6 rounded-2xl glass">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#0004eb] mb-3 font-mono">
                Reach me at
              </div>
              <a
                href={`mailto:${PROFILE.email}`}
                className="font-display text-lg sm:text-xl font-medium gradient-text-blue hover:underline break-all"
              >
                {PROFILE.email}
              </a>
              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{PROFILE.location}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {socials.map(({ label, href, handle, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl glass glass-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid place-items-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#0004eb]/20 to-[#0004eb]/20 border border-[#0004eb]/30">
                      <Icon size={16} className="text-[#0004eb]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {handle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground group-hover:text-[#0004eb] group-hover:rotate-12 transition-all"
                  />
                </a>
              ))}
            </div>

            {/* GitHub CTA */}
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="block p-5 rounded-2xl bg-gradient-to-r from-[#0004eb]/10 to-[#0004eb]/10 border border-[#0004eb]/20 hover:border-[#0004eb]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#0004eb] mb-1 font-mono">
                    All Repositories
                  </div>
                  <div className="font-display text-base font-semibold">
                    Browse on GitHub →
                  </div>
                </div>
                <div className="font-mono text-xs text-muted-foreground">
                  {PROFILE.githubHandle}
                </div>
              </div>
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-6 rounded-2xl glass space-y-4"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#0004eb] mb-2 font-mono">
              Send a message
            </div>

            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                Your name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ada Lovelace"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#0004eb]/50 focus:bg-white/[0.05] focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                Your email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ada@analytical.engine"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#0004eb]/50 focus:bg-white/[0.05] focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What are you building? What needs to be correct under concurrency?"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#0004eb]/50 focus:bg-white/[0.05] focus:outline-none transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm bg-gradient-to-r from-[#0004eb] to-[#0004eb] text-background overflow-hidden transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              <span className="relative z-10">
                {sending ? "Opening email client…" : "Send message"}
              </span>
              <Send size={14} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0004eb] to-[#0004eb] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>

            <p className="text-[10px] text-muted-foreground text-center">
              Submitting opens your email client with a prefilled message to {PROFILE.email}.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
