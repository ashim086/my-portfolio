"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { track } from "@/lib/analytics";

export type AppId =
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "contact"
  | "cv"
  | "terminal"
  | "settings"
  | "sudoku"
  | "snake"
  | "gallery"
  | "music"
  | "trash"
  | "welcome"
  | "browser";

export type ClosedItem = {
  appId: AppId;
  title: string;
  closedAt: number; // ms epoch
};

export type WindowState = {
  id: string; // unique window instance id
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  // remember position/size when toggling maximize
  restoreRect?: { x: number; y: number; width: number; height: number };
};

export type AppDef = {
  id: AppId;
  title: string;
  iconKey: string; // matches key in icon registry
  defaultSize: { width: number; height: number };
  resizable: boolean;
  singleton: boolean; // only one instance at a time
};

type OpenOptions = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

type WindowManagerValue = {
  windows: WindowState[];
  openWindows: WindowState[]; // alias, excludes minimized
  focusedId: string | null;
  trash: ClosedItem[];
  open: (appId: AppId, opts?: OpenOptions) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, width: number, height: number) => void;
  emptyTrash: () => void;
  restoreFromTrash: (index: number) => void;
};

const WindowManagerContext = createContext<WindowManagerValue | undefined>(
  undefined
);

const TASKBAR_HEIGHT = 48;
const DEFAULT_NEW_OFFSET = 24;

