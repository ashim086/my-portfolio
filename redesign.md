# Portfolio Redesign — PostHog-Marketing-Inspired

A full visual + structural redesign of the portfolio at `client/`, built as a **near-duplicate of posthog.com's marketing site** — but marketing **Ashim** instead of PostHog. Same hero-and-scrolling-sections layout, same cream canvas, olive ink, single yellow CTA pill, same handcrafted editorial feel, same restrained palette. Light + dark with a toggle. Current section structure (Home → About → Skills → Experience → Projects → Contact) is preserved.

PostHog's marketing pages decorate themselves with **windowed product screenshots** — flat title bar, small control dots, content inside. We borrow that framing for visual flourishes only (project screenshots, an "environment" mockup in About, the contact card) — the page itself is a normal scrolling marketing site, not an app shell.

**Scope: client only.** This pass redesigns the existing `client/` Next.js app in place. Content stays in local TypeScript data files (no database, no admin panel, no separate backend). Deploys to **Vercel free tier** as it does today. The monorepo + admin + database plan in section 12 is **deferred** — kept in this doc as a future-phase reference only.

Reference: PostHog brand handbook (`posthog.com/handbook/brand/style-guide`, `.../designing-posthog-website`).

---

## 1. Goals

- Replicate the **PostHog marketing site** aesthetic: cream canvas, olive-charcoal text, single yellow CTA pill, restrained palette, handcrafted editorial feel. Same overall page rhythm — top navbar, big hero, scrolling sections, footer.
- Borrow PostHog's **windowed-screenshot framing** for visual flourishes inside sections: a flat title bar with section label + small control dots, content inside. Used for project cards, an "environment" mockup in About, and the contact panel — **not** as a full app shell.
- Keep current page structure (Home → About → Skills → Experience → Projects → Contact) on a single scrolling page with anchor links.
- Skip the hedgehog mascots entirely — use your photo + content instead.
- Ship a fully working light **and** dark theme with a no-flash toggle persisted to `localStorage`.
- Sync all content with the updated CV (ICodify + Techmandu as current, training date fix, new tech stack, drop the AI girlfriend project, add phone + location).
- Lightly tighten copy to a PostHog-editorial voice (short, matter-of-fact, sentence case).
- **No backend, no database, no admin panel in this phase.** Content is edited in TypeScript files and shipped via `git push`. The monorepo/admin/API design is preserved in section 12 as a deferred Phase 2 reference.

---

## 2. Design System

All tokens are defined as CSS custom properties in `globals.css` and exposed as Tailwind v4 utilities via `@theme`.

### 2.1 Color Tokens

#### Light theme (`:root`)

| Token             | Value     | Use                                          |
| ----------------- | --------- | -------------------------------------------- |
| `--canvas`        | `#EEEFE9` | Page background                              |
| `--surface`       | `#FFFFFF` | Cards, navbar surface                        |
| `--surface-alt`   | `#F5F5EF` | Subtle alt surface (e.g., stat card back)    |
| `--ink`           | `#23251D` | Headlines, button text on light, nav links   |
| `--body`          | `#4D4F46` | Default paragraph text                       |
| `--charcoal`      | `#33342D` | Emphasized body text                         |
| `--mute`          | `#6C6E63` | Metadata, subtitles, footer text             |
| `--ash`           | `#9B9C92` | Disabled text, low-emphasis utility          |
| `--stone`         | `#B6B7AF` | Lowest-emphasis caption, disabled icon       |
| `--border`        | `#D0D1C9` | Default 1px border                           |
| `--border-strong` | `#B6B7AF` | Hover/active border                          |
| `--primary`       | `#F7A501` | Yellow CTA background                        |
| `--primary-pressed` | `#DD9001` | Yellow CTA pressed                          |
| `--primary-active`  | `#B17816` | Yellow CTA active                          |
| `--on-primary`    | `#23251D` | Text on yellow CTA                           |
| `--accent`        | `#F54E00` | Red — links on light, secondary highlights   |
| `--success`       | `#1F8A4C` | Status dot ("available for hire")            |

#### Dark theme (`[data-theme="dark"]`)

| Token             | Value     | Use                                          |
| ----------------- | --------- | -------------------------------------------- |
| `--canvas`        | `#151515` | Page background                              |
| `--surface`       | `#1F1F1C` | Cards, navbar                                |
| `--surface-alt`   | `#23251D` | Alt surface                                  |
| `--ink`           | `#EEEFE9` | Headlines                                    |
| `--body`          | `#C9CABE` | Body text                                    |
| `--charcoal`      | `#E0E1D6` | Emphasized body                              |
| `--mute`          | `#9B9C92` | Metadata                                     |
| `--ash`           | `#6C6E63` | Disabled                                     |
| `--stone`         | `#4B4B4B` | Caption                                      |
| `--border`        | `#2C2C2C` | Default border                               |
| `--border-strong` | `#4B4B4B` | Hover border                                 |
| `--primary`       | `#F1A82C` | Warmer yellow for dark                       |
| `--primary-pressed` | `#DC9300` | Pressed                                    |
| `--primary-active`  | `#B17816` | Active                                     |
| `--on-primary`    | `#151515` | Text on yellow                               |
| `--accent`        | `#F54E00` | Red links (unchanged)                        |
| `--success`       | `#3DDC84` | Status dot                                   |

### 2.2 Typography

- **Primary**: IBM Plex Sans Variable (self-host via `next/font/google` as `IBM_Plex_Sans`, weight axis 100–700). Use Bold 700, Semibold 600, Medium 500, Regular 400.
- **Mono**: IBM Plex Mono (for code snippets, future blog). Not used in the v1 layout.
- **Display (reserved)**: Squeak-style uppercase display only if a marketing eyebrow needs extra personality. Default to Plex Sans Bold uppercase for all eyebrows — keeps the system lean.
- **Body font rule**: body text uses 400 weight, 1.5 line-height; everything else is built from weight + size contrast.

#### Type scale

| Token             | Size  | Weight | Line Height | Tracking | Use                                              |
| ----------------- | ----- | ------ | ----------- | -------- | ------------------------------------------------ |
| `display-xl`      | 64px  | 700    | 1.0         | -1%      | Hero h1                                          |
| `display-lg`      | 48px  | 800    | 1.1         | -1%      | Section h2                                       |
| `heading-lg`      | 30px  | 700    | 1.2         | -2%      | Card group title                                 |
| `heading-md`      | 24px  | 700    | 1.3         | -2%      | Card title                                       |
| `heading-sm`      | 18px  | 700    | 1.4         | -2%      | Section eyebrow (uppercase)                      |
| `body-md`         | 17px  | 400    | 1.5         | 0        | Body copy, default paragraph                     |
| `body-strong`     | 17px  | 600    | 1.5         | 0        | Inline emphasis, primary nav link                |
| `body-sm`         | 15px  | 400    | 1.71        | 0        | Doc-style body, card description                 |
| `body-sm-strong`  | 15px  | 600    | 1.71        | 0        | Sub-emphasis in cards                            |
| `body-xs`         | 14px  | 500    | 1.43        | 0        | Metadata, captions                               |
| `caption`         | 14px  | 700    | 1.43        | 0        | Card eyebrow / link cluster header               |
| `button`          | 14px  | 700    | 1.0         | 0        | Primary + secondary button label                 |
| `eyebrow`         | 14px  | 700    | 1.0         | 0.04em   | Section eyebrow (uppercase)                      |

