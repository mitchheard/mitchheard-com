# Updating content (light CRM)

All editable content lives in **`src/data/`**. No database required — edit these files and redeploy.

| What you want to change | File to edit |
|------------------------|--------------|
| Site name, tagline, portrait (`photo`, 4:5), "Now" list | `src/data/site.ts` |
| Page titles, meta descriptions and link-preview text (`seo`); canonical site URL (`url`); share-card image (`shareImage` → `public/og.png`, 1200×630) | `src/data/site.ts` |
| Public nav links | `src/data/nav.ts` |
| **Dashboard** quick links & notes | `src/data/links.json` |
| Projects list, shown on /projects and the home grid (order = display order; `image` optional 16:10 screenshot, a 1600px-wide JPG in `public/projects/`; after adding or replacing one run `npm run images` to make its WebP variants and commit them (`"imageShape": "portrait"` for a phone capture; `gallery` up to 3 more shots shown under it on /projects); `stack` mono line; `highlights` 3-4 short lines; stage `Retired` moves it under the home cards and relabels its rows; `"hidden": true` keeps an entry in the file but off the site; `"featured": true` gives it a large card on Home, the rest become compact rows; optional `appStoreUrl` adds an App Store link on /projects; optional `status` is a quiet badge with no date, e.g. "Coming to the App Store"; `galleryShapes` lists `"portrait"` or `"landscape"` for `[image, ...gallery]` so phone and iPad shots can mix; a portrait shot needs a source JPG at least 1600px wide so `npm run images` makes its 1600 variant) | `src/data/projects.json` |
| Career entries on /career (newest first; `story` one paragraph) | `src/data/career.ts` |
| Articles (empty = hidden from nav; re-add link in `nav.ts`) | `src/data/articles.json` |

## Dashboard as Chrome homepage

1. Open Chrome → Settings → On startup (or New tab page).
2. Set "Open a specific page" to your site’s dashboard URL, e.g. `https://yoursite.com/dashboard`.

The dashboard route is not linked from the public navigation, so visitors won’t see it unless they know the URL.
