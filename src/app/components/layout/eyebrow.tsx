import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  as?: "h2" | "h3" | "span" | "p";
  className?: string;
};

export default function Eyebrow({ children, as: As = "span", className }: Props) {
  return (
    <As
      className={cn(
        "text-[11px] font-bold uppercase tracking-[0.06em] text-mute",
        className
      )}
    >
      {children}
    </As>
  );
}