### 2.3 Spacing & Radii

- Container max-width: `1200px` with `1.5rem` gutter.
- Section vertical padding: `6rem` desktop, `4rem` mobile.
- Card border-radius: `6px` (`rounded-md`).
- Pill border-radius: `9999px` (`rounded-pill`).
- Buttons: 40px height, 8px / 16px padding.
- Navbar: 64px height, sticky.

### 2.4 Shadows

```css
--shadow-card: 0 1px 0 rgba(35, 37, 29, 0.04);
--shadow-card-hover: 0 1px 0 rgba(35, 37, 29, 0.12);
```

No drop shadows beyond a hairline. PostHog explicitly rejects SaaS-y shadow stacks.

### 2.5 Interaction

- No entrance animation on hover.
- Subtle `scale(1.02)` on cards (transition 200ms ease-out, transform only).
- Buttons: `translateY(0)` → `translateY(1px)` on `:active`. No shadow change.
- `transition-colors` on body and surface elements for theme switch (180ms).

---

## 3. Component Inventory

### 3.1 New files

| Path | Purpose |
| --- | --- |
| `src/app/components/layout/theme-provider.tsx` | Client `ThemeProvider` + `useTheme` hook; reads/writes `localStorage`; sets `data-theme` on `<html>`. |
| `src/app/components/layout/theme-toggle.tsx` | Sun/moon icon button (uses `useTheme`). |
| `src/app/components/layout/mobile-menu.tsx` | Slide-in drawer for mobile nav. |
| `src/app/components/home/eyebrow.tsx` | Reusable uppercase eyebrow component. |
| `src/app/components/home/trust-strip.tsx` | Small "Currently / Previously" band. |
| `src/app/components/home/availability-pill.tsx` | Yellow "Available for hire" status pill with green dot. |
| `src/app/components/ui/window-frame.tsx` | **Retro Windows-PC panel.** Title bar with mono filename left, square min/max/close buttons right (red hover on close). Used by hero photo card, about env mockup, project cards, contact cards. See 5.6a. |
| `src/app/components/layout/taskbar-link.tsx` | Single nav item styled as a Win-XP-style taskbar tab — inset/raised border, square corners, active state has pressed look. See 5.1. |
| `src/data/experience.ts` | New data file — 4 experience entries. |
| `src/data/skills.ts` | New data file — 8 skill categories. |
| `src/data/projects.ts` | **Replaces** `src/app/api/projects.tsx` — 4 projects from CV. |
| `src/data/contact.ts` | **Replaces** `src/app/api/contact.tsx` — adds phone, location. |

> Note: data files move out of `src/app/api/` into `src/data/`. The `src/app/api/` path is a reserved Next.js App Router segment for **route handlers**, which we'll be adding in Phase 2 — keeping local data there would collide.
| `redesign.md` | This file. |

### 3.2 Files to modify

| Path | Change |
| --- | --- |
| `src/app/globals.css` | Full rewrite with tokens, `@theme` block, font wiring, theme transitions. |
| `src/app/layout.tsx` | Swap Geist → IBM Plex Sans; wrap children in `ThemeProvider`; inline no-flash script. |
| `src/app/(home)/page.tsx` | Insert `<section id="trust">` between projects and contact (via `home.tsx`). |
| `src/app/components/home/home.tsx` | Add `<TrustStrip />`; reorder sections to: home, about, skills, experience, projects, trust, contact. |
| `src/app/components/layout/navbar.tsx` | Restyle to PostHog look; integrate `<ThemeToggle />` + yellow CTA. |
| `src/app/components/layout/title.tsx` | Add `eyebrow` prop. |
| `src/app/components/home/herosection.tsx` | Full rewrite. |
| `src/app/components/home/aboutme.tsx` | Restyle with new token classes. |
| `src/app/components/home/skill.tsx` | Render 8 skill categories as pill groups. |
| `src/app/components/home/projects.tsx` | Adjust to use new data file. |
| `src/app/components/home/qualitfication.tsx` | Rename to `experience.tsx`; fix broken absolute positioning; add filter tabs. |
| `src/app/components/home/contact.tsx` | Use new data file with phone + location. |
| `src/app/components/cards/project.card.tsx` | Restyle. |
| `src/app/components/cards/skillCard.tsx` | Restyle as category pill group card. |
| `src/app/components/cards/contact.card.tsx` | Restyle. |
| `src/data/skills.ts` (was `src/app/api/skill.tsx`) | Replace with structured `skills.ts` (8 categories). |
| `src/data/social-links.ts` (was `src/app/api/scoaillinks.tsx`) | Update social handles if needed; fix the typo while we're moving it. |
| `public/manifest.json` (auto-generated by `manifest.ts`) | Update theme color tokens. |

### 3.3 Files to delete

- `src/app/components/home/qualitfication.tsx` — delete after `experience.tsx` is in place. No deprecation alias needed (single-author repo, single consumer).
- `src/app/api/projects.tsx`, `src/app/api/contact.tsx`, `src/app/api/skill.tsx`, `src/app/api/scoaillinks.tsx` — relocate to `src/data/` (see 3.1 note). The `src/app/api/` path is a reserved Next.js App Router segment for route handlers; we don't want local data sitting there.

---

## 4. Content Updates (from CV reconciliation)

### 4.1 Identity

- **Name**: `Ashim Thapa Magar` (3 words). Short form: `Ashim Magar`. (CV has `Ashim ThapaMagar` — keep the spaced version per user.)
- **Title**: `Full-Stack Web Developer`
- **Location**: `Nepal, Baneshwor`
- **Phone**: `+977-9748723714`
- **Email**: `magarashim69086@gmail.com`
- **Website**: `ashimmagar.com.np`
- **GitHub**: `ashim086`

### 4.2 Experience (new order, latest first)

