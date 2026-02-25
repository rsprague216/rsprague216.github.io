# rsprague216.github.io

Personal developer portfolio for Ryan Sprague — built with Vite + React + TypeScript + TailwindCSS v4.

Live at **[rsprague216.github.io](https://rsprague216.github.io)**

## Stack

- [Vite](https://vitejs.dev/) — build tool & dev server
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS v4](https://tailwindcss.com/) — utility-first styling (zero-config)
- [React Router v7](https://reactrouter.com/) — hash-based routing for GitHub Pages
- [GitHub Pages](https://pages.github.com/) — hosting via `gh-pages` branch

## Features

- Hero section with photo, bio, and CTA buttons
- Featured projects pulled live from the GitHub API
- Full project listing with search, tech-tag filtering, and sort — filter bar collapses to keep the UI clean
- Animated skeleton loading states
- Responsive dark-themed layout

## Development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Deployment

```bash
npm run deploy   # builds and pushes dist/ to the gh-pages branch
```

Source lives on `main`; the built site is served from the `gh-pages` branch. GitHub Pages is configured accordingly in repo Settings → Pages.

## Project Structure

```
src/
├── components/   # Stateless UI presenters (Header, Footer, ProjectCard, etc.)
├── pages/        # Route-level containers (Home, About, Projects, Contact)
├── hooks/        # Data hooks (useGitHubRepos)
├── data/         # Types, mappers, and featured project allowlist
└── index.css     # @import "tailwindcss" (v4 syntax)
```

To change which projects are featured on the home page, edit [`src/data/featured.ts`](src/data/featured.ts).
