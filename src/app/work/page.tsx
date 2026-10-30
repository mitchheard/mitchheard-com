import type { Metadata } from "next";
import Link from "next/link";

/* /work moved to /career. Static export can't issue a 301, so this page meta-refreshes. */
export const metadata: Metadata = { title: "Mitch Heard", robots: { index: false, follow: true } };

export default function Redirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/career" />
      <p className="text-sm text-[var(--ink-3)]">This page moved to <Link href="/career">/career</Link>.</p>
    </>
  );
}
