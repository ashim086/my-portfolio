"use client";

import { HiArrowRight } from "react-icons/hi";
import { socialLinks } from "@/data/social-links";
import { apps as appRegistry } from "../apps";
import { useWindowManager, type AppId } from "../window-manager";

// The three apps we most want a visitor to open first.
const FEATURED: { id: AppId; title: string; desc: string }[] = [
  { id: "cv", title: "Resume", desc: "Download my CV — one page, everything that matters." },
  { id: "experience", title: "Experience", desc: "Where I've worked, shown as a git commit log." },
  { id: "skills", title: "Skills", desc: "My full stack, laid out like a package.json." },
];

const SECONDARY: AppId[] = ["about", "projects", "contact"];

export default function WelcomeApp() {
  const { open } = useWindowManager();

  return (
    <div className="flex flex-col h-full font-sans select-none">
      {/* Title bar area */}
      <div className="flex items-center h-10 px-4 gap-2 bg-ink/5 border-b border-border shrink-0">
        <span aria-hidden className="h-2 w-2 rounded-[1px] bg-primary shrink-0" />
        <span className="font-mono text-[12px] font-semibold text-mute tracking-tight">
          README.md — ashim@portfolio
        </span>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            <span className="uppercase tracking-[0.08em] font-semibold">
              Welcome · Full-stack Developer
            </span>
          </div>

          <h1 className="text-[30px] leading-[1.1] font-extrabold text-ink tracking-tight">
            Ashim Thapa Magar
          </h1>
          <p className="text-[15px] text-body font-medium -mt-1">
            Full-stack Developer · Nepal, Baneshwor
          </p>
          <p className="text-[13px] text-body leading-[1.7]">
            I build products that ship. Take a look around — start with my resume,
            experience, and skills below, or explore the desktop.
          </p>
        </div>

        {/* Featured — the apps we want clicked first */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
            Start here
          </p>
          <div className="grid gap-2">
            {FEATURED.map(({ id, title, desc }) => (
              <button
                key={id}
                type="button"
                onClick={() => open(id)}
                className="group flex items-center gap-3.5 rounded-md border border-border bg-surface p-3.5 text-left transition-colors hover:border-ink hover:bg-surface-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-canvas border border-border [&>svg]:h-8 [&>svg]:w-8">
                  {appRegistry[id]?.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-bold text-ink">{title}</span>
                  <span className="block text-[12.5px] leading-snug text-mute">{desc}</span>
                </span>
                <HiArrowRight
                  className="h-4 w-4 shrink-0 text-mute transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>

        {/* Secondary apps */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
            More
          </p>
          <div className="flex flex-wrap gap-2">
            {SECONDARY.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => open(id)}
                className="group inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 text-[12.5px] font-semibold text-ink transition-colors hover:border-ink"
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">{appRegistry[id]?.icon}</span>
                {appRegistry[id]?.title}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-border pt-4 space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
            Contact
          </p>
          <div className="text-[13px] font-mono space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-mute text-[11px]">phone</span>
              <span className="text-ink">+977-9748723714</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-mute text-[11px]">location</span>
              <span className="text-ink">Nepal, Baneshwor</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="h-8 w-8 rounded-sm border border-border bg-surface text-ink inline-flex items-center justify-center hover:border-ink hover:bg-surface-alt transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 h-7 bg-surface-alt border-t border-border text-[11px] font-mono text-mute shrink-0">
        <span>UTF-8 · LF · Markdown</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}
