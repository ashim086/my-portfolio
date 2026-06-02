// Retro skeuomorphic desktop icons — PostHog-style.
// Each icon is a full-color hand-drawn OBJECT (no uniform squircle tile):
// chunky dark outlines, flat warm fills, a 2-tone highlight/shadow, soft
// rounded joins for that hand-drawn feel. 40x40 viewBox throughout.

type IconProps = { className?: string };
const FRAME = "h-full w-full";

// Warm retro palette
const INK = "#2C2823"; // outline (warm near-black)
const OL = 1.6; // standard outline weight

const PAPER = "#F3E8D3";
const PAPER_HI = "#FBF4E6";
const PAPER_SH = "#E2D4B8";

const RED = "#D9523F";
const RED_SH = "#B43E2D";
const YEL = "#F2B53C";
const YEL_SH = "#D8961E";
const GRN = "#6F9B4E";
const BLU = "#5C89AE";
const WOOD = "#C0905C";
const WOOD_SH = "#9C6E3E";
const METAL = "#BBBDB3";
const METAL_SH = "#8C8E84";
const SCREEN = "#16221B";
const SKIN = "#E9B98E";

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className ?? FRAME}
      aria-hidden="true"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {children}
    </svg>
  );
}

// About Me — framed ID portrait card
export function AboutIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="7" y="5" width="26" height="30" rx="3" fill={PAPER} stroke={INK} strokeWidth={OL} />
      <path d="M7 8a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v3H7z" fill={YEL} stroke={INK} strokeWidth={OL} />
      <circle cx="20" cy="19" r="5" fill={SKIN} stroke={INK} strokeWidth={OL} />
      <path d="M11.5 32c0-5 3.8-8 8.5-8s8.5 3 8.5 8z" fill={BLU} stroke={INK} strokeWidth={OL} />
    </Svg>
  );
}

// Skills — red toolbox
export function SkillsIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M15 13c0-2.5 10-2.5 10 0" fill="none" stroke={INK} strokeWidth="2" />
      <rect x="6.5" y="17" width="27" height="15" rx="2.5" fill={RED} stroke={INK} strokeWidth={OL} />
      <rect x="6.5" y="14" width="27" height="4.5" rx="1.5" fill={RED_SH} stroke={INK} strokeWidth={OL} />
      <rect x="17.5" y="20.5" width="5" height="4" rx="0.8" fill={YEL} stroke={INK} strokeWidth="1.2" />
    </Svg>
  );
}

// Experience — leather briefcase
export function ExperienceIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M15.5 15v-2.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2V15" fill="none" stroke={INK} strokeWidth={OL} />
      <rect x="6.5" y="15" width="27" height="17" rx="2.5" fill={WOOD} stroke={INK} strokeWidth={OL} />
      <line x1="6.5" y1="22.5" x2="33.5" y2="22.5" stroke={WOOD_SH} strokeWidth="2" />
      <rect x="17.5" y="20.5" width="5" height="4" rx="0.7" fill={YEL} stroke={INK} strokeWidth="1.2" />
    </Svg>
  );
}

// Projects — manila folder
export function ProjectsIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 13.5A1.5 1.5 0 0 1 8.5 12h6l2.5 3H32a1.5 1.5 0 0 1 1.5 1.5V30A1.5 1.5 0 0 1 32 31.5H8.5A1.5 1.5 0 0 1 7 30z" fill={YEL_SH} stroke={INK} strokeWidth={OL} />
      <rect x="13" y="14.5" width="14" height="5" rx="1" fill={PAPER} stroke={INK} strokeWidth="1.2" />
      <path d="M6 18.5h28l-1.6 11.8A1.5 1.5 0 0 1 30.9 31.5H9.1a1.5 1.5 0 0 1-1.5-1.2z" fill={YEL} stroke={INK} strokeWidth={OL} />
    </Svg>
  );
}

// Contact — envelope
export function ContactIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="6" y="11" width="28" height="18" rx="2.5" fill={PAPER} stroke={INK} strokeWidth={OL} />
      <path d="M6.5 12.5L20 22l13.5-9.5" fill="none" stroke={INK} strokeWidth={OL} />
      <path d="M6.5 12.5L20 22l-9 6.5H8a1.5 1.5 0 0 1-1.5-1.5z" fill={PAPER_SH} stroke="none" />
      <circle cx="30" cy="11.5" r="3" fill={RED} stroke={INK} strokeWidth="1.3" />
    </Svg>
  );
}

