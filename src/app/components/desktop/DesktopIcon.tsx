"use client";

import { cn } from "@/lib/cn";

type Props = {
  label: string;
  icon: React.ReactNode;
  onOpen: () => void;
  className?: string;
  badge?: number;
};

export default function DesktopIcon({
  label,
  icon,
  onOpen,
  className,
  badge = 0,
}: Props) {
  return (
    <button
      type="button"
      onDoubleClick={onOpen}
      className={cn(
        "group relative flex w-24 flex-col items-center gap-2 p-2 text-center",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm",
        className
      )}
      aria-label={`Open ${label}`}
    >
      <div
        className={cn(
          "relative h-12 w-12 [&>svg]:h-12 [&>svg]:w-12",
          "drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]",
          "transition-transform group-active:scale-95 group-hover:-translate-y-0.5"
        )}
        aria-hidden="true"
      >
        {icon}
        {badge > 0 ? (
          <span
            aria-hidden
            className={cn(
              "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full",
              "bg-accent text-white text-[10px] font-bold leading-[18px] text-center",
              "ring-2 ring-canvas shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
              "animate-[pop-in_180ms_ease-out_both]"
            )}
          >
            {badge > 99 ? "99+" : badge}
          </span>
        ) : null}
      </div>
      <span
        className={cn(
          "line-clamp-2 max-w-full rounded-[5px] px-1.5 py-0.5",
          "text-[12.5px] font-semibold leading-tight tracking-tight text-white",
          "bg-black/35 backdrop-blur-[1px]",
          "[text-shadow:0_1px_2px_rgba(0,0,0,0.7)]",
          "transition-colors group-hover:bg-black/55"
        )}
      >
        {label}
      </span>
    </button>
  );
}
