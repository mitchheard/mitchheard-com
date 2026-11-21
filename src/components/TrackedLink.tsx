"use client";

import Link from "next/link";
import { trackUmamiEvent, type UmamiTicketEvent } from "@/lib/umami-bootstrap";

type Props = {
  href: string;
  /** Umami event to send on click. */
  event: UmamiTicketEvent;
  /** Event properties (strings, numbers, booleans). */
  data?: Record<string, string | number | boolean>;
  /** Use next/link for same-site navigation. Anything else renders a plain <a>. */
  internal?: boolean;
  className?: string;
  children: React.ReactNode;
};

/* A link that reports a click to Umami. Server components can't pass an onClick, so pages that
   render links on the server use this instead of a bare <a>. http(s) links open in a new tab. */
export function TrackedLink({ href, event, data, internal, className, children }: Props) {
  const onClick = () => trackUmamiEvent(event, data);

  if (internal) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
