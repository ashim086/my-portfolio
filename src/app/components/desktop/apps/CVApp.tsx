"use client";

import { useState } from "react";
import { HiDownload, HiExternalLink } from "react-icons/hi";

const PDF_URL = "/Ashim_thapa.pdf";

export default function CVApp() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex flex-col h-full bg-surface-alt">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-surface flex-shrink-0">
        <div className="flex items-center gap-2 text-[12px] text-mute font-mono min-w-0">
          <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden>
            <path d="M3 1.5h7l3 3v9.5a.5.5 0 01-.5.5h-9.5a.5.5 0 01-.5-.5V2a.5.5 0 01.5-.5z" fill="#EEEFE9" stroke="#23251D" strokeWidth="0.8" />
            <rect x="6" y="9" width="6" height="4" rx="0.6" fill="#E5484D" />
          </svg>
          <span className="truncate font-semibold text-ink">Ashim_thapa.pdf</span>
          <span className="text-stone">·</span>
          <span>2 pages · 180 KB</span>
        </div>
        <div className="flex items-center gap-1.5">
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 text-[12px] font-semibold text-ink hover:border-ink transition"
          >
            <HiExternalLink className="h-3.5 w-3.5" /> Open in tab
          </a>
          <a
            href={PDF_URL}
            download
            className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-primary px-2.5 text-[12px] font-bold text-on-primary hover:bg-primary-pressed active:translate-y-px transition"
          >
            <HiDownload className="h-3.5 w-3.5" /> Download
          </a>
        </div>
      </div>

      {/* PDF preview — <object> works inline in more browsers than <iframe> */}
      <div className="flex-1 min-h-0 relative">
        {!failed ? (
          <object
            data={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            type="application/pdf"
            className="absolute inset-0 w-full h-full bg-[#525659]"
            onError={() => setFailed(true)}
          >
            <Fallback />
          </object>
        ) : (
          <Fallback />
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 h-7 bg-surface-alt border-t border-border text-[11px] font-mono text-mute flex-shrink-0">
        <span>application/pdf</span>
        <span>Page 1 of 2</span>
      </div>
    </div>
  );
}

function Fallback() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-canvas">
      <div className="max-w-sm text-center px-6 space-y-3">
        <p className="text-[12px] font-mono text-mute uppercase tracking-[0.08em]">Preview unavailable</p>
        <p className="text-[14px] text-body">
          Your browser blocked the inline PDF preview. Use the buttons above to open
          it in a new tab or download.
        </p>
        <div className="flex justify-center gap-2 pt-1">
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-sm border border-border bg-surface px-3 text-[13px] font-semibold text-ink hover:border-ink"
          >
            <HiExternalLink className="h-4 w-4" /> Open in tab
          </a>
          <a
            href={PDF_URL}
            download
            className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-primary px-3 text-[13px] font-bold text-on-primary hover:bg-primary-pressed"
          >
            <HiDownload className="h-4 w-4" /> Download
          </a>
        </div>
      </div>
    </div>
  );
}
