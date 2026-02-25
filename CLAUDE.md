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
- `src/App.tsx` — Root component; sets up `BrowserRouter`, layout route, and all four routes

### Layout shell
- `src/components/Header.tsx` — Site header with `NavLink` navigation (active link highlighted)
- `src/components/Main.tsx` — Layout shell; renders `<Outlet />` for the active route (`max-w-5xl`, `py-10`)
- `src/components/Footer.tsx` — Site footer with dynamic copyright year and social links

### Pages (containers)
- `src/pages/Home.tsx` — `/` — calls `useGitHubRepos`, filters by `featuredRepos` allowlist, renders `HeroSection` + `FeaturedProjects`
- `src/pages/About.tsx` — `/about` — placeholder
- `src/pages/Projects.tsx` — `/projects` — calls `useGitHubRepos`, renders `ProjectGrid` with all repos
- `src/pages/Contact.tsx` — `/contact` — placeholder

### Presenters
- `src/components/HeroSection.tsx` — Hero with photo, name, title, bio paragraphs, and CTA buttons. Props: `name: string`, `title: string`, `bio: string[]`, `imageSrc?: string`. Layout: image + text side by side (top row), buttons full-width (bottom row).
- `src/components/FeaturedProjects.tsx` — "Featured Projects" section heading + card grid; handles loading/error states
- `src/components/ProjectGrid.tsx` — "Projects" page heading + card grid; handles loading/error states
- `src/components/ProjectCard.tsx` — Single project card; clicks open GitHub repo; expands on hover to show full description; shows Live Demo link if available

### Data & hooks
- `src/hooks/useGitHubRepos.ts` — Fetches `https://api.github.com/users/rsprague216/repos`, filters out forks and the portfolio repo itself (`rsprague216.github.io`), maps to `Project[]`; returns `{ repos, loading, error }`
- `src/data/projects.ts` — `GitHubRepo` and `Project` interfaces + `mapRepo()` mapping function
- `src/data/featured.ts` — `featuredRepos: string[]` allowlist of repo names shown on the Home page; **edit this to change featured projects**

### Static assets
- `public/ryan_grad.jpg` — Headshot photo used in the hero; referenced as `/ryan_grad.jpg`

### Other
- `src/index.css` — Single `@import "tailwindcss"` directive; no other global CSS
- `vite.config.ts` — `base: '/'`, `react()` and `tailwindcss()` plugins
- `_deprecated/` — Removed. Legacy static HTML/CSS site content is recoverable via `git show HEAD:about.html` and `git show HEAD:index.html`

## Route structure

```
/ (BrowserRouter)
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

- New components → `src/components/`
- New pages → `src/pages/`
- New hooks → `src/hooks/`
- New data/types → `src/data/`
- Use Tailwind utility classes in JSX; avoid separate CSS files
- TypeScript strict mode is on — no `any` types
- Dark theme: `bg-slate-900` shell, `bg-slate-800` cards, `text-slate-400` muted, `text-slate-100` bright