| # | Company | Role | Dates | Highlights |
| - | - | - | - | - |
| 1 | ICodify Technology (Remote) | Full Stack Developer | 04/2026 – Present | Docker + AWS EC2, PostHog + GA, Calendly, AEO/GEO |
| 2 | Techmandu Solution (Part-time) | Junior Full Stack Developer | 04/2026 – Present | Monorepo, microservices, REST + clean architecture |
| 3 | IOXET Pvt. Ltd. | Junior Frontend Web Developer | 08/2025 – 04/2026 | React/Next SaaS, eSewa + Khalti, WebSockets, AI workflows |
| 4 | Panacea Solution Pvt. Ltd. | Frontend Web Developer Intern | 07/2025 – 08/2025 | Scalable frontend, component architecture, clean folders |

Filter tabs: `All / Education / Experience / Training`.

### 4.3 Education (kept)

- BCA, Patan Multiple Campus — 2022 – Present, Patan, Lalitpur
- +2 Science, Sainik Awasiya Mahavidyalaya — 2019 – 2021, Kharini, Chitwan (Grade B)
- SEE, Sainik Awasiya Mahavidyalaya — 2018, Teghari, Kailali (Grade A)

### 4.4 Training (date-corrected)

- Full Stack MERN Training, Broadway Infosys Pvt. Ltd. — 04/2025 – 06/2025 (was incorrectly listed as 04/2021 – 06/2025 on the old site)

### 4.5 Skills (8 categories)

```
Languages:    JavaScript (TypeScript), Java, C#, OOP
Frontend:     React.js, Next.js, Tailwind CSS, Shadcn UI
State/API:    TanStack Query, Zustand, React Context, Axios
Backend:      Node.js, Express.js, MongoDB, PostgreSQL, Prisma
Auth/Sec:     JWT, OAuth, Session Management
DevOps:       Docker, AWS EC2, Vercel, Render
Integrations: eSewa, Khalti, PostHog, Google Analytics, Calendly
Others:       WebSockets, REST APIs, AI API Integration
```

### 4.6 Projects (4 — drop AI girlfriend)

| Name | Stack | Link |
| - | - | - |
| Relocation Booking Platform | Next.js + TS, Prisma + PostgreSQL, JWT, Google OAuth | https://texch.vercel.app/ |
| E-Commerce Payment Integration (Nepal) | Express + Node + TS, eSewa, Khalti, JWT | https://wallets-sooty.vercel.app/login |
| MediCare E-Commerce | MERN, React Query, Vercel + Render | https://medicarelifeharmony.vercel.app/ |
| News Portal — classic-paper-paperio | Role-based (Admin, Journalist, Viewer), REST APIs | https://news-portal-swart-zeta.vercel.app/ |

### 4.7 Contact cards (4 — was 3)

- Email → `magarashim69086@gmail.com`
- Phone → `+977-9748723714`
- Location → `Nepal, Baneshwor`
- WhatsApp → `https://wa.me/9779748723714`

### 4.8 Hero copy (PostHog-editorial voice)

- Eyebrow: `FULL-STACK DEVELOPER · NEPAL`
- Headline: `I build products that ship.`
- Subhead: `From the first line of TypeScript to the last CI deploy, I ship full-stack systems that don't fall over in production.`
- CTAs: primary yellow `Say hello →` (mailto), secondary ghost `Download CV` (`/Ashim_thapa.pdf`)
- Side photo card with `<AvailabilityPill />` ("Available for hire" with green dot) above the photo

---

## 5. Component Specs (visual + structural)

### 5.1 Navbar

```
[ Ashim Magar ]    [ Home  About  Skills  Experience  Projects  Contact ]    [ ☀/☾ ] [ Say hello → ]
```

- 64px tall, sticky top-0 z-50, `bg-canvas` (transparent on scroll, becomes `bg-canvas/95` with `backdrop-blur` on scroll).
- Logo: `--ink` `--font-bold` 18px, `Ashim Magar` (no logo image).
- Nav links: 17px `--body` color, semibold, hover → `--ink`. Active state: 2px yellow underline.
- Right cluster: `<ThemeToggle />` (icon only, 40×40), then yellow primary pill button linking to `#contact`.
- Mobile (<md): logo + theme toggle + hamburger button. Hamburger opens `<MobileMenu />` (full-height drawer, slide-in from right, cream background, large 24px link list).
- Bottom border: 1px `--border` (only after scroll past 8px).

### 5.2 ThemeToggle

- 40×40 button, `rounded-pill`, no border, hover bg `--surface-alt`.
- Sun icon (`HiSun`) for dark mode, moon (`HiMoon`) for light mode.
- `aria-label="Toggle theme"`.

### 5.3 Eyebrow

- 14px, weight 700, uppercase, tracking 0.04em, color `--mute`.
- Optional `as="h2"|"h3"|"span"` prop.

### 5.4 Title (section header)

```
[ EYEBROW ]
[ Big Section Heading ]    (display-lg, --ink, -1% tracking)
[ Subtitle ]               (body-sm, --mute)
```

- Center-aligned on mobile, left-aligned on desktop (PostHog convention).
- `mt-24` between sections, `mb-16` between title block and content.

### 5.5 Buttons

**Primary (yellow pill)**
- `bg-primary text-on-primary font-bold text-[14px] px-4 h-10 rounded-pill`
- Hover: `bg-primary-pressed`
- Active: `translate-y-px bg-primary-active`
- Transition: 150ms

**Secondary (ghost)**
- `bg-canvas text-ink border border-border font-bold text-[14px] px-4 h-10 rounded-pill`
- Hover: `border-ink`

**Icon button (used in theme toggle, socials)**
- 40×40, `rounded-pill`, hover `bg-surface-alt`.

### 5.6 Hero

- 2-column on `lg+`, stacked on mobile.
- Left column (60%): eyebrow + display-xl headline + body-md subhead + button row.
- Right column (40%): `<WindowFrame title="profile.tsx" accent="yellow">` containing `<AvailabilityPill />` (centered), then circular 240px photo, then a row of social icon buttons.
- Below columns: small centered scroll indicator (animated chevron) in `--mute` — only on `md+`.

### 5.6a WindowFrame (PostHog-style retro Windows panel)

Wraps content in retro Windows-PC window chrome — title bar left, three square control buttons right (minimize `_`, maximize `▢`, close `✕`). Vibe = Windows 95/XP / posthog.com product mockups, NOT macOS. Used by Hero, About env mockup, Projects, Contact.

**Visual anatomy**

```
┌──────────────────────────────────────────────┐
│ ▣ profile.tsx                  [_] [▢] [✕]  │  ← Title bar 36px, square buttons
├──────────────────────────────────────────────┤
│                                              │
│                <children>                    │  ← Body, p-6
│                                              │
└──────────────────────────────────────────────┘
```

**Props**

