export const site = {
  name: "Mitch Heard",
  tagline: "Product leader. Builder of small bets.",
  location: "Austin, TX",
  footerLine: "Builder of systems and things.",
  linkedin: "https://www.linkedin.com/in/mitchheard/",
  email: "hello@mitchheard.com",
  /** Optional headshot. Drop a file at public/mitch.jpg and set this to "/mitch.jpg". */
  photo: "" as string,
  /** "What I'm focused on now" — keeps the site feeling alive. Edit here. */
  currentFocus: [
    "CPO at Newzip",
    "Scaling B2B2C platform toward Series A",
    "Building Lellow and Watch Me under AvidX",
    "Testing how fast an idea can go from an empty repo to production",
    "Cargo e-bike dad in Austin",
  ],
} as const;
