"use client";

import { cn } from "@/lib/cn";
import { type AppId } from "./window-manager";

type Props = {
  open: boolean;
  onClose: () => void;
  apps: Record<AppId, { id: AppId; title: string; icon: React.ReactNode }>;
  onLaunch: (id: AppId) => void;
};

// Lead with the portfolio work so a first-time visitor sees it immediately.
const PORTFOLIO: AppId[] = ["about", "experience", "projects", "skills", "contact", "cv"];
const EXTRAS: AppId[] = [
  "terminal",
  "browser",
  "gallery",
  "music",
  "sudoku",
  "snake",
  "settings",
  "welcome",
  "trash",
];

export default function StartMenu({ open, onClose, apps, onLaunch }: Props) {
  if (!open) return null;

  const launch = (id: AppId) => {
    onLaunch(id);
    onClose();
  };

  const renderItem = (id: AppId) => {
    const a = apps[id];
    if (!a) return null;
    return (
      <li key={id}>
        <button
          type="button"
          onClick={() => launch(id)}
          title={a.title}
          className={cn(
            "group flex w-full flex-col items-center gap-1 rounded-lg px-1 py-2.5",
            "text-center transition-colors hover:bg-canvas/10"
          )}
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center [&>svg]:h-7 [&>svg]:w-7">
            {a.icon}
          </span>
          <span className="line-clamp-1 w-full text-[11px] font-medium text-canvas/90 group-hover:text-primary">
            {a.title}
          </span>
        </button>
      </li>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[9999]"
      onClick={onClose}
      role="dialog"
      aria-label="Start menu"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute bottom-[72px] left-1/2 w-[520px] max-w-[94vw] -translate-x-1/2",
          "flex flex-col overflow-hidden rounded-2xl",
          "bg-ink/95 text-canvas border border-canvas/15 backdrop-blur-xl",
          "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]",
          "animate-[slide-up_160ms_ease-out_both]"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-canvas/10 px-5 py-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary text-[20px] font-black text-on-primary">
            A
          </span>
          <div className="min-w-0">
            <p className="text-[17px] font-bold leading-tight">Ashim Magar</p>
            <p className="text-[12px] text-canvas/60">Full-Stack Web Developer · Nepal</p>
          </div>
        </div>

        {/* App sections — compact Win11-style tile grid */}
        <div className="px-3 py-3">
          <SectionLabel>Portfolio</SectionLabel>
          <ul className="grid grid-cols-5 gap-0.5" aria-label="Portfolio apps">
            {PORTFOLIO.map(renderItem)}
          </ul>

          <SectionLabel className="mt-2">Apps &amp; games</SectionLabel>
          <ul className="grid grid-cols-5 gap-0.5" aria-label="Other apps">
            {EXTRAS.map(renderItem)}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-canvas/10 px-5 py-3 text-[11px] text-canvas/50">
          <span>© 2026 Ashim Thapa Magar</span>
          <span>v1.0</span>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-canvas/40",
        className
      )}
    >
      {children}
    </p>
  );
}
