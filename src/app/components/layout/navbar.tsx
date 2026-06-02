"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import MobileMenu from "./mobile-menu";
import ThemeToggle from "./theme-toggle";

const navItems = [
  { label: "Home", route: "#home" },
  { label: "About", route: "#about" },
  { label: "Skills", route: "#skills" },
  { label: "Experience", route: "#experience" },
  { label: "Projects", route: "#projects" },
  { label: "Contact", route: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-40 w-full",
          "transition-colors",
          scrolled
            ? "bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/75 border-b border-border"
            : "bg-canvas border-b border-transparent",
        ].join(" ")}
      >
        <nav
          className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            className="text-[17px] font-bold text-ink"
            aria-label="Ashim Thapa Magar — Home"
          >
            Ashim Magar
          </Link>

          <ul className="hidden md:flex items-center gap-6" role="menubar">
            {navItems.map((item) => (
              <li key={item.route} role="none">
                <Link
                  href={item.route}
                  role="menuitem"
                  className="text-[15px] font-semibold text-body hover:text-ink transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            <Link
              href="#contact"
              className="hidden md:inline-flex h-10 items-center justify-center rounded-pill bg-primary px-4 text-[14px] font-bold text-on-primary transition-colors hover:bg-primary-pressed active:translate-y-px"
            >
              Say hello
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-pill text-ink hover:bg-surface-alt"
            >
              <HiMenu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Navbar;
