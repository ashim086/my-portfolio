"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import AppShell from "./AppShell";

const items: { src: string; alt: string; caption: string }[] = [
  { src: "/gallery/panacea/1752491167610.jpeg", alt: "Panacea Solution", caption: "Panacea Solution" },
  { src: "/gallery/panacea/1752491166073.jpeg", alt: "Panacea Solution", caption: "Panacea Solution" },
  { src: "/gallery/panacea/1752491167048.jpeg", alt: "Panacea Solution", caption: "Panacea Solution" },
  { src: "/ash.jpg", alt: "Ashim", caption: "Profile" },
  { src: "/ashi.jpg", alt: "Ashim alt", caption: "Profile (alt)" },
];

export default function GalleryApp() {
  const [active, setActive] = useState<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + items.length) % items.length
      ),
    []
  );

  // Keyboard nav while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  return (
    <AppShell
      fileName="gallery"
      meta={`${items.length} images`}
      statusLeft={`${items.length} items`}
      statusRight="click to preview"
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-square overflow-hidden rounded-md border border-border bg-surface-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 200px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-2 text-left">
              <p className="text-[11px] font-semibold text-canvas">{it.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          className="fixed inset-0 z-[9999] bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-md overflow-hidden border border-ink/40 bg-surface shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
          >
            {/* Win-style title bar */}
            <div className="flex items-center h-9 pl-3 pr-1 gap-2 bg-ink text-canvas border-b border-ink select-none">
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-[1px] bg-primary shrink-0" />
                <span className="font-mono text-[12px] font-semibold truncate tracking-tight">
                  {items[active].caption.toLowerCase().replace(/\s+/g, "-")}.png — Image Viewer
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="h-7 w-8 rounded-sm grid place-items-center text-canvas hover:bg-[#E5484D] hover:text-white transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </button>
            </div>
            {/* Image body */}
            <div className="relative w-full aspect-[16/10] bg-canvas">
              <Image
                src={items[active].src}
                alt={items[active].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              {/* Prev / Next */}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/55 text-canvas backdrop-blur-sm transition hover:bg-ink/80"
              >
                <HiChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/55 text-canvas backdrop-blur-sm transition hover:bg-ink/80"
              >
                <HiChevronRight className="h-6 w-6" />
              </button>
            </div>
            {/* Status bar */}
            <div className="flex items-center justify-between px-3 h-8 bg-surface-alt border-t border-border text-[11px] text-mute font-mono">
              <span>{items[active].caption}</span>
              <span>{active + 1} / {items.length}</span>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