```ts
type WindowFrameProps = {
  title?: string;              // left-aligned in title bar, mono 13px
  icon?: React.ReactNode;      // optional 14px icon before title (e.g., file-type glyph)
  variant?: 'light' | 'dark';  // title bar tint. default 'light'
  showControls?: boolean;      // default true. set false for a minimal frame
  bodyClassName?: string;      // override padding/bg on body
  className?: string;          // override outer frame
  children: React.ReactNode;
};
```

**Markup skeleton (exact JSX)**

```tsx
<div className={cn(
  "bg-surface border border-border rounded-md overflow-hidden",
  "shadow-[var(--shadow-card)]",
  className
)}>
  {/* Title bar */}
  <div className={cn(
    "flex items-center justify-between h-9 pl-3 pr-1.5 border-b border-border",
    variant === 'dark' ? "bg-ink text-canvas" : "bg-surface-alt text-ink"
  )}>
    <div className="flex items-center gap-2 min-w-0">
      {icon && <span className="shrink-0 opacity-70">{icon}</span>}
      {title && (
        <span className="font-mono text-[13px] truncate select-none">
          {title}
        </span>
      )}
    </div>
    {showControls && (
      <div className="flex items-center gap-1" aria-hidden="true">
        <button
          tabIndex={-1}
          className="h-6 w-7 grid place-items-center rounded-sm border border-transparent hover:bg-canvas/40 hover:border-border transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 8h8" stroke="currentColor" strokeWidth="1.2"/></svg>
        </button>
        <button
          tabIndex={-1}
          className="h-6 w-7 grid place-items-center rounded-sm border border-transparent hover:bg-canvas/40 hover:border-border transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
        </button>
        <button
          tabIndex={-1}
          className="h-6 w-7 grid place-items-center rounded-sm border border-transparent hover:bg-[#E5484D]/90 hover:text-white hover:border-[#E5484D] transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </button>
      </div>
    )}
  </div>

  {/* Body */}
  <div className={cn("p-6", bodyClassName)}>{children}</div>
</div>
```

**Rules — premium quality bar**

- Title bar height **36px** (`h-9`). Not 32px, not 40px. 36 = retro-OS spec, denser than macOS.
- Square buttons, **28×24px** (`h-6 w-7`), `rounded-sm` (2px corners only). NOT pills, NOT circles.
- Button icons are **SVG strokes**, 1.2px weight, 10px box. `currentColor` so they flip on hover.
- Close button (`✕`) hover state turns red `#E5484D` bg, white icon. Min/max hover = `bg-canvas/40` with subtle border. This is the single biggest "feels premium" detail — DO NOT skip the red close hover.
- All control buttons `tabIndex={-1}` + `aria-hidden`. Decorative. Don't trap keyboard focus on dead controls.
- Title bar bg: light variant uses `--surface-alt`, dark variant uses `--ink` with `--canvas` text (use sparingly — only Projects hover state or one accent card per page).
- Title text: **IBM Plex Mono**, 13px, regular weight (400). Truncate on overflow. Left-aligned right after optional icon. Never centered.
- Optional `icon` prop: 14px glyph, `opacity-70`. Use `HiOutlineCodeBracket` for `.tsx`/`.ts` titles, `HiOutlineFolder` for paths like `~/dev-env`, `HiOutlinePhoto` for project screenshots.
- Outer frame: `border-border` 1px, `rounded-md` 6px, `overflow-hidden` so body content can't escape rounded corners. Shadow stays hairline `--shadow-card`.
- Body default `p-6`. Use `bodyClassName="p-0"` when content bleeds (project screenshots).
- Frame composes with hover scale on Projects — animate outer wrapper, not internal parts.

**Where used (locked in)**

| Section | `title` | `icon` | `variant` | Notes |
| --- | --- | --- | --- | --- |
| Hero photo card | `profile.tsx` | code-bracket | light | yellow availability pill sits inside body |
| About — env mockup | `~/dev-env` | folder | dark | terminal feel; dark title bar earns its keep |
| Projects — each card | `<slug>.app` (e.g. `relocation-booking.app`) | photo | light | `bodyClassName="p-0"`, image bleeds, text block below image in inner `p-6` |
| Contact — 4 cards | `email`, `phone`, `location`, `whatsapp` | matching `Hi*` icon | light | one variant only — all light. No accent color games. |

**Dark mode**

- Title bar bg, text, border all token-bound — flip automatically.
- Close-button red `#E5484D` stays fixed across themes (brand quote).
- Button icon stroke stays `currentColor` so it flips with title-bar text color.

### 5.7 About

- 2-column on `lg+`.
- Left: 256px square photo in a `<WindowFrame title="about.me" accent="green" bodyClassName="p-0">` — photo bleeds to the frame edges, no padding.
- Right: eyebrow + heading-md "A short intro" + body-md bio paragraph + 2-column stat row (Experience: `1+ year`, Completed: `4 Projects`) + 2-button row (Download CV primary, View GitHub secondary).
- Below both columns on `lg+`, full-width: `<WindowFrame title="~/dev-env" accent="default" bodyClassName="p-4 font-mono text-[13px] bg-canvas">` containing a fake terminal listing of the stack, e.g.:
  ```
  $ cat stack.json
  {
    "language": ["TypeScript", "Java", "C#"],
    "frontend": ["Next.js", "React", "Tailwind"],
    "backend":  ["Node", "Express", "Prisma"],
    "infra":    ["Docker", "AWS EC2", "Vercel"]
  }
  ```
  Use `--ink` for keys, `--accent` for string values. Static, non-interactive.

### 5.8 Skills

- 8 categories displayed as a responsive grid (1 col mobile, 2 col md, 4 col lg).
- Each card: `bg-surface border border-border rounded-md p-6`.
  - Title: `caption` style, uppercase, `--mute`.
  - Pills row: each skill is a small `bg-canvas border border-border rounded-pill px-3 py-1 text-[13px] font-medium text-ink` chip.
  - No icon per skill (clean pill grid).

### 5.9 Experience (qualification)

- Filter tabs above the timeline: pill group with 4 buttons, active = `bg-ink text-canvas`, inactive = `bg-canvas text-ink border border-border`.
- Timeline: vertical line at `left-3`, 2px `--border` color.
- Each entry: dot at `left-2.5` (8px, `bg-primary rounded-full border-2 border-canvas`), content offset right by 24px.
- Entry card: `mb-10`.
  - Top row: heading-md title + date range right-aligned in `--mute body-xs`.
  - Subtitle: company + location in `body-sm --mute`.
  - Bullet highlights: `body-sm --body` list with `•` markers in `--accent`.
- Filter logic: client component, hides/showes entries by `type: 'education' | 'experience' | 'training'`.

### 5.10 Projects

