"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNav } from "@/data/nav";
import { site } from "@/data/site";
import { trackUmamiEvent } from "@/lib/umami-bootstrap";

const iconClass = "h-3.5 w-3.5";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
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
  const [menuPathname, setMenuPathname] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close menu on route change. Adjusting state during render (React's
  // documented pattern) instead of in an effect avoids a cascading re-render.
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

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

  // Dialog keyboard behavior: move focus in, trap Tab, close on Escape, and hand focus
  // back to the hamburger button when the menu closes.
  useEffect(() => {
    if (!menuOpen) return;
    const opener = menuButtonRef.current;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [menuOpen]);

  return (
    <header>
      <nav
        className="site-container flex items-baseline justify-between border-b border-[var(--ink)] pb-3.5 pt-8 md:pt-12"
        aria-label="Main"
      >
        {/* py + matching -my enlarges the tap area to 44px without moving the layout */}
        <Link href="/" className="nav-brand shrink-0 whitespace-nowrap py-1.5 -my-1.5">
          {site.name}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-baseline gap-x-7 md:flex">
          {publicNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${pathname === item.href ? "nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex items-baseline gap-x-4 pl-1">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon inline-flex"
              aria-label="LinkedIn"
              onClick={() => trackUmamiEvent("linkedin_clicked", { location: "nav" })}
            >
              <LinkedInIcon className={iconClass} />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon inline-flex"
              aria-label="GitHub"
              onClick={() => trackUmamiEvent("github_clicked", { location: "nav" })}
            >
              <GitHubIcon className={iconClass} />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="nav-icon inline-flex"
              aria-label="Email"
              onClick={() => trackUmamiEvent("email_clicked", { location: "nav" })}
            >
              <EmailIcon className={iconClass} />
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          ref={menuButtonRef}
          className="-my-3 -mr-3 flex h-11 w-11 items-center justify-center self-center md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="dialog"
        >
          <HamburgerIcon className="h-5 w-5 text-[var(--ink-3)] transition-colors hover:text-[var(--ink)]" />
        </button>
      </nav>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={dialogRef}
          className="mobile-menu-overlay fixed inset-0 z-50 flex flex-col items-stretch bg-[var(--paper)] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="site-container flex flex-shrink-0 items-baseline justify-between border-b border-[var(--ink)] pb-3.5 pt-8">
            <span className="nav-brand">{site.name}</span>
            <button ref={closeButtonRef} onClick={() => setMenuOpen(false)} aria-label="Close menu" className="-my-3 -mr-3 flex h-11 w-11 items-center justify-center self-center">
              <CloseIcon className="h-5 w-5 text-[var(--ink-3)] transition-colors hover:text-[var(--ink)]" />
            </button>
          </div>

          <div className="site-container flex flex-shrink-0 flex-col pb-24 pt-10">
            <ul className="space-y-4">
              {publicNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`mobile-nav-link block leading-none ${pathname === item.href ? "mobile-nav-link-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-8 h-px w-12 bg-[var(--rule)]" />

            <ul className="meta space-y-6">
              <li>
                <a
                  className="tap"
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackUmamiEvent("linkedin_clicked", { location: "menu" })}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="tap"
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackUmamiEvent("github_clicked", { location: "menu" })}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a className="tap" href={`mailto:${site.email}`} onClick={() => trackUmamiEvent("email_clicked", { location: "menu" })}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
