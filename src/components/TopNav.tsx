"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNav } from "@/data/nav";
import { site } from "@/data/site";

const iconClass = "h-3 w-3 text-[var(--nav-text)] transition-colors hover:text-[var(--accent)]";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function TopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="border-b border-[var(--border)] border-opacity-60">
      <nav
        className="mx-auto flex max-w-[45rem] flex-nowrap items-center justify-between px-6 py-4 md:px-10 md:py-5"
        aria-label="Main"
      >
        {/* Site name — warm gold per reference */}
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap font-sans text-sm font-semibold no-underline transition-colors hover:opacity-90"
          style={{ color: '#c9a55a' }}
        >
          {site.name}
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <ul className="hidden items-baseline gap-x-0.5 text-sm text-[var(--nav-text)] md:flex">
          {publicNav.map((item, i) => (
            <li key={item.href} className="flex items-baseline">
              {i > 0 && <span className="px-0.5 text-[var(--muted-soft)]">&middot;</span>}
              <Link
                href={item.href}
                className={`font-medium no-underline transition-colors hover:text-[var(--foreground)] ${
                  pathname === item.href ? "text-[var(--foreground)]" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex items-baseline">
            <span className="px-0.5 text-[var(--muted-soft)]">&middot;</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline text-[var(--nav-text)] transition-colors hover:text-[var(--accent)]"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className={iconClass} />
            </a>
          </li>
          <li className="flex items-baseline">
            <span className="px-0.5 text-[var(--muted-soft)]">&middot;</span>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-baseline text-[var(--nav-text)] transition-colors hover:text-[var(--accent)]"
              aria-label="Email"
            >
              <EmailIcon className={iconClass} />
            </a>
          </li>
        </ul>

        {/* Mobile hamburger button — hidden on desktop */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <HamburgerIcon className="h-5 w-5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]" />
        </button>
      </nav>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 z-50 flex flex-col items-stretch bg-[var(--background)] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Overlay top bar — close only; brand is in main nav */}
          <div className="flex flex-shrink-0 items-center justify-end px-6 py-4">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center"
            >
              <CloseIcon className="h-5 w-5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]" />
            </button>
          </div>

          {/* Menu content — top-aligned, consistent padding below close button */}
          <div className="flex flex-shrink-0 flex-col px-6 pt-2 pb-24">
            <ul className="space-y-2">
              {publicNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block font-sans text-[26px] font-semibold leading-none no-underline transition-colors hover:text-[var(--accent)] tracking-[-0.01em] ${
                      pathname === item.href
                        ? "text-[var(--foreground)]"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-4 h-px w-12 bg-[var(--border)]" />

            {/* Social links — subordinate */}
            <ul className="space-y-2 text-base" style={{ color: "#4a6580" }}>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-medium no-underline transition-colors hover:text-[var(--accent)]"
                  style={{ color: "inherit" }}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="font-sans font-medium no-underline transition-colors hover:text-[var(--accent)]"
                  style={{ color: "inherit" }}
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
