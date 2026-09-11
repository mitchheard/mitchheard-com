# Updating content (light CRM)

All editable content lives in **`src/data/`**. No database required — edit these files and redeploy.

| What you want to change | File to edit |
|------------------------|--------------|
| Site name, tagline, portrait (`photo`, 4:5), "Now" list | `src/data/site.ts` |
| Public nav links | `src/data/nav.ts` |
| **Dashboard** quick links & notes | `src/data/links.json` |
| Work list (order = display order; `image` optional 16:10 screenshot; `stack` mono line; `highlights` 3-4 short lines; stage `Retired` moves it under the home cards and relabels its rows) | `src/data/projects.json` |
| Articles (empty = hidden from nav; re-add link in `nav.ts`) | `src/data/articles.json` |

## Dashboard as Chrome homepage

1. Open Chrome → Settings → On startup (or New tab page).
2. Set "Open a specific page" to your site’s dashboard URL, e.g. `https://yoursite.com/dashboard`.

The dashboard route is not linked from the public navigation, so visitors won’t see it unless they know the URL.
