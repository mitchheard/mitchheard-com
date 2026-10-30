import type { Metadata } from "next";
import Link from "next/link";

/* /bets moved to /projects. Static export can't issue a 301, so this page meta-refreshes. */
export const metadata: Metadata = { title: "Mitch Heard", robots: { index: false, follow: true } };

export default function Redirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/projects" />
      <p className="text-sm text-[var(--ink-3)]">This page moved to <Link href="/projects">/projects</Link>.</p>
    </>
  );
}