// Resume.pdf — document with folded corner + PDF tag
export function CVIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M11 6h12.5L30 12.5V32a1.5 1.5 0 0 1-1.5 1.5H11A1.5 1.5 0 0 1 9.5 32V7.5A1.5 1.5 0 0 1 11 6z" fill={PAPER} stroke={INK} strokeWidth={OL} />
      <path d="M23.5 6L30 12.5h-5a1.5 1.5 0 0 1-1.5-1.5z" fill={PAPER_SH} stroke={INK} strokeWidth="1.2" />
      <line x1="13" y1="16" x2="22" y2="16" stroke={INK} strokeWidth="1.1" opacity="0.45" />
      <line x1="13" y1="19" x2="26" y2="19" stroke={INK} strokeWidth="1.1" opacity="0.45" />
      <rect x="13" y="24" width="14" height="6.5" rx="1.2" fill={RED} stroke={INK} strokeWidth="1.3" />
      <text x="20" y="29" textAnchor="middle" fontFamily="ui-sans-serif,system-ui,sans-serif" fontSize="4.6" fontWeight="800" fill={PAPER_HI}>PDF</text>
    </Svg>
  );
}

// Terminal — retro CRT monitor
export function TerminalIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="16.5" y="28" width="7" height="4" fill={METAL_SH} stroke={INK} strokeWidth="1.2" />
      <rect x="11" y="31" width="18" height="3" rx="1.2" fill={METAL} stroke={INK} strokeWidth={OL} />
      <rect x="5.5" y="7" width="29" height="22" rx="3" fill="#3A3C32" stroke={INK} strokeWidth={OL} />
      <rect x="8.5" y="10" width="23" height="14" rx="1.5" fill={SCREEN} stroke={INK} strokeWidth="1.2" />
      <path d="M12 14l3.5 2.8L12 19.6" fill="none" stroke={GRN} strokeWidth="1.6" />
      <line x1="17.5" y1="19.5" x2="24" y2="19.5" stroke={YEL} strokeWidth="1.6" />
    </Svg>
  );
}

