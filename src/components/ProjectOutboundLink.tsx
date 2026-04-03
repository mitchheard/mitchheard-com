"use client";

import { trackUmamiEvent } from "@/lib/umami-bootstrap";

type Props = {
  href: string;
  projectId: string;
  className?: string;
  children: React.ReactNode;
};

export function ProjectOutboundLink({ href, projectId, className, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackUmamiEvent("project_link_clicked", { project_id: projectId })
      }
    >
      {children}
    </a>
  );
}
