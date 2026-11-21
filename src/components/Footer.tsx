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
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <p className="footer-line">{site.footerLine}</p>
        </div>
      </div>
    </footer>
  );
}
