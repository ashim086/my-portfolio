"use client";

import { useEffect, useState } from "react";

type Props = {
  onDone: () => void;
  durationMs?: number;
};

// Boot log lines — framed as loading a portfolio, revealed in sequence.
const LINES = [
  "initializing portfolio",
  "loading profile … ashim-thapa-magar",
  "mounting projects (4)",
  "compiling skills.json",
  "reading experience.git",
  "starting desktop",
];

export default function BootScreen({ onDone, durationMs = 2000 }: Props) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const p = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(p);
      if (p >= 100) {
        window.setTimeout(() => {
          setVisible(false);
          window.setTimeout(onDone, 140);
        }, 280);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onDone]);

  if (!visible) return null;

  // How many log lines are revealed so far (reserve the last 15% for the bar).
  const shown = Math.min(LINES.length, Math.floor((progress / 88) * LINES.length));
  const done = progress >= 100;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#1A1B16] text-[#EEEFE9] select-none"
      role="status"
      aria-label="Loading Ashim's portfolio"
    >
      <div className="w-full max-w-[420px] px-8">
        {/* Identity */}
        <div className="mb-7 flex items-center gap-3.5">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F7A501] shadow-[0_0_40px_-8px_rgba(247,165,1,0.6)]">
            <span className="font-sans text-[26px] font-black tracking-tight text-[#1A1B16]">
              A
            </span>
          </div>
          <div>
            <p className="text-[17px] font-bold tracking-tight text-[#EEEFE9]">
              Ashim Thapa Magar
            </p>
            <p className="text-[12px] text-[#EEEFE9]/45">
              Full-stack developer · portfolio
            </p>
          </div>
        </div>

        {/* Boot log */}
        <div className="min-h-[132px] space-y-1 font-mono text-[12.5px] leading-[1.6]">
          {LINES.slice(0, shown).map((line) => (
            <div
              key={line}
              className="flex items-center gap-2 animate-[fade-in_220ms_ease-out_both]"
            >
              <span className="text-[#3DDC84]">✓</span>
              <span className="text-[#EEEFE9]/70">{line}</span>
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-[#3DDC84]/70">
                ok
              </span>
            </div>
          ))}
          {!done && (
            <div className="flex items-center gap-2 text-[#EEEFE9]/50">
              <span className="text-[#F7A501]">›</span>
              <span className="inline-block h-3.5 w-2 animate-[pulse-dot_1s_step-end_infinite] bg-[#F7A501]/80" />
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-[#F7A501] transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#EEEFE9]/30">
            <span>{done ? "welcome" : "loading"}</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