- Section title eyebrow: `RECENT WORK`.
- Grid: 1 col mobile, 2 col `lg+`, gap-6.
- **Each card is a `<WindowFrame title="<slug>" bodyClassName="p-0">`** — replaces the plain card spec.
  - Frame title = project slug (e.g., `relocation-booking`, `wallets`, `medicare`, `news-portal`). Lowercase, kebab-case, monospace per WindowFrame default.
  - Body (p-0): image `aspect-[16/10]`, `object-cover object-top`, full bleed inside frame.
  - Then a `p-6` inner div with:
    - Top: stack chips (e.g., `NEXT.JS`, `PRISMA`, `POSTGRESQL`) — small bordered pills.
    - Title: heading-md `--ink`.
    - Description: body-sm `--mute` (2-line clamp).
    - Footer: `View project →` link in `--accent` semibold, right-aligned.
- Hover: the whole WindowFrame scales `scale-[1.02]` with `transition-transform duration-200`. No shadow change beyond `--shadow-card-hover`.
- Respect `prefers-reduced-motion`: drop the scale.

### 5.11 Trust Strip

- Slim band between Projects and Contact.
- Layout: two columns.
  - Left: `CURRENTLY` eyebrow + `ICodify Technology` heading-md + `Part-time at Techmandu Solution` body-sm.
  - Right: `PREVIOUSLY` eyebrow + company chips (Panacea, IOXET, Broadway) as small bordered pills.
- Background: `--surface-alt` (subtle differentiation).

### 5.12 Contact

- Section title eyebrow: `GET IN TOUCH`.
- 4-column grid on `lg+`, 2 on `md`, 1 on mobile.
- **Each card is a `<WindowFrame>`** — title = channel slug, accent per the table in 5.6a (`email`/green, `phone`/yellow, `location`/red, `whatsapp`/green).
- Inside body (default `p-6`):
  - Top: 40×40 icon container with `bg-canvas border border-border rounded-md`, icon in `--ink`.
  - Middle: heading-sm `--ink` (name of channel).
  - Value: body-md `--body`.
  - Bottom: link row in `--accent` semibold with arrow icon.
- Cards: Email, Phone, Location, WhatsApp.

### 5.13 Footer

- 2-column grid.
- Left: `© 2026 Ashim Thapa Magar. Built with Next.js, deployed on Vercel.` + `magarashim69086@gmail.com` link.
- Right: small nav (Home, About, Projects, Contact) + theme toggle.
- Top border `border-border`, padding `py-12`.
- All text `--mute body-xs`.

---

## 6. Theme System Implementation

### 6.1 `ThemeProvider` (client component)

- Context: `{ theme: 'light' | 'dark' | 'system', resolvedTheme: 'light' | 'dark', setTheme(t) }`.
- On mount, read `localStorage.theme` (or `'system'`). Resolve system theme via `matchMedia('(prefers-color-scheme: dark)')`.
- Apply `data-theme="dark"` on `<html>` element when resolved theme is dark.
- Listen to system theme changes when theme === `'system'`.

### 6.2 No-flash inline script (in `layout.tsx` `<head>`)

```html
<script>
  (function() {
    try {
      var t = localStorage.getItem('theme') || 'system';
      var d = t === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : t;
      document.documentElement.setAttribute('data-theme', d);
    } catch (e) {}
  })();
</script>
```

### 6.3 `globals.css` theme binding

```css
:root { /* light tokens */ }
[data-theme='dark'] { /* dark tokens */ }
```

Tailwind v4 `@theme` block maps tokens to utilities:

```css
@theme {
  --color-canvas: var(--canvas);
  --color-surface: var(--surface);
  --color-ink: var(--ink);
  --color-body: var(--body);
  --color-mute: var(--mute);
  --color-primary: var(--primary);
  --color-accent: var(--accent);
  --color-border: var(--border);
  --font-sans: var(--font-plex-sans), system-ui, sans-serif;
  --font-mono: var(--font-plex-mono), monospace;
  --radius-md: 6px;
  --radius-pill: 9999px;
}
```

This generates `bg-canvas`, `text-ink`, `text-mute`, `border-border`, etc.

---

## 7. Copy Tightening (no action needed from user)

These will be revised from current site text to PostHog-editorial voice:

| Current | New |
| - | - |
| `Short introduction about Ashim Thapa Magar` | `A short intro.` |
| `Education, experience, and training journey` | `My path so far.` |
| `Recent web development projects by Ashim Thapa Magar` | `A few things I've shipped.` |
| `Get in touch with Ashim Thapa Magar` | `The fastest way to reach me.` |
| `Hi, I'm Ashim Magar — a full-stack MERN developer dedicated to delivering seamless, design-driven web solutions.` | `From the first line of TypeScript to the last CI deploy, I ship full-stack systems that don't fall over in production.` |
| `Full-stack MERN developer crafting applications with a focus on minimal design and user-friendly interfaces.` | `I build with TypeScript, ship with Docker, and care more about production stability than clever abstractions.` |

---

## 8. Implementation Order

Execute in this order, verifying visually after each step.

1. **Write `redesign.md`** (this file).
2. **Rewrite `src/app/globals.css`** — tokens, `@theme` block, font wiring, theme transitions.
3. **Update `src/app/layout.tsx`** — IBM Plex Sans, `ThemeProvider` wrap, no-flash script.
4. **Create `src/app/components/layout/theme-provider.tsx`** — context + hook.
5. **Create `src/app/components/layout/theme-toggle.tsx`** — icon button.
6. **Create `src/app/components/layout/mobile-menu.tsx`** — drawer.
7. **Create `src/app/components/home/eyebrow.tsx`** + `availability-pill.tsx` + `trust-strip.tsx`.
7a. **Create `src/app/components/ui/window-frame.tsx`** per the spec in 5.6a. Build it before any section that consumes it. Verify in isolation with all four accent variants and with/without `actions`.
8. **Update `src/app/components/layout/navbar.tsx`** — full restyle.
9. **Update `src/app/components/layout/title.tsx`** — add eyebrow prop.
10. **Create new data files**: `api/experience.ts`, `api/skills.ts`, `api/projects.ts`, `api/contact.ts`.
11. **Rewrite `src/app/components/home/herosection.tsx`**.
12. **Restyle `src/app/components/home/aboutme.tsx`**.
13. **Restyle `src/app/components/home/skill.tsx`** + `cards/skillCard.tsx`.
14. **Rewrite `src/app/components/home/qualitfication.tsx`** → rename to `experience.tsx` (alias the old one), fix timeline, add filter tabs.
15. **Restyle `src/app/components/home/projects.tsx`** + `cards/project.card.tsx`.
16. **Update `src/app/components/home/home.tsx`** — add `<TrustStrip />`.
17. **Restyle `src/app/components/home/contact.tsx`** + `cards/contact.card.tsx`.
18. **Restyle footer** in `home.tsx`.
19. **Dark pass** — toggle through every section, fix any hardcoded colors that don't switch.
20. **Mobile pass** — verify at 375px, 768px, 1024px, 1440px.
21. **Lint + typecheck + build** — `npm run lint`, `npx tsc --noEmit`, `npm run build`.
22. **Visual smoke test** — `npm run dev`, open in browser, toggle theme, scroll through.

