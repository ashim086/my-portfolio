"use client";

import { useEffect } from "react";
import { useWindowManager } from "./window-manager";

/**
 * Global keyboard shortcuts for the desktop.
 *  - Super/Meta → toggle Start menu
 *  - Alt+F4 → close the focused window
 *  - Ctrl+Alt+T → open Terminal
 */
export default function DesktopShortcuts({
  onToggleStart,
  onOpenTerminal,
}: {
  onToggleStart: () => void;
  onOpenTerminal: () => void;
}) {
  const { windows, focusedId, close } = useWindowManager();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore if typing in an input/textarea/contenteditable
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }

      // Super / Meta / OS key → toggle Start (prevent browser's default)
      if (e.key === "Meta" || e.key === "OS") {
        e.preventDefault();
        onToggleStart();
        return;
      }

      // Alt+F4 → close focused
      if (e.altKey && (e.key === "F4" || e.key === "f4")) {
        e.preventDefault();
        if (focusedId) close(focusedId);
        return;
      }

      // Ctrl+Alt+T → open Terminal
      if (e.ctrlKey && e.altKey && (e.key === "T" || e.key === "t")) {
        e.preventDefault();
        onOpenTerminal();
        return;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, focusedId, onOpenTerminal, onToggleStart, windows]);

  return null;
}
