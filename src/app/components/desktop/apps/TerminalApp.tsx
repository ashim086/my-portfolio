"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { socialLinks } from "@/data/social-links";

type Tone = "muted" | "accent" | "success";
type Line =
  | { kind: "in"; text: string }
  | { kind: "out"; text: string; tone?: Tone };

const BANNER = [
  "ashim@portfolio — shell v1.0",
  "Type 'help' for a list of commands.",
  "",
];

const COMMANDS = [
  "help",
  "whoami",
  "about",
  "stack",
  "projects",
  "experience",
  "skills",
  "contact",
  "social",
  "cv",
  "clear",
  "theme",
  "echo",
  "date",
  "ls",
  "cat",
] as const;

type Cmd = (typeof COMMANDS)[number];

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>(() =>
    BANNER.map<Line>((t) => ({ kind: "out", text: t, tone: "muted" }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const out = (text: string, tone?: Tone) =>
    setLines((prev) => [...prev, { kind: "out", text, tone }]);

  const run = (raw: string) => {
    const text = raw.trim();
    setLines((prev) => [...prev, { kind: "in", text: raw }]);
    if (!text) return;

    setHistory((h) => [...h, text]);
    setHistoryIdx(null);

    const [cmd, ...rest] = text.split(/\s+/);
    const arg = rest.join(" ");

    switch (cmd as Cmd) {
      case "help":
        out("Available commands:", "muted");
        out("  help         show this help", "muted");
        out("  whoami       short intro", "muted");
        out("  about        longer intro", "muted");
        out("  stack        tech stack as JSON", "muted");
        out("  projects     list shipped projects", "muted");
        out("  experience   list work history", "muted");
        out("  skills       list skill categories", "muted");
        out("  contact      how to reach me", "muted");
        out("  social       social links", "muted");
        out("  cv           open resume.pdf", "accent");
        out("  theme        toggle dark/light", "muted");
        out("  clear        clear the screen", "muted");
        out("  date         show current date/time", "muted");
        out("  echo <text>  print text", "muted");
        out("  ls           list files (joke)", "muted");
        out("  cat <file>   read a file (joke)", "muted");
        break;
      case "whoami":
        out("ashim@portfolio:~$ Full-Stack Web Developer from Nepal.", "accent");
        break;
      case "about":
        out(
          "I build with TypeScript, ship with Docker, and care more about production stability than clever abstractions.",
          "accent"
        );
        break;
      case "stack":
        out("{", "muted");
        out('  "language": ["TypeScript", "Java", "C#"],', "muted");
        out('  "frontend": ["Next.js", "React", "Tailwind"],', "muted");
        out('  "backend":  ["Node", "Express", "Prisma"],', "muted");
        out('  "infra":    ["Docker", "AWS EC2", "Vercel"]', "muted");
        out("}", "muted");
        break;
      case "projects":
        projects.forEach((p) =>
          out(`  • ${p.name}  →  ${p.link}`, "accent")
        );
        break;
      case "experience":
        experience
          .filter((e) => e.type === "experience")
          .forEach((e) =>
            out(
              `  ${e.startDate} – ${e.endDate ?? "Present"}  ${e.org}  ·  ${e.title}`,
              "accent"
            )
          );
        break;
      case "skills":
        [
          "Languages:    TypeScript, Java, C#",
          "Frontend:     React, Next.js, Tailwind, Shadcn UI",
          "State/API:    TanStack Query, Zustand, React Context, Axios",
          "Backend:      Node.js, Express, MongoDB, PostgreSQL, Prisma",
          "Auth/Sec:     JWT, OAuth, Session Management",
          "DevOps:       Docker, AWS EC2, Vercel, Render",
          "Integrations: eSewa, Khalti, PostHog, GA, Calendly",
          "Others:       WebSockets, REST APIs, AI API Integration",
        ].forEach((l) => out("  " + l, "muted"));
        break;
      case "contact":
        out("  email:    magarashim69086@gmail.com", "accent");
        out("  phone:    +977-9748723714", "accent");
        out("  location: Nepal, Baneshwor", "accent");
        out("  whatsapp: https://wa.me/9779748723714", "accent");
        break;
      case "social":
        socialLinks.forEach((s) => out(`  ${s.label}: ${s.href}`, "accent"));
        break;
      case "cv":
        out("Opening Resume.pdf…", "success");
        window.dispatchEvent(new CustomEvent("ashim:open-app", { detail: "cv" }));
        break;
      case "theme":
        document.documentElement.setAttribute(
          "data-theme",
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark"
        );
        out("Theme toggled.", "success");
        break;
      case "clear":
        setLines([]);
        break;
      case "date":
        out(new Date().toString(), "muted");
        break;
      case "echo":
        out(arg || "");
        break;
      case "ls":
        out("about.mdx  skills.json  projects/  contact.md  resume.pdf  trash/", "muted");
        break;
      case "cat":
        if (!arg) out("cat: missing operand", "muted");
        else if (arg === "stack.json") {
          out("{", "muted");
          out('  "language": "TypeScript",', "muted");
          out('  "framework": "Next.js"', "muted");
          out("}", "muted");
        } else if (arg.endsWith(".pdf")) {
          out("Use the 'cv' command or open Resume.pdf from the desktop.", "accent");
        } else {
          out(`cat: ${arg}: No such file or directory`, "muted");
        }
        break;
      default:
        out(
          `command not found: ${cmd}. Try 'help'.`,
          "muted"
        );
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next =
        historyIdx === null
          ? history.length - 1
          : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(null);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input));
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="h-full flex flex-col bg-ink text-canvas font-mono text-[12.5px] leading-[1.55]"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-auto p-3">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.kind === "in" ? (
              <span>
                <span className="text-success">ashim@portfolio</span>
                <span className="text-mute">:</span>
                <span className="text-accent">~</span>
                <span className="text-mute">$ </span>
                <span className="text-canvas">{l.text}</span>
              </span>
            ) : (
              <span
                className={cn(
                  l.tone === "accent" && "text-primary",
                  l.tone === "success" && "text-success",
                  l.tone === "muted" && "text-canvas/70",
                  !l.tone && "text-canvas"
                )}
              >
                {l.text}
              </span>
            )}
          </div>
        ))}
        <div className="flex items-center gap-0">
          <span className="text-success">ashim@portfolio</span>
          <span className="text-mute">:</span>
          <span className="text-accent">~</span>
          <span className="text-mute">$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="flex-1 bg-transparent outline-none border-0 text-canvas ml-1 caret-primary"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