---

## 9. Verification Checklist

Before marking complete, every box must be checked.

### Tokens & Theme
- [ ] Light theme: cream canvas, olive ink, yellow CTA renders correctly
- [ ] Dark theme: deep olive canvas, light ink, warmer yellow CTA renders correctly
- [ ] Theme toggle persists across reloads (no flash of wrong theme)
- [ ] `system` theme option follows OS preference and updates on change
- [ ] No hardcoded hex colors in JSX — all via token classes (`bg-canvas`, `text-ink`, etc.)

### Layout
- [ ] Navbar sticky, 64px, logo left, nav center-right, theme toggle + yellow CTA far right
- [ ] Mobile: hamburger opens drawer with all nav items
- [ ] All sections have 6rem vertical padding on desktop
- [ ] Footer renders 2-column with proper borders

### Sections
- [ ] Hero: editorial headline, two CTAs, photo card with availability pill
- [ ] About: photo + bio + stats + 2 buttons
- [ ] Skills: 8 categories as pill groups, responsive grid
- [ ] Experience: timeline with filter tabs (All/Education/Experience/Training), 4 entries, correct dates
- [ ] Projects: 4 cards, hover scale, eyebrow chips, red "View project →"
- [ ] Trust strip: "Currently / Previously" band
- [ ] Contact: 4 cards (Email, Phone, Location, WhatsApp)

### Content
- [ ] Name everywhere: `Ashim Thapa Magar` (3 words)
- [ ] Phone `+977-9748723714` shown
- [ ] Location `Nepal, Baneshwor` shown
- [ ] Training dates `04/2025 – 06/2025`
- [ ] Current role = ICodify + Techmandu (not IOXET)
- [ ] AI girlfriend project removed
- [ ] Skills include Docker, AWS EC2, PostHog, Calendly, eSewa, Khalti

### Quality
- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] No console errors in browser
- [ ] Lighthouse a11y ≥ 95, performance ≥ 90
- [ ] All interactive elements have `aria-label` or visible text
- [ ] Keyboard nav works (tab through nav, toggle, buttons)
- [ ] `prefers-reduced-motion` respected (no scale animations)

---

## 10. Out of Scope (intentionally) — Phase 1 (Redesign)

- No blog/changelog module (current site has none).
- No animation library (no Framer Motion) — all motion is CSS only.
- No new dependencies beyond what's in `package.json` + `next/font`.
- No mascot / hedgehog illustrations.
- No new pages or routes (single-page site as before).
- No backend / API work in this phase (data still comes from local `api/*.ts` files).

> Note: backend work **is** in scope for **Phase 2 (Monorepo)** — see section 12. After the redesign lands, the api + admin services are built and the client is migrated to consume them.

---

## 11. References

- PostHog brand style guide: https://posthog.com/handbook/brand/style-guide
- PostHog visual identity: https://posthog.com/handbook/brand
- PostHog designing posthog.com: https://posthog.com/handbook/brand/designing-posthog-website
- IBM Plex Sans (Google Fonts): https://fonts.google.com/specimen/IBM+Plex+Sans
- Tailwind v4 `@theme`: https://tailwindcss.com/docs/theme
- Turborepo docs: https://turborepo.com/docs
- pnpm workspaces: https://pnpm.io/workspaces
- Prisma + MongoDB: https://www.prisma.io/docs/orm/overview/databases/mongodb

---

## 12. Monorepo Conversion (Turborepo) — DEFERRED

> **Status: not in scope for the current redesign.** This section is preserved as a reference for a future Phase 2. Do not execute any of it as part of the redesign work. When we revisit it, the recommended free-tier path is: drop the standalone Express `api` service, move its endpoints into Next.js route handlers inside `client` and `admin`, and use **MongoDB Atlas M0** as the database. The Express-server design below should be revised before any of it is built.

The portfolio currently lives in a single Next.js app under `client/`. The plan below describes promoting it to a proper monorepo so we can ship the admin panel and an API alongside it, share UI/types/lint config across all three apps, and run everything through Turbo.

### 12.1 Target Repository Structure

```
portfolio/
├── .gitignore
├── .npmrc                        # pnpm + node-linker=hoisted (Next.js compat)
├── .nvmrc                        # node 20.x
├── package.json                  # root, workspace root
├── pnpm-workspace.yaml           # workspace globs
├── turbo.json                    # turbo pipeline config
├── tsconfig.base.json            # shared TS config (paths, strict)
├── README.md                     # updated: how to run all services
│
├── apps/
│   ├── client/                   # the redesigned portfolio (this app)
│   │   ├── next.config.ts        # transpilePackages: ['@portfolio/ui', '@portfolio/types']
│   │   ├── package.json
│   │   ├── tsconfig.json         # extends ../../tsconfig.base.json
│   │   └── src/                  # current code moves here as-is
│   │
│   ├── admin/                    # PostHog-style admin panel (NEW)
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx          # imports @portfolio/ui
│   │       │   ├── page.tsx            # login / dashboard home
│   │       │   ├── projects/           # CRUD projects
│   │       │   ├── experience/         # CRUD experience
│   │       │   ├── skills/             # CRUD skill categories
│   │       │   ├── contact/            # edit contact info
│   │       │   └── api/                # route handlers proxying to api service
│   │       └── components/             # thin wrappers over @portfolio/ui
│   │
│   └── api/                      # Node/Express + Prisma backend (NEW)
│       ├── package.json
│       ├── tsconfig.json
│       ├── prisma/
│       │   └── schema.prisma
│       └── src/
│           ├── index.ts                # express bootstrap, port 4000
│           ├── env.ts                  # zod-validated env loader
│           ├── db.ts                   # prisma client singleton
│           ├── auth/                   # JWT + bcrypt
│           ├── middleware/             # cors, helmet, rate-limit, auth
│           ├── routes/
│           │   ├── auth.ts             # POST /login, POST /refresh
│           │   ├── projects.ts         # CRUD
│           │   ├── experience.ts       # CRUD
│           │   ├── skills.ts           # CRUD
│           │   └── contact.ts          # GET/PATCH
│           ├── services/               # business logic
│           └── validators/             # zod schemas (shared with apps via @portfolio/types)
│
├── packages/
│   ├── ui/                       # PostHog-styled component library (shared)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── postcss.config.mjs
│   │   ├── src/
│   │   │   ├── index.ts                  # barrel
│   │   │   ├── styles/
│   │   │   │   ├── globals.css           # tokens (canonical) — imported by client + admin
│   │   │   │   └── tailwind.css          # @theme + base layer
│   │   │   ├── components/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Eyebrow.tsx
│   │   │   │   ├── Title.tsx
│   │   │   │   ├── ThemeProvider.tsx
│   │   │   │   ├── ThemeToggle.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── MobileMenu.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── ExperienceTimeline.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── SkillPillGroup.tsx
│   │   │   │   ├── ContactCard.tsx
│   │   │   │   ├── AvailabilityPill.tsx
│   │   │   │   └── TrustStrip.tsx
│   │   │   └── tokens/
│   │   │       └── index.ts              # exports design tokens (TS constants mirror CSS vars)
│   │   └── README.md
│   │
│   ├── types/                    # shared TS types + zod schemas
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── project.ts                # IProject, ProjectCreateInput, etc.
│   │       ├── experience.ts             # IExperience, IQualification
│   │       ├── skill.ts                  # ISkill, ISkillCategory
│   │       ├── contact.ts                # IContactInfo
│   │       └── user.ts                   # IUser, IAuthResponse
│   │
│   ├── eslint-config/            # shared ESLint preset
│   │   ├── package.json
│   │   ├── base.js
│   │   ├── next.js
│   │   └── node.js
│   │
│   ├── tailwind-config/          # shared Tailwind preset
│   │   ├── package.json
│   │   └── preset.js                     # exports the @theme + safelist used by client + admin
│   │
│   └── tsconfig/                 # shared tsconfig presets
│       ├── package.json
│       ├── base.json
│       ├── nextjs.json
│       └── node.json
│
└── scripts/
    ├── seed.ts                  # prisma seed for dev
    └── reset-db.ts
```

