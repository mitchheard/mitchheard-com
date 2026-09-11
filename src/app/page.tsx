import Link from "next/link";
import { site } from "@/data/site";
import projectsData from "@/data/projects.json";

type Project = {
  id: string;
  title: string;
  description: string;
  badges?: { stage: string; platform: string }[];
};

/* Building grid — derived from projects.json so the home page can't drift from /projects.
   Retired projects stay on /projects but don't get a home-page slot. */
const buildingProjects = (projectsData as Project[]).filter(
  (p) => !p.badges?.some((b) => b.stage.toLowerCase() === "retired"),
);

export default function HomePage() {
  return (
    <article className="space-y-0">
      {/* Hero */}
      <header className="hero">
        <div className="hero-text">
          <h1 className="font-sans text-xl font-semibold leading-tight tracking-tight text-[var(--foreground-hero)] md:text-[2rem] md:leading-tight">
            {site.name}
          </h1>
          <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-[#4a6580]">
            <span className="home-location-dot" aria-hidden />
            {site.location}
          </div>
          <p className="mt-5 max-w-[32rem] font-sans text-[#7a9ab5] font-normal leading-relaxed md:mt-6">
            I moved from engineering to product when I realized the bottleneck wasn&apos;t the code. It was knowing what to build. Turns out that&apos;s true regardless of the industry. I gravitate toward the messy coordination problems, the ones where the product has to hold together multiple users with conflicting incentives.
          </p>
          <p className="mt-4 max-w-[32rem] font-sans text-[#7a9ab5] font-normal leading-relaxed">
            By day I run product at <a href="https://newzip.com" target="_blank" rel="noopener noreferrer">Newzip</a>. Nights and weekends I run <span className="text-[var(--foreground)]">AvidX</span>, a studio for small software bets: build fast, validate with real people, keep what works, and say out loud when something didn&apos;t.
          </p>
          <p className="mt-4 max-w-[32rem] font-sans text-[#7a9ab5] font-normal leading-relaxed">
            Outside work: 3D printing, photography, cargo e-bike dad, one Wikipedia article away from a new hobby.
          </p>
        </div>
        {site.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={site.photo} alt={site.name} className="hero-photo" width={160} height={160} />
        ) : null}
      </header>

      {/* Currently card */}
      {site.currentFocus.length > 0 && (
        <section className="mt-9 max-w-[37.5rem] md:mt-10">
          <div className="currently-card">
            <h2 className="home-section-label">Currently</h2>
            <ul className="currently-items">
              {site.currentFocus.map((item) => (
                <li key={item} className="currently-item">
                  {item === "CPO at Newzip" ? (
                    <span>CPO at <a href="https://newzip.com" target="_blank" rel="noopener noreferrer">Newzip</a></span>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Building — grid linking to Projects */}
      <section className="mt-9 max-w-[37.5rem] md:mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="home-section-label">Building</h2>
          <Link href="/projects" className="home-section-more">All projects →</Link>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {buildingProjects.map((p) => (
            <Link key={p.id} href={`/projects#${p.id}`} className="preview-card">
              <div className="preview-name">
                {p.title}
                {p.badges?.[0] && (
                  <span className={`preview-stage preview-stage-${p.badges[0].stage.toLowerCase().replace(/\s+/g, "-")}`}>
                    {p.badges[0].stage}
                  </span>
                )}
              </div>
              <div className="preview-desc">{p.description}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Elsewhere — LinkedIn & Email */}
      <section className="mt-9 max-w-[37.5rem] md:mt-10">
        <h2 className="home-section-label">Elsewhere</h2>
        <div className="flex flex-col">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-item">
            <span className="link-label">LinkedIn</span>
            <span className="link-sub">@mitchheard</span>
            <span className="link-arrow">↗</span>
          </a>
          <a href={`mailto:${site.email}`} className="link-item">
            <span className="link-label">Email</span>
            <span className="link-sub">{site.email}</span>
            <span className="link-arrow">↗</span>
          </a>
        </div>
      </section>
    </article>
  );
}
