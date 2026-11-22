Personal site for [mitchheard.com](https://mitchheard.com): public front (home, career, projects = AvidX products; writing hidden until the first post) and a **public, unlisted dashboard** at `/dashboard` for quick links and notes — suitable as a browser homepage or new-tab page. It is `noindex` but not private; see [CONTENT.md](./CONTENT.md).

- **Layout:** Top nav, single centered column; responsive with a mobile hamburger menu.
- **Content:** Edit JSON/TS in `src/data/` — no database. See [CONTENT.md](./CONTENT.md) for the content guide ("light CRM").
- **Build:** Static export (`output: 'export'`). The site is pre-rendered to the `out/` directory; no Node server at runtime.

## Getting Started

```bash
npm install
npm run dev
```

If files edited from outside the editor (Cowork, a mounted drive) don't hot-reload, use `npm run dev:poll` instead; it polls the filesystem instead of waiting for change events.

Open [http://localhost:3000](http://localhost:3000). Edit pages in `src/app/`; the dev server hot-reloads.

**Production build (static):**

```bash
npm run build
```

Output is written to `out/`. Serve that directory with any static host.

## Deploy on Render (Static Site)

1. In [Render](https://render.com): **New → Static Site**.
2. Connect this GitHub repo (`mitchheard/mitchheard-com`).
3. **Build command:** `npm install && npm run build`
4. **Publish directory:** `out`
5. The canonical site URL (used by the sitemap, `robots.txt`, canonical links and Open Graph tags) is `site.url` in `src/data/site.ts`. No environment variable is needed.
6. Deploy. Render will build and serve the static files — no Web Service, no spin-down, free tier eligible.

To switch to a **Web Service** later (e.g. for API routes or SSR), remove `output: 'export'` from `next.config.ts`, create a Web Service on Render, and use **Start command:** `npm start` with the same repo.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)
