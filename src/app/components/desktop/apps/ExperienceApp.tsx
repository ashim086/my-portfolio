"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  type ExperienceEntry,
  type ExperienceType,
  experience as allExperience,
} from "@/data/experience";
import AppShell, { type AppTab } from "./AppShell";

type Filter = "all" | ExperienceType;

const BRANCH: Record<ExperienceType, string> = {
  experience: "work",
  education: "edu",
  training: "training",
};

const DOT: Record<ExperienceType, string> = {
  experience: "bg-primary",
  education: "bg-[#5C89AE]",
  training: "bg-accent",
};

// Deterministic 7-char "commit hash" from the entry, so it's stable per render.
function hashOf(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

export default function ExperienceApp() {
  const [filter, setFilter] = useState<Filter>("all");

  const count = (t: ExperienceType) =>
    allExperience.filter((e) => e.type === t).length;

  const tabs: AppTab[] = [
    { id: "all", label: "All", count: allExperience.length },
    { id: "experience", label: "Work", count: count("experience") },
    { id: "education", label: "Education", count: count("education") },
    { id: "training", label: "Training", count: count("training") },
  ];

  const items = useMemo(
    () =>
      filter === "all"
        ? allExperience
        : allExperience.filter((e) => e.type === filter),
    [filter]
  );

  return (
    <AppShell
      fileName="career.git"
      meta="git log --graph"
      tabs={tabs}
      activeTab={filter}
      onTabChange={(id) => setFilter(id as Filter)}
      statusLeft={
        <span className="inline-flex items-center gap-1.5">
          <BranchIcon /> on branch <span className="text-ink">main</span>
        </span>
      }
      statusRight={`${items.length} commits`}
      bodyClassName="p-0"
    >
      <div className="px-4 py-4 font-mono text-[13px] leading-[1.5]">
        <p className="mb-3 px-1 text-[11px] text-mute">
          <span className="text-success">ashim@portfolio</span>
          <span className="text-mute">:</span>
          <span className="text-[#5C89AE]">~/career</span>
          <span className="text-mute">$ </span>
          <span className="text-ink">git log --graph --all</span>
        </p>

        <div className="relative">
          {/* continuous graph line */}
          <span
            aria-hidden
            className="absolute bottom-3 left-[7px] top-2 w-[2px] bg-border"
          />
          {items.map((item, i) => (
            <Commit key={`${item.org}-${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function Commit({ item }: { item: ExperienceEntry }) {
  const [open, setOpen] = useState(item.endDate === null);
  const present = item.endDate === null;
  const hash = hashOf(item.title + item.org + item.startDate);
  const range = `${item.startDate} – ${item.endDate ?? "Present"}`;

  return (
    <div className="relative pb-5 pl-7 last:pb-1">
      {/* node */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-[3px] grid h-4 w-4 place-items-center rounded-full border-2 border-canvas",
          present ? "bg-success" : DOT[item.type]
        )}
      >
        {present ? (
          <span className="h-1.5 w-1.5 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-canvas" />
        ) : null}
      </span>

      {/* commit header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-wrap items-center gap-x-2 gap-y-1 text-left"
      >
        <span className="font-bold text-primary-active">{hash}</span>
        {present ? (
          <Ref className="bg-success/15 text-success">HEAD → main</Ref>
        ) : null}
        <Ref className="bg-surface-alt text-mute">{BRANCH[item.type]}</Ref>
        <span className="ml-auto text-[11px] text-mute">{range}</span>
      </button>

      {/* commit subject */}
      <p className="mt-1 text-[14px] font-bold text-ink">
        <span className="text-mute">{open ? "▾ " : "▸ "}</span>
        {item.title}
      </p>
      <p className="text-[12px] text-mute">
        <span className="text-body">Author:</span> Ashim &lt;{item.org}&gt;
        {item.location ? ` · ${item.location}` : ""}
      </p>

      {/* diff body */}
      {open ? (
        <div className="mt-2 overflow-hidden rounded-sm border border-border bg-surface-alt/60">
          <div className="flex items-center justify-between border-b border-border px-3 py-1 text-[11px] text-mute">
            <span>{item.org.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md</span>
            <span className="text-success">+{item.highlights.length}</span>
          </div>
          <ul className="px-3 py-2">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-[12.5px] leading-[1.5]">
                <span className="select-none font-bold text-success">+</span>
                <span className="text-body">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Ref({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-pill px-2 py-0.5 text-[10px] font-bold tracking-tight",
        className
      )}
    >
      {children}
    </span>
  );
}

function BranchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="text-mute">
      <circle cx="3" cy="3" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="3" cy="9" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9" cy="3" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 4.6v2.8M4.6 3H7.4" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
