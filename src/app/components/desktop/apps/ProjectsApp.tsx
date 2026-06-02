"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { HiArrowRight, HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/cn";
import { projects, type Project } from "@/data/projects";
import { useWindowManager } from "../window-manager";
import { setBrowserUrl } from "./BrowserApp";

type ViewMode = "grid" | "list";

export default function ProjectsApp() {
  const { open } = useWindowManager();
  const [view, setView] = useState<ViewMode>("list");
  const [selected, setSelected] = useState<string | null>(null);

  const openLive = (link: string) => {
    setBrowserUrl(link);
    open("browser");
  };

  const active = projects.find((p) => p.slug === selected) ?? null;

  return (
    <div className="flex h-full flex-col bg-canvas font-sans">
      {/* Toolbar: breadcrumb + view toggle */}
      <div className="flex h-10 flex-shrink-0 items-center gap-2 border-b border-border bg-surface px-3">
        <FolderIcon className="h-4 w-4 text-mute" />
        <span className="font-mono text-[12px] font-semibold text-ink">
          ~/projects
          {active ? (
            <span className="text-mute"> / {active.slug}</span>
          ) : null}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <a
            href="https://github.com/ashim086"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 text-[12px] font-bold text-ink transition hover:border-ink"
          >
            <FaGithub className="h-3.5 w-3.5" /> All repos
          </a>
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

      {/* Body: explorer sidebar + content */}
      <div className="flex min-h-0 flex-1">
        {/* Sidebar: file tree */}
        <aside className="hidden w-52 flex-shrink-0 flex-col border-r border-border bg-surface-alt/50 p-2 sm:flex">
          <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-stone">
            Explorer
          </p>
          <nav className="space-y-0.5">
            <TreeItem
              icon={<FolderIcon className="h-4 w-4 text-primary-active" />}
              label="All projects"
              active={selected === null}
              onClick={() => setSelected(null)}
            />
            {projects.map((p) => (
              <TreeItem
                key={p.slug}
                icon={<FileGlyph className="h-4 w-4" />}
                label={p.slug}
                indent
                active={selected === p.slug}
                onClick={() => setSelected(p.slug)}
              />
            ))}
          </nav>
          <dl className="mt-auto space-y-2 border-t border-border px-2 pt-3 text-[12px]">
            <div className="flex items-center justify-between">
              <dt className="text-mute">Repos</dt>
              <dd className="font-mono font-bold text-ink">{projects.length}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-mute">Live</dt>
              <dd className="font-mono font-bold text-success">{projects.length}</dd>
            </div>
          </dl>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1 overflow-auto p-5">
          {active ? (
            <ProjectDetail project={active} onOpenLive={openLive} onBack={() => setSelected(null)} />
          ) : (
            <>
              <div className="mb-4 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
                  Recent work
                </p>
                <h2 className="text-[22px] font-extrabold tracking-tight text-ink">
                  A few things I&apos;ve shipped
                </h2>
                <p className="text-[13px] text-mute">
                  Production apps, not toy demos. Open one to see the details.
                </p>
              </div>

              {view === "grid" ? (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {projects.map((p) => (
                    <ProjectCard
                      key={p.slug}
                      project={p}
                      onSelect={() => setSelected(p.slug)}
                      onOpenLive={() => openLive(p.link)}
                    />
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-border rounded-md border border-border bg-surface">
                  {projects.map((p) => (
                    <ProjectRow
                      key={p.slug}
                      project={p}
                      onSelect={() => setSelected(p.slug)}
                      onOpenLive={() => openLive(p.link)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex h-7 flex-shrink-0 items-center justify-between border-t border-border bg-surface-alt px-3 font-mono text-[11px] text-mute">
        <span>{projects.length} projects</span>
        <span>{active ? active.slug : "↗ opens in Browser"}</span>
      </div>
    </div>
  );
}

/* ---- grid card ---------------------------------------------------------- */

function ProjectCard({
  project,
  onSelect,
  onOpenLive,
}: {
  project: Project;
  onSelect: () => void;
  onOpenLive: () => void;
}) {
  return (
    <div className="group rounded-md border border-border bg-surface transition-colors hover:border-ink">
      {/* Mini window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-alt px-3 py-1.5">
        <span className="flex items-center gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#E5484D]" />
          <span className="h-2 w-2 rounded-full bg-[#F2B53C]" />
          <span className="h-2 w-2 rounded-full bg-[#6F9B4E]" />
        </span>
        <span className="truncate font-mono text-[11px] text-mute">{project.slug}.app</span>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-canvas">
          <Image
            src={project.photo}
            alt={project.name}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 420px"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 4).map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
          <h3 className="mt-2.5 text-[15px] font-bold text-ink">{project.name}</h3>
          <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.5] text-mute">
            {project.description}
          </p>
        </div>
      </button>
      <div className="flex items-center justify-between border-t border-border px-4 py-2">
        <button onClick={onSelect} className="text-[12px] font-bold text-mute hover:text-ink">
          Details
        </button>
        <button
          onClick={onOpenLive}
          className="inline-flex items-center gap-1 text-[12px] font-bold text-accent hover:underline"
        >
          View live
          <HiArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ---- list row ----------------------------------------------------------- */

function ProjectRow({
  project,
  onSelect,
  onOpenLive,
}: {
  project: Project;
  onSelect: () => void;
  onOpenLive: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <button
        onClick={onSelect}
        className="relative h-11 w-16 shrink-0 overflow-hidden rounded-sm border border-border bg-canvas"
        aria-label={`Open ${project.name}`}
      >
        <Image src={project.photo} alt="" fill className="object-cover object-top" sizes="64px" />
      </button>
      <button onClick={onSelect} className="min-w-0 flex-1 text-left">
        <p className="truncate text-[13.5px] font-bold text-ink">{project.name}</p>
        <p className="truncate font-mono text-[11px] text-mute">
          {project.stack.slice(0, 4).join(" · ")}
        </p>
      </button>
      <button
        onClick={onOpenLive}
        className="inline-flex shrink-0 items-center gap-1 rounded-sm border border-border bg-surface px-2.5 py-1 text-[11px] font-bold text-ink transition hover:border-ink"
      >
        <HiExternalLink className="h-3.5 w-3.5" /> Live
      </button>
    </div>
  );
}

/* ---- detail view -------------------------------------------------------- */

function ProjectDetail({
  project,
  onOpenLive,
  onBack,
}: {
  project: Project;
  onOpenLive: (link: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-mute hover:text-ink"
      >
        <HiArrowRight className="h-3.5 w-3.5 rotate-180" aria-hidden /> All projects
      </button>

      {/* Big windowed screenshot */}
      <div className="overflow-hidden rounded-md border border-border bg-surface">
        <div className="flex items-center gap-2 border-b border-border bg-surface-alt px-3 py-1.5">
          <span className="flex items-center gap-1" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#E5484D]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F2B53C]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#6F9B4E]" />
          </span>
          <span className="truncate font-mono text-[11px] text-mute">{project.link}</span>
        </div>
        <div className="relative aspect-[16/9] w-full bg-canvas">
          <Image
            src={project.photo}
            alt={project.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-[24px] font-extrabold tracking-tight text-ink">{project.name}</h2>
        <p className="text-[15px] leading-[1.65] text-body">{project.description}</p>

        <div>
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
            Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => onOpenLive(project.link)}
            className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-primary px-3 text-[13px] font-bold text-on-primary transition hover:bg-primary-pressed active:translate-y-px"
          >
            <HiArrowRight className="h-4 w-4" /> Open live preview
          </button>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-sm border border-border bg-surface px-3 text-[13px] font-bold text-ink transition hover:border-ink"
          >
            <HiExternalLink className="h-4 w-4" /> Open in new tab
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---- shared bits -------------------------------------------------------- */

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-pill border border-border bg-canvas px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] text-mute">
      {children}
    </span>
  );
}

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

function TreeItem({
  icon,
  label,
  active,
  indent,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  indent?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[12.5px] transition-colors",
        indent && "pl-5",
        active ? "bg-primary/15 font-bold text-ink" : "text-body hover:bg-surface-alt"
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate font-mono">{label}</span>
    </button>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path
        d="M1.5 4a1 1 0 0 1 1-1h3l1.2 1.2H13.5a1 1 0 0 1 1 1v6.3a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function FileGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path
        d="M4 1.5h5l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2.5a1 1 0 0 1 1-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M9 1.5v3h3" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5.5 9l-1 1 1 1M10.5 9l1 1-1 1" stroke="var(--accent)" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}
