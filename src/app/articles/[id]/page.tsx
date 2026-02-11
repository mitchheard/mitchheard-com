import { notFound } from "next/navigation";
import Link from "next/link";
import articlesData from "@/data/articles.json";

type Article = { id: string; title: string; date: string; excerpt: string };

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articles = articlesData as Article[];
  const article = articles.find((a) => a.id === id);
  if (!article) notFound();

  return (
    <article>
      <Link href="/articles" className="inline-block text-sm text-[var(--muted)] hover:underline">
        ← Articles
      </Link>

      <header className="mt-6 mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          {article.title}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{article.date}</p>
      </header>

      <hr className="my-10" aria-hidden />

      <section className="max-w-2xl space-y-6">
        <p className="text-[var(--foreground)] leading-relaxed">{article.excerpt}</p>
        <p className="text-sm text-[var(--muted)]">
          For full article bodies, add markdown files or use a CMS and render here.
        </p>
      </section>
    </article>
  );
}
