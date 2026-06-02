"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { useWindowManager, type WindowState } from "./window-manager";

type Props = {
  win: WindowState;
  children: React.ReactNode;
};

const MIN_W = 360;
const MIN_H = 240;
const TITLE_BAR = 36;

type DragMode = "move" | "resize" | null;

export default function Window({ win, children }: Props) {
  const { focus, close, minimize, toggleMaximize, move, resize, focusedId } =
    useWindowManager();
  const isFocused = focusedId === win.id;

  const dragState = useRef<{
    mode: DragMode;
    startX: number;
    startY: number;
    startWX: number;
    startWY: number;
    startWW: number;
    startWH: number;
  } | null>(null);

  // Animation phases: "opening" plays once on mount, "closing" delays unmount,
  // "minimizing" plays the genie-out animation before the parent unmounts.
  const [phase, setPhase] = useState<"opening" | "closing" | "minimizing" | null>(
    "opening"
  );

  // Pending action ref — tracks which side-effect (minimize or close) is
  // scheduled to fire after the animation completes. Clearing it cancels the
  // pending side-effect (e.g. if the user restores a window mid-animation).
  const pendingActionRef = useRef<"close" | "minimize" | null>(null);
  useEffect(() => {
    return () => {
      pendingActionRef.current = null;
    };
  }, []);

  // Clear the "opening" phase after its short animation completes.
  useEffect(() => {
    if (phase !== "opening") return;
    const t = window.setTimeout(() => setPhase(null), 200);
    return () => window.clearTimeout(t);
  }, [phase]);

  // When phase is "closing", fire close() after the animation.
  useEffect(() => {
    if (phase !== "closing") return;
    const t = window.setTimeout(() => {
      if (pendingActionRef.current === "close") {
        pendingActionRef.current = null;
        close(win.id);
      }
    }, 160);
    return () => window.clearTimeout(t);
  }, [phase, close, win.id]);

  // When phase is "minimizing", fire minimize() after the genie animation,
  // unless the user has restored the window in the meantime.
  useEffect(() => {
    if (phase !== "minimizing") return;
    const t = window.setTimeout(() => {
      if (pendingActionRef.current === "minimize") {
        pendingActionRef.current = null;
        minimize(win.id);
      }
    }, 220);
    return () => window.clearTimeout(t);
  }, [phase, minimize, win.id]);

  // Track previous minimized state so we can detect the "just restored" edge.
  // When a window comes back from minimized, reset the phase to "opening" so
  // the open animation plays (and so a stuck "minimizing" class doesn't
  // leave the window unclickable).
  const prevMinimizedRef = useRef(win.isMinimized);
  useEffect(() => {
    const wasMin = prevMinimizedRef.current;
    prevMinimizedRef.current = win.isMinimized;
    if (wasMin && !win.isMinimized) {
      // Cancel any pending minimize (e.g. user restored mid-animation).
      pendingActionRef.current = null;
      setPhase("opening");
    }
  }, [win.isMinimized]);

  const onTitleBarPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (win.isMaximized) return; // no dragging while maximized
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      // ignore clicks on the title-bar action buttons
      if (target.closest("[data-window-action]")) return;
      focus(win.id);
      dragState.current = {
        mode: "move",
        startX: e.clientX,
        startY: e.clientY,
        startWX: win.x,
        startWY: win.y,
        startWW: win.width,
        startWH: win.height,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focus, win.id, win.x, win.y, win.width, win.height, win.isMaximized]
  );

  const onResizeHandlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (win.isMaximized) return;
      if (e.button !== 0) return;
      e.stopPropagation();
      focus(win.id);
      dragState.current = {
        mode: "resize",
        startX: e.clientX,
        startY: e.clientY,
        startWX: win.x,
        startWY: win.y,
        startWW: win.width,
        startWH: win.height,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focus, win.id, win.x, win.y, win.width, win.height, win.isMaximized]
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const s = dragState.current;
      if (!s) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;
      if (s.mode === "move") {
        const x = Math.max(-s.startWW + 80, Math.min(s.startWX + dx, window.innerWidth - 80));
        const y = Math.max(0, Math.min(s.startWY + dy, window.innerHeight - 80));
        move(win.id, x, y);
      } else if (s.mode === "resize") {
        const width = Math.max(MIN_W, Math.min(s.startWW + dx, window.innerWidth - s.startWX));
        const height = Math.max(
          MIN_H,
          Math.min(s.startWH + dy, window.innerHeight - 48 - s.startWY)
        );
        resize(win.id, width, height);
      }
    },
    [move, resize, win.id]
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (dragState.current) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        dragState.current = null;
      }
    },
    []
  );

  // double-click title bar to toggle maximize
  const onTitleBarDoubleClick = useCallback(() => {
    toggleMaximize(win.id);
  }, [toggleMaximize, win.id]);

  const handleMinimize = useCallback(() => {
    if (phase === "minimizing" || phase === "closing") return;
    pendingActionRef.current = "minimize";
    setPhase("minimizing");
  }, [phase]);

  const handleClose = useCallback(() => {
    if (phase === "closing" || phase === "minimizing") return;
    pendingActionRef.current = "close";
    setPhase("closing");
  }, [phase]);

  // keyboard: Esc to close
  useEffect(() => {
    if (!isFocused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFocused, handleClose]);

  return (
    <div
      role="dialog"
      aria-label={win.title}
      aria-modal={false}
      onPointerDown={() => focus(win.id)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        // For the genie-minimize animation we know the dock is centered at
        // the bottom; translate toward the bottom-center as we scale down.
        transformOrigin:
          phase === "minimizing" ? "50% 100%" : undefined,
      }}
      data-phase={phase ?? "idle"}
      className={cn(
        "absolute flex flex-col rounded-md overflow-hidden",
        "bg-surface border will-change-transform",
        isFocused
          ? "border-ink/50 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]"
          : "border-border shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)]",
        phase === "opening" && "animate-[window-open_200ms_ease-out_both]",
        phase === "closing" && "animate-[window-close_160ms_ease-in_both] pointer-events-none",
        phase === "minimizing" && "animate-[genie-minimize_220ms_ease-in_both] pointer-events-none"
      )}
    >
      {/* Title bar — Win XP/95 retro */}
      <div
        onPointerDown={onTitleBarPointerDown}
        onDoubleClick={onTitleBarDoubleClick}
        className={cn(
          "flex items-center h-9 pl-3 pr-1 gap-2 select-none flex-shrink-0",
          "border-b",
          isFocused
            ? "bg-ink text-canvas border-ink"
            : "bg-surface-alt text-mute border-border",
          win.isMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        )}
      >
        {/* Title (left, bold, mono — file-style label) */}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "h-2 w-2 rounded-[1px] shrink-0",
              isFocused ? "bg-primary" : "bg-mute/50"
            )}
          />
          <span className="font-mono text-[12px] font-semibold truncate tracking-tight">
            {win.title}
          </span>
        </div>

        {/* Control cluster — square Win-style buttons */}
        <div className="flex items-center gap-[2px]" aria-hidden="true">
          <button
            type="button"
            data-window-action="minimize"
            onClick={(e) => {
              e.stopPropagation();
              handleMinimize();
            }}
            aria-label="Minimize"
            className={cn(
              "h-7 w-8 rounded-sm grid place-items-center transition-colors",
              isFocused
                ? "hover:bg-canvas/15 text-canvas"
                : "hover:bg-ink/10 text-mute"
            )}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
            </svg>
          </button>
          <button
            type="button"
            data-window-action="maximize"
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(win.id);
            }}
            aria-label={win.isMaximized ? "Restore" : "Maximize"}
            className={cn(
              "h-7 w-8 rounded-sm grid place-items-center transition-colors",
              isFocused
                ? "hover:bg-canvas/15 text-canvas"
                : "hover:bg-ink/10 text-mute"
            )}
          >
            {win.isMaximized ? (
              <svg width="10" height="10" viewBox="0 0 10 10">
                <rect x="1.5" y="3" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M3 3V1.5h5V6.5H6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10">
                <rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            )}
          </button>
          <button
            type="button"
            data-window-action="close"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close"
            className={cn(
              "h-7 w-8 rounded-sm grid place-items-center transition-colors",
              "hover:bg-[#E5484D] hover:text-white",
              isFocused ? "text-canvas" : "text-mute"
            )}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        className="flex-1 overflow-auto bg-canvas"
        style={{ height: `calc(100% - ${TITLE_BAR}px)` }}
      >
        {children}
      </div>

      {/* Resize handle (bottom-right) */}
      {!win.isMaximized && (
        <div
          onPointerDown={onResizeHandlePointerDown}
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
          style={{
            background:
              "linear-gradient(135deg, transparent 50%, var(--mute) 50%, var(--mute) 60%, transparent 60%, transparent 75%, var(--mute) 75%, var(--mute) 85%, transparent 85%)",
            opacity: 0.5,
          }}
        />
      )}
    </div>
  );
}
