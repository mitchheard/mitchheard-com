Personal site for [mitchheard.com](https://mitchheard.com): public front (about, articles, projects, photography) and a **private dashboard** at `/dashboard` for quick links and notes — suitable as a browser homepage or new-tab page.

- **Layout:** Left sidebar nav (early-2000s style), full-width content on the right; responsive with a mobile hamburger menu.
- **Content:** Edit JSON/TS in `src/data/` — no database. See [CONTENT.md](./CONTENT.md) for the content guide ("light CRM").
- **Build:** Static export (`output: 'export'`). The site is pre-rendered to the `out/` directory; no Node server at runtime.

## Getting Started

```bash
npm install
npm run dev
```

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
5. (Optional) Set **Environment** → add `NEXT_PUBLIC_SITE_URL` if your sitemap or meta need the production URL (e.g. `https://mitchheard.com`).
6. Deploy. Render will build and serve the static files — no Web Service, no spin-down, free tier eligible.

To switch to a **Web Service** later (e.g. for API routes or SSR), remove `output: 'export'` from `next.config.ts`, create a Web Service on Render, and use **Start command:** `npm start` with the same repo.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)
