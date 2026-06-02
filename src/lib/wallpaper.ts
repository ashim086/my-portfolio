export const WALLPAPER_KEY = "ashim:wallpaper";
export const WALLPAPER_EVENT = "ashim:wallpaper-change";

export const LOCAL_DEFAULT = "/wallpaper/9pRAwF9.jpeg";

export type WallpaperOption = {
  id: string;
  label: string;
  url: string | null; // null = use LOCAL_DEFAULT
};

export const wallpaperOptions: WallpaperOption[] = [
  { id: "default", label: "Default", url: null },
  { id: "avengers-1", label: "Avengers — Team", url: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1920&q=80" },
  { id: "avengers-2", label: "Avengers — Endgame", url: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=1920&q=80" },
  { id: "avengers-3", label: "Marvel — Comic", url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&q=80" },
  { id: "hello-kitty-1", label: "Hello Kitty — Pink", url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&q=80" },
  { id: "hello-kitty-2", label: "Hello Kitty — Cute", url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1920&q=80" },
  { id: "hello-kitty-3", label: "Pastel — Kitty", url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1920&q=80" },
  { id: "cat-1", label: "Cute Cat", url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1920&q=80" },
  { id: "cat-2", label: "Orange Cat", url: "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=1920&q=80" },
  { id: "night-sky", label: "Night Sky", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80" },
];

export function getWallpaper(): string {
  try {
    const saved = localStorage.getItem(WALLPAPER_KEY);
    if (!saved) return LOCAL_DEFAULT;
    if (saved === "default") return LOCAL_DEFAULT;
    return saved;
  } catch {
    return LOCAL_DEFAULT;
  }
}

export function setWallpaper(url: string) {
  try {
    localStorage.setItem(WALLPAPER_KEY, url);
    window.dispatchEvent(new CustomEvent(WALLPAPER_EVENT, { detail: url }));
  } catch {}
}

export function resetWallpaper() {
  try {
    localStorage.setItem(WALLPAPER_KEY, "default");
    window.dispatchEvent(new CustomEvent(WALLPAPER_EVENT, { detail: LOCAL_DEFAULT }));
  } catch {}
}
