import { ProjectOutboundLink } from "@/components/ProjectOutboundLink";
import projectsData from "@/data/projects.json";

type Badge = { stage: string; platform: string };

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  imageShape?: "portrait";
  gallery?: string[];
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
          Small software products under AvidX. Build fast, validate with real people, keep what works. Live ones first; the retired one stays because the reason it died is the useful part.
        </p>
      </header>

      <ul className="project-list">
        {projects.map((p) => {
          const retired = isRetired(p);
          return (
            <li key={p.id} id={p.id} className="scroll-mt-10">
              <div className={`project-card${retired ? " project-card-retired" : ""}`}>
                <div className="project-card-header">
                  <h2 className="project-card-title">
                    {p.url && p.url !== "#" ? (
                      <ProjectOutboundLink href={p.url} projectId={p.id}>
                        {p.title}
                      </ProjectOutboundLink>
                    ) : (
                      p.title
                    )}
                  </h2>
                  {p.badges?.length ? (
                    <div className="project-card-tags">
                      {p.badges.map((b, i) => (
                        <span key={i} className={`project-badge ${badgeClass(b.stage)}`}>
                          {b.stage} · {b.platform}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <p className="project-card-tagline">{p.description}</p>
                <div className="project-meta">
                  {p.stack ? <span className="project-stack">{p.stack}</span> : <span />}
                  {p.url && p.url !== "#" ? (
                    <ProjectOutboundLink href={p.url} projectId={p.id} className="project-visit">
                      {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                    </ProjectOutboundLink>
                  ) : null}
                </div>

                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={`${p.title} screenshot`} className={`project-shot${p.imageShape === "portrait" ? " project-shot-portrait" : ""}`} loading="lazy" />
                ) : null}
                {p.gallery?.length ? (
                  <div className="project-gallery">
                    {p.gallery.slice(0, 3).map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={src} alt={`${p.title} screenshot ${i + 2}`} className="project-gallery-shot" loading="lazy" />
                    ))}
                  </div>
                ) : null}

                {p.highlights?.length ? (
                  <ul className="project-highlights">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : null}

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
