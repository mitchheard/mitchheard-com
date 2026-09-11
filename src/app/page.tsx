import Link from "next/link";
import { site } from "@/data/site";
import projectsData from "@/data/projects.json";

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  badges?: { stage: string; platform: string }[];
  theBet?: string;
};

const isRetired = (p: Project) => p.badges?.some((b) => b.stage.toLowerCase() === "retired") ?? false;

/* Home reads from projects.json so it can't drift from /work.
   Live projects get a card; retired ones drop to a single row underneath. */
const projects = projectsData as Project[];
const live = projects.filter((p) => !isRetired(p));
const retired = projects.filter(isRetired);

function stageClass(stage: string) {
  return `stage stage-${stage.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function HomePage() {
  return (
    <article className="flex flex-col gap-14 md:gap-16">
      {/* Hero */}
      <header className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
        <div className={`flex flex-col gap-5 ${site.photo ? "md:col-span-8" : "md:col-span-10"}`}>
          <h1 className="hero-title">
            Product leader
            <br />
            with <span className="hero-code">commit</span> access.
          </h1>
          <p className="hero-lede">
            I moved from engineering to product when I realized the bottleneck wasn&apos;t the code. It was knowing what to build. I gravitate toward the messy coordination problems, where the product has to hold together multiple users with conflicting incentives.
          </p>
          <p className="hero-sub">
            By day I run product at <a href="https://newzip.com" target="_blank" rel="noopener noreferrer">Newzip</a>. Nights and weekends I run AvidX, a studio for small software bets: build fast, validate with real people, keep what works.
          </p>
          <div className="meta flex flex-wrap gap-x-4 gap-y-1">
            <span>{site.location}</span>
            <span aria-hidden>·</span>
            <span>CPO, <a href="https://newzip.com" target="_blank" rel="noopener noreferrer">Newzip</a></span>
            <span aria-hidden>·</span>
            <span>Founder, AvidX</span>
          </div>
        </div>
        {site.photo ? (
          <div className="md:col-span-4 md:flex md:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.photo} alt={site.name} className="hero-photo" width={220} height={275} />
          </div>
        ) : null}
      </header>

      {/* Now */}
      {site.currentFocus.length > 0 && (
        <section className="section">
          <h2 className="label">Now</h2>
          <div className="flex flex-col">
            {site.currentFocus.map((item, i) => (
              <div key={item} className="now-row">
                <span className="now-index">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work */}
      <section className="section">
        <div>
          <h2 className="label">Work</h2>
          <p className="section-note">Small software bets, built fast and judged honestly.</p>
        </div>
        <div className="flex flex-col gap-7">
          <div className="work-grid">
            {live.map((p) => (
              <Link key={p.id} href={`/work#${p.id}`} className={`work-card${p.image ? " has-shot" : ""}`}>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={`${p.title} screenshot`} className="work-shot" loading="lazy" />
                ) : null}
                <div className="work-card-head">
                  <span className="work-card-title">{p.title}</span>
                  {p.badges?.[0] && <span className={stageClass(p.badges[0].stage)}>{p.badges[0].stage}</span>}
                </div>
                <div className="work-card-desc">{p.description}</div>
              </Link>
            ))}
          </div>
          {retired.map((p) => (
            <div key={p.id} className="retired-row">
              <span className="retired-title">{p.title}</span>
              <span className="retired-desc">
                {p.description}. <Link href={`/work#${p.id}`}>Why it was retired</Link>
              </span>
              <span className="stage stage-retired">Retired</span>
            </div>
          ))}
        </div>
      </section>

      {/* Elsewhere */}
      <section className="section">
        <h2 className="label">Elsewhere</h2>
        <div className="elsewhere">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </section>
    </article>
  );
}
