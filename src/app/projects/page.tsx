import type { Metadata } from "next";
import Link from "next/link";

/* /projects moved to /bets. Static export can't issue a 301, so this page
   meta-refreshes; the link is the fallback for anything that blocks it. */
export const metadata: Metadata = {
  title: "Mitch Heard",
  robots: { index: false, follow: true },
};

export default function ProjectsRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/bets" />
      <p className="text-sm text-[var(--ink-3)]">
        This page moved to <Link href="/bets">/bets</Link>.
      </p>
    </>
  );
}
