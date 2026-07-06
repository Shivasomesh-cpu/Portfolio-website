"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Audio toggle — generates subtle hover/click sounds via Web Audio API.
 * No external audio files needed. Off by default (user must opt-in).
 */
export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!enabled) return;
    // Create audio context lazily on enable
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch {
        // AudioContext not supported — disable gracefully
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEnabled(false);
        return;
      }
    }

    const playHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("a, button, [role='button'], input, textarea, select")) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    };

    const playClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("a, button, [role='button']")) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    };

    window.addEventListener("mouseover", playHover);
    window.addEventListener("click", playClick);
    return () => {
      window.removeEventListener("mouseover", playHover);
      window.removeEventListener("click", playClick);
    };
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((v) => !v)}
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      className="fixed bottom-6 left-6 z-40 grid place-items-center w-10 h-10 rounded-full glass glass-hover"
      data-cursor="hover"
    >
      {enabled ? (
        <Volume2 size={14} className="text-[#0004eb]" />
      ) : (
        <VolumeX size={14} className="text-muted-foreground" />
      )}
      {enabled && (
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      )}
    </button>
  );
}
