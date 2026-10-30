import { ProjectOutboundLink } from "@/components/ProjectOutboundLink";
import projectsData from "@/data/projects.json";
import { career, careerIntro } from "@/data/career";

type Badge = { stage: string; platform: string };

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
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

export default function WorkPage() {
  const projects = projectsData as Project[];

  return (
    <article>
      <header className="mb-12 md:mb-16">
        <h1 className="project-page-title">Work</h1>
        <p className="project-page-sub">
          Small bets under AvidX, and the companies that taught me how to make them.
        </p>
        <nav className="work-subnav" aria-label="On this page">
          <a href="#bets">Bets</a>
          <a href="#career">Career</a>
        </nav>
      </header>

      <div className="work-section-head scroll-mt-10" id="bets">
        <h2 className="label">Bets</h2>
        <p className="work-section-sub">Live ones first. The retired one stays because the reason it died is the useful part.</p>
      </div>

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
                  <img src={p.image} alt={`${p.title} screenshot`} className="project-shot" loading="lazy" />
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

      <div className="work-section-head work-section-head-spaced scroll-mt-10" id="career">
        <h2 className="label">Career</h2>
        <p className="work-section-sub work-section-intro">{careerIntro}</p>
      </div>

      <ul className="career-list">
        {career.map((c) => (
          <li key={c.id} id={c.id} className="career-card scroll-mt-10">
            <div className="career-head">
              <h3 className="career-company">
                <a href={c.url} target="_blank" rel="noopener noreferrer">{c.company}</a>
              </h3>
              <span className="career-years">{c.years}</span>
            </div>
            <p className="career-roles">{c.roles}</p>
            <p className="career-sides">{c.sides}</p>
            <p className="career-story">{c.story}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
