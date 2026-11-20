import type { Metadata } from "next";
import { ArticlesIndex } from "@/components/ArticlesIndex";
import articlesData from "@/data/articles.json";

type Article = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
};

const articles = articlesData as Article[];

// While there are no posts, the page is hidden from the nav and kept out of search.
// Once articles.json has entries this becomes a normal indexable page.
export const metadata: Metadata = {
  title: "Writing",
  alternates: { canonical: "/articles" },
  ...(articles.length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function ArticlesPage() {
  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          Articles
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Writing about product, systems, and building things.
        </p>
      </header>

      <ArticlesIndex articles={articles} />
    </article>
  );
}
