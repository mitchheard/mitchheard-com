# mitchheard.com: site review (AVIDX-406, Step 1)

Review only. No code was changed. Nothing here is built until you approve it.

**Reviewed:** the repo at `main` (27091d1) and the live site at `www.mitchheard.com`, Nov 17, 2026.

**How I checked:**
- Read every file in `src/`, the data files and `CONTENT.md`.
- Ran `npm run build` and `npm run lint`.
- Fetched every outbound link with curl.
- Ran Lighthouse 12.8.2 (mobile and desktop) against the live Home, Career and Projects pages.
- Looked at Home and Projects in a 375px phone viewport and at desktop width.
- Measured tap targets and horizontal overflow in the browser.

**What I did not do:**
- I did not test on a real iPhone or in iPhone Safari. "Phone" here means a 375px emulated viewport and Lighthouse's mobile profile.
- I had no access to the Umami dashboard, so the analytics review is from code only.
- I did not check how link previews render in iMessage, LinkedIn or Slack. I only confirmed the tags are absent.
- I did not run Lighthouse on `/dashboard` or `/articles`.

---

## Summary

The site is already good. It's fast (Lighthouse 95 to 100 everywhere except one mobile page), fast to read, visually consistent, and the voice is yours. The problems aren't craft. They're that the site undersells itself in three places:

1. When someone shares the link, it looks like nothing. Every page has the same title, there is no preview image, and there is no `robots.txt`.
2. The first screen explains your *why* but not your *what* or your *proof*.
3. The project data isn't ready for the App Store, and a few lines will go stale or raise eyebrows.

There is also one real bug: **`npm run lint` fails on `main`**. Step 2 requires lint to pass before each PR, so fixing it is the first PR.

---

## Top 5 changes, ranked

### 1. Put the *what* and the proof on the first screen

**Why it matters:** your audience is sizing you up as a product leader, usually in a few seconds on a phone. Today the hero opens with a reflective origin story ("I left engineering for product when I noticed…"). The concrete facts come after it: CPO at Newzip, 40+ financial institutions, 15,000+ agents. Those numbers are the strongest evidence on the site, and they live only on `/career`. "Newzip" also appears twice in the hero (the subline and the meta line, both as links), while the numbers appear nowhere on Home.

On a 375px phone the first screen is just the headline, the lede and the subline. The photo and the "Now" list are below the fold, and there's no GitHub link anywhere on the site, which matters for a "commit access" tagline.

