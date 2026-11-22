import localFont from "next/font/local";

// Fonts are bundled from ./fonts (latin subset, from @fontsource) instead of
// next/font/google, so `next build` never downloads from Google Fonts. That
// download failed intermittently on Render and broke deploys. All three
// families are under the SIL Open Font License (see the OFL files in ./fonts).

export const newsreader = localFont({
  variable: "--font-newsreader",
  src: [
    { path: "./fonts/newsreader-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/newsreader-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/newsreader-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/newsreader-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const plexSans = localFont({
  variable: "--font-plex-sans",
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
});

export const plexMono = localFont({
  variable: "--font-plex-mono",
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
  ],
  display: "swap",
});
