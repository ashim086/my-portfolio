"use client";

import Link from "next/link";
import { useEffect } from "react";
import { HiX } from "react-icons/hi";

type NavItem = { label: string; route: string };

const items: NavItem[] = [
  { label: "Home", route: "#home" },
  { label: "About", route: "#about" },
  { label: "Skills", route: "#skills" },
  { label: "Experience", route: "#experience" },
  { label: "Projects", route: "#projects" },
  { label: "Contact", route: "#contact" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />
      <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-canvas border-l border-border shadow-[var(--shadow-card)] flex flex-col">
        <div className="flex h-16 items-center justify-between px-5 border-b border-border">
          <span className="font-bold text-ink text-lg">Ashim Magar</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-pill hover:bg-surface-alt text-ink"
          >
            <HiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <nav
          className="flex flex-col gap-1 p-4"
          aria-label="Mobile primary navigation"
        >
          {items.map((item) => (
            <Link
              key={item.route}
              href={item.route}
              onClick={onClose}
              className="rounded-md px-4 py-3 text-2xl font-semibold text-ink hover:bg-surface-alt"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t border-border">
          <Link
            href="#contact"
            onClick={onClose}
            className="flex h-10 w-full items-center justify-center rounded-pill bg-primary text-on-primary font-bold text-sm transition-colors hover:bg-primary-pressed"
          >
            Say hello
          </Link>
        </div>
      </aside>
    </div>
  );
}
