"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ----------------------------------------------------------------------------
 * AppShell — the shared PostHog-style window interior.
 *
 * Layout: [toolbar] -> optional [tab strip] -> scrollable [body] -> [status bar].
 * Every content app drops its body inside and gets a consistent document-app
 * chrome: a mono filename + meta on the left of the toolbar, real action
 * buttons on the right, an optional segmented tab strip, and a status bar.
 * -------------------------------------------------------------------------- */

export type AppTab = { id: string; label: string; count?: number };

type AppShellProps = {
  /** Mono filename label shown left of the toolbar, e.g. "about.md". */
  fileName: string;
  /** Small glyph rendered before the filename. */
  fileIcon?: ReactNode;
  /** Dim meta text after the filename, e.g. "1,200 words · saved". */
  meta?: string;
  /** Right-aligned toolbar cluster (buttons, share pill, etc.). */
  actions?: ReactNode;
  /** Optional segmented tab strip below the toolbar. */
  tabs?: AppTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  /** Status bar text. */
  statusLeft?: ReactNode;
  statusRight?: ReactNode;
  /** Override body padding/scroll. */
  bodyClassName?: string;
  children: ReactNode;
};

export default function AppShell({
  fileName,
  fileIcon,
  meta,
  actions,
  tabs,
  activeTab,
  onTabChange,
  statusLeft,
  statusRight,
  bodyClassName,
  children,
}: AppShellProps) {
  return (
    <div className="flex h-full flex-col bg-canvas font-sans">
      {/* Toolbar */}
      <div className="flex h-10 flex-shrink-0 items-center gap-2 border-b border-border bg-surface px-3">
        <span aria-hidden className="grid h-5 w-5 shrink-0 place-items-center text-mute">
          {fileIcon ?? <DefaultGlyph />}
        </span>
        <span className="truncate font-mono text-[12px] font-semibold text-ink">
          {fileName}
        </span>
        {meta ? (
          <span className="hidden truncate font-mono text-[11px] text-stone sm:inline">
            · {meta}
          </span>
        ) : null}
        <div className="ml-auto flex items-center gap-1.5">{actions}</div>
      </div>

      {/* Tab strip */}
      {tabs && tabs.length > 0 ? (
        <div
          role="tablist"
          className="flex flex-shrink-0 items-stretch gap-0.5 overflow-x-auto border-b border-border bg-surface-alt px-2"
        >
          {tabs.map((t) => {
            const active = t.id === activeTab;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange?.(t.id)}
                className={cn(
                  "relative -mb-px whitespace-nowrap px-3 py-2 text-[12.5px] font-semibold transition-colors",
                  active
                    ? "text-ink"
                    : "text-mute hover:text-ink"
                )}
              >
                {t.label}
                {typeof t.count === "number" ? (
                  <span
                    className={cn(
                      "ml-1.5 rounded-pill px-1.5 py-px text-[10px] font-bold tabular-nums",
                      active ? "bg-primary/20 text-ink" : "bg-border/60 text-mute"
                    )}
                  >
                    {t.count}
                  </span>
                ) : null}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-2 bottom-0 h-[2px] rounded-full transition-colors",
                    active ? "bg-primary" : "bg-transparent"
                  )}
                />
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Body */}
      <div className={cn("min-h-0 flex-1 overflow-y-auto", bodyClassName ?? "p-6")}>
        {children}
      </div>

      {/* Status bar */}
      {(statusLeft || statusRight) && (
        <div className="flex h-7 flex-shrink-0 items-center justify-between border-t border-border bg-surface-alt px-3 font-mono text-[11px] text-mute">
          <span className="truncate">{statusLeft}</span>
          <span className="ml-3 shrink-0 truncate">{statusRight}</span>
        </div>
      )}
    </div>
  );
}

/* ---- Toolbar primitives ------------------------------------------------- */

export function TbButton({
  children,
  href,
  onClick,
  download,
  external,
  primary,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  download?: boolean;
  external?: boolean;
  primary?: boolean;
}) {
  const cls = cn(
    "inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-[12px] font-bold transition active:translate-y-px",
    primary
      ? "bg-primary text-on-primary hover:bg-primary-pressed"
      : "border border-border bg-surface text-ink hover:border-ink"
  );
  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/** Decorative formatting controls — echoes PostHog's word-processor toolbar.
 *  Purely cosmetic; aria-hidden and not focusable. */
export function FormatStrip() {
  return (
    <div
      aria-hidden
      className="hidden items-center gap-1 pr-1 text-mute md:flex"
    >
      <FmtKey>B</FmtKey>
      <FmtKey italic>I</FmtKey>
      <FmtKey underline>U</FmtKey>
      <span className="mx-1 h-4 w-px bg-border" />
      <FmtIcon path="M2 3h8M2 6h6M2 9h8" />
      <FmtIcon path="M3 3h6M2 6h8M3 9h6" />
    </div>
  );
}

function FmtKey({
  children,
  italic,
  underline,
}: {
  children: ReactNode;
  italic?: boolean;
  underline?: boolean;
}) {
  return (
    <span
      className={cn(
        "grid h-7 w-7 place-items-center rounded-sm text-[12px] font-bold hover:bg-surface-alt",
        italic && "italic font-serif",
        underline && "underline"
      )}
    >
      {children}
    </span>
  );
}

function FmtIcon({ path }: { path: string }) {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-sm hover:bg-surface-alt">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path d={path} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function DefaultGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
      <path
        d="M3 1.5h7l3 3v9.5a.5.5 0 0 1-.5.5h-9.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5z"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M10 1.5v3h3" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Uppercase tracked eyebrow used across editorial app bodies. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
      {children}
    </p>
  );
}
