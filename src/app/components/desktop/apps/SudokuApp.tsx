"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { HiRefresh } from "react-icons/hi";

type Cell = number; // 0 = empty, 1-9 = filled
type Board = Cell[][];

const SIZE = 9;
const BOX = 3;

function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => 0)
  );
}

function isValid(board: Board, r: number, c: number, n: number): boolean {
  for (let i = 0; i < SIZE; i++) {
    if (board[r][i] === n) return false;
    if (board[i][c] === n) return false;
  }
  const br = Math.floor(r / BOX) * BOX;
  const bc = Math.floor(c / BOX) * BOX;
  for (let i = br; i < br + BOX; i++) {
    for (let j = bc; j < bc + BOX; j++) {
      if (board[i][j] === n) return false;
    }
  }
  return true;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fillFull(board: Board): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) {
        for (const n of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (isValid(board, r, c, n)) {
            board[r][c] = n;
            if (fillFull(board)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generate(difficulty: "easy" | "medium" | "hard"): {
  puzzle: Board;
  solution: Board;
} {
  const solution = emptyBoard();
  fillFull(solution);
  const puzzle = solution.map((row) => row.slice());
  const empties =
    difficulty === "easy" ? 35 : difficulty === "medium" ? 45 : 55;
  const positions = shuffle(
    Array.from({ length: SIZE * SIZE }, (_, i) => i)
  ).slice(0, empties);
  positions.forEach((p) => {
    puzzle[Math.floor(p / SIZE)][p % SIZE] = 0;
  });
  return { puzzle, solution };
}

export default function SudokuApp() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [{ puzzle, solution }, setGame] = useState(() => generate("easy"));
  const [board, setBoard] = useState<Board>(() => puzzle.map((r) => r.slice()));
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [won, setWon] = useState(false);

  const reset = (d: "easy" | "medium" | "hard") => {
    const g = generate(d);
    setGame(g);
    setBoard(g.puzzle.map((r) => r.slice()));
    setSelected(null);
    setMistakes(0);
    setWon(false);
    setDifficulty(d);
  };

  useEffect(() => {
    if (won) return;
    const full = board.every((row) => row.every((c) => c !== 0));
    if (full) setWon(true);
  }, [board, won]);

  const onCellClick = (r: number, c: number) => {
    if (won) return;
    if (puzzle[r][c] !== 0) {
      // locked cell, but allow selecting
      setSelected([r, c]);
      return;
    }
    setSelected([r, c]);
  };

  const onNumber = (n: number) => {
    if (won || !selected) return;
    const [r, c] = selected;
    if (puzzle[r][c] !== 0) return;
    const next = board.map((row) => row.slice());
    if (n === 0) {
      next[r][c] = 0;
    } else if (solution[r][c] === n) {
      next[r][c] = n;
    } else {
      next[r][c] = n;
      setMistakes((m) => m + 1);
    }
    setBoard(next);
  };

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (won) return;
      if (e.key >= "1" && e.key <= "9") onNumber(Number(e.key));
      else if (e.key === "0" || e.key === "Backspace" || e.key === "Delete")
        onNumber(0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, board, puzzle, solution, won]);

  const cellIsWrong = useMemo(() => {
    return (r: number, c: number) =>
      board[r][c] !== 0 && board[r][c] !== solution[r][c];
  }, [board, solution]);

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-mute">
            Game
          </p>
          <h2 className="text-lg font-bold text-ink">Sudoku</h2>
        </div>
        <div className="flex items-center gap-2">
          {(["easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              onClick={() => reset(d)}
              className={cn(
                "h-7 px-2.5 rounded-pill text-[11px] font-bold capitalize",
                difficulty === d
                  ? "bg-ink text-canvas"
                  : "bg-canvas border border-border text-ink hover:border-ink"
              )}
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => reset(difficulty)}
            className="h-7 w-7 inline-flex items-center justify-center rounded-pill border border-border bg-canvas text-ink hover:border-ink"
            aria-label="New game"
          >
            <HiRefresh className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 text-[12px] text-mute">
        <span>Mistakes: {mistakes}</span>
        {won ? <span className="text-success font-bold">Solved!</span> : null}
      </div>

      <div className="grid grid-cols-9 gap-0 border-2 border-ink rounded-md overflow-hidden bg-ink w-fit mx-auto">
        {board.map((row, r) =>
          row.map((val, c) => {
            const isLocked = puzzle[r][c] !== 0;
            const isSelected =
              selected && selected[0] === r && selected[1] === c;
            const isPeer =
              selected &&
              (selected[0] === r || selected[1] === c) &&
              !isSelected;
            const isSameBox =
              selected &&
              Math.floor(selected[0] / BOX) === Math.floor(r / BOX) &&
              Math.floor(selected[1] / BOX) === Math.floor(c / BOX) &&
              !isSelected;
            const isWrong = cellIsWrong(r, c);
            const boxRight = (c + 1) % BOX === 0 && c !== SIZE - 1;
            const boxBottom = (r + 1) % BOX === 0 && r !== SIZE - 1;
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => onCellClick(r, c)}
                className={cn(
                  "h-9 w-9 sm:h-10 sm:w-10 text-center text-[15px] font-semibold flex items-center justify-center transition-colors",
                  "bg-surface",
                  isSelected && "bg-primary/30",
                  !isSelected && isPeer && "bg-surface-alt",
                  !isSelected && !isPeer && isSameBox && "bg-surface-alt/60",
                  isLocked ? "text-ink" : "text-accent",
                  isWrong && "text-[#c33] line-through",
                  boxRight && "border-r-2 border-r-ink",
                  boxBottom && "border-b-2 border-b-ink",
                  !boxRight && c !== SIZE - 1 && "border-r border-r-border",
                  !boxBottom && r !== SIZE - 1 && "border-b border-b-border"
                )}
              >
                {val === 0 ? "" : val}
              </button>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => onNumber(n)}
            className="h-9 w-9 rounded-md bg-canvas border border-border text-ink font-bold text-sm hover:border-ink"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => onNumber(0)}
          className="h-9 px-2.5 rounded-md bg-canvas border border-border text-mute text-[11px] font-bold hover:border-ink"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
