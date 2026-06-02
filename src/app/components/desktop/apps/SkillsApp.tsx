"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { skillCategories } from "@/data/skills";
import AppShell from "./AppShell";

// Plausible versions for well-known tech; everything else gets a stable
// generated semver so the file reads like a real package.json.
const KNOWN: Record<string, string> = {
  react: "^18.3.0",
  next: "^15.3.0",
  typescript: "^5.6.0",
  javascript: "^2024.0.0",
  "node": "^20.11.0",
  express: "^4.19.0",
  tailwindcss: "^4.0.0",
  prisma: "^5.18.0",
  mongodb: "^6.8.0",
  postgresql: "^16.0.0",
  zustand: "^4.5.0",
  axios: "^1.7.0",
  docker: "^26.0.0",
  vercel: "^34.0.0",
  jwt: "^9.0.0",
  posthog: "^1.150.0",
};

function toPkg(name: string) {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/\.js$/, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function versionOf(name: string) {
  const key = toPkg(name).split("-")[0];
  if (KNOWN[key]) return KNOWN[key];
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h >>>= 0;
  return `^${(h % 5) + 1}.${h % 18}.${h % 10}`;
}

export default function SkillsApp() {
  const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggle = (title: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  return (
    <AppShell
      fileName="package.json"
      meta={`${total} dependencies`}
      statusLeft={
        <span>
          npm · <span className="text-success">{total} packages</span>, 0 vulnerabilities
        </span>
      }
      statusRight={`${skillCategories.length} groups`}
      bodyClassName="p-0"
    >
      <div className="px-4 py-4 font-mono text-[13px] leading-[1.7]">
        <Line>
          <Brace>{"{"}</Brace>
        </Line>
        <Line indent={1}>
          <Key>&quot;name&quot;</Key>
          <Colon /> <Str>&quot;ashim-thapa-magar&quot;</Str>,
        </Line>
        <Line indent={1}>
          <Key>&quot;role&quot;</Key>
          <Colon /> <Str>&quot;full-stack-developer&quot;</Str>,
        </Line>
        <Line indent={1}>
          <Key>&quot;engines&quot;</Key>
          <Colon /> <Str>&quot;node &gt;= shipping&quot;</Str>,
        </Line>

        {skillCategories.map((cat, ci) => {
          const isCollapsed = collapsed.has(cat.title);
          const key = toPkg(cat.title);
          const lastGroup = ci === skillCategories.length - 1;
          return (
            <div key={cat.title}>
              <button
                onClick={() => toggle(cat.title)}
                className="flex w-full items-center text-left hover:bg-surface-alt/60"
              >
                <Line indent={1}>
                  <span className="text-mute">{isCollapsed ? "▸ " : "▾ "}</span>
                  <GroupKey>&quot;{key}&quot;</GroupKey>
                  <Colon /> <Brace>{"{"}</Brace>
                  {isCollapsed ? (
                    <span className="text-stone">
                      {" "}… {cat.skills.length} {"}"}
                      {lastGroup ? "" : ","}
                    </span>
                  ) : null}
                </Line>
              </button>

              {!isCollapsed && (
                <>
                  {cat.skills.map((s, si) => (
                    <Line key={s.name} indent={2}>
                      <Key>&quot;{toPkg(s.name)}&quot;</Key>
                      <Colon />{" "}
                      <Ver>&quot;{versionOf(s.name)}&quot;</Ver>
                      {si < cat.skills.length - 1 ? "," : ""}
                    </Line>
                  ))}
                  <Line indent={1}>
                    <Brace>{"}"}</Brace>
                    {lastGroup ? "" : ","}
                  </Line>
                </>
              )}
            </div>
          );
        })}

        <Line>
          <Brace>{"}"}</Brace>
        </Line>
      </div>
    </AppShell>
  );
}

/* ---- syntax-highlight primitives --------------------------------------- */

function Line({ children, indent = 0 }: { children: React.ReactNode; indent?: number }) {
  return (
    <div className="whitespace-pre-wrap break-words" style={{ paddingLeft: indent * 18 }}>
      {children}
    </div>
  );
}
function Key({ children }: { children: React.ReactNode }) {
  return <span className="text-ink">{children}</span>;
}
function GroupKey({ children }: { children: React.ReactNode }) {
  return <span className="font-bold text-[#5C89AE]">{children}</span>;
}
function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
function Ver({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-success/10 px-1 text-success">{children}</span>
  );
}
function Colon() {
  return <span className="text-mute">:</span>;
}
function Brace({ children }: { children: React.ReactNode }) {
  return <span className={cn("text-mute")}>{children}</span>;
}
