"use client";

import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import {
  HiPlay, HiPause,
  HiVolumeUp, HiVolumeOff, HiSearch,
  HiHeart, HiOutlineHeart,
  HiHome, HiLibrary,
} from "react-icons/hi";
import { cn } from "@/lib/cn";

type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  src: string;
  duration: number;
  gradient: string;
};

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function SkipPrevIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
  );
}

function SkipNextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6z" />
    </svg>
  );
}

function ShuffleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 3h5v5" /><path d="M4 20L21 3" /><path d="M21 16v5h-5" /><path d="M15 15l6 6" /><path d="M4 4l5 5" />
    </svg>
  );
}

function RepeatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  );
}

// Encode the filename part only (public/music/ is the folder)
const musicPath = (filename: string) => `/music/${encodeURIComponent(filename)}`;

const TRACKS: Track[] = [
  { id: "t1", title: "Chalne Lagi Hai Hawayein", artist: "Abhijeet Bhattacharya", album: "Tere Bina", src: musicPath("y2mate.com - Chalne Lagi Hai Hawayein Video Song Tere Bina Abhijeet Super Hit Hindi Video Song.mp3"), duration: 0, gradient: "from-[#F54E00] to-[#F7A501]" },
  { id: "t2", title: "Kabhi Yaadon Mein Aaun", artist: "Abhijeet Bhattacharya", album: "Tere Bina", src: musicPath("y2mate.com - Kabhi Yaadon Mein Aaun Lyrical Video Song  Tere Bina  Feat Divya Khosla Kumar  Abhijeet.mp3"), duration: 0, gradient: "from-[#5C89AE] to-[#6F9B4E]" },
  { id: "t3", title: "Tu Hi Tu", artist: "Himesh Reshammiya", album: "Kick", src: musicPath("y2mate.com - LYRICAL Tu Hi Tu Full Audio Song with Lyrics  Kick  Salman Khan  Himesh Reshammiya.mp3"), duration: 0, gradient: "from-[#23251D] to-[#4D4F46]" },
  { id: "t4", title: "Suna Suna Sanam", artist: "Bharat Regmi", album: "Single", src: musicPath("y2mate.com - Suna suna sanam  Bharat Regmi.mp3"), duration: 0, gradient: "from-[#6F9B4E] to-[#C0905C]" },
];

type SideView = "home" | "search" | "library" | "liked";