**Proposal** (your sentences are untouched; I'm adding one and removing two that repeat it):

| | Before | After |
|---|---|---|
| New first line (lede size) | *(none)* | "I'm CPO at Newzip, where we run real estate programs for 40+ financial institutions and 15,000+ agents. Nights and weekends I run AvidX, a studio that ships small software bets." |
| Lede | "I left engineering for product when I noticed the mistakes that hurt most were made before anyone wrote a line of code. I keep ending up in the messiest version of that: one product that has to hold together several kinds of users with conflicting incentives." | unchanged, now second |
| Subline (`hero-sub`) | "By day I run product at Newzip. Nights and weekends I run AvidX, a studio for small software bets. Build fast, validate with real people, keep what works." | Remove the first two sentences (absorbed above). Keep "Build fast, validate with real people, keep what works." as the closing line, or drop it. |
| Meta line | "Austin, TX · CPO, Newzip · Founder, AvidX" | "Austin, TX · LinkedIn · GitHub · Email" (see below) |

Also add a GitHub link next to LinkedIn and email, in both the desktop nav icons and the mobile menu. The data lives in `site.ts`; the link would be `https://github.com/mitchheard`.

On mobile, move the photo up (small, beside the name) or below the first block of text, so the first screen carries the proof.

**Question for you:** is the 40+ / 15,000+ figure current and OK to put on the home page? It's already on `/career`, so I assume yes.

### 2. Make shared links look like something (SEO and sharing)

**Why it matters:** recruiters, founders and investors will usually meet this site as a pasted link in LinkedIn, iMessage, Slack or an email. Today that preview is a bare title with no description tuned to the page and no image. Lighthouse gives SEO 100 because it only checks that a title and description exist. They exist, but they are identical on every page, and the checks that matter for sharing aren't part of that score.

What the build actually produces (`out/*.html`):
- Every page's `<title>` is "Mitch Heard", including `/career`, `/projects`, `/dashboard`, `/articles` and the 404.
- Every page has the same description.
- No Open Graph tags, no Twitter card tags, no `og:image`, no canonical URL, no JSON-LD.
- No `robots.txt`. The live `/robots.txt` returns a 404 page (12.6 KB of HTML).
- **Host mismatch:** `mitchheard.com` 301-redirects to `www.mitchheard.com`, but the sitemap lists apex URLs. Every sitemap URL is a redirect. The sitemap's `lastmod` is also `new Date()` at build time, so it changes on every deploy even when nothing changed.

**Proposal:**

| Page | Before | After (proposed) |
|---|---|---|
| Home | `Mitch Heard` | `Mitch Heard: Product leader with commit access` |
| Career | `Mitch Heard` | `Career · Mitch Heard` |
| Projects | `Mitch Heard` | `Projects · Mitch Heard` |
| Career description | (site-wide line) | "Newzip, RigUp, Bazaarvoice: products that sit between people who need each other and want different things." |
| Projects description | (site-wide line) | "Small software bets under AvidX: what each one is, the bet behind it, and what happened." |

- Use `metadataBase` plus per-page `metadata`, with `openGraph` and `twitter` blocks, a canonical on each page, and one 1200×630 share image (portrait plus tagline on the paper background).
- Set `NEXT_PUBLIC_SITE_URL=https://www.mitchheard.com` on Render, or pick the apex as canonical and redirect www to it. Either is fine; they need to agree.
- Add `robots.txt` (with the sitemap line) and a `Person` + `WebSite` JSON-LD block on Home.
- Drop the fake `lastmod`.
- `noindex` on `/dashboard`, `/articles` (until it has posts) and the 404.

**Question for you:** do you prefer `www` or the apex as the canonical host? The current Render/Cloudflare setup behaves as if it's `www`.

### 3. Make Projects trustworthy and App Store-ready

**Why it matters:** Projects is where "commit access" is proven. A few lines undercut it, and the data model can't yet show the App Store.

**(a) Copy that raises eyebrows or will go stale:**

| Where | Before | After (proposed) | Why |
|---|---|---|---|
| Highlight Zone, The bet | "The player cover bends a rule and I kept it anyway, because it's the one thing that makes the app safe to hand to a kid." | "The player cover is the choice that sits closest to YouTube's lines, and the one that makes the app safe to hand to a kid. I kept it on purpose." | The original says in public, on a hiring page, that you knowingly break a platform rule. Investors and peers read that as risk; YouTube could read it too. Your call whether to soften it; if the cover really does violate the embedded-player policies, I'd also consider whether the line should be there at all. |
| Lellow, The bet | "Four families are testing it now." | Remove, or "Tested with a handful of families before launch." | Count claims go stale the day the App Store listing exists. |
| Highlight Zone, The bet | "friends are using it now." | "Friends and family use it." | Same. |
| Lellow badge | "Live · iPad / Web" | "Live · Web / PWA" until the App Store build exists | It's a PWA. "iPad" implies a native app today. |
| Lellow highlight | "64 coloring pages" | "60+ coloring pages" (or keep the exact number and accept the edit when it changes) | Exact counts rot. |
| Projects intro | "Small software products under AvidX." | "Small software I've built, most of it under AvidX." | fullshot lives on your personal GitHub, not under AvidX. Is it an AvidX product? If so, ignore this. |

**(b) App Store readiness (schema and layout).** Today a project has one `url`, one optional `sourceUrl`, a `badges` array of `{stage, platform}`, and a gallery that forces every shot into a 16:10 box (portrait phone shots only work as the single hero, via `imageShape: "portrait"`). To ship Watch Me and Lellow on the App Store without a redesign:
- Add optional `appStoreUrl` to `projects.json`, rendered as the official badge image in the link row. The same pattern already exists for `sourceUrl`.
- Add a `status` that doesn't need a date, for example "Coming to the App Store" rendered as a quiet badge. Nothing on the site should promise a date.
- Let a gallery mix aspect ratios (iPhone portrait and iPad landscape) instead of one forced box, and cap thumbnails by aspect.
- Keep "Live" copy that stays true after launch: describe what it does, not what stage it's in.

**(c) Home grid layout.** There are five live cards in a three-column grid, so the second row is a 3+2 orphan with an empty slot on the right. Lellow and Watch Me are the App Store pair and deserve to be the two featured cards, with the other three as compact rows. That turns the weakness into a clear hierarchy (two flagships, then the rest) and makes the App Store badge placement obvious.

**(d) fullshot.** The card image is a screenshot of the extension's popup on a dark background, which tells a visitor less than a *result* would (a captured page, or the tiled PDF). The "source ↗" link works (both URLs return 200). The name is lowercase "fullshot" while every other title is capitalized; intentional, I assume.

**(e) Orange Signs** is in `projects.json` with `"hidden": true` and a live site (`orange-signs.onrender.com` returns 200). It has no image and lives on an `onrender.com` domain, but "built with my brother-in-law, a record not a business" is one of the more human stories you have. Hidden on purpose, or just parked?

**Accuracy check of every project's status, stage and links:**

| Project | Stage shown | Link | Result | Notes |
|---|---|---|---|---|
| Lellow | Live · iPad / Web | lellow.app | 200 | See platform note above. |
| Highlight Zone | Live · Web / PWA | highlight.zone | 200 | |
| Watch Me | Live · Web / PWA | gowatchme.app | 200 | "iOS Coming Soon" badge confirmed gone. |
| Planfinity | Live · Web | planfinity.app | 200 | **One request timed out at 20s on my first try; five more requests returned 200 in 0.14 to 0.3s.** Probably a transient Render/Cloudflare blip, but it was a visitor-visible failure, so worth knowing. |
| fullshot | Open source · Chrome | mitchheard.github.io/fullshot/ and github.com/mitchheard/fullshot | 200 / 200 | Matches AVIDX-421. |
| Mail Zero | Retired · Web | none (`"#"`) | n/a | Correctly has no outbound link. |
| Orange Signs | hidden | orange-signs.onrender.com | 200 | Not shown. |

Other outbound links also return 200: newzip.com, rigup.com, bazaarvoice.com, your LinkedIn (which redirects to the no-trailing-slash form), and the Umami script. Memodee is correctly absent (AVIDX-224).

### 4. Career: add proof and a way to act

**Why it matters:** `/career` is the page a recruiter or founder reads to decide whether to talk to you. It's excellent writing but it has gaps:
- **No outcomes at Newzip beyond reach numbers.** "40+ financial institutions and 15,000+ agents" is scale, not result. One or two outcome lines (retention, conversion, time to match, cost per match, whatever you're allowed to share) would turn description into evidence.
- **The "commit access" claim isn't backed on this page.** The tagline and lede say you came from engineering, but Career has no engineering role and doesn't mention it. Bazaarvoice ("starting in implementation") is the only trace. One sentence connecting the engineering start to the Bazaarvoice story would pay off the tagline.
- **No next step.** The page ends after Bazaarvoice. The site has no footer at all (`site.footerLine` = "Builder of systems and things." exists in `site.ts` but is never rendered). A footer with LinkedIn, GitHub, email and the footer line would end every page properly.
- **No résumé or education.** Optional, but many recruiters look for a PDF. Your call.

**Question for you:** what's allowed and true to say about Newzip outcomes? I won't invent numbers.

### 5. Bring writing back, but build the template first

**Why it matters:** an empty Writing section is a credibility leak (AVIDX-226 says so), so hiding it was right. One good post would do more for "product leader who builds" than any design change.

**The catch:** the ticket says the `/articles/[id]` route "is ready for content". It isn't. The page renders only the `excerpt` and then prints the placeholder line *"For full article bodies, add markdown files or use a CMS and render here."* to the public. A first post would ship with that sentence under it.

**Recommendation:**
- **Template first, as its own small PR:** Markdown (or MDX) files in `src/data/articles/`, a frontmatter-driven index, real post bodies with proper typography, published date and read time, per-post title/description/OG tags (reusing #2), and an RSS feed. All static, so the Render build is unaffected.
- **Don't rewrite your voice:** keep the existing "Writing about product, systems, and building things." intro.
- **Then restore the nav link** in `nav.ts` only when the first post is live.

**What the first post should be.** AVIDX-226 offers two options: A ("The Analytics Launch Gate") and B ("Six Tickets in One Evening: Specs Are the Leverage"). Both are fine. Two thoughts:
- Option B is the one that proves "product leader with commit access" most directly: a product person shipping six things in a night because of spec quality is the tagline in action. I'd lead with B.
- Neither is on the site yet, and the ticket's details are from April 2026. If you'd rather write something fresher, the **Mail Zero story** (an LLM made the product unnecessary; wound down Aug 2026) is already on `/projects` and is the most distinctive thing you've written. It's a natural long-form post.
- Ticket AVIDX-226 is in "Stale" status; it should be closed or rewritten once this plan is approved.

---

## Content

**Is the story clear in 10 seconds?** Partly. The headline, "Product leader with commit access," lands. The proof (company, scale, what you build) arrives only after a paragraph of reflection and, on a phone, below the fold. See #1.

**Stale or vague lines:**
- **"Now" list.** Items 1 and 4 are specific and good. Items 2 and 3 are weaker:

| | Before | After (proposed) |
|---|---|---|
| Item 2 | "Building Lellow and Watch Me under AvidX" | "Getting Lellow and Watch Me ready for the App Store" |
| Item 3 | "Testing how quickly an idea can go from new repo to production" | "Seeing how fast a new repo can reach real users (latest: Highlight Zone, three evenings)" |

  Item 2 is only true until they ship, so change it the day they do. Item 3 is a method with no evidence. Both changes are proposals; the "App Store" wording assumes you're comfortable saying it publicly before launch.
- **Add a date to "Now".** A small "Updated Nov 2026" under the label makes the list read as current (a `nowUpdated` field in `site.ts`).
- **Item 1** ("Scaling a B2B2C real estate platform toward Series A") states your employer's funding plans. Confirm that's OK to publish.
- **AVIDX-225** (bio names AvidX, "Now" bullets out of date): done by the above. The bio already names AvidX; the bullets have changed since the ticket, so this ticket can close once these edits land.

**Missing from Career:** outcomes, the engineering thread, a next step (see #4).

**Missing from Projects:** an App Store slot (see #3b); a "what I learned" line on live projects (the retired one has one, and it's the best part); order by importance, not just by recency.

**Accuracy:** I could verify every link and stage. I can't verify claims like "64 coloring pages" or "61 concrete posts"; those are yours.

---

## Design and UX

**What's working:** the paper/ink/gold palette, serif display type with mono labels, the single hero reveal, the gutter-label section layout, and the retired-row treatment. It's cohesive and distinctive.

**Hierarchy**
- The hero is strong; the rest of Home is flat. "Now," "Projects" and "Elsewhere" all use the same 11px mono label with the same weight, so nothing signals which section matters. Projects is the payoff and should read that way (see the featured layout in #3c).
- On `/projects`, the mono **stack line** (3 lines of tech names on a phone) sits above the screenshot and competes with the tagline. Move it below the highlights, where engineers will look for it.

**Consistency**
- Home shows one badge per card ("LIVE", "OPEN SOURCE"); `/projects` shows "Stage · Platform". Pick one. I'd show both on Home.
- No visited-link or focus treatment beyond the browser default. The animated underline links (`a` background-size transition) are nice but only on hover.
- `/articles`, `/articles/[id]` and `/dashboard` use different, older styling (`text-3xl font-semibold`, `--foreground`, `--muted` aliases) from the rest of the site. Fine while hidden; they'll look wrong the day Writing returns. Restyle in the same PR as the article template (#5).

**Motion**
- The hero `rise` animation sets `opacity: 0` until it plays, so the first frame of Home is blank on load (I saw this in a screenshot taken straight after navigation). It's short, and `prefers-reduced-motion` is handled, so I'd keep it but make it shorter, or animate transform only, so the page never loads invisible.
- The gallery has no autoplay. Good.

**Screenshots and how projects are shown**
- Lellow is the only project with a gallery. Its filmstrip thumbnails load the **full 1200px images** (`<img src={src}>` of the same file) to display at about 77×48px. See Performance.
- Watch Me's portrait shot is cropped to a phone-shaped box. Good for iPhone; with the App Store it should also have an iPad shot.
- Alt text is generic ("Lellow screenshot 1 of 4"). Descriptive alt would help accessibility and image search. See Accessibility.

**Other:** there is no footer (see #4), the 404 is the default Next page, and no skip link.

---

## Mobile

Measured at 375×812. **No horizontal overflow** (scroll width = 375). Layout holds, and nothing breaks.

**Tap targets under 44px** (measured in the browser):

| Element | Size (px) |
|---|---|
| Hamburger menu button | 20 × 20 |
| "Mitch Heard" brand link | 103 × 32 |
| "LinkedIn" link in "Elsewhere" | 59 × 25 |
| Email link in "Elsewhere" (your main contact path on a phone) | 156 × 25 |
| "All of them" link | 63 × 18 |
| "Why it was retired" link | 113 × 20 |
| In-text "Newzip" links | 43 to 53 × 17 to 22 |

The hamburger and the contact links are the ones that matter. Give them padding to reach 44px (`min-h-11 min-w-11`, or padding around the icon).

**Nav.** The full-screen mobile menu is nicely done, but:
- the hamburger has no `aria-expanded`;
- focus isn't moved into the dialog or trapped;
- Escape doesn't close it;
- LinkedIn and email icons are hidden on mobile until you open the menu (fixed in #1).

**Layout.** The hero photo falls below the lede and sits left-aligned at 240px, which looks unintentional; the first screen has no face and no proof (see #1).

**Image sizing.** 1600px-wide JPEGs are served to a ~335px-wide column, and `mitch.jpg` is 900px for a 240px slot. No `srcset`. See Performance.

---

## Performance

Lighthouse 12.8.2, live site, default throttling. All pages score 100 on best practices and SEO.

| Page | Device | Perf | A11y | LCP | TBT | CLS | Transfer |
|---|---|---|---|---|---|---|---|
| Home | Mobile | 100 | 96 | 1.8 s | 10 ms | 0 | 893 KiB |
| Home | Desktop | 100 | 96 | 0.4 s | 0 ms | 0 | 670 KiB |
| Career | Mobile | 99 | 95 | 1.7 s | 100 ms | 0 | 398 KiB |
| Career | Desktop | 100 | 95 | 0.4 s | 0 ms | 0 | 411 KiB |
| Projects | Mobile | **84** | 97 | **4.5 s** | 10 ms | 0 | 769 KiB |
| Projects | Desktop | 99 | 97 | 0.9 s | 0 ms | 0 | 688 KiB |

**The one problem: `/projects` on mobile.** LCP is 4.5s. The LCP element is the first Lellow screenshot (`lellow.jpg`, 1600×1000). Lighthouse says the request is discoverable and not lazy, but it lacks `fetchpriority="high"`. It competes with several other images, four fonts and the Umami script. Fixes, in order of impact:
1. Add `fetchpriority="high"` to the first project image and don't let it wait on the `rise` animation.
2. Make the filmstrip thumbnails real thumbnails (~240px) instead of the full images. Lellow's strip downloads four full-size files for four 77px tiles.
3. Generate 800w and 1600w WebP (or AVIF) variants once, with a small script, and use `srcset`/`sizes`. A static export can't use Next's image optimizer, so this is a build-time or one-off step. Expected saving is roughly half the image weight.
4. Re-save `mitch.jpg` at about 480px.
5. `mitch.jpg` also shows up in `/projects`' request list in Lighthouse (about 71 KB), probably a Next prefetch/preload from the nav's link to Home. Low confidence; worth checking in the PR.

**Fonts.** Four woff2 files (about 170 KB) are preloaded: Newsreader roman and italic, Plex Sans, Plex Mono. *Correction:* I first suggested dropping the unused 500 weights to save files. The built CSS shows the 400 and 500 weights point at the same woff2 files, so that saves nothing. The only possible font saving is the Newsreader italic file, which is used just for the brand name in the nav.

**Render blocking.** Nothing blocks render. Umami loads with `strategy="beforeInteractive"` from a self-hosted Render instance (`umami-avidx.onrender.com`). It's fast now (0.33 s), but it's a single point of failure on a Render instance, and `afterInteractive` would do the same job without sitting in the critical path.

---

## SEO and sharing

See #2 for the full list and proposals. In short:

| Item | State |
|---|---|
| Titles | Identical on every page ("Mitch Heard") |
| Descriptions | Identical on every page |
| Open Graph / Twitter tags | None |
| Share image | None |
| Canonical | None; apex redirects to www, sitemap lists apex |
| Sitemap | Present; 3 URLs; `lastmod` = build time; excludes `/dashboard` and `/articles` (correct) |
| robots.txt | Missing (404) |
| Structured data | None |
| `/work` and `/bets` redirect pages | `noindex, follow` with meta-refresh to `/career` and `/projects`. Fine for a static host. Their `<title>` is also "Mitch Heard". |
| `/dashboard`, `/articles` | No `noindex` |
| 404 | Default Next page (already `noindex`; my earlier "no noindex on the 404" was wrong) |

---

## Accessibility

Lighthouse accessibility is 95 to 97; the only failing audit is **color contrast**. I checked each offender's real ratio against the paper background `#f4efe6` (4.5:1 needed for small text):

| Token / use | Now | Ratio | Proposed | Ratio |
|---|---|---|---|---|
| `--sand` `#8a7d64` (mono labels, section notes, stack line, row labels, retired text) | fails | 3.53 | `#6f6450` | 5.07 |
| `--sand-2` `#b0a386` (index numbers, "Retired" stage) | fails badly | 2.18 | use the new `--sand` | 5.07 |
| `--live` `#2f7d4f` (LIVE badges) | just fails | 4.40 | `#26683f` | 5.85 |
| `--gold` `#9a7a3a` (links) | fails | 3.51 | `#85672c` | 4.61 |
| Retired card at `opacity: 0.7` (title, tagline, rows) | fails | 1.7 to 4.3 | drop the opacity; color the text instead | n/a |

`--ink-3` (6.43) and `--gold-dark` (6.05) already pass. Darkening the sand and gold tokens in one place (`globals.css`) fixes almost everything. I'd keep the look by changing values, not structure.

Other findings:
- **Gallery:** the filmstrip uses `role="tablist"` / `role="tab"` but there is no `tabpanel` and no arrow-key navigation, so it announces as a tab widget that doesn't behave like one. Either make it a proper tabs pattern or a plain list of buttons with `aria-pressed`.
- **Mobile menu dialog:** no focus trap, no Escape to close, hamburger lacks `aria-expanded` (see Mobile).
- **Alt text:** generic ("Lellow screenshot"). Describe what's shown.
- **Headings:** Home goes h1 → h2 (Now, Projects, Elsewhere), which is correct. `/projects` is h1 → h2 per project. Fine.
- **"Now" list:** it's a set of `div`s, not a list. Use `ul`/`li`.
- **No skip link.** Minor with this little nav.
- **Reduced motion:** handled for `rise`, the gallery and hover transitions. Good.
- **Focus:** default browser focus rings remain (nothing removes them), but the site's own styling doesn't make them visible or consistent. Add a global `:focus-visible` style in gold.
- **Language / landmarks:** `lang="en"`, `<main>`, `<nav aria-label>` all present.

---

## Analytics (Umami)

From code only (I can't see the dashboard).

**What's tracked:** pageviews (auto, plus a manual route listener), `project_link_clicked` (with `project_id`), `linkedin_clicked` and `email_clicked` from the nav, `article_clicked` (unused until there are articles).

**Gaps relative to what you'd want to learn:**
- The **"Elsewhere" LinkedIn and email links on Home aren't tracked**; only the nav copies are. So you undercount your most important conversions.
- **Newzip links** (hero, Career company names) aren't tracked.
- **Home project cards** (internal links) aren't tracked, so you can't tell whether people click through from the home grid or go straight to `/projects`.
- **Gallery thumbnail clicks** and **scroll depth** aren't tracked, so you can't tell if anyone reads past the first screenshot on `/projects`.
- `fullshot`'s source link is sent as `project_id: "fullshot-source"`, mixing project and link type in one property. A separate `link_type` property would be cleaner.
- **Possible double-counted pageviews.** `UmamiPageviewRouteListener` sends a pageview on every client route change. Umami's tracker already hooks `history.pushState` by default, so each navigation may be counted twice. Check in Umami: if `/career` views are roughly double the number of Home→Career clicks, that's it. If so, remove the listener or set `data-auto-track="false"`.
- **No `data-domains`**, so local dev and preview deploys count as visits.
- **`/dashboard` is tracked.** Your own homepage visits (it's your Chrome new-tab page) are being counted as site traffic. Exclude it.

**Proposal:** one `trackOutbound(name, props)` helper; track the missing links; add `link_type`; add `data-domains="www.mitchheard.com"` and exclude `/dashboard`.

---

## `/dashboard`: anything that shouldn't be public?

The route is static and public. It returns 200 on the live site, has no `noindex`, and is not linked. Right now it contains only Gmail, Calendar, GitHub and the repo URL, plus a note and the path `src/data/links.json`. **Nothing there is secret**, and the repo itself is public (`visibility: PUBLIC`, so `links.json` is already readable on GitHub).

Still:
- **Anything you add to `links.json` becomes public** on both the live site and the repo. The page itself says "Quick links and personal info." A static export has no way to hide data.
- No `noindex`, so a search engine that discovers the URL could index it.
- It loads the Umami script (see Analytics).
- `robots.txt` Disallow wouldn't protect it either (it would advertise the path).

**Recommendation:** at minimum add `noindex` and exclude it from tracking. Better: stop shipping it in the public export altogether (keep it as a local-only route or a separate private page), or put it behind Cloudflare Access since the site already sits behind Cloudflare. **Your call** on which.

---

## Code health notes

- **`npm run lint` fails on `main`:** `TopNav.tsx:54`, "Calling setState synchronously within an effect" (`react-hooks/set-state-in-effect`). The build passes. Easy fix (close the menu from the link `onClick`, which is already there, or key the component on the pathname). **This must be fixed first** since Step 2 requires lint to pass.
- **Dead code:** `src/components/Sidebar.tsx` (unused, references CSS variables that no longer exist), `site.footerLine`, the `badge-coming` CSS class.
- **`out/` and `.next/`** are git-ignored. Good.

---

## Proposed PR split

Small, one area each, in this order. Each is a draft PR against `main`, keeps content in `src/data/`, keeps the static export and Render build working, and runs build and lint first. Copy changes are marked as proposals.

| # | PR | Contents | Size |
|---|---|---|---|
| 0 | **Fix lint** | `TopNav.tsx` setState-in-effect; delete dead `Sidebar.tsx` | XS |
| 1 | **SEO and sharing** | Per-page titles/descriptions, OG/Twitter, canonical + `metadataBase` + `NEXT_PUBLIC_SITE_URL` decision, share image, `robots.txt`, JSON-LD, sitemap `lastmod` fix, `noindex` on `/dashboard` / `/articles` / 404 | S |
| 2 | **Home hero and proof** | New first line, remove repeats, GitHub link in nav/menu/Elsewhere, footer, "Now" copy + "Updated" date, mobile photo position | S |
| 3 | **Contrast and accessibility** | New `--sand` / `--gold` / `--live` values, remove retired-card opacity, `:focus-visible`, mobile menu focus/Escape/`aria-expanded`, gallery semantics, `ul` for "Now", alt text, tap-target padding | S |
| 4 | **Image weight and `/projects` LCP** | `fetchpriority` on first image, real thumbnails, `srcset` + WebP variants (small build script), resize `mitch.jpg`, trim unused font weights, `afterInteractive` Umami | M |
| 5 | **Projects: copy and App Store readiness** | Copy edits (proposals, each flagged), `appStoreUrl` + `status` fields and badge, mixed-aspect gallery, featured layout on Home, move stack line, Orange Signs decision, fullshot image | M |
| 6 | **Career proof** | Outcome lines, engineering thread, optional résumé link | XS (copy depends on you) |
| 7 | **Analytics** | Track Elsewhere/Newzip/home-card/gallery clicks, `link_type`, `data-domains`, dashboard exclusion, double-pageview fix if confirmed | S |
| 8 | **Article template** | Markdown posts, index, post page, RSS, per-post meta, restyle `/articles` to match the site, restore nav link only with the first post | M |
| 9 | **First article** | Content only, written by you (not me) | n/a |
| 10 | **Dashboard** | Remove from public export or put behind Cloudflare Access, per your choice | XS |

Dependencies: PR 0 first. PR 1 before 8 (reuses the metadata helpers). PR 2 and 5 touch the same Home grid, so land 2 first. PR 3 before screenshots in other PRs so before/after images show final colors.

**After your OK, I'd also:** add one sub-ticket per PR to AVIDX-406, close AVIDX-225 (done by PR 2) and AVIDX-226 (replaced by PRs 8 and 9). AVIDX-224 is already canceled and AVIDX-421 is done. I haven't touched Linear.

---

## Questions I need answered before building

1. **Hero:** OK to put "40+ financial institutions and 15,000+ agents" on Home? Any Newzip outcomes you can share for Career?
2. **"Now" item 1:** OK to keep "toward Series A" public?
3. **Canonical host:** `www` or the apex?
4. **Highlight Zone:** soften the "bends a rule" line, cut it, or keep it as written?
5. **Orange Signs:** unhide (needs a screenshot) or keep parked?
6. **fullshot:** an AvidX product, or a personal side project? (Affects the Projects intro copy.)
7. **`/dashboard`:** remove from the public site, put behind Cloudflare Access, or just `noindex`?
8. **First article:** A, B, or the Mail Zero story?
9. **App Store:** are you comfortable with "Getting Lellow and Watch Me ready for the App Store" in "Now" before they ship, or should that wait until there's a link?

---

*Stopping here per the ticket. Tell me which PRs to build, in what order, and your answers to the questions above, and I'll start with PR 0.*
