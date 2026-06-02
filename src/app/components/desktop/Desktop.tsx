"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apps as appRegistry } from "./apps";
import { WindowManagerProvider, useWindowManager, type AppId } from "./window-manager";
import Window from "./Window";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import BootScreen from "./BootScreen";
import DesktopIcon from "./DesktopIcon";
import ContextMenu, { type ContextMenuItem } from "./ContextMenu";
import DesktopShortcuts from "./DesktopShortcuts";
import { getWallpaper, WALLPAPER_EVENT } from "@/lib/wallpaper";
import AboutApp from "./apps/AboutApp";
import SkillsApp from "./apps/SkillsApp";
import ExperienceApp from "./apps/ExperienceApp";
import ProjectsApp from "./apps/ProjectsApp";
import ContactApp from "./apps/ContactApp";
import CVApp from "./apps/CVApp";
import TerminalApp from "./apps/TerminalApp";
import SettingsApp from "./apps/SettingsApp";
import SudokuApp from "./apps/SudokuApp";
import SnakeApp from "./apps/SnakeApp";
import GalleryApp from "./apps/GalleryApp";
import MusicApp from "./apps/MusicApp";
import TrashApp from "./apps/TrashApp";
import WelcomeApp from "./apps/WelcomeApp";
import BrowserApp from "./apps/BrowserApp";

function renderApp(id: AppId) {
  switch (id) {
    case "about":
      return <AboutApp />;
    case "skills":
      return <SkillsApp />;
    case "experience":
      return <ExperienceApp />;
    case "projects":
      return <ProjectsApp />;
    case "contact":
      return <ContactApp />;
    case "cv":
      return <CVApp />;
    case "terminal":
      return <TerminalApp />;
    case "settings":
      return <SettingsApp />;
    case "sudoku":
      return <SudokuApp />;
    case "snake":
      return <SnakeApp />;
    case "gallery":
      return <GalleryApp />;
    case "music":
      return <MusicApp />;
    case "trash":
      return <TrashApp />;
    case "welcome":
      return <WelcomeApp />;
    case "browser":
      return <BrowserApp />;
  }
}

// Desktop icons shown in the top-left grid.
const desktopIcons: { id: AppId; label: string }[] = [
  { id: "welcome", label: "Welcome" },
  { id: "browser", label: "Browser" },
  { id: "about", label: "About Me" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "cv", label: "Resume.pdf" },
  { id: "terminal", label: "Terminal" },
  { id: "gallery", label: "Gallery" },
  { id: "music", label: "Music" },
  { id: "sudoku", label: "Sudoku" },
  { id: "snake", label: "Snake" },
  { id: "settings", label: "Settings" },
  { id: "trash", label: "Trash" },
];

// Default pinned apps for the taskbar dock
const defaultPinned: AppId[] = [
  "welcome",
  "browser",
  "about",
  "projects",
  "contact",
  "cv",
  "terminal",
  "gallery",
  "music",
  "sudoku",
  "snake",
  "settings",
  "trash",
];

// Bump this whenever DEFAULT_ICON_POSITIONS changes to re-apply the layout once.
const ICON_LAYOUT_VERSION = "3";

// Secondary apps live on the RIGHT edge of the screen so the left (focus) zone
// stays dedicated to portfolio work. Their x is computed from screen width.
const SECONDARY_IDS: AppId[] = [
  "welcome",
  "terminal",
  "browser",
  "gallery",
  "music",
  "sudoku",
  "snake",
  "settings",
  "trash",
];

const DEFAULT_ICON_POSITIONS: Record<string, { x: number; y: number }> = {
  // Left column — portfolio work, top-down in reading order (primary focus).
  about:     { x: 16,  y: 16 },
  experience:{ x: 16,  y: 100 },
  projects:  { x: 16,  y: 184 },
  skills:    { x: 16,  y: 268 },
  contact:   { x: 16,  y: 352 },
  cv:        { x: 16,  y: 436 },
  // Right column — apps & games (secondary).
  welcome:   { x: 112, y: 16 },
  terminal:  { x: 112, y: 100 },
  browser:   { x: 112, y: 184 },
  gallery:   { x: 112, y: 268 },
  music:     { x: 112, y: 352 },
  sudoku:    { x: 112, y: 436 },
  snake:     { x: 112, y: 520 },
  settings:  { x: 112, y: 604 },
  trash:     { x: 112, y: 688 },
};