### 12.2 pnpm Workspace Config

`pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

`package.json` (root):

```json
{
  "name": "portfolio",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean && rm -rf node_modules .turbo",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\""
  },
  "devDependencies": {
    "turbo": "^2.3.0",
    "prettier": "^3.3.0",
    "typescript": "^5.5.0"
  },
  "packageManager": "pnpm@9.12.0",
  "engines": { "node": ">=20" }
}
```

### 12.3 `turbo.json` Pipeline

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local", "tsconfig.base.json"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "clean": { "cache": false }
  }
}
```

`persistent: true` on `dev` is critical — it lets Turbo run `client`, `admin`, and `api` in parallel in the same terminal with prefixed logs.

### 12.4 Shared `@portfolio/ui` Package

`packages/ui/package.json`:

```json
{
  "name": "@portfolio/ui",
  "version": "0.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./styles": "./src/styles/globals.css"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.0.0"
  },
  "dependencies": {
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0"
  },
  "devDependencies": {
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "typescript": "^5"
  }
}
```

Key rule: every component in `packages/ui` is a **client component** only if it needs hooks (`ThemeProvider`, `ThemeToggle`, `MobileMenu`, `ExperienceTimeline`); the rest are server-renderable. Tokens live in **one** CSS file (`src/styles/globals.css`) which both `client` and `admin` import via `import '@portfolio/ui/styles'` in their root layout.

### 12.5 API Service Spec

**Stack**
- Node 20 + Express 4 + TypeScript (strict)
- Prisma + MongoDB (port 27017, db `portfolio`)
- JWT auth (access 15m + refresh 7d, httpOnly refresh cookie)
- bcrypt for password hashing
- zod for request validation
- helmet, cors (allowlist `client:3000`, `admin:3001`), express-rate-limit
- pino for structured logs
- tsx for dev hot-reload, esbuild for prod build

**Env (`apps/api/.env.example`)**

```
PORT=4000
DATABASE_URL=mongodb://localhost:27017/portfolio
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
CLIENT_ORIGIN=http://localhost:3000
ADMIN_ORIGIN=http://localhost:3001
NODE_ENV=development
```

**Endpoints**

| Method | Path | Auth | Purpose |
| - | - | - | - |
| POST | `/api/auth/login` | none | admin login → access token |
| POST | `/api/auth/refresh` | cookie | rotate refresh token |
| POST | `/api/auth/logout` | cookie | clear cookie |
| GET | `/api/projects` | none (public) | list all projects (for client) |
| GET | `/api/projects/:id` | none | single project |
| POST | `/api/projects` | admin | create |
| PATCH | `/api/projects/:id` | admin | update |
| DELETE | `/api/projects/:id` | admin | delete |
| GET | `/api/experience` | none | list experience entries |
| POST | `/api/experience` | admin | create |
| PATCH | `/api/experience/:id` | admin | update |
| DELETE | `/api/experience/:id` | admin | delete |
| GET | `/api/skills` | none | list skill categories |
| POST | `/api/skills` | admin | create |
| PATCH | `/api/skills/:id` | admin | update |
| DELETE | `/api/skills/:id` | admin | delete |
| GET | `/api/contact` | none | public contact card data |
| PATCH | `/api/contact` | admin | update phone/email/location/socials |
| GET | `/api/health` | none | liveness probe |

**Prisma schema (key models)**

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @ObjectId
  email     String   @unique
  password  String
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
}

enum Role { ADMIN }

