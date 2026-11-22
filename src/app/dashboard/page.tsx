import type { Metadata } from "next";
import linksData from "@/data/links.json";

// Keep it out of search and link previews, and out of Umami (see umami-bootstrap.ts).
// The page is NOT private: a static export has no way to hide it, and links.json is in the
// public repo. See CONTENT.md ("Dashboard as Chrome homepage").
export const metadata: Metadata = {
  title: "Dashboard",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: false },
};

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
      <header className="mb-12 md:mb-16">
        <h1 className="project-page-title">Dashboard</h1>
        <p className="project-page-sub">
          My quick links, set as my browser homepage. This page is public, so nothing private lives here.
        </p>
      </header>

      <div className="flex flex-wrap gap-x-16 gap-y-10">
        {Object.entries(byCategory).map(([category, links]) => (
          <section key={category} className="min-w-0">
            <h2 className="label mb-3">{category}</h2>
            <ul className="space-y-2" style={{ fontSize: 17 }}>
              {links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="tap">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {notes && <p className="meta mt-12 max-w-xl">{notes}</p>}
    </article>
  );
}
