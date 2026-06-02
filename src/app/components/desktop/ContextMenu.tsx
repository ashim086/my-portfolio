"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type ContextMenuItem = {
  label?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
};

type Props = {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
};

export default function ContextMenu({ x, y, items, onClose }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x, y });

  // Clamp inside viewport on first paint.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const nx = Math.max(8, Math.min(x, vw - r.width - 8));
    const ny = Math.max(8, Math.min(y, vh - r.height - 8));
    if (nx !== x || ny !== y) setPos({ x: nx, y: ny });
  }, [x, y]);

  // Outside-click + Escape to close.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="menu"
      style={{ left: pos.x, top: pos.y }}
      className={cn(
        "fixed z-[10000] min-w-[220px] py-1 rounded-md",
        "bg-surface border border-ink/40 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)]",
        "text-ink text-[13px] font-sans",
        "animate-[pop-in_140ms_ease-out_both] origin-top-left"
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((it, i) =>
        it.separator ? (
          <div key={i} className="my-1 mx-2 h-px bg-border" />
        ) : (
          <button
            key={i}
            type="button"
            role="menuitem"
            disabled={it.disabled}
            onClick={() => {
              if (it.disabled) return;
              it.onClick?.();
              onClose();
            }}
            className={cn(
              "w-full px-3 py-1.5 flex items-center gap-2.5 text-left",
              "hover:bg-primary/15 active:bg-primary/25",
              "disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed",
              it.danger && "text-accent hover:bg-accent/10"
            )}
          >
            {it.icon ? (
              <span className="inline-flex h-4 w-4 items-center justify-center text-mute [&>svg]:h-4 [&>svg]:w-4">
                {it.icon}
              </span>
            ) : (
              <span className="inline-block h-4 w-4" />
            )}
            <span className="flex-1 truncate">{it.label}</span>
            {it.shortcut ? (
              <span className="ml-2 text-[11px] text-mute font-mono tracking-tight">
                {it.shortcut}
              </span>
            ) : null}
          </button>
        )
      )}
    </div>
  );
}
