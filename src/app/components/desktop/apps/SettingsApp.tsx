"use client";

import { useState } from "react";
import { useTheme } from "@/app/components/layout/theme-provider";
import { cn } from "@/lib/cn";
import {
  wallpaperOptions,
  setWallpaper,
  resetWallpaper,
  WALLPAPER_KEY,
  LOCAL_DEFAULT,
} from "@/lib/wallpaper";
import AppShell, { type AppTab } from "./AppShell";

function initialActiveWallpaper(): string {
  if (typeof window === "undefined") return "default";
  try {
    const saved = localStorage.getItem(WALLPAPER_KEY);
    if (!saved || saved === "default") return "default";
    return saved;
  } catch {
    return "default";
  }
}

const TABS: AppTab[] = [
  { id: "appearance", label: "Appearance" },
  { id: "wallpaper", label: "Wallpaper" },
  { id: "about", label: "About" },
];

export default function SettingsApp() {
  const { resolvedTheme, setTheme } = useTheme();
  const [tab, setTab] = useState("appearance");
  const [activeWallpaper, setActiveWallpaper] = useState<string>(initialActiveWallpaper);

  const handleWallpaper = (opt: (typeof wallpaperOptions)[number]) => {
    if (opt.url) {
      setWallpaper(opt.url);
      setActiveWallpaper(opt.url);
    } else {
      resetWallpaper();
      setActiveWallpaper("default");
    }
  };

  return (
    <AppShell
      fileName="settings"
      meta="portfolio"
      tabs={TABS}
      activeTab={tab}
      onTabChange={setTab}
      statusLeft="Ashim Thapa Magar · v1.0"
      statusRight={`theme: ${resolvedTheme}`}
    >
      {tab === "appearance" && (
        <section className="space-y-3">
          <SectionHead title="Theme" sub="Pick how the portfolio looks." />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {(["light", "dark", "system"] as const).map((opt) => {
              const active = resolvedTheme === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTheme(opt)}
                  className={cn(
                    "rounded-md border p-3 text-left transition-colors",
                    active
                      ? "border-ink bg-surface-alt ring-1 ring-ink"
                      : "border-border bg-surface hover:border-ink"
                  )}
                >
                  <div className="mb-2 flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className={cn(
                        "h-3 w-5 rounded-sm border border-border",
                        opt === "light" && "bg-[#eeefe9]",
                        opt === "dark" && "bg-[#151515]",
                        opt === "system" && "bg-gradient-to-r from-[#eeefe9] to-[#151515]"
                      )}
                    />
                    <p className="text-[13px] font-bold capitalize text-ink">{opt}</p>
                    {active ? <span className="ml-auto text-[11px] font-bold text-primary-active">●</span> : null}
                  </div>
                  <p className="text-[11px] text-mute">
                    {opt === "light"
                      ? "Cream canvas, olive ink."
                      : opt === "dark"
                        ? "Deep olive canvas."
                        : "Follow your OS."}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {tab === "wallpaper" && (
        <section className="space-y-3">
          <SectionHead title="Desktop wallpaper" sub="Right-click the desktop to reshuffle anytime." />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {wallpaperOptions.map((opt) => {
              const active = activeWallpaper === (opt.url ?? "default");
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleWallpaper(opt)}
                  className={cn(
                    "overflow-hidden rounded-md border transition-colors",
                    active ? "border-ink ring-2 ring-ink" : "border-border hover:border-ink"
                  )}
                >
                  <div
                    className="h-16 bg-cover bg-center"
                    style={{ background: `url("${opt.url ?? LOCAL_DEFAULT}") center/cover` }}
                  />
                  <p className="truncate px-1.5 py-1 text-center text-[10px] font-medium text-ink">
                    {opt.label}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {tab === "about" && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-primary text-[20px] font-black text-on-primary shadow-sm">
              A
            </div>
            <div>
              <p className="text-[16px] font-extrabold text-ink">Ashim Thapa Magar</p>
              <p className="text-[12px] text-mute">Full-stack developer · portfolio</p>
            </div>
          </div>
          <dl className="overflow-hidden rounded-md border border-border bg-surface text-[13px]">
            <Row k="Role" v="Full-Stack Developer" />
            <Row k="Location" v="Nepal, Baneshwor" />
            <Row k="Stack" v="Next.js · Node · Docker" />
            <Row k="Deployed" v="Vercel" />
            <Row k="Available" v="For hire" last />
          </dl>
        </section>
      )}
    </AppShell>
  );
}

function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h3 className="text-[14px] font-bold text-ink">{title}</h3>
      <p className="text-[12px] text-mute">{sub}</p>
    </div>
  );
}

function Row({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between px-3 py-2.5", !last && "border-b border-border")}>
      <dt className="text-mute">{k}</dt>
      <dd className="font-mono font-semibold text-ink">{v}</dd>
    </div>
  );
}
