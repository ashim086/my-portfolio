"use client";

import { HiMoon, HiSun } from "react-icons/hi";
import { cn } from "@/lib/cn";
import { useTheme } from "./theme-provider";

type Variant = "default" | "onDark";
type Size = "sm" | "md";

export default function ThemeToggle({
  className = "",
  variant = "default",
  size = "md",
}: {
  className?: string;
  variant?: Variant;
  size?: Size;
}) {
  const { resolvedTheme, toggle } = useTheme();
  const isDark = resolvedTheme === "dark";

  // The icon's actual color: yellow for the sun, ink-toned for the moon.
  // We use inline `color` so it always reads against the parent's background,
  // regardless of which `text-*` class the parent injects via className.
  const iconColor =
    variant === "onDark"
      ? isDark
        ? "#F1A82C"
        : "#EEEFE9"
      : isDark
        ? "#F1A82C"
        : "#23251D";

  const iconCls = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative inline-flex items-center justify-center rounded-pill overflow-hidden",
        "transition-colors duration-150",
        "active:translate-y-px active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ink",
        size === "sm" ? "h-7 w-7" : "h-10 w-10",
        variant === "onDark"
          ? "text-canvas hover:bg-canvas/10 active:bg-canvas/15"
          : "text-ink hover:bg-surface-alt active:bg-border",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center"
        style={{ color: iconColor }}
        key={isDark ? "sun" : "moon"}
      >
        {isDark ? (
          <HiSun className={`${iconCls} animate-[spin-in_300ms_ease-out]`} />
        ) : (
          <HiMoon className={`${iconCls} animate-[spin-in_300ms_ease-out]`} />
        )}
      </span>
    </button>
  );
}
