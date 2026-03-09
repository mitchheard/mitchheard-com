import Link from "next/link";
import { site } from "@/data/site";

/* Building grid — order matches Projects page: WanderPlace, Watch Me, Mail Zero, Planfinity */
const buildingProjects: { title: string; description: string }[] = [
  { title: "WanderPlace", description: "Save and share places worth visiting" },
  { title: "Watch Me", description: "Movie & TV tracker with AI recommendations" },
  { title: "Mail Zero", description: "Newsletter triage & inbox clarity" },
  { title: "Planfinity", description: "Gridfinity drawer planner for 3D printing" },
];

export default function HomePage() {
  return (
    <article className="space-y-0">
      {/* Hero */}
      <header>
        <h1 className="font-sans text-xl font-semibold leading-tight tracking-tight text-[var(--foreground-hero)] md:text-[2rem] md:leading-tight">
          {site.name}
        </h1>
        <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-[#4a6580]">
          <span className="home-location-dot" aria-hidden />
          {site.location}
        </div>
        <p className="mt-5 max-w-[32rem] font-sans text-[#7a9ab5] font-normal leading-relaxed md:mt-6">
          I moved from engineering to product when I realized the bottleneck wasn&apos;t the code — it was knowing what to build. Turns out that&apos;s true regardless of the industry. I gravitate toward the messy coordination problems, the ones where the product has to hold together multiple users with conflicting incentives. Outside work: 3D printing, Sony cameras, vinyl, bikes, and more half-started side projects than I&apos;d like to admit.
        </p>
      </header>

      {/* Currently card */}
      {site.currentFocus.length > 0 && (
        <section className="mt-9 max-w-[37.5rem] md:mt-10">
          <div className="currently-card">
            <h2 className="home-section-label">Currently</h2>
            <ul className="currently-items">
              {site.currentFocus.map((item) => (
                <li key={item} className="currently-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Building — 2×2 grid linking to Projects */}
      <section className="mt-9 max-w-[37.5rem] md:mt-10">
        <h2 className="home-section-label">Building</h2>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {buildingProjects.map((p) => (
            <Link key={p.title} href="/projects" className="preview-card">
              <div className="preview-name">{p.title}</div>
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
