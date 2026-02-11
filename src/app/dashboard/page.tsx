import linksData from "@/data/links.json";

type LinkItem = { label: string; url: string; category: string };

export default function DashboardPage() {
  const { quickLinks, notes } = linksData as { quickLinks: LinkItem[]; notes: string };

  const byCategory = quickLinks.reduce<Record<string, LinkItem[]>>((acc, link) => {
    const cat = link.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(link);
    return acc;
  }, {});

  return (
    <article>
      <h1 className="mb-2 text-2xl font-semibold text-[var(--foreground)]">Dashboard</h1>
      <p className="mb-8 text-[var(--muted)]">Quick links and personal info. Bookmark this page as your browser homepage.</p>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-medium text-[var(--foreground)]">Quick links</h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(byCategory).map(([category, links]) => (
            <div key={category} className="w-full min-w-0 md:w-auto">
              <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-[var(--muted)]">{category}</h3>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {notes && (
        <section>
          <h2 className="mb-4 text-lg font-medium text-[var(--foreground)]">Notes</h2>
          <p className="text-[var(--muted)]">{notes}</p>
        </section>
      )}

      <p className="mt-10 text-sm text-[var(--muted)]">
        Edit <code className="rounded bg-[var(--border)] px-1 py-0.5">src/data/links.json</code> to change quick links and notes.
      </p>
    </article>
  );
}
