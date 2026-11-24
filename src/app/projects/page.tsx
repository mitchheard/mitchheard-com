import { ProjectGallery } from "@/components/ProjectGallery";
import { TrackedLink } from "@/components/TrackedLink";
import projectsData from "@/data/projects.json";
import { seo } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/projects", seo.projects);

type Badge = { stage: string; platform: string };

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  sourceUrl?: string;
  /** Apple App Store listing. Rendered next to the site link once it exists. */
  appStoreUrl?: string;
  /** Quiet status line with no date, e.g. "Coming to the App Store". Never promise a date. */
  status?: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  imageShape?: "portrait";
  gallery?: string[];
  galleryAlts?: string[];
  /** Shape of [image, ...gallery], same order. Missing = landscape. */
  galleryShapes?: ("portrait" | "landscape")[];
  hidden?: boolean;
  stack?: string;
  highlights?: string[];
  badges?: Badge[];
  problem?: string;
  strategy?: string;
  theBet?: string;
};

function badgeClass(stage: string): string {
  const s = stage.toLowerCase();
  if (s === "live") return "badge-live";
  if (s === "coming soon") return "badge-coming";
  if (s === "retired") return "badge-retired";
  return "badge-concept";
}

const isRetired = (p: Project) => p.badges?.some((b) => b.stage.toLowerCase() === "retired") ?? false;

export default function ProjectsPage() {
  const projects = (projectsData as Project[]).filter((p) => !p.hidden);

  return (
    <article>
      <header className="mb-12 md:mb-16">
        <h1 className="project-page-title">Projects</h1>
        <p className="project-page-sub">
          Small software I&rsquo;ve built, most of it under AvidX. Build fast, validate with real people, keep what works. Live ones first; the retired one stays because the reason it died is the useful part.
        </p>
      </header>

      <ul className="project-list">
        {projects.map((p, i) => {
          const retired = isRetired(p);
          return (
            <li key={p.id} id={p.id} className="scroll-mt-10">
              <div className={`project-card${retired ? " project-card-retired" : ""}`}>
                <div className="project-card-header">
                  <h2 className="project-card-title">
                    {p.url && p.url !== "#" ? (
                      <TrackedLink href={p.url} event="project_link_clicked" data={{ project_id: p.id, link_type: "site" }}>
                        {p.title}
                      </TrackedLink>
                    ) : (
                      p.title
                    )}
                  </h2>
                  {p.badges?.length || p.status ? (
                    <div className="project-card-tags">
                      {p.badges?.map((b, i) => (
                        <span key={i} className={`project-badge ${badgeClass(b.stage)}`}>
                          {b.stage} · {b.platform}
                        </span>
                      ))}
                      {p.status ? <span className="project-badge badge-coming">{p.status}</span> : null}
                    </div>
                  ) : null}
                </div>
                <p className="project-card-tagline">{p.description}</p>
                <div className="project-meta">
                  <span className="project-links">
                    {p.url && p.url !== "#" ? (
                      <TrackedLink href={p.url} event="project_link_clicked" data={{ project_id: p.id, link_type: "site" }} className="project-visit">
                        {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                      </TrackedLink>
                    ) : null}
                    {p.appStoreUrl ? (
                      <TrackedLink href={p.appStoreUrl} event="project_link_clicked" data={{ project_id: p.id, link_type: "app_store" }} className="project-visit">
                        App Store ↗
                      </TrackedLink>
                    ) : null}
                    {p.sourceUrl ? (
                      <TrackedLink href={p.sourceUrl} event="project_link_clicked" data={{ project_id: p.id, link_type: "source" }} className="project-visit">
                        source ↗
                      </TrackedLink>
                    ) : null}
                  </span>
                </div>

                {p.image ? (
                  <ProjectGallery
                    projectId={p.id}
                    title={p.title}
                    images={[p.image, ...(p.gallery ?? [])]}
                    alts={[p.imageAlt ?? "", ...(p.galleryAlts ?? [])]}
                    portrait={p.imageShape === "portrait"}
                    shapes={p.galleryShapes}
                    priority={i === 0}
                  />
                ) : null}

                {p.highlights?.length ? (
                  <ul className="project-highlights">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}

                {p.stack ? <p className="project-stack project-stack-below">{p.stack}</p> : null}

                {(p.problem ?? p.strategy ?? p.theBet) && (
                  <dl className="project-rows">
                    {p.problem && (
                      <div className="project-row">
                        <dt className="project-row-label">Problem</dt>
                        <dd className="project-row-val">{p.problem}</dd>
                      </div>
                    )}
                    {p.strategy && (
                      <div className="project-row">
                        <dt className="project-row-label">{retired ? "What it did" : "Strategy"}</dt>
                        <dd className="project-row-val">{p.strategy}</dd>
                      </div>
                    )}
                    {p.theBet && (
                      <div className="project-row">
                        <dt className="project-row-label">{retired ? "What happened" : "The bet"}</dt>
                        <dd className="project-row-val">{p.theBet}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>
            </li>
          );
        })}
      </ul>

    </article>
  );
}
