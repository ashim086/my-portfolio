import { cn } from "@/lib/cn";
import Eyebrow from "./eyebrow";

interface IProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

const Title: React.FC<IProps> = ({
  title,
  subtitle,
  eyebrow,
  align = "left",
  className,
  id,
}) => {
  return (
    <header
      className={cn(
        "flex flex-col gap-3 mb-12 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow ? <Eyebrow as="p">{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className="text-[40px] md:text-[48px] leading-[1.05] font-extrabold tracking-[-0.01em] text-ink"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="text-[15px] md:text-base text-mute max-w-2xl">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
};

export default Title;
