export const publicNav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/bets", label: "Bets" },
] as const;

// Writing is hidden until there's a first post: add { href: "/articles", label: "Writing" } back here.
// Dashboard is intentionally not in public nav. Bookmark /dashboard for personal use.