// Settings — chunky gear
export function SettingsIcon({ className }: IconProps) {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <Svg className={className}>
      <g fill={METAL} stroke={INK} strokeWidth={OL}>
        {teeth.map((a) => (
          <rect key={a} x="17.6" y="4.5" width="4.8" height="6" rx="1" transform={`rotate(${a} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="9.5" fill={METAL} stroke={INK} strokeWidth={OL} />
      <circle cx="20" cy="20" r="4" fill={YEL} stroke={INK} strokeWidth={OL} />
    </Svg>
  );
}

// Sudoku — graph notepad with numbers
export function SudokuIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="9.5" y="8" width="22" height="26" rx="2" fill={PAPER_SH} stroke={INK} strokeWidth={OL} />
      <rect x="7.5" y="6" width="22" height="26" rx="2" fill={PAPER} stroke={INK} strokeWidth={OL} />
      <g stroke={BLU} strokeWidth="0.7" opacity="0.55">
        <line x1="14" y1="6" x2="14" y2="32" />
        <line x1="22" y1="6" x2="22" y2="32" />
        <line x1="7.5" y1="14" x2="29.5" y2="14" />
        <line x1="7.5" y1="22" x2="29.5" y2="22" />
      </g>
      <line x1="11" y1="6" x2="11" y2="32" stroke={RED} strokeWidth="0.8" opacity="0.6" />
      <text x="16.5" y="13" fontFamily="ui-monospace,monospace" fontSize="5.2" fontWeight="800" fill={YEL_SH}>5</text>
      <text x="24.5" y="21" fontFamily="ui-monospace,monospace" fontSize="5.2" fontWeight="800" fill={INK}>3</text>
      <text x="16.5" y="29" fontFamily="ui-monospace,monospace" fontSize="5.2" fontWeight="800" fill={INK}>9</text>
    </Svg>
  );
}

// Snake — retro handheld console
export function SnakeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="10" y="5" width="20" height="30" rx="4" fill={GRN} stroke={INK} strokeWidth={OL} />
      <rect x="12.5" y="8" width="15" height="12" rx="1.5" fill={SCREEN} stroke={INK} strokeWidth="1.2" />
      <path d="M15 17v-3h3v-3h3" fill="none" stroke={YEL} strokeWidth="1.8" />
      <rect x="22.5" y="11" width="2" height="2" fill={RED} />
      <path d="M16 24v5M13.5 26.5h5" stroke={INK} strokeWidth="1.8" />
      <circle cx="24.5" cy="25" r="1.6" fill={RED} stroke={INK} strokeWidth="1" />
      <circle cx="27" cy="28.5" r="1.6" fill={YEL} stroke={INK} strokeWidth="1" />
    </Svg>
  );
}

// Gallery — framed landscape painting
export function GalleryIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="6" y="8" width="28" height="24" rx="2.5" fill={WOOD} stroke={INK} strokeWidth={OL} />
      <rect x="9.5" y="11.5" width="21" height="17" rx="1" fill={BLU} stroke={INK} strokeWidth="1.2" />
      <circle cx="15" cy="17" r="2.6" fill={YEL} stroke={INK} strokeWidth="1" />
      <path d="M9.5 28.5l6-7 4 4 4.5-5.5 6.5 8.5z" fill={GRN} stroke={INK} strokeWidth="1.2" />
    </Svg>
  );
}

// Music — vinyl record
export function MusicIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      {/* Disc */}
      <circle cx="20" cy="20" r="14" fill={INK} stroke={METAL} strokeWidth="1.8" />
      {/* Grooves */}
      <circle cx="20" cy="20" r="11" fill="none" stroke={METAL_SH} strokeWidth="0.8" opacity="0.5" />
      <circle cx="20" cy="20" r="8" fill="none" stroke={METAL_SH} strokeWidth="0.6" opacity="0.4" />
      <circle cx="20" cy="20" r="5" fill="none" stroke={METAL_SH} strokeWidth="0.4" opacity="0.3" />
      {/* Label */}
      <circle cx="20" cy="20" r="4" fill={YEL} stroke={INK} strokeWidth="0.8" />
      <circle cx="20" cy="20" r="1.2" fill={INK} />
      {/* Music note */}
      <path
        d="M16 19.5V11l8-1.5v8"
        fill="none"
        stroke={YEL}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="14.5" cy="20" rx="1.8" ry="1.4" fill={RED} stroke={INK} strokeWidth="0.8" />
      <ellipse cx="22.5" cy="18" rx="1.8" ry="1.4" fill={RED} stroke={INK} strokeWidth="0.8" />
    </Svg>
  );
}

// Trash — metal waste bin
export function TrashIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="16" y="7.5" width="8" height="3.5" rx="1" fill={METAL_SH} stroke={INK} strokeWidth="1.3" />
      <line x1="9.5" y1="12" x2="30.5" y2="12" stroke={INK} strokeWidth="2.2" />
      <path d="M12 13h16l-1.5 18.4A1.6 1.6 0 0 1 24.9 33H15.1a1.6 1.6 0 0 1-1.6-1.6z" fill={METAL} stroke={INK} strokeWidth={OL} />
      <g stroke={METAL_SH} strokeWidth="1.4">
        <line x1="16.5" y1="17" x2="16" y2="29" />
        <line x1="20" y1="17" x2="20" y2="29" />
        <line x1="23.5" y1="17" x2="24" y2="29" />
      </g>
    </Svg>
  );
}

// Welcome — README document with star
export function WelcomeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M11 6h12.5L30 12.5V32a1.5 1.5 0 0 1-1.5 1.5H11A1.5 1.5 0 0 1 9.5 32V7.5A1.5 1.5 0 0 1 11 6z" fill={PAPER} stroke={INK} strokeWidth={OL} />
      <path d="M23.5 6L30 12.5h-5a1.5 1.5 0 0 1-1.5-1.5z" fill={PAPER_SH} stroke={INK} strokeWidth="1.2" />
      <text x="17" y="14" fontFamily="ui-monospace,monospace" fontSize="5" fontWeight="800" fill={INK}>README</text>
      <line x1="13" y1="18" x2="27" y2="18" stroke={INK} strokeWidth="1.1" opacity="0.45" />
      <line x1="13" y1="21" x2="27" y2="21" stroke={INK} strokeWidth="1.1" opacity="0.45" />
      <line x1="13" y1="24" x2="27" y2="24" stroke={INK} strokeWidth="1.1" opacity="0.45" />
      <path d="M13 27h14v6.5H13z" fill={YEL} stroke={INK} strokeWidth="1.2" />
      <path d="M20 28.5l1.2 2.5 2.8.4-2 2 .5 2.7-2.5-1.3-2.5 1.3.5-2.7-2-2 2.8-.4z" fill={PAPER_HI} stroke={INK} strokeWidth="0.6" />
    </Svg>
  );
}

// Browser — globe / compass icon
export function BrowserIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="20" cy="20" r="13" fill={BLU} stroke={INK} strokeWidth={OL} />
      <ellipse cx="20" cy="20" rx="6" ry="13" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.5" />
      <line x1="7" y1="20" x2="33" y2="20" stroke={INK} strokeWidth="1.2" opacity="0.5" />
      <path d="M14 14c2-3 5-4 6-4s4 1 6 4" fill="none" stroke={INK} strokeWidth="1.3" />
      <path d="M14 26c2 3 5 4 6 4s4-1 6-4" fill="none" stroke={INK} strokeWidth="1.3" />
      <path d="M17 9c1 4 1.5 7 1.5 11s-.5 7-1.5 11" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.5" />
      <path d="M23 9c-1 4-1.5 7-1.5 11s.5 7 1.5 11" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.5" />
      <path d="M14 12l12 16M26 12l-12 16" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.3" />
      <circle cx="20" cy="20" r="3" fill={YEL} stroke={INK} strokeWidth="1.2" />
      <path d="M18.5 18.5l4-2-2 4z" fill={PAPER_HI} stroke={INK} strokeWidth="0.6" strokeLinejoin="round" />
    </Svg>
  );
}
