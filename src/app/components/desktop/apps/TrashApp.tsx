"use client";

import { useState, type ReactNode } from "react";
import { HiTrash } from "react-icons/hi";
import { cn } from "@/lib/cn";
import { apps as appRegistry } from "../apps";
import { useWindowManager } from "../window-manager";

/* ----------------------------------------------------------------------------
 * Trash — PostHog-style file explorer.
 * "Recently deleted" = real closed apps (restorable).
 * "Archive" = joke dev files for personality (cannot be recovered).
 * -------------------------------------------------------------------------- */

type ViewMode = "grid" | "list";

function formatTimeAgo(ms: number) {
  const diff = Date.now() - ms;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// Tongue-in-cheek "archived" files — non-restorable, just for flavor.
const ARCHIVE: { name: string; kind: FileKind; meta: string }[] = [
  { name: "ai-girlfriend.tsx", kind: "code", meta: "deprecated project" },
  { name: "final_FINAL_v3_real.fig", kind: "design", meta: "1.2 GB" },
  { name: "node_modules", kind: "folder", meta: "∞ files" },
  { name: "passwords.txt", kind: "text", meta: "do not open" },
  { name: "jquery-spaghetti.js", kind: "code", meta: "2019" },
  { name: "untitled-presentation.pdf", kind: "pdf", meta: "8 MB" },
  { name: "console.log('here').js", kind: "code", meta: "debug" },
];

export default function TrashApp() {
  const { trash, emptyTrash, restoreFromTrash } = useWindowManager();
  const [view, setView] = useState<ViewMode>("grid");
  const [openDeleted, setOpenDeleted] = useState(true);
  const [openArchive, setOpenArchive] = useState(true);

  return (
    <div className="flex h-full flex-col bg-canvas font-sans">
      {/* Toolbar: breadcrumb + view toggle */}
      <div className="flex h-10 flex-shrink-0 items-center gap-2 border-b border-border bg-surface px-3">
        <HiTrash className="h-4 w-4 text-mute" />
        <span className="font-mono text-[12px] font-semibold text-ink">Trash</span>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={emptyTrash}
            disabled={trash.length === 0}
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 text-[12px] font-bold text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <HiTrash className="h-3.5 w-3.5" /> Empty
          </button>
          <div className="flex items-center rounded-sm border border-border bg-surface p-0.5">
            <ViewToggle active={view === "grid"} onClick={() => setView("grid")} label="Grid">
              <svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" /><rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" /><rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" /><rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" /></svg>
            </ViewToggle>
            <ViewToggle active={view === "list"} onClick={() => setView("list")} label="List">
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 2h12M1 7h12M1 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </ViewToggle>
          </div>
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="hidden w-52 flex-shrink-0 flex-col border-r border-border bg-surface-alt/50 p-3 sm:flex">
          <div className="rounded-md border border-border bg-surface p-3">
            <div className="flex items-center gap-2">
              <HiTrash className="h-4 w-4 text-mute" />
              <span className="text-[13px] font-bold text-ink">Trash</span>
            </div>
            <p className="mt-2 text-[12px] leading-[1.5] text-mute">
              Closed apps land here so you can restore them. Archived files are
              gone forever (probably).
            </p>
          </div>
          <dl className="mt-3 space-y-2 px-1 text-[12px]">
            <div className="flex items-center justify-between">
              <dt className="text-mute">Recoverable</dt>
              <dd className="font-mono font-bold text-ink">{trash.length}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-mute">Archived</dt>
              <dd className="font-mono font-bold text-ink">{ARCHIVE.length}</dd>
            </div>
          </dl>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1 overflow-auto p-5">
          {/* Recently deleted */}
          <Section
            title="Recently deleted"
            count={trash.length}
            open={openDeleted}
            onToggle={() => setOpenDeleted((o) => !o)}
          >
            {trash.length === 0 ? (
              <EmptyHint>Nothing here. Close an app and it&apos;ll show up to restore.</EmptyHint>
            ) : view === "grid" ? (
              <div className="flex flex-wrap gap-1">
                {trash.map((item, idx) => (
                  <FileTile
                    key={`${item.appId}-${item.closedAt}-${idx}`}
                    icon={
                      <span className="[&>svg]:h-9 [&>svg]:w-9">
                        {appRegistry[item.appId]?.icon}
                      </span>
                    }
                    name={item.title}
                    onClick={() => restoreFromTrash(idx)}
                    title={`Restore ${item.title}`}
                  />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border rounded-md border border-border bg-surface">
                {trash.map((item, idx) => (
                  <FileRow
                    key={`${item.appId}-${item.closedAt}-${idx}`}
                    icon={
                      <span className="[&>svg]:h-5 [&>svg]:w-5">
                        {appRegistry[item.appId]?.icon}
                      </span>
                    }
                    name={item.title}
                    meta={`Closed ${formatTimeAgo(item.closedAt)}`}
                    action={
                      <button
                        onClick={() => restoreFromTrash(idx)}
                        className="rounded-sm bg-primary px-2.5 py-1 text-[11px] font-bold text-on-primary transition hover:bg-primary-pressed"
                      >
                        Restore
                      </button>
                    }
                  />
                ))}
              </div>
            )}
          </Section>

          {/* Archive */}
          <Section
            title="Archive (cannot be recovered)"
            count={ARCHIVE.length}
            open={openArchive}
            onToggle={() => setOpenArchive((o) => !o)}
            className="mt-6"
          >
            {view === "grid" ? (
              <div className="flex flex-wrap gap-1">
                {ARCHIVE.map((f) => (
                  <FileTile
                    key={f.name}
                    icon={<FileGlyph kind={f.kind} className="h-9 w-9" />}
                    name={f.name}
                    title={`${f.name} · ${f.meta}`}
                    muted
                  />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border rounded-md border border-border bg-surface">
                {ARCHIVE.map((f) => (
                  <FileRow
                    key={f.name}
                    icon={<FileGlyph kind={f.kind} className="h-5 w-5" />}
                    name={f.name}
                    meta={f.meta}
                    muted
                  />
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex h-7 flex-shrink-0 items-center justify-between border-t border-border bg-surface-alt px-3 font-mono text-[11px] text-mute">
        <span>{trash.length + ARCHIVE.length} items</span>
        <span>{trash.length} recoverable</span>
      </div>
    </div>
  );
}

/* ---- pieces ------------------------------------------------------------- */

function ViewToggle({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`${label} view`}
      aria-pressed={active}
      className={cn(
        "grid h-7 w-7 place-items-center rounded-[3px] transition-colors",
        active ? "bg-ink text-canvas" : "text-mute hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function Section({
  title,
  count,
  open,
  onToggle,
  className,
  children,
}: {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={className}>
      <button
        onClick={onToggle}
        className="mb-3 flex w-full items-center gap-2 border-b border-border pb-1.5 text-left"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={cn("text-mute transition-transform", open ? "rotate-0" : "-rotate-90")}
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[13px] font-bold text-ink">{title}</span>
        <span className="font-mono text-[12px] text-mute">({count})</span>
      </button>
      {open ? children : null}
    </section>
  );
}

function FileTile({
  icon,
  name,
  onClick,
  title,
  muted,
}: {
  icon: ReactNode;
  name: string;
  onClick?: () => void;
  title?: string;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={!onClick}
      className={cn(
        "group flex w-[88px] flex-col items-center gap-1.5 rounded-md p-2 text-center transition-colors",
        onClick ? "cursor-pointer hover:bg-surface-alt" : "cursor-default"
      )}
    >
      <span
        className={cn(
          "grid h-12 w-12 place-items-center transition-transform",
          onClick && "group-hover:scale-105",
          muted && "opacity-70 grayscale-[0.2]"
        )}
      >
        {icon}
      </span>
      <span className="line-clamp-2 text-[11px] leading-[1.3] text-body">{name}</span>
    </button>
  );
}

function FileRow({
  icon,
  name,
  meta,
  action,
  muted,
}: {
  icon: ReactNode;
  name: string;
  meta: string;
  action?: ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <span className={cn("grid h-6 w-6 shrink-0 place-items-center", muted && "opacity-70")}>
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink">{name}</span>
      <span className="shrink-0 font-mono text-[11px] text-mute">{meta}</span>
      {action ? <span className="shrink-0">{action}</span> : null}
    </div>
  );
}

function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-surface/50 px-4 py-6 text-center text-[12px] italic text-mute">
      {children}
    </div>
  );
}

/* ---- file-type glyphs --------------------------------------------------- */

type FileKind = "code" | "design" | "folder" | "text" | "pdf";

const PAPER = "#F3E8D3";
const PAPER_SH = "#E2D4B8";
const INK = "#2C2823";
const RED = "#D9523F";
const YEL = "#F2B53C";
const BLU = "#5C89AE";
const GRN = "#6F9B4E";

function FileGlyph({ kind, className }: { kind: FileKind; className?: string }) {
  if (kind === "folder") {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden>
        <path d="M5 12a3 3 0 0 1 3-3h8l3 3h13a3 3 0 0 1 3 3v15a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" fill={YEL} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M5 16h30" stroke={INK} strokeWidth="1.2" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden strokeLinejoin="round">
      <path d="M10 4h14l8 8v22a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <path d="M24 4v8h8" fill={PAPER_SH} stroke={INK} strokeWidth="1.6" />
      {kind === "code" && (
        <g stroke={BLU} strokeWidth="1.8" fill="none" strokeLinecap="round">
          <path d="M17 21l-3 3 3 3" />
          <path d="M23 21l3 3-3 3" />
        </g>
      )}
      {kind === "text" && (
        <g stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
          <path d="M14 20h12M14 24h12M14 28h8" />
        </g>
      )}
      {kind === "pdf" && (
        <rect x="13" y="22" width="14" height="9" rx="1" fill={RED} />
      )}
      {kind === "design" && (
        <g>
          <circle cx="16" cy="25" r="3" fill={RED} />
          <circle cx="24" cy="22" r="3" fill={GRN} />
          <circle cx="22" cy="29" r="3" fill={BLU} />
        </g>
      )}
    </svg>
  );
}