export default function MusicApp() {
  const [sideView, setSideView] = useState<SideView>("home");
  const [tracks] = useState<Track[]>(TRACKS);
  const [currentId, setCurrentId] = useState<string>(TRACKS[0].id);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "all" | "one">("off");
  const [liked, setLiked] = useState<Set<string>>(new Set(["t2", "t4"]));
  const [search, setSearch] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const blobUrlRef = useRef("");

  const current = useMemo(() => tracks.find(t => t.id === currentId)!, [tracks, currentId]);
  const progress = duration > 0 ? elapsed / duration : 0;

  const nextTrack = useCallback(() => {
    setCurrentId(prev => {
      const idx = tracks.findIndex(t => t.id === prev);
      if (shuffle) {
        const others = tracks.filter(t => t.id !== prev);
        return others.length > 0 ? others[Math.floor(Math.random() * others.length)].id : prev;
      }
      return tracks[(idx + 1) % tracks.length].id;
    });
  }, [shuffle, tracks]);

  const prevTrack = useCallback(() => {
    setCurrentId(prev => {
      const idx = tracks.findIndex(t => t.id === prev);
      if (shuffle) {
        const others = tracks.filter(t => t.id !== prev);
        return others.length > 0 ? others[Math.floor(Math.random() * others.length)].id : prev;
      }
      return tracks[(idx - 1 + tracks.length) % tracks.length].id;
    });
  }, [shuffle, tracks]);

  // Stale-closure shields for handlers attached once
  const nextTrackRef = useRef(nextTrack);
  nextTrackRef.current = nextTrack;
  const repeatRef = useRef(repeat);
  repeatRef.current = repeat;
  const playingRef = useRef(playing);
  playingRef.current = playing;

  // 1) Mount: create Audio, wire persistent listeners.
  //    Unmount (= window close): pause + clear src so it stops fully.
  //    Minimize keeps the component mounted, so playback survives that.
  useEffect(() => {
    const a = new Audio();
    a.preload = "auto";
    audioRef.current = a;

    const onLoaded = () => setDuration(a.duration || 0);
    const onEnded = () => {
      if (repeatRef.current === "one") {
        a.currentTime = 0;
        a.play().catch(() => {});
      } else {
        nextTrackRef.current();
      }
    };
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("durationchange", onLoaded);
    a.addEventListener("ended", onEnded);

    return () => {
      a.pause();
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("durationchange", onLoaded);
      a.removeEventListener("ended", onEnded);
      a.removeAttribute("src");
      a.load();
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = "";
      }
      audioRef.current = null;
    };
  }, []);

  // 2) Track change: load new src. If playing-state is true, start on canplay.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    setElapsed(0);
    setDuration(0);

    let cancelled = false;
    const onReady = () => {
      a.removeEventListener("canplay", onReady);
      if (!cancelled && playingRef.current) a.play().catch(() => {});
    };
    a.addEventListener("canplay", onReady);

    a.src = current.src;
    a.load();

    return () => {
      cancelled = true;
      a.removeEventListener("canplay", onReady);
    };
  }, [current.src]);

  // 3) Play/pause toggle (same track).
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      if (a.readyState >= 2) a.play().catch(() => {});
      // if not ready yet, canplay handler in effect (2) will start it
    } else {
      a.pause();
    }
  }, [playing]);

  // Sync volume / muted
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // Progress tick (poll currentTime for real-time accuracy)
  useEffect(() => {
    if (!playing) {
      if (progressTimer.current) {
        clearInterval(progressTimer.current);
        progressTimer.current = null;
      }
      return;
    }
    progressTimer.current = setInterval(() => {
      if (audioRef.current) setElapsed(audioRef.current.currentTime);
    }, 500);
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [playing]);

  // Filter for search
  const filtered = useMemo(() => {
    if (!search) return tracks;
    const q = search.toLowerCase();
    return tracks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.album.toLowerCase().includes(q)
    );
  }, [tracks, search]);

  const toggleLiked = useCallback((id: string) => {
    setLiked(p => {
      const next = new Set(p);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const togglePlay = useCallback(() => setPlaying(v => !v), []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const t = Math.max(0, Math.min(1, pct)) * duration;
    setElapsed(t);
    if (audioRef.current) audioRef.current.currentTime = t;
  }, [duration]);

  const sidebarItems: { id: SideView; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <HiHome /> },
    { id: "search", label: "Search", icon: <HiSearch /> },
    { id: "library", label: "Library", icon: <HiLibrary /> },
    { id: "liked", label: "Liked", icon: <HiOutlineHeart /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] text-[#E8E8E8] font-sans select-none">
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0 bg-[#111] flex flex-col border-r border-white/5">
          <div className="px-4 pt-4 pb-2">
            <h1 className="text-[#1DB954] text-sm font-bold tracking-tight flex items-center gap-2">
              <span className="bg-[#1DB954] text-black h-5 w-5 rounded-sm grid place-items-center font-mono text-[10px] font-bold">♪</span>
              Ashim
            </h1>
          </div>
          <nav className="flex-1 px-2 py-2 space-y-0.5">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setSideView(item.id); if (item.id === "search") setSearch(""); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  sideView === item.id
                    ? "bg-white/10 text-white"
                    : "text-[#8B8B8B] hover:text-white hover:bg-white/5"
                )}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="px-4 py-3 border-t border-white/5 text-[11px] text-[#5A5A5A]">
            {tracks.length} tracks &middot; v1.0
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
          {sideView === "search" ? (
            <div className="sticky top-0 z-10 px-5 pt-4 pb-3 bg-gradient-to-b from-[#1A1A1A] to-transparent">
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8B8B] text-sm" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search tracks, artists, albums…"
                  className="w-full h-9 pl-9 pr-3 rounded-full bg-white/10 text-sm text-white placeholder-[#5A5A5A] border border-white/5 focus:outline-none focus:border-white/20 transition"
                />
              </div>
            </div>
          ) : (
            <div className="px-5 pt-4 pb-2">
              <h2 className="text-lg font-bold">
                {sideView === "home" && "Good afternoon"}
                {sideView === "library" && "Your Library"}
                {sideView === "liked" && "Liked Songs"}
              </h2>
            </div>
          )}

          {/* Track list */}
          <div className="px-3 pb-4">
            {filtered.length === 0 ? (
              <p className="text-[#5A5A5A] text-sm px-3 pt-4">No tracks found.</p>
            ) : null}
            {filtered.map((track, i) => {
              const isActive = track.id === currentId;
              const isLiked = liked.has(track.id);
              return (
                <div
                  key={track.id}
                  onClick={() => { setCurrentId(track.id); setPlaying(true); }}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors",
                    isActive ? "bg-white/10" : "hover:bg-white/5"
                  )}
                >
                  <span className="w-5 text-center text-sm text-[#5A5A5A] group-hover:hidden">
                    {isActive && playing ? (
                      <span className="flex gap-[2px] items-center justify-center text-[#1DB954] h-3">
                        <span className="h-full w-[2px] bg-current animate-[equalizer_0.6s_ease-in-out_infinite_alternate]" />
                        <span className="h-2/3 w-[2px] bg-current animate-[equalizer_0.4s_ease-in-out_infinite_alternate_0.1s]" />
                        <span className="h-full w-[2px] bg-current animate-[equalizer_0.5s_ease-in-out_infinite_alternate_0.2s]" />
                      </span>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className="w-5 text-center hidden group-hover:inline-flex items-center justify-center">
                    {isActive && playing ? (
                      <HiPause className="text-white text-sm" />
                    ) : (
                      <HiPlay className="text-white text-sm" />
                    )}
                  </span>
                  <div className={cn("h-10 w-10 rounded bg-gradient-to-br flex-shrink-0", track.gradient)} />
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium truncate", isActive ? "text-[#1DB954]" : "text-white")}>
                      {track.title}
                    </p>
                    <p className="text-[11px] text-[#8B8B8B] truncate">{track.artist} &middot; {track.album}</p>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); toggleLiked(track.id); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-[#8B8B8B] hover:text-white"
                  >
                    {isLiked ? <HiHeart className="text-[#1DB954]" /> : <HiOutlineHeart />}
                  </button>
                  <span className="text-[11px] text-[#5A5A5A] w-[36px] text-right">
                    {track.duration > 0 ? fmt(track.duration) : (isActive && duration > 0 ? fmt(duration) : "--:--")}
                  </span>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Bottom player bar */}
      <div className="flex-shrink-0 h-[72px] bg-[#181818] border-t border-white/5 flex items-center px-4 gap-4">
        <div className="flex items-center gap-3 min-w-0 w-[200px]">
          <div className={cn("h-12 w-12 rounded bg-gradient-to-br flex-shrink-0 shadow-lg", current.gradient)} />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate text-white">{current.title}</p>
            <p className="text-[11px] text-[#8B8B8B] truncate">{current.artist}</p>
          </div>
          <button onClick={() => toggleLiked(current.id)} className="text-sm flex-shrink-0">
            {liked.has(current.id) ? <HiHeart className="text-[#1DB954]" /> : <HiOutlineHeart className="text-[#8B8B8B] hover:text-white" />}
          </button>
        </div>

        <div className="flex-1 max-w-[600px] mx-auto flex flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShuffle(v => !v)}
              className={cn("text-sm transition", shuffle ? "text-[#1DB954]" : "text-[#8B8B8B] hover:text-white")}
              title="Shuffle"
            >
              <ShuffleIcon className="h-4 w-4" />
            </button>
            <button onClick={prevTrack} className="text-[#8B8B8B] hover:text-white transition" title="Previous">
              <SkipPrevIcon className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className="h-8 w-8 rounded-full bg-white text-black grid place-items-center hover:scale-105 active:scale-95 transition"
              title={playing ? "Pause" : "Play"}
            >
              {playing ? <HiPause className="text-sm" /> : <HiPlay className="text-sm ml-[1px]" />}
            </button>
            <button onClick={nextTrack} className="text-[#8B8B8B] hover:text-white transition" title="Next">
              <SkipNextIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setRepeat(r => r === "off" ? "all" : r === "all" ? "one" : "off")}
              className={cn("relative text-sm transition", repeat !== "off" ? "text-[#1DB954]" : "text-[#8B8B8B] hover:text-white")}
              title={`Repeat: ${repeat}`}
            >
              <RepeatIcon className="h-4 w-4" />
              {repeat === "one" && <span className="absolute -top-1 -right-1 text-[8px] font-bold text-[#1DB954]">1</span>}
            </button>
          </div>
          <div className="w-full flex items-center gap-2 text-[10px] text-[#8B8B8B] font-mono">
            <span>{fmt(elapsed)}</span>
            <div
              className="flex-1 h-[3px] rounded-full bg-white/10 relative group cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full rounded-full bg-white group-hover:bg-[#1DB954] transition-colors"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span>{duration > 0 ? fmt(duration) : "--:--"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 min-w-[130px] justify-end">
          <button
            onClick={() => setMuted(v => !v)}
            className="text-sm text-[#8B8B8B] hover:text-white transition"
            title={muted ? "Unmute" : "Mute"}
          >
            {muted || volume === 0 ? <HiVolumeOff /> : <HiVolumeUp />}
          </button>
          <div
            className="w-20 h-[3px] rounded-full bg-white/10 relative cursor-pointer"
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              const v = Math.max(0, Math.min(1, pct));
              setVolume(v);
              if (audioRef.current) audioRef.current.volume = v;
              if (muted) setMuted(false);
            }}
          >
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${(muted ? 0 : volume) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes equalizer {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
