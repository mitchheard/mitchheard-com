# Updating content (light CRM)

All editable content lives in **`src/data/`**. No database required — edit these files and redeploy.

| What you want to change | File to edit |
|------------------------|--------------|
| Site name & tagline | `src/data/site.ts` |
| Public nav links | `src/data/nav.ts` |
| **Dashboard** quick links & notes | `src/data/links.json` |
| Projects list | `src/data/projects.json` |
| Articles list (and add `src/app/articles/[id]/page.tsx` for full body or use markdown) | `src/data/articles.json` |
| Photography gallery metadata | `src/data/photography.json` |

## Adding a new article

1. Add an entry to `src/data/articles.json` with `id`, `title`, `date`, `excerpt`.
2. For full article body you can either:
   - Add a markdown file in `src/content/articles/` and use a markdown loader, or
   - Extend the JSON with a `body` field and render it in `src/app/articles/[id]/page.tsx`.

## Dashboard as Chrome homepage

1. Open Chrome → Settings → On startup (or New tab page).
2. Set "Open a specific page" to your site’s dashboard URL, e.g. `https://yoursite.com/dashboard`.

The dashboard route is not linked from the public navigation, so visitors won’t see it unless they know the URL.
