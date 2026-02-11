import projectsData from "@/data/projects.json";

type Project = { id: string; title: string; description: string; url: string; tags?: string[] };

export default function ProjectsPage() {
  const projects = projectsData as Project[];

  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          Projects
        </h1>
      </header>

      <hr className="my-10" aria-hidden />

      <ul className="grid gap-6 sm:grid-cols-1">
        {projects.map((p) => (
          <li key={p.id}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card block transition-colors hover:border-[var(--muted)]"
            >
              <h2 className="text-lg font-semibold text-[var(--foreground)]">{p.title}</h2>
              <p className="mt-2 text-[var(--muted)] leading-relaxed">{p.description}</p>
              {p.tags?.length ? (
                <p className="mt-3 text-sm text-[var(--muted)]">{p.tags.join(" · ")}</p>
              ) : null}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-[var(--muted)]">
        Edit <code className="rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 font-mono text-xs">src/data/projects.json</code> to add or update projects.
      </p>
    </article>
  );
}
