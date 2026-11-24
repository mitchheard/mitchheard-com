# Updating content (light CRM)

All editable content lives in **`src/data/`**. No database required — edit these files and redeploy.

| What you want to change | File to edit |
|------------------------|--------------|
| Site name, tagline, portrait (`photo`, 4:5), "Now" list | `src/data/site.ts` |
| Page titles, meta descriptions and link-preview text (`seo`); canonical site URL (`url`); share-card image (`shareImage` → `public/og.png`, 1200×630) | `src/data/site.ts` |
| Public nav links | `src/data/nav.ts` |
| **Dashboard** quick links & notes | `src/data/links.json` |
| Projects list, shown on /projects and the home grid (order = display order; `image` optional 16:10 screenshot, a 1600px-wide JPG in `public/projects/`; after adding or replacing one run `npm run images` to make its WebP variants and commit them (`"imageShape": "portrait"` for a phone capture; `gallery` up to 3 more shots shown under it on /projects); `stack` mono line; `highlights` 3-4 short lines; stage `Retired` moves it under the home cards and relabels its rows; `"hidden": true` keeps an entry in the file but off the site) | `src/data/projects.json` |
| Career entries on /career (newest first; `story` one paragraph; optional `outcomes` list of proof lines shown under it: only numbers you are allowed to share) | `src/data/career.ts` |
| Résumé link on /career (put a PDF in `public/`, set `resumeUrl` in `site.ts`; empty hides the link) | `src/data/site.ts` |
| Articles: one Markdown file per post in `src/data/articles/` (copy `_template.md`; the file name is the URL; `draft: true` keeps it off the site). The Writing page, RSS feed (`/feed.xml`) and sitemap fill in on their own. With no published posts the page is noindex and hidden; when the first post goes live, re-add `{ href: "/articles", label: "Writing" }` in `nav.ts` | `src/data/articles/*.md` |

## Dashboard as Chrome homepage

1. Open Chrome → Settings → On startup (or New tab page).
2. Set "Open a specific page" to your site’s dashboard URL, e.g. `https://yoursite.com/dashboard`.

**The dashboard is public.** The site is a static export, so `/dashboard` is served to anyone who knows the URL, and `src/data/links.json` is in the public repo. It is kept out of the nav, the sitemap, search (`noindex`) and Umami, but that is not protection. Only put links in `links.json` that you'd be fine showing anyone; never private URLs, tokens or notes. To make it actually private, put `/dashboard` behind Cloudflare Access (a Cloudflare setting, not a code change) or stop exporting it.