function DesktopInner() {
  const { windows, open, trash } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    items: ContextMenuItem[];
  } | null>(null);
  const [wallpaperSeed, setWallpaperSeed] = useState(0);
  const [wallpaperUrl, setWallpaperUrl] = useState<string>(() => getWallpaper());

  // Pinned apps state — persisted to localStorage
  const [pinnedApps, setPinnedApps] = useState<AppId[]>(() => {
    try {
      const saved = localStorage.getItem("ashim:pinned-apps");
      return saved ? JSON.parse(saved) : defaultPinned;
    } catch { return defaultPinned; }
  });

  const togglePin = useCallback((id: AppId) => {
    setPinnedApps(prev => {
      const next = prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id];
      try { localStorage.setItem("ashim:pinned-apps", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // Icon positions — persisted in localStorage for free dragging.
  // ICON_LAYOUT_VERSION is bumped whenever DEFAULT_ICON_POSITIONS changes so a
  // fresh arrangement is applied once on next reboot (stale saved layouts are
  // cleared), after which dragging persists normally again.
  const [iconPos, setIconPos] = useState<Record<string, { x: number; y: number }>>(() => {
    if (typeof window === "undefined") return DEFAULT_ICON_POSITIONS;
    try {
      if (localStorage.getItem("ashim:icon-layout-v") !== ICON_LAYOUT_VERSION) {
        localStorage.setItem("ashim:icon-layout-v", ICON_LAYOUT_VERSION);
        localStorage.removeItem("ashim:desktop-icons");
        return DEFAULT_ICON_POSITIONS;
      }
      const saved = localStorage.getItem("ashim:desktop-icons");
      return saved ? { ...DEFAULT_ICON_POSITIONS, ...JSON.parse(saved) } : DEFAULT_ICON_POSITIONS;
    } catch { return DEFAULT_ICON_POSITIONS; }
  });

  // Drag state for icons
  const iconDrag = useRef<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const onIconPointerDown = useCallback(
    (e: React.PointerEvent, id: string) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const pos = iconPos[id] ?? DEFAULT_ICON_POSITIONS[id] ?? { x: 0, y: 0 };
      iconDrag.current = { id, startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [iconPos],
  );

  const onIconPointerMove = useCallback((e: React.PointerEvent) => {
    const d = iconDrag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    const x = Math.max(0, d.origX + dx);
    const y = Math.max(0, d.origY + dy);
    setIconPos(prev => ({ ...prev, [d.id]: { x, y } }));
  }, []);

  const onIconPointerUp = useCallback((e: React.PointerEvent) => {
    const d = iconDrag.current;
    if (!d) return;
    iconDrag.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    // Persist
    try {
      const saved = localStorage.getItem("ashim:desktop-icons");
      const all = saved ? JSON.parse(saved) : {};
      all[d.id] = iconPos[d.id];
      localStorage.setItem("ashim:desktop-icons", JSON.stringify(all));
    } catch {}
  }, [iconPos]);

  // Anchor secondary apps to the right edge (portfolio stays left). Recomputes
  // on resize, but never overrides an icon the user has dragged & saved.
  useEffect(() => {
    const reflow = () => {
      let saved: Record<string, unknown> = {};
      try {
        saved = JSON.parse(localStorage.getItem("ashim:desktop-icons") || "{}");
      } catch {}
      const width = window.innerWidth;
      setIconPos((prev) => {
        const next = { ...prev };
        SECONDARY_IDS.forEach((id, i) => {
          if (saved[id]) return; // respect a custom-dragged position
          const col = Math.floor(i / 5); // 0 = rightmost column, 1 = inner
          const row = i % 5;
          next[id] = {
            x: Math.max(140, width - 96 - col * 96),
            y: 16 + row * 84,
          };
        });
        return next;
      });
    };
    reflow();
    window.addEventListener("resize", reflow);
    return () => window.removeEventListener("resize", reflow);
  }, []);

  // Auto-open Welcome app on first boot
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ashim:welcome-shown") === "1") return;
    sessionStorage.setItem("ashim:welcome-shown", "1");
    open("welcome");
  }, [open]);

  // Listen for wallpaper changes from Settings app
  useEffect(() => {
    const handler = (e: Event) => {
      setWallpaperUrl((e as CustomEvent<string>).detail);
      setWallpaperSeed(s => s + 1);
    };
    window.addEventListener(WALLPAPER_EVENT, handler);
    return () => window.removeEventListener(WALLPAPER_EVENT, handler);
  }, []);

  // Listen for "open this app" events fired from the Terminal app
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<AppId>).detail;
      if (detail) open(detail);
    };
    window.addEventListener("ashim:open-app", onOpen);
    return () => window.removeEventListener("ashim:open-app", onOpen);
  }, [open]);

  const handleDesktopContextMenu = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-window-root]")) return;
      const iconEl = target.closest("[data-desktop-icon]");
      e.preventDefault();
      if (iconEl) {
        const appId = iconEl.getAttribute("data-app-id") as AppId | null;
        if (!appId) return;
        const isPinned = pinnedApps.includes(appId);
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          items: [
            { label: "Open", onClick: () => open(appId) },
            { separator: true, label: "" },
            {
              label: isPinned ? "Unpin from taskbar" : "Pin to taskbar",
              onClick: () => togglePin(appId),
            },
          ],
        });
      } else {
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          items: [
            { label: "View", disabled: true },
            { separator: true, label: "" },
            {
              label: "Refresh wallpaper",
              onClick: () => setWallpaperSeed((s) => s + 1),
              shortcut: "F5",
            },
            {
              label: "Open Terminal",
              onClick: () => open("terminal"),
              shortcut: "Ctrl+Alt+T",
            },
            { separator: true, label: "" },
            {
              label: "Settings",
              onClick: () => open("settings"),
            },
            {
              label: "About Ashim",
              onClick: () => open("about"),
            },
          ],
        });
      }
    },
    [open, pinnedApps, togglePin]
  );

  return (
    <div
      className="fixed inset-0 isolate overflow-hidden bg-canvas"
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Wallpaper layer */}
      <Wallpaper key={wallpaperSeed} imageUrl={wallpaperUrl} />

      {/* Desktop icons — free-positioned & draggable */}
      <div
        className="absolute inset-0 z-10"
        onPointerMove={onIconPointerMove}
        onPointerUp={onIconPointerUp}
        onPointerCancel={onIconPointerUp}
      >
        {desktopIcons.map(({ id, label }) => {
          const pos = iconPos[id] ?? { x: 0, y: 0 };
          return (
            <div
              key={id}
              data-desktop-icon
              data-app-id={id}
              className="absolute"
              style={{ left: pos.x, top: pos.y }}
              onPointerDown={(e) => onIconPointerDown(e, id)}
            >
              <DesktopIcon
                label={label}
                icon={appRegistry[id].icon}
                onOpen={() => open(id)}
                badge={id === "trash" && trash.length > 0 ? trash.length : 0}
              />
            </div>
          );
        })}
      </div>

      {/* Open windows */}
      <div data-window-root className="absolute inset-0 pointer-events-none">
        {windows.map((w) => (
          <div key={w.id} className="pointer-events-auto">
            <Window win={w}>{renderApp(w.appId)}</Window>
          </div>
        ))}
      </div>

      {/* Taskbar at the very bottom (quick-launch apps live inside it) */}
      <Taskbar
        apps={appRegistry}
        pinned={pinnedApps}
        trashCount={trash.length}
        onStartClick={() => setStartOpen((o) => !o)}
        onLaunch={(id) => open(id)}
        startOpen={startOpen}
        onPinnedContextMenu={(e, id) => {
          e.preventDefault();
          e.stopPropagation();
          setContextMenu({
            x: e.clientX,
            y: e.clientY,
            items: [
              { label: "Unpin from taskbar", onClick: () => togglePin(id) },
            ],
          });
        }}
      />

      <StartMenu
        open={startOpen}
        onClose={() => setStartOpen(false)}
        apps={appRegistry}
        onLaunch={(id) => open(id)}
      />

      {contextMenu ? (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      ) : null}

      <DesktopShortcuts
        onToggleStart={() => setStartOpen((o) => !o)}
        onOpenTerminal={() => open("terminal")}
      />
    </div>
  );
}

function Wallpaper({ imageUrl }: { imageUrl: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-cover bg-center"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    />
  );
}

export default function Desktop() {
  const [booted, setBooted] = useState(false);

  // Skip the boot screen if the user has already booted in this session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ashim:booted") === "1") {
      setBooted(true);
    }
  }, []);

  const onDone = () => {
    try {
      sessionStorage.setItem("ashim:booted", "1");
    } catch {
      /* ignore */
    }
    setBooted(true);
  };

  return (
    <WindowManagerProvider apps={appRegistry}>
      {!booted ? <BootScreen onDone={onDone} /> : null}
      <DesktopInner />
    </WindowManagerProvider>
  );
}
