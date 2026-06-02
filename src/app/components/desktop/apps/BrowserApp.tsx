"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* ── Module-level URL passing ────────────────────────────────────── */
let _pendingUrl: string | null = null;

export function setBrowserUrl(url: string) {
  _pendingUrl = url;
}

export function pickBrowserUrl(): string | null {
  const u = _pendingUrl;
  _pendingUrl = null;
  return u;
}

/* ── Helpers ─────────────────────────────────────────────────────── */
function normalizeUrl(input: string): string {
  const s = input.trim();
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.includes(".") || s.includes("localhost")) return `https://${s}`;
  return `https://duckduckgo.com/?q=${encodeURIComponent(s)}`;
}

const QUICK_LINKS = [
  { label: "Relocation Booking", url: "https://texch.vercel.app/" },
  { label: "Payment Integration", url: "https://wallets-sooty.vercel.app/login" },
  { label: "MediCare E-Commerce", url: "https://medicarelifeharmony.vercel.app/" },
  { label: "News Portal", url: "https://news-portal-swart-zeta.vercel.app/" },
  { label: "GitHub", url: "https://github.com/ashim086" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/ashim-thapamagar-875090360/" },
];

/* ── Component ───────────────────────────────────────────────────── */
export default function BrowserApp() {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Pick up pending URL on mount
  useEffect(() => {
    const pending = pickBrowserUrl();
    if (pending) {
      setUrl(pending);
      navigateTo(pending);
    }
  }, []);

  const navigateTo = useCallback((target: string) => {
    const normalized = normalizeUrl(target);
    if (!normalized) return;
    setCurrentUrl(normalized);
    setUrl(normalized);
    setLoading(true);
    setError(false);

    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, normalized];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const idx = historyIndex - 1;
      const target = history[idx];
      setHistoryIndex(idx);
      setCurrentUrl(target);
      setUrl(target);
      setLoading(true);
      setError(false);
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1;
      const target = history[idx];
      setHistoryIndex(idx);
      setCurrentUrl(target);
      setUrl(target);
      setLoading(true);
      setError(false);
    }
  }, [history, historyIndex]);

  const refresh = useCallback(() => {
    if (currentUrl) {
      setLoading(true);
      setError(false);
      // Force re-mount by toggling key trick
      setIframeKey((k) => k + 1);
    }
  }, [currentUrl]);

  const goHome = useCallback(() => {
    setUrl("");
    setCurrentUrl("");
    setLoading(false);
    setError(false);
  }, []);

  // Loading timeout detection
  useEffect(() => {
    if (!loading) return;
    timeoutRef.current = setTimeout(() => {
      // If still loading after 8s and iframe content is empty/blocked
      setLoading(false);
      setError(true);
    }, 8000);
    return () => clearTimeout(timeoutRef.current);
  }, [loading, currentUrl]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
    clearTimeout(timeoutRef.current);
    // Try to detect if the iframe content is accessible
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc && doc.body) {
        setError(false);
      }
    } catch {
      // Cross-origin — assume loaded successfully
      setError(false);
    }
  }, []);

  const [iframeKey, setIframeKey] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) navigateTo(url);
  }, [url, navigateTo]);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  return (
    <div className="flex flex-col h-full font-sans select-none">
      {/* Address bar */}
      <div className="flex items-center gap-1 h-11 px-2 bg-surface border-b border-border shrink-0">
        {/* Nav buttons */}
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack}
          aria-label="Back"
          className={cn(
            "h-7 w-7 rounded-sm grid place-items-center shrink-0",
            "text-mute hover:bg-surface-alt active:bg-border transition-colors",
            "disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 3L5 7l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          type="button"
          onClick={goForward}
          disabled={!canGoForward}
          aria-label="Forward"
          className={cn(
            "h-7 w-7 rounded-sm grid place-items-center shrink-0",
            "text-mute hover:bg-surface-alt active:bg-border transition-colors",
            "disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          type="button"
          onClick={refresh}
          aria-label="Refresh"
          className={cn(
            "h-7 w-7 rounded-sm grid place-items-center shrink-0",
            "text-mute hover:bg-surface-alt active:bg-border transition-colors",
            loading && "animate-[spin_800ms_linear_infinite]"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M11.5 7a4.5 4.5 0 1 1-1.3-3.2M11.5 2v3.5H8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex-1 min-w-0">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Search or enter URL"
            className={cn(
              "w-full h-7 px-2.5 rounded-sm border text-[12px] font-mono outline-none",
              "bg-canvas text-ink transition-colors",
              inputFocused ? "border-ink" : "border-border"
            )}
          />
        </form>

        {/* Home */}
        <button
          type="button"
          onClick={goHome}
          aria-label="Home"
          className="h-7 w-7 rounded-sm grid place-items-center shrink-0 text-mute hover:bg-surface-alt active:bg-border transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7l5-5 5 5M3.5 6v5.5h7V6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {/* Loading bar */}
      {loading && (
        <div className="h-0.5 bg-primary/20 overflow-hidden shrink-0">
          <div className="h-full bg-primary animate-[loading-bar_2s_ease-in-out_infinite]" />
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 relative bg-white">
        {/* New tab page */}
        {!currentUrl && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-canvas">
            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-12 rounded-md bg-primary text-on-primary grid place-items-center text-xl font-black shadow-sm">
                A
              </div>
              <p className="text-[13px] font-semibold text-ink">Ashim&apos;s Portfolio</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-md">
              {QUICK_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => { setUrl(link.url); navigateTo(link.url); }}
                  className="h-8 px-3 rounded-sm border border-border bg-surface text-[11px] font-bold text-mute hover:border-ink hover:text-ink active:translate-y-px transition"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error page */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-canvas">
            <div className="h-14 w-14 rounded-full bg-accent/10 grid place-items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-accent"><path d="M12 8v5m0 3v.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <h3 className="text-[15px] font-bold text-ink">This site can&apos;t be embedded</h3>
            <p className="text-[12px] text-mute max-w-xs text-center leading-relaxed">
              The website at <span className="font-mono text-ink break-all">{currentUrl}</span> refused to connect. Some sites block embedding in iframes.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.open(currentUrl, "_blank", "noopener")}
                className="h-8 px-4 rounded-sm bg-primary text-on-primary text-[12px] font-bold hover:bg-primary-pressed active:translate-y-px transition"
              >
                Open in real browser
              </button>
              <button
                type="button"
                onClick={goHome}
                className="h-8 px-4 rounded-sm border border-border bg-surface text-ink text-[12px] font-bold hover:border-ink active:translate-y-px transition"
              >
                Go home
              </button>
            </div>
          </div>
        )}

        {/* Iframe */}
        {currentUrl && (
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={currentUrl}
            title="Browser"
            className={cn(
              "absolute inset-0 w-full h-full border-0",
              (loading || error) && "invisible"
            )}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={handleIframeLoad}
          />
        )}
      </div>
    </div>
  );
}
