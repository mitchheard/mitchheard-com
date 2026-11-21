import { TrackedLink } from "@/components/TrackedLink";
import { site } from "@/data/site";

/* Site-wide footer: the contact links on every page (they used to live only on Home), plus the
   one-line sign-off from site.ts. */
export function Footer() {
  return (
    <footer className="site-container pb-16 md:pb-24">
      <div className="section">
        <p className="label">Elsewhere</p>
        <div>
          <div className="elsewhere">
            <TrackedLink href={site.linkedin} event="linkedin_clicked" data={{ location: "footer" }}>LinkedIn</TrackedLink>
            <TrackedLink href={site.github} event="github_clicked" data={{ location: "footer" }}>GitHub</TrackedLink>
            <TrackedLink href={`mailto:${site.email}`} event="email_clicked" data={{ location: "footer" }}>{site.email}</TrackedLink>
          </div>
          <p className="footer-line">{site.footerLine}</p>
        </div>
      </div>
    </footer>
  );
}
