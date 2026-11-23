export const site = {
  name: "Mitch Heard",
  tagline: "Product leader with commit access.",
  location: "Austin, TX",
  footerLine: "Builder of systems and things.",
  /** Canonical origin, no trailing slash. mitchheard.com 301s to www, so www is canonical. */
  url: "https://www.mitchheard.com",
  linkedin: "https://www.linkedin.com/in/mitchheard/",
  github: "https://github.com/mitchheard",
  email: "hello@mitchheard.com",
  /** Optional portrait, square. Drop a file at public/mitch.jpg and set this to "/mitch.jpg". */
  photo: "/mitch.jpg" as string,
  /** "Now" list on the home page. Keeps the site feeling alive. Edit here. */
  currentFocus: [
    "Scaling a B2B2C real estate platform toward Series A",
    "Getting Lellow and Watch Me ready for the App Store",
    "Seeing how fast a new repo can reach real users (Highlight Zone took three evenings)",
    "Cargo e-bike dad",
  ],
  /** Shown under the "Now" label so the list reads as current. Update it when you edit the list. */
  nowUpdated: "Updated Nov 2026",
} as const;

/** Link-preview card (LinkedIn, iMessage, Slack, X): 1200x630 at public/og.png. */
export const shareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Mitch Heard: Product leader with commit access. CPO at Newzip, founder of AvidX, Austin, TX.",
} as const;

/** Search and share copy per page: the <title>, meta description, and link-preview text.
 *  `title` for the home page is the whole title; for other pages the site name is added
 *  after it ("Career · Mitch Heard"). */
export const seo = {
  home: {
    title: "Mitch Heard: Product leader with commit access",
    description: "Mitch Heard. CPO at Newzip, builder of small software bets under AvidX. Austin, TX.",
  },
  career: {
    title: "Career",
    description:
      "Newzip, RigUp, Bazaarvoice: products that sit between people who need each other and want different things.",
  },
  projects: {
    title: "Projects",
    description:
      "Small software bets under AvidX: what each one is, the bet behind it, and what happened.",
  },
  articles: {
    title: "Writing",
    description: "Writing about product, systems, and building things.",
  },
} as const;
