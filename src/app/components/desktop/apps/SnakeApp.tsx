"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { HiRefresh, HiPlay, HiPause } from "react-icons/hi";

const GRID = 18;
const CELL = 18; // px
const TICK_MS = 110;

type Point = { x: number; y: number };

const DIRS: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

export default function SnakeApp() {
  const [snake, setSnake] = useState<Point[]>([{ x: 8, y: 8 }]);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [pendingDir, setPendingDir] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>({ x: 4, y: 8 });
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("snake-best") ?? 0);
  });
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const dirRef = useRef(dir);
  dirRef.current = dir;
  const pendingRef = useRef(pendingDir);
  pendingRef.current = pendingDir;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const next = DIRS[e.key];
      if (!next) return;
      e.preventDefault();
      // disallow 180° turn
      const cur = dirRef.current;
      if (next.x === -cur.x && next.y === -cur.y) return;
      setPendingDir(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!running || gameOver) return;
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = { x: head.x + pendingRef.current.x, y: head.y + pendingRef.current.y };
        // walls
        if (
          newHead.x < 0 ||
          newHead.x >= GRID ||
          newHead.y < 0 ||
          newHead.y >= GRID
        ) {
          setGameOver(true);
          return prev;
        }
        // self
        if (prev.some((p) => p.x === newHead.x && p.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }
        setDir(pendingRef.current);
        const ate = newHead.x === food.x && newHead.y === food.y;
        const nextSnake = ate
          ? [newHead, ...prev]
          : [newHead, ...prev.slice(0, -1)];
        if (ate) {
          setScore((s) => {
            const ns = s + 1;
            setBest((b) => {
              const nb = Math.max(b, ns);
              try {
                localStorage.setItem("snake-best", String(nb));
              } catch {
                /* ignore */
              }
              return nb;
            });
            return ns;
          });
          // place new food
          let placed = false;
          while (!placed) {
            const p = {
              x: Math.floor(Math.random() * GRID),
              y: Math.floor(Math.random() * GRID),
            };
            if (!nextSnake.some((s) => s.x === p.x && s.y === p.y)) {
              setFood(p);
              placed = true;
            }
          }
        }
        return nextSnake;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running, gameOver, food]);

  const reset = () => {
    setSnake([{ x: 8, y: 8 }]);
    setDir({ x: 1, y: 0 });
    setPendingDir({ x: 1, y: 0 });
    setFood({ x: 4, y: 8 });
    setScore(0);
    setGameOver(false);
    setRunning(true);
  };

  return (
    <div className="p-4 space-y-3 select-none">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-mute">
            Game
          </p>
          <h2 className="text-lg font-bold text-ink">Snake</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRunning((r) => !r)}
            disabled={gameOver}
            className={cn(
              "h-8 w-8 inline-flex items-center justify-center rounded-pill",
              "border border-border bg-canvas text-ink hover:border-ink",
              gameOver && "opacity-40 cursor-not-allowed"
            )}
            aria-label={running ? "Pause" : "Resume"}
          >
            {running ? <HiPause className="h-4 w-4" /> : <HiPlay className="h-4 w-4" />}
          </button>
          <button
            onClick={reset}
            className="h-8 w-8 inline-flex items-center justify-center rounded-pill border border-border bg-canvas text-ink hover:border-ink"
            aria-label="Restart"
          >
            <HiRefresh className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[12px] text-mute">
        <span>
          Score: <span className="font-bold text-ink tabular-nums">{score}</span>
        </span>
        <span>
          Best: <span className="font-bold text-ink tabular-nums">{best}</span>
        </span>
      </div>

      <div
        className="relative mx-auto rounded-md border-2 border-ink bg-surface-alt overflow-hidden"
        style={{ width: GRID * CELL, height: GRID * CELL }}
      >
        {snake.map((p, i) => (
          <div
            key={i}
            className={cn(
              "absolute",
              i === 0 ? "bg-ink" : "bg-success"
            )}
            style={{
              left: p.x * CELL,
              top: p.y * CELL,
              width: CELL - 2,
              height: CELL - 2,
              borderRadius: i === 0 ? 4 : 2,
            }}
          />
        ))}
        <div
          className="absolute bg-accent rounded-full"
          style={{
            left: food.x * CELL + 3,
            top: food.y * CELL + 3,
            width: CELL - 6,
            height: CELL - 6,
          }}
        />
        {gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas/90 gap-2">
            <p className="text-lg font-extrabold text-ink">Game over</p>
            <p className="text-xs text-mute">Score: {score}</p>
            <button
              onClick={reset}
              className="h-8 px-3 rounded-pill bg-primary text-on-primary text-xs font-bold"
            >
              Play again
            </button>
          </div>
        ) : null}
      </div>

      <p className="text-[11px] text-mute text-center">
        Use arrow keys to move.
      </p>
    </div>
  );
}
