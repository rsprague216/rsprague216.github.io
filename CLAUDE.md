# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal **developer portfolio** for Ryan Sprague, built with **Vite + React + TypeScript + TailwindCSS v4 + React Router v7**, hosted on GitHub Pages at `rsprague216.github.io`.

The site showcases Ryan's work and skills — featured projects, a developer bio, a full project list pulled live from GitHub, and contact information.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Deployment

```bash
npm run deploy   # builds to dist/ and pushes to the gh-pages branch
```

- Source lives on `main`; the built site is pushed to the `gh-pages` branch by `gh-pages -d dist`
- GitHub Pages must be configured to serve from the **`gh-pages` branch** (repo Settings → Pages)
- GitHub Actions CI is not yet configured — deployment is manual via `npm run deploy`

## Routing

Uses `HashRouter` (not `BrowserRouter`) so GitHub Pages never needs to serve deep URLs — all navigation is hash-based (e.g. `/#/about`). No `404.html` workaround needed.

## Architecture

### Component pattern: Stateful Container + Stateless Presenter
- **Page components** (`src/pages/`) own data and state; they call hooks and pass data down as props
- **UI components** (`src/components/`) are pure presenters — props in, JSX out, no business logic

### Entry points
- `index.html` — Vite HTML entry (repo root)
- `src/main.tsx` — React entry point, mounts `App` into `#root`
- `src/App.tsx` — Root component; sets up `HashRouter`, layout route, and all four routes

### Layout shell (`src/components/layout/`)
- `src/components/layout/Header.tsx` — Site header with `NavLink` navigation (active link highlighted). Responsive: desktop (`sm:`) shows inline nav links; mobile shows a hamburger button that toggles a right-aligned dropdown menu (closed by default, closes on nav)
- `src/components/layout/Main.tsx` — Layout shell; renders `<Outlet />` for the active route (`max-w-5xl`, `py-10`)
- `src/components/layout/Footer.tsx` — Site footer with dynamic copyright year and social links

### Pages (containers)
- `src/pages/Home.tsx` — `/` — calls `useGitHubRepos`, filters by `featuredRepos` allowlist, renders `HeroSection` + `FeaturedProjects`
- `src/pages/About.tsx` — `/about` — placeholder
- `src/pages/Projects.tsx` — `/projects` — calls `useGitHubRepos`; owns filter state (`searchQuery`, `selectedTech`, `sortOrder`, `showTechFilter`); derives `availableTech` and `filteredRepos` via `useMemo`; renders page heading + `ProjectFilter` + `ProjectGrid`
- `src/pages/Contact.tsx` — `/contact` — placeholder

### Presenters (`src/components/` — organized by feature subdirectory)

**`src/components/home/`** — consumed only by `Home.tsx`
- `src/components/home/HeroSection.tsx` — Hero with photo, name, title, bio paragraphs, and CTA buttons. Props: `name: string`, `title: string`, `bio: string[]`, `imageSrc?: string`. Layout varies by breakpoint: **mobile** — image (`w-20 h-20`) + name/title in a row, bio paragraphs full-width below; **desktop (`sm:`)** — image (stretched, `sm:max-h-64`) beside a text column containing name, title, and bio; buttons full-width below on both. Bio is rendered twice (once per breakpoint) with `hidden sm:flex` / `sm:hidden` to achieve the layout shift without CSS grid.
- `src/components/home/FeaturedProjects.tsx` — "Featured Projects" section heading + card grid; handles loading/error states

**`src/components/projects/`** — consumed by `Projects.tsx` and `home/FeaturedProjects.tsx`
- `src/components/projects/ProjectFilter.tsx` — Filter bar for the Projects page. Row 1 (always visible): search input + "Filter" button (with active-count badge, toggles tech pills) + sort toggle — rendered as a single flush button group with `border border-slate-700`. Row 2 (collapsible): tech tag pills, multi-select, active pills styled `bg-sky-700`. Pure presenter — no internal state.
- `src/components/projects/ProjectGrid.tsx` — Card grid; handles loading/error states. **Does not render a heading** — the page title lives in `Projects.tsx`.
- `src/components/projects/ProjectCard.tsx` — Single project card; clicks open GitHub repo; expands on hover to show full description; shows Live Demo link if available. Uses a `relative` wrapper + invisible spacer div (real text elements at matching font sizes) to reserve grid row height, with the visible card `absolute inset-0` on top.
- `src/components/projects/ProjectCardSkeleton.tsx` — Animated pulse skeleton for `ProjectCard`; mirrors the same `relative`/invisible-spacer/`absolute inset-0` structure so skeleton cards occupy identical grid height as real cards.

### Data & hooks
- `src/hooks/useGitHubRepos.ts` — Fetches `https://api.github.com/users/rsprague216/repos`, filters out forks and the portfolio repo itself (`rsprague216.github.io`), maps to `Project[]`; returns `{ repos, loading, error }`
- `src/data/projects.ts` — `GitHubRepo` and `Project` interfaces + `mapRepo()` mapping function
- `src/data/featured.ts` — `featuredRepos: string[]` allowlist of repo names shown on the Home page; **edit this to change featured projects**

### Static assets
- `public/ryan_grad.jpg` — Headshot photo used in the hero; referenced as `/ryan_grad.jpg`
- `public/favicon_io/` — Favicon set (ICO, 16×16, 32×32 PNG, Apple touch icon, Android chrome PNGs, `site.webmanifest`); generated via favicon.io using the Coda font; linked in `index.html`

### Other
- `src/index.css` — `@import "tailwindcss"` + global `html` styles: `scrollbar-gutter: stable` (prevents layout shift when scrollbar appears/disappears), `background-color: #020617` (fills gutter with `slate-950` so it's invisible), and custom scrollbar styling (`slate-950` track, `slate-700` thumb)
- `vite.config.ts` — `base: '/'`, `react()` and `tailwindcss()` plugins
- `_deprecated/` — Removed. Legacy static HTML/CSS site content is recoverable via `git show HEAD:about.html` and `git show HEAD:index.html`

## Route structure

```
/ (HashRouter — all URLs are hash-based, e.g. /#/about)
└── <Main /> (layout route — renders Outlet)
    ├── index → <Home />
    ├── /about → <About />
    ├── /projects → <Projects />
    └── /contact → <Contact />
```

## TailwindCSS v4

- No `tailwind.config.js` needed — v4 is zero-config by default
- Setup is: `@import "tailwindcss"` in `src/index.css` + `@tailwindcss/vite` plugin in `vite.config.ts`
- Use `@import "tailwindcss"` (v4 syntax) — not the v3 `@tailwind base/components/utilities` directives

## Conventions

- New components → `src/components/<feature>/` (e.g. `layout/`, `home/`, `projects/`; add `about/`, `contact/` as those pages grow)
- New pages → `src/pages/`
- New hooks → `src/hooks/`
- New data/types → `src/data/`
- Use Tailwind utility classes in JSX; avoid separate CSS files
- TypeScript strict mode is on — no `any` types
- Dark theme: `bg-slate-950` page background, `bg-slate-900` header/footer, `bg-slate-800` cards, `text-slate-400` muted, `text-slate-100` bright
