"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useWindowManager, type AppId } from "./window-manager";
import ThemeToggle from "../layout/theme-toggle";

type Props = {
  apps: Record<
    AppId,
    {
      id: AppId;
      title: string;
      icon: React.ReactNode;
    }
  >;
  pinned?: AppId[];
  trashCount?: number;
  onStartClick: () => void;
  onLaunch?: (id: AppId) => void;
  startOpen: boolean;
  onPinnedContextMenu?: (e: React.MouseEvent, id: AppId) => void;
};

function useClock() {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));
  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(d: Date) {
  return d.toLocaleDateString([], {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function Taskbar({ apps, pinned, trashCount, onStartClick, onLaunch, startOpen, onPinnedContextMenu }: Props) {
  const time = useClock();
  const { windows, focus, minimize, focusedId } = useWindowManager();

  // Map each pinned app to whether it has an open window right now
  const openAppIds = new Set(windows.map((w) => w.appId));

  return (
    <div
      className={cn(
        "fixed bottom-2 left-1/2 -translate-x-1/2 z-[9998] h-12 max-w-[calc(100vw-1rem)]",
        "text-canvas inline-flex items-center gap-1 px-1.5 rounded-xl",
        // Floating dock: dark glass with highlight + outer shadow
        "border border-canvas/15 backdrop-blur-md",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_40px_-10px_rgba(0,0,0,0.55),0_4px_12px_-2px_rgba(0,0,0,0.35)]"
      )}
      style={{
        background:
          "linear-gradient(180deg, rgba(42,45,36,0.92) 0%, rgba(31,31,28,0.92) 50%, rgba(21,21,21,0.92) 100%)",
      }}
      role="toolbar"
      aria-label="Taskbar"
    >
      {/* Start button — chunky retro */}
      <button
        type="button"
        onClick={onStartClick}
        aria-label="Start menu"
        aria-expanded={startOpen}
        className={cn(
          "h-9 pl-2 pr-3 inline-flex items-center gap-1.5 rounded-sm",
          "text-on-primary text-[13px] font-extrabold tracking-tight",
          "border border-[#9d6a01]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.15)]",
          "hover:brightness-105 active:translate-y-px active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] transition"
        )}
        style={{
          background:
            startOpen
              ? "linear-gradient(180deg, #DD9001 0%, #F7A501 100%)"
              : "linear-gradient(180deg, #F7A501 0%, #DD9001 100%)",
        }}
      >
        <span className="h-5 w-5 grid place-items-center rounded-sm bg-on-primary/15 text-[13px] font-black leading-none">
          A
        </span>
        Start
      </button>

      {/* Vertical divider */}
      <span className="h-7 w-px bg-canvas/15 mx-1" aria-hidden />

      {/* Quick launch (pinned apps) — icons with active dot when the app is open */}
      {pinned && pinned.length > 0 ? (
        <>
          <div className="flex items-center gap-1">
            {pinned.map((id) => {
              const isOpen = openAppIds.has(id);
              const showBadge = id === "trash" && (trashCount ?? 0) > 0;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onLaunch?.(id)}
                  onContextMenu={(e) => onPinnedContextMenu?.(e, id)}
                  aria-label={apps[id]?.title}
                  title={apps[id]?.title}
                  data-active={isOpen ? "true" : "false"}
                  className={cn(
                    "h-9 w-9 grid place-items-center group relative",
                    "hover:-translate-y-0.5 active:translate-y-0 transition-transform",
                    "[&>svg]:h-9 [&>svg]:w-9 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]",
                    isOpen ? "opacity-100" : "opacity-90"
                  )}
                >
                  {apps[id]?.icon}
                  {/* Active dot: shown when the app is currently open */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full",
                      "ring-1 ring-black/40 transition-opacity",
                      isOpen ? "bg-[#EEEFE9] opacity-100" : "bg-[#EEEFE9]/30 opacity-0"
                    )}
                  />
                  {/* Notification badge (e.g. trash items) */}
                  {showBadge ? (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full",
                        "bg-accent text-white text-[9px] font-bold leading-4 text-center",
                        "ring-2 ring-black/40 shadow-[0_2px_3px_rgba(0,0,0,0.4)]",
                        "animate-[pop-in_180ms_ease-out_both]"
                      )}
                    >
                      {trashCount! > 99 ? "99+" : trashCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <span className="h-7 w-px bg-canvas/15 mx-1" aria-hidden />
        </>
      ) : null}

      {/* Open apps (pinned apps are shown in the quick-launch section above) */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-[40vw]">
        {windows.length === 0 ? null : (
          windows.filter((w) => !pinned?.includes(w.appId)).map((w) => {
            const app = apps[w.appId];
            const isFocused = focusedId === w.id && !w.isMinimized;
            const isMin = w.isMinimized;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => {
                  if (isFocused) minimize(w.id);
                  else focus(w.id);
                }}
                aria-label={`${isMin ? "Restore" : isFocused ? "Minimize" : "Focus"} ${w.title}`}
                title={w.title}
                className={cn(
                  "h-9 w-9 grid place-items-center relative",
                  "hover:-translate-y-0.5 active:translate-y-0 transition-transform",
                  "[&>svg]:h-9 [&>svg]:w-9",
                  isMin ? "opacity-70" : "drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]"
                )}
              >
                {app?.icon}
                {/* Open-state dot under icon, macOS style */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full",
                    "ring-1 ring-black/40",
                    isFocused
                      ? "bg-[#EEEFE9]"
                      : isMin
                      ? "bg-[#EEEFE9]/35"
                      : "bg-[#EEEFE9]/70"
                  )}
                />
              </button>
            );
          })
        )}
      </div>

      <span className="h-7 w-px bg-canvas/15 mx-1" aria-hidden />

      {/* System tray — inset panel */}
      <div
        className={cn(
          "flex items-center gap-1 h-9 px-1.5 rounded-sm overflow-hidden",
          "border border-canvas/10",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]"
        )}
        style={{ background: "rgba(0,0,0,0.25)" }}
      >
        <div className="hidden sm:flex items-baseline gap-2 px-2 tabular-nums leading-none text-[#EEEFE9]">
          <time dateTime={new Date().toISOString()} className="text-[12px] font-semibold whitespace-nowrap">
            {time}
          </time>
          <span className="text-[10px] text-[#EEEFE9]/70 whitespace-nowrap">{formatDate(new Date())}</span>
        </div>
        <ThemeToggle variant="onDark" size="sm" className="overflow-hidden" />
      </div>
    </div>
  );
}
