import { ProjectOutboundLink } from "@/components/ProjectOutboundLink";
import projectsData from "@/data/projects.json";

type Badge = { stage: string; platform: string };

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  badges?: Badge[];
  problem?: string;
  strategy?: string;
  theBet?: string;
};

function badgeClass(stage: string): string {
  const s = stage.toLowerCase();
  if (s === "live") return "badge-live";
  if (s === "coming soon") return "badge-coming";
  return "badge-concept";
}

export default function ProjectsPage() {
  const projects = projectsData as Project[];

  return (
    <article>
      <h1 className="project-page-title text-[var(--foreground)]">
        Projects
      </h1>
      <p className="project-page-sub max-w-[37.5rem]">
        Side projects and things I&apos;ve built.
      </p>

      <ul className="project-list">
        {projects.map((p) => (
          <li key={p.id}>
            <div className="project-card block">
              <div className="project-card-header">
                <h2 className="project-card-title">
                  {p.url && p.url !== "#" ? (
                    <ProjectOutboundLink
                      href={p.url}
                      projectId={p.id}
                      className="no-underline hover:underline"
                    >
                      {p.title}
                    </ProjectOutboundLink>
                  ) : (
                    p.title
                  )}
                </h2>
                {p.badges?.length ? (
                  <div className="project-card-tags">
                    {p.badges.map((b, i) => (
                      <span
                        key={i}
                        className={`project-badge ${badgeClass(b.stage)}`}
                      >
                        {b.stage} · {b.platform}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="project-card-tagline">{p.description}</p>
              {(p.problem ?? p.strategy ?? p.theBet) && (
                <dl>
                  {p.problem && (
                    <div className="project-row">
                      <dt className="project-row-label">Problem</dt>
                      <dd className="project-row-val">{p.problem}</dd>
                    </div>
                  )}
                  {p.strategy && (
                    <div className="project-row">
                      <dt className="project-row-label">Strategy</dt>
                      <dd className="project-row-val">{p.strategy}</dd>
                    </div>
                  )}
                  {p.theBet && (
                    <div className="project-row">
                      <dt className="project-row-label">The Bet</dt>
                      <dd className="project-row-val">{p.theBet}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
