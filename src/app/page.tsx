import Link from "next/link";
import { seo, site } from "@/data/site";
import { HEADSHOT_WIDTHS, ResponsiveImage } from "@/components/ResponsiveImage";
import { TrackedLink } from "@/components/TrackedLink";
import { pageMetadata } from "@/lib/seo";
import projectsData from "@/data/projects.json";

export const metadata = pageMetadata("/", { ...seo.home, absoluteTitle: true });

/* Structured data for search engines: who this site is about. Only facts already on the page. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}${site.photo}`,
      jobTitle: "Chief Product Officer",
      worksFor: { "@type": "Organization", name: "Newzip", url: "https://newzip.com" },
      homeLocation: { "@type": "Place", name: site.location },
      sameAs: [site.linkedin, site.github],
    },
  ],
};

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  imageShape?: "portrait";
  hidden?: boolean;
  featured?: boolean;
  badges?: { stage: string; platform: string }[];
  theBet?: string;
};

const isRetired = (p: Project) => p.badges?.some((b) => b.stage.toLowerCase() === "retired") ?? false;

/* Home reads from projects.json so it can't drift from /projects.
   Live projects get a card; retired ones drop to a single row underneath. */
const projects = (projectsData as Project[]).filter((p) => !p.hidden);
const live = projects.filter((p) => !isRetired(p));
const retired = projects.filter(isRetired);
/* Flagged projects get a large card; the rest become compact rows. */
const featured = live.filter((p) => p.featured);
const others = live.filter((p) => !p.featured);

const badgeText = (p: Project) => (p.badges?.[0] ? `${p.badges[0].stage} · ${p.badges[0].platform}` : null);

function stageClass(stage: string) {
  return `stage stage-${stage.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function HomePage() {
  return (
    <article className="flex flex-col gap-14 md:gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* Hero */}
      <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
        <div className={`flex flex-col gap-5 ${site.photo ? "md:col-span-8" : "md:col-span-10"}`}>
          <h1 className="hero-title rise" style={{ "--i": 0 } as React.CSSProperties}>
            Product leader
            <br />
            with <span className="hero-code">commit</span> access.
          </h1>
          <p className="hero-lede rise" style={{ "--i": 1 } as React.CSSProperties}>
            I&apos;m CPO at <TrackedLink href="https://newzip.com" event="company_link_clicked" data={{ company: "newzip", location: "hero" }}>Newzip</TrackedLink>, where we run real estate programs for 40+ financial institutions and 15,000+ agents. Nights and weekends I run AvidX, a studio that ships small software bets.
          </p>
          <p className="hero-sub rise" style={{ "--i": 2 } as React.CSSProperties}>
            I left engineering for product when I noticed the mistakes that hurt most were made before anyone wrote a line of code. I keep ending up in the messiest version of that: one product that has to hold together several kinds of users with conflicting incentives.
          </p>
          <div className="meta hero-links rise flex flex-wrap items-center gap-x-4 gap-y-3" style={{ "--i": 3 } as React.CSSProperties}>
            <span>{site.location}</span>
            <span aria-hidden>·</span>
            <TrackedLink href={site.linkedin} event="linkedin_clicked" data={{ location: "hero" }}>LinkedIn</TrackedLink>
            <span aria-hidden>·</span>
            <TrackedLink href={site.github} event="github_clicked" data={{ location: "hero" }}>GitHub</TrackedLink>
            <span aria-hidden>·</span>
            <TrackedLink href={`mailto:${site.email}`} event="email_clicked" data={{ location: "hero" }}>Email</TrackedLink>
          </div>
        </div>
        {site.photo ? (
          <div className="md:col-span-4 md:flex md:justify-end">
            <ResponsiveImage
              src={site.photo}
              alt={site.name}
              widths={HEADSHOT_WIDTHS}
              sizes="240px"
              className="hero-photo rise"
              style={{ "--i": 1 } as React.CSSProperties}
              width={240}
              height={240}
              loading="eager"
            />
          </div>
        ) : null}
      </header>

      {/* Now */}
      {site.currentFocus.length > 0 && (
        <section className="section">
          <div>
            <h2 className="label">Now</h2>
            {site.nowUpdated ? <p className="section-note">{site.nowUpdated}</p> : null}
          </div>
          <ol className="flex flex-col">
            {site.currentFocus.map((item, i) => (
              <li key={item} className="now-row">
                <span className="now-index" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Work */}
      <section className="section">
        <div>
          <h2 className="label">Projects</h2>
          <p className="section-note">Small software I&rsquo;ve built, most of it under AvidX. <Link href="/projects">All of them</Link></p>
        </div>
        <div className="flex flex-col gap-7">
          <div className="work-featured">
            {featured.map((p) => (
              <TrackedLink
                key={p.id}
                internal
                href={`/projects#${p.id}`}
                event="home_project_clicked"
                data={{ project_id: p.id }}
                className={`work-card${p.image ? " has-shot" : ""}`}
              >
                {p.image ? (
                  <ResponsiveImage
                    src={p.image}
                    alt={p.imageAlt ?? `${p.title} screenshot`}
                    sizes="(min-width: 640px) 300px, calc(100vw - 40px)"
                    className={`work-shot${p.imageShape === "portrait" ? " work-shot-portrait" : ""}`}
                    loading="lazy"
                  />
                ) : null}
                <div className="work-card-head">
                  <span className="work-card-title">{p.title}</span>
                  {badgeText(p) && <span className={stageClass(p.badges![0].stage)}>{badgeText(p)}</span>}
                </div>
                <div className="work-card-desc">{p.description}</div>
              </TrackedLink>
            ))}
          </div>
          <div className="work-rows">
            {others.map((p) => (
              <TrackedLink
                key={p.id}
                internal
                href={`/projects#${p.id}`}
                event="home_project_clicked"
                data={{ project_id: p.id }}
                className="work-row"
              >
                <span className="work-row-title">{p.title}</span>
                <span className="work-row-desc">{p.description}</span>
                {badgeText(p) && <span className={stageClass(p.badges![0].stage)}>{badgeText(p)}</span>}
              </TrackedLink>
            ))}
          </div>
          {retired.map((p) => (
            <div key={p.id} className="retired-row">
              <span className="retired-title">{p.title}</span>
              <span className="retired-desc">
                {p.description}. <TrackedLink internal href={`/projects#${p.id}`} event="home_project_clicked" data={{ project_id: p.id }}>Why it was retired</TrackedLink>
              </span>
              <span className="stage stage-retired">Retired</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
