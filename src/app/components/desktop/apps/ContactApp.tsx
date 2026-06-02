"use client";

import { useState, type ReactNode } from "react";
import {
  HiPaperAirplane,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiCheckCircle,
  HiExclamationCircle,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/cn";

const TO = "magarashim69086@gmail.com";

// Web3Forms access key (safe to be public). Set NEXT_PUBLIC_WEB3FORMS_KEY in
// Vercel env vars; until then the form gracefully falls back to a mailto: link.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactApp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState(false); // honeypot
  const [status, setStatus] = useState<Status>("idle");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSend =
    !!name.trim() && emailValid && !!message.trim() && status !== "sending";

  const mailtoFallback = () => {
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(
      subject || `Portfolio message from ${name}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSend = async () => {
    if (!canSend) return;
    if (botcheck) return; // bot filled the honeypot

    // No key configured yet → keep the mailto behavior.
    if (!WEB3FORMS_KEY) {
      mailtoFallback();
      setStatus("sent");
      window.setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          subject: subject || `Portfolio message from ${name}`,
          message,
          from_name: "Portfolio contact form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        window.setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex h-full flex-col bg-canvas font-sans">
      {/* Toolbar with Send */}
      <div className="flex h-12 flex-shrink-0 items-center gap-2 border-b border-border bg-surface px-3">
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-sm px-4 text-[13px] font-bold transition active:translate-y-px",
            canSend
              ? "bg-primary text-on-primary hover:bg-primary-pressed"
              : "cursor-not-allowed bg-surface-alt text-stone"
          )}
        >
          <HiPaperAirplane className="h-4 w-4 rotate-90" />
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        {status === "sent" ? (
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-success">
            <HiCheckCircle className="h-4 w-4" /> Message sent — I&apos;ll reply soon.
          </span>
        ) : status === "error" ? (
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent">
            <HiExclamationCircle className="h-4 w-4" /> Couldn&apos;t send — try again or email me.
          </span>
        ) : (
          <span className="ml-1 font-mono text-[12px] text-mute">new message</span>
        )}
      </div>

      {/* Compose body */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-px px-5 py-4">
          {/* Honeypot — hidden from humans, traps bots */}
          <input
            type="checkbox"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            checked={botcheck}
            onChange={(e) => setBotcheck(e.target.checked)}
            className="hidden"
          />
          <ReadonlyRow label="To" value={TO} />
          <Field label="Your name" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className={inputCls}
            />
          </Field>
          <Field label="Your email" required>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={inputCls}
              />
              <HiMail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone" />
            </div>
          </Field>
          <Field label="Subject">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Let's build something"
              className={inputCls}
            />
          </Field>
          <Field label="Message" required align="start">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What do you want to talk about?"
              rows={6}
              className={cn(inputCls, "min-h-[120px] resize-y py-2.5 leading-[1.5]")}
            />
          </Field>
        </div>

        {/* Quick channels */}
        <div className="border-t border-border bg-surface-alt/50 px-5 py-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-stone">
            Or reach me directly
          </p>
          <div className="flex flex-wrap gap-2">
            <QuickLink href="tel:+9779748723714" icon={<HiPhone className="h-3.5 w-3.5" />}>
              +977-9748723714
            </QuickLink>
            <QuickLink href="https://wa.me/9779748723714" icon={<FaWhatsapp className="h-3.5 w-3.5" />} external>
              WhatsApp
            </QuickLink>
            <QuickLink
              href="https://maps.google.com/?q=Baneshwor,Kathmandu,Nepal"
              icon={<HiLocationMarker className="h-3.5 w-3.5" />}
              external
            >
              Nepal, Baneshwor
            </QuickLink>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex h-7 flex-shrink-0 items-center justify-between border-t border-border bg-surface-alt px-3 font-mono text-[11px] text-mute">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Available for hire
        </span>
        <span>{canSend ? "ready to send" : "fill the required fields"}</span>
      </div>
    </div>
  );
}

const inputCls =
  "h-10 w-full rounded-sm border border-border bg-surface px-3 text-[14px] text-ink placeholder:text-stone outline-none transition focus:border-ink focus:ring-2 focus:ring-primary/30";

function Field({
  label,
  required,
  align = "center",
  children,
}: {
  label: string;
  required?: boolean;
  align?: "center" | "start";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-1.5 border-b border-border py-3 sm:grid-cols-[140px_1fr] sm:gap-4",
        align === "center" ? "sm:items-center" : "sm:items-start sm:pt-4"
      )}
    >
      <label className="text-[13px] font-bold text-ink">
        {label}
        {required ? <span className="ml-0.5 text-accent">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function ReadonlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 border-b border-border py-3 sm:grid-cols-[140px_1fr] sm:items-center sm:gap-4">
      <span className="text-[13px] font-bold text-ink">{label}</span>
      <span className="font-mono text-[14px] text-body">{value}</span>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  external,
  children,
}: {
  href: string;
  icon: ReactNode;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface px-3 py-1.5 text-[12px] font-semibold text-ink transition hover:border-ink"
    >
      {icon}
      {children}
    </a>
  );
}