export function WindowManagerProvider({
  children,
  apps,
}: {
  children: React.ReactNode;
  apps: Record<AppId, AppDef>;
}) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const windowsRef = useRef<WindowState[]>(windows);
  useEffect(() => {
    windowsRef.current = windows;
  }, [windows]);

  const setWindowsAndRef = useCallback((updater: (prev: WindowState[]) => WindowState[]) => {
    setWindows((prev) => {
      const next = updater(prev);
      windowsRef.current = next;
      return next;
    });
  }, []);
  const [trash, setTrash] = useState<ClosedItem[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const zCounter = useRef(10);

  // center a new window inside the available desktop area
  const centerRect = useCallback(
    (
      width: number,
      height: number,
      offsetSeed: number
    ): { x: number; y: number } => {
      const vw = typeof window === "undefined" ? 1440 : window.innerWidth;
      const vh =
        typeof window === "undefined" ? 900 : window.innerHeight - TASKBAR_HEIGHT;
      const offset = (offsetSeed % 8) * DEFAULT_NEW_OFFSET;
      const x = Math.max(0, Math.round((vw - width) / 2) + offset);
      const y = Math.max(0, Math.round((vh - height) / 2) + offset);
      return { x, y };
    },
    []
  );

  const open = useCallback(
    (appId: AppId, opts?: OpenOptions) => {
      // Engagement signal — which apps visitors actually open.
      track("app_opened", { app: appId });
      // Use a ref-backed snapshot to avoid race where multiple opens
      // happen simultaneously and create duplicate singleton windows.
      const def = apps[appId];
      if (def.singleton) {
        const existing = windowsRef.current.find((w) => w.appId === appId);
        if (existing) {
          zCounter.current += 1;
          const nextZ = zCounter.current;
          setFocusedId(existing.id);
          setWindowsAndRef((prev) =>
            prev.map((w) =>
              w.id === existing.id
                ? { ...w, zIndex: nextZ, isMinimized: false }
                : w
            )
          );
          return;
        }
      }

      const w = opts?.width ?? def.defaultSize.width;
      const h = opts?.height ?? def.defaultSize.height;
      const centered = centerRect(w, h, windowsRef.current.length);
      const id = `${appId}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;
      zCounter.current += 1;
      const newWin: WindowState = {
        id,
        appId,
        title: def.title,
        x: opts?.x ?? centered.x,
        y: opts?.y ?? centered.y,
        width: w,
        height: h,
        zIndex: zCounter.current,
        isMinimized: false,
        isMaximized: false,
      };
      setFocusedId(id);
      // update state + ref
      setWindowsAndRef((prev) => [...prev, newWin]);
    },
    [apps, centerRect]
  );

  const close = useCallback(
    (id: string) => {
      setWindowsAndRef((prev) => {
        const target = prev.find((w) => w.id === id);
        if (target) {
          if (target.appId !== "trash") {
            setTrash((t) =>
              [
                {
                  appId: target.appId,
                  title: target.title,
                  closedAt: Date.now(),
                },
                ...t,
              ].slice(0, 24)
            );
          }
        }
        return prev.filter((w) => w.id !== id);
      });
      setFocusedId((curr) => (curr === id ? null : curr));
    },
    []
  );

  const focus = useCallback((id: string) => {
    setWindowsAndRef((prev) => {
      const target = prev.find((w) => w.id === id);
      if (!target) return prev;
      const topZ = prev.reduce((m, w) => Math.max(m, w.zIndex), 0);
      if (target.zIndex === topZ && !target.isMinimized) {
        setFocusedId(id);
        return prev;
      }
      zCounter.current += 1;
      const nextZ = zCounter.current;
      setFocusedId(id);
      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w
      );
    });
  }, []);

  const minimize = useCallback((id: string) => {
    setWindowsAndRef((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
    setFocusedId((curr) => (curr === id ? null : curr));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindowsAndRef((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.isMaximized && w.restoreRect) {
          return {
            ...w,
            isMaximized: false,
            x: w.restoreRect.x,
            y: w.restoreRect.y,
            width: w.restoreRect.width,
            height: w.restoreRect.height,
            restoreRect: undefined,
          };
        }
        return {
          ...w,
          isMaximized: true,
          restoreRect: {
            x: w.x,
            y: w.y,
            width: w.width,
            height: w.height,
          },
          x: 0,
          y: 0,
          width:
            typeof window === "undefined" ? w.width : window.innerWidth,
          height:
            typeof window === "undefined"
              ? w.height
              : window.innerHeight - TASKBAR_HEIGHT,
        };
      })
    );
  }, []);

  const move = useCallback((id: string, x: number, y: number) => {
    setWindowsAndRef((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resize = useCallback(
    (id: string, width: number, height: number) => {
      setWindowsAndRef((prev) => prev.map((w) => (w.id === id ? { ...w, width, height } : w)));
    },
    []
  );

  // clamp windows back inside the viewport on resize
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => {
      setWindowsAndRef((prev) =>
        prev.map((w) => {
          if (w.isMaximized) return w;
          const maxW = window.innerWidth;
          const maxH = window.innerHeight - TASKBAR_HEIGHT;
          const w2 = Math.min(Math.max(320, w.width), maxW);
          const h2 = Math.min(Math.max(220, w.height), maxH);
          const x = Math.max(-w2 + 80, Math.min(w.x, maxW - 80));
          const y = Math.max(0, Math.min(w.y, maxH - 32));
          if (
            w2 === w.width &&
            h2 === w.height &&
            x === w.x &&
            y === w.y
          ) {
            return w;
          }
          return { ...w, width: w2, height: h2, x, y };
        })
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openWindows = useMemo(
    () => windows.filter((w) => !w.isMinimized),
    [windows]
  );

  const emptyTrash = useCallback(() => setTrash([]), []);

  const restoreFromTrash = useCallback(
    (index: number) => {
      setTrash((t) => {
        const item = t[index];
        if (item) open(item.appId);
        return t.filter((_, i) => i !== index);
      });
    },
    [open]
  );

  const value = useMemo<WindowManagerValue>(
    () => ({
      windows,
      openWindows,
      focusedId,
      trash,
      open,
      close,
      focus,
      minimize,
      toggleMaximize,
      move,
      resize,
      emptyTrash,
      restoreFromTrash,
    }),
    [
      windows,
      openWindows,
      focusedId,
      trash,
      open,
      close,
      focus,
      minimize,
      toggleMaximize,
      move,
      resize,
      emptyTrash,
      restoreFromTrash,
    ]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx)
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
