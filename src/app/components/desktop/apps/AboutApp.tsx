import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { experience } from "@/data/experience";
import AppShell, { Eyebrow, FormatStrip, TbButton } from "./AppShell";

const stackSnippet: { key: string; values: string[] }[] = [
  { key: "language", values: ["TypeScript", "Java", "C#"] },
  { key: "frontend", values: ["Next.js", "React", "Tailwind"] },
  { key: "backend", values: ["Node", "Express", "Prisma"] },
  { key: "infra", values: ["Docker", "AWS EC2", "Vercel"] },
];

export default function AboutApp() {
  const currentJobs = experience.filter(
    (e) => e.type === "experience" && e.endDate === null
  );

  return (
    <AppShell
      fileName="about.md"
      meta="modified just now"
      actions={
        <>
          <FormatStrip />
          <TbButton href="https://github.com/ashim086" external>
            <FaGithub className="h-3.5 w-3.5" /> GitHub
          </TbButton>
          <TbButton href="/Ashim_thapa.pdf" download primary>
            Download CV
          </TbButton>
        </>
      }
      statusLeft="UTF-8 · Markdown"
      statusRight="A short intro"
    >
      <article className="mx-auto max-w-3xl space-y-8">
        {/* Identity — written directly, no card */}
        <header className="space-y-5">
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border">
              <Image
                src="/ashi.jpg"
                alt="Ashim Thapa Magar"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[26px] font-extrabold leading-tight tracking-tight text-ink">
                Ashim Thapa Magar
              </p>
              <p className="text-[16px] text-mute">Full-Stack Developer · Nepal, Baneshwor</p>
              <div className="mt-2.5 flex items-center gap-3">
                <a
                  href="https://github.com/ashim086"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-mute transition-colors hover:text-ink"
                >
                  <FaGithub className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ashim-thapamagar-875090360/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-mute transition-colors hover:text-ink"
                >
                  <FaLinkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Eyebrow>About</Eyebrow>
            <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-ink">
              I build products that ship.
            </h1>
            <p className="text-[15px] leading-[1.65] text-body">
              I build with TypeScript, ship with Docker, and care more about
              production stability than clever abstractions. From the first line
              of code to the last CI deploy, I own the whole pipeline.
            </p>
          </div>
        </header>

        {/* Pull quote */}
        <blockquote className="border-l-[3px] border-primary bg-surface-alt/60 px-5 py-4 text-[16px] font-semibold leading-[1.5] text-charcoal">
          &ldquo;Ship full-stack systems that don&apos;t fall over in
          production.&rdquo;
        </blockquote>

        {/* Body */}
        <div className="space-y-4 text-[15px] leading-[1.7] text-body">
          <p>
            Currently shipping full-stack at{" "}
            <strong className="text-ink">ICodify Technology</strong> (remote) and
            contributing part-time at{" "}
            <strong className="text-ink">Techmandu Solution</strong>. My day-to-day
            spans React and Next.js on the front, Node, Express and Prisma on the
            back, and Docker on AWS EC2 to tie it together.
          </p>
          <p>
            Before that I built SaaS frontends, integrated Nepal&apos;s eSewa and
            Khalti payment gateways, and shipped real-time features over
            WebSockets. I completed an intensive MERN program in 2025 and have been
            shipping production code ever since.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Stat value="1+ yr" label="Professional" sub="Experience" />
          <Stat value="4" label="Production" sub="Projects shipped" />
          <Stat value={String(currentJobs.length)} label="Active" sub="Roles right now" />
        </div>

        {/* Currently */}
        <section className="space-y-3">
          <Eyebrow>Currently</Eyebrow>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currentJobs.map((j) => (
              <div
                key={`${j.org}-${j.title}`}
                className="rounded-md border border-border bg-surface p-4"
              >
                <p className="text-[14px] font-bold text-ink">{j.org}</p>
                <p className="text-[12px] text-mute">
                  {j.title}
                  {j.location ? ` · ${j.location}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* stack.json terminal */}
        <section className="overflow-hidden rounded-md border border-border">
          <div className="flex items-center gap-2 border-b border-border bg-ink px-3 py-1.5">
            <span className="h-2 w-2 rounded-[1px] bg-primary" />
            <span className="font-mono text-[11px] text-canvas">~/dev-env — stack.json</span>
          </div>
          <pre className="overflow-x-auto bg-surface-alt p-4 font-mono text-[12.5px] leading-[1.7]">
            <code>
              <span className="text-mute">$ </span>
              <span className="text-ink">cat</span>{" "}
              <span className="text-accent">stack.json</span>
              {"\n"}
              <span className="text-mute">{"{"}</span>
              {"\n"}
              {stackSnippet.map((line, i) => (
                <span key={line.key}>
                  <span className="text-ink">  &quot;{line.key}&quot;</span>
                  <span className="text-mute">: </span>
                  <span className="text-mute">[</span>
                  {line.values.map((v, j) => (
                    <span key={v}>
                      <span className="text-accent">&quot;{v}&quot;</span>
                      {j < line.values.length - 1 ? (
                        <span className="text-mute">, </span>
                      ) : null}
                    </span>
                  ))}
                  <span className="text-mute">]</span>
                  {i < stackSnippet.length - 1 ? (
                    <span className="text-mute">,</span>
                  ) : null}
                  {"\n"}
                </span>
              ))}
              <span className="text-mute">{"}"}</span>
            </code>
          </pre>
        </section>
      </article>
    </AppShell>
  );
}

function Stat({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="rounded-md border border-border bg-surface p-4">
      <p className="text-[28px] font-extrabold leading-none tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-primary-active">
        {label}
      </p>
      <p className="text-[12px] text-mute">{sub}</p>
    </div>
  );
}
