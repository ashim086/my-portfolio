import { cn } from "@/lib/cn";

type Accent = "default" | "yellow" | "red" | "green";

type Props = {
  title?: string;
  accent?: Accent;
  actions?: React.ReactNode;
  bodyClassName?: string;
  className?: string;
  children: React.ReactNode;
};

// Dot colors are a brand quote and stay constant across light/dark.
const DOT = {
  red: "#ED6A5E",
  yellow: "#F5BF4F",
  green: "#62C554",
} as const;

export default function WindowFrame({
  title,
  accent = "default",
  actions,
  bodyClassName,
  className,
  children,
}: Props) {
  const leftDot =
    accent === "red"
      ? DOT.red
      : accent === "yellow"
        ? DOT.yellow
        : accent === "green"
          ? DOT.green
          : DOT.red;

  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-md overflow-hidden",
        "shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-center gap-3 h-8 px-3 border-b border-border bg-surface-alt">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: leftDot }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: DOT.yellow }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: DOT.green }}
          />
        </div>
        {title ? (
          <span className="font-mono text-[13px] text-mute select-none flex-1 text-center">
            {title}
          </span>
        ) : (
          <span className="flex-1" />
        )}
        {actions ? (
          <div className="flex items-center gap-2 text-mute">{actions}</div>
        ) : null}
      </div>
      <div className={cn("p-6", bodyClassName)}>{children}</div>
    </div>
  );
}
