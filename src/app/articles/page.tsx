import Link from "next/link";
import articlesData from "@/data/articles.json";

type Article = { id: string; title: string; date: string; excerpt: string };

export default function ArticlesPage() {
  const articles = articlesData as Article[];

  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          Articles
        </h1>
      </header>

      <hr className="my-10" aria-hidden />

      <ul className="space-y-8">
        {articles.map((a) => (
          <li key={a.id}>
            <Link
              href={`/articles/${a.id}`}
              className="block text-[var(--accent)] hover:underline"
            >
              <span className="font-medium text-[var(--foreground)]">{a.title}</span>
            </Link>
            <span className="mt-1 block text-sm text-[var(--muted)]">{a.date}</span>
            <p className="mt-2 text-[var(--muted)] leading-relaxed">{a.excerpt}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-[var(--muted)]">
        Add or edit entries in <code className="rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 font-mono text-xs">src/data/articles.json</code>.
      </p>
    </article>
  );
}
