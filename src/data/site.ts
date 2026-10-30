export const site = {
  name: "Mitch Heard",
  tagline: "Product leader with commit access.",
  location: "Austin, TX",
  footerLine: "Builder of systems and things.",
  linkedin: "https://www.linkedin.com/in/mitchheard/",
  email: "hello@mitchheard.com",
  /** Optional portrait, 4:5. Drop a file at public/mitch.jpg and set this to "/mitch.jpg". */
  photo: "/mitch.jpg" as string,
  /** "Now" list on the home page. Keeps the site feeling alive. Edit here. */
  currentFocus: [
    "Scaling a B2B2C real estate platform toward Series A",
    "Building Lellow and Watch Me under AvidX",
    "Testing how fast an idea can go from an empty repo to production",
    "Cargo e-bike dad in Austin",
  ],
} as const;
