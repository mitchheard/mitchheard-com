"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { publicNav } from "@/data/nav";
import { site } from "@/data/site";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] md:hidden"
        aria-label="Toggle menu"
        onClick={() => setMobileOpen((o) => !o)}
      >
        <span className={`h-0.5 w-5 bg-current transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-5 bg-current transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Overlay when mobile menu open */}
      <div
        className={`fixed inset-0 z-30 bg-black/20 md:hidden ${mobileOpen ? "block" : "hidden"}`}
        aria-hidden
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-56 border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-0.5 p-6 pt-20 md:pt-6">
          <Link
            href="/"
            className="mb-5 text-base font-semibold text-[var(--foreground)] no-underline transition-colors hover:text-[var(--accent)]"
            onClick={() => setMobileOpen(false)}
          >
            {site.name}
          </Link>
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2.5 text-sm text-[var(--muted)] no-underline transition-colors duration-150 hover:text-[var(--foreground)] hover:underline ${
                pathname === item.href ? "font-medium text-[var(--foreground)]" : ""
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {isDashboard && (
            <Link
              href="/dashboard"
              className="block py-2.5 text-sm font-medium text-[var(--foreground)] no-underline transition-colors hover:underline"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          )}
        </nav>
      </aside>
    </>
  );
}