model Project {
  id          String   @id @default(auto()) @map("_id") @ObjectId
  name        String
  description String
  photo       String
  link        String
  stack       String[] // ["Next.js","Prisma","PostgreSQL"]
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Experience {
  id        String   @id @default(auto()) @map("_id") @ObjectId
  type      ExpType  // EDUCATION | EXPERIENCE | TRAINING
  title     String
  org       String
  location  String?
  startDate String   // "04/2026"
  endDate   String?  // null = present
  highlights String[]
  order     Int      @default(0)
}

enum ExpType { EDUCATION EXPERIENCE TRAINING }

model SkillCategory {
  id     String  @id @default(auto()) @map("_id") @ObjectId
  title  String  // "Frontend"
  skills Skill[]
  order  Int     @default(0)
}

model Skill {
  id         String        @id @default(auto()) @map("_id") @ObjectId
  name       String
  level      String?
  category   SkillCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  categoryId String        @ObjectId
}

model ContactInfo {
  id        String   @id @default(auto()) @map("_id") @ObjectId
  email     String
  phone     String
  location  String
  whatsapp  String
  instagram String?
  github    String?
  linkedin  String?
  twitter   String?
  updatedAt DateTime @updatedAt
}
```

### 12.6 Admin Service Spec (`apps/admin`)

- Next.js 15 (App Router) on **port 3001** (set in `package.json`: `"dev": "next dev -p 3001"`).
- Same `@portfolio/ui` import for visual consistency with `client`.
- Auth: login form posts to `api/auth/login`, stores access token in memory + refresh token in httpOnly cookie (set by the api). Uses a `useAdminAuth()` hook for guards.
- Pages:
  - `/login` — email + password
  - `/` — dashboard: counts of projects/experience/skills + recent activity
  - `/projects` — table view + "New project" button → modal form
  - `/experience` — same shape
  - `/skills` — nested editor: categories + drag-reorderable skills
  - `/contact` — single-form editor for the `ContactInfo` singleton
- All mutations use `fetch('/api/...')` route handlers that proxy to the api service with the access token. The admin never talks to MongoDB directly.
- Form validation reuses zod schemas from `@portfolio/types` (single source of truth with the api).

### 12.7 Client Integration

The redesigned `client` consumes the api for content (no more hardcoded data files):

- `src/app/(home)/page.tsx` becomes an **async server component** that fetches `/api/projects`, `/api/experience`, `/api/skills`, `/api/contact` at build/request time.
- All four `api/*.ts` data files in `client/src/app/api/` are removed in favor of API calls.
- ISR: revalidate every 60s (`export const revalidate = 60`).
- Environment variable `NEXT_PUBLIC_API_URL=http://localhost:4000` (only the public read endpoints are called from the client; mutations are admin-only).

### 12.8 Migration Steps (in order)

This is executed **after** the PostHog redesign in `client` is complete, so the visual system is stable before we move code.

1. **Create monorepo skeleton**
   - `git mv client portfolio-tmp` → create `portfolio/` with `pnpm-workspace.yaml`, `turbo.json`, root `package.json`.
   - `git mv portfolio-tmp apps/client`.
2. **Extract design system to `packages/ui`**
   - Move all components from `apps/client/src/app/components/` into `packages/ui/src/components/`.
   - Move `globals.css` token block to `packages/ui/src/styles/globals.css`.
   - Update all imports across the app to use `@portfolio/ui`.
3. **Extract types to `packages/types`**
   - Move `IProject`, `IExperience`, `ISkill`, `IContact` from `apps/client/src/app/api/*.tsx` into `packages/types/src/*.ts`.
   - Add zod schemas alongside.
4. **Create `apps/api`**
   - Scaffold Express + Prisma + the schema above.
   - Seed script populates MongoDB with the current 4 projects, 4 experience entries, 8 skill categories, and 1 contact record.
   - Add `apps/api/package.json` scripts: `dev` (tsx watch), `build` (tsc), `start` (node dist).
5. **Create `apps/admin`**
   - `pnpm create next-app apps/admin` (TypeScript, App Router, no Tailwind by default — we provide our own preset).
   - Wire up `@portfolio/ui`, `@portfolio/types`, `apps/admin/postcss.config.mjs` consumes `@portfolio/tailwind-config`.
   - Build login + CRUD pages.
6. **Refactor `apps/client` to consume the api**
   - Remove `api/*.tsx` data files.
   - Add `lib/api.ts` with typed `fetch` wrappers.
   - Make `page.tsx` (or the section components) async server components fetching from the api.
7. **Validate end-to-end**
   - `pnpm install` at root.
   - `pnpm dev` → Turbo boots `api` (4000), `client` (3000), `admin` (3001) in parallel, each with `[client]`, `[admin]`, `[api]` log prefixes.
   - `pnpm --filter client dev` → only client runs.
   - `pnpm --filter admin dev` → only admin runs.
   - `pnpm --filter api dev` → only api runs.
8. **CI-ready scripts**
   - `pnpm lint`, `pnpm typecheck`, `pnpm build` all run across all packages via Turbo with proper topological ordering.

### 12.9 Status: Run All Services Individually

After migration, the daily-driver commands are:

| Goal | Command |
| - | - |
| Run **all three** services with one command | `pnpm dev` |
| Run **only the client** portfolio | `pnpm --filter client dev` |
| Run **only the admin** panel | `pnpm --filter admin dev` |
| Run **only the api** backend | `pnpm --filter api dev` |
| Run client + admin, skip api | `pnpm dev --filter=client --filter=admin` |
| Add a new admin-only dep without re-installing client | `pnpm --filter admin add zod` |
| Lint one package | `pnpm --filter @portfolio/ui lint` |
| Build everything for prod | `pnpm build` |
| Wipe all `node_modules` and `.next` | `pnpm clean` |

### 12.10 Ports & CORS Summary

| Service | Port | URL | Notes |
| - | - | - | - |
| `client` | 3000 | http://localhost:3000 | The public portfolio |
| `admin` | 3001 | http://localhost:3001 | Local-only, behind login |
| `api` | 4000 | http://localhost:4000 | Backend, CORS allowlists 3000 + 3001 |
| MongoDB | 27017 | mongodb://localhost:27017/portfolio | Local docker-compose in dev |

### 12.11 Verification Checklist (monorepo-specific)

- [ ] `pnpm install` at root succeeds and links all workspace packages
- [ ] `pnpm dev` boots all three services with `[client] [admin] [api]` log prefixes
- [ ] `pnpm --filter client dev` starts only client on 3000
- [ ] `pnpm --filter admin dev` starts only admin on 3001
- [ ] `pnpm --filter api dev` starts only api on 4000
- [ ] Client homepage renders 4 projects fetched from api (not from `api/projects.tsx`)
- [ ] Admin login with seeded credentials returns an access token
- [ ] Admin can create a new project → it appears on the client after revalidation
- [ ] Admin can edit the `ContactInfo` singleton → header/contact section reflects the change
- [ ] Hot reload works in all three services independently
- [ ] `pnpm build` produces `.next/` in `client` and `admin`, `dist/` in `api`
- [ ] CORS: `api` rejects requests from `http://localhost:9999`
- [ ] JWT refresh flow works (access expires, refresh cookie rotates, new access issued)
- [ ] No package in `apps/*` imports directly from another `apps/*` (apps depend on `packages/*` only)
- [ ] Shared design tokens change in one place (`packages/ui/src/styles/globals.css`) and reflect in both client and admin

### 12.12 Out of Scope for the Monorepo Pass

- Docker / docker-compose orchestration (deferred — local dev uses `pnpm dev` and a local MongoDB).
- Deploying all three services to production (only the `client` deploy target is in scope for now; admin + api will deploy separately later).
- Email auth, OAuth, magic links (single hardcoded admin user, password login only).
- File uploads (project photos continue to live in `public/` for now; admin just enters a URL).
- Background jobs, queues, websockets in the api (none needed for v1).
- E2E tests (Playwright) — added in a follow-up.
