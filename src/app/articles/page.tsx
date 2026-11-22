import { ArticlesIndex } from "@/components/ArticlesIndex";
import { seo } from "@/data/site";
import { formatDate, getArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

const articles = getArticles();

// While there are no posts, the page is hidden from the nav and kept out of search.
// Once src/data/articles/ has a published post this becomes a normal indexable page.
export const metadata = {
  ...pageMetadata("/articles", seo.articles),
  alternates: { canonical: "/articles", types: { "application/rss+xml": "/feed.xml" } },
  ...(articles.length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function ArticlesPage() {
  return (
    <article>
      <header className="mb-12 md:mb-16">
        <h1 className="project-page-title">Writing</h1>
        <p className="project-page-sub">{seo.articles.description}</p>
        {articles.length > 0 ? (
          <p className="meta">
            <a href="/feed.xml">RSS</a>
          </p>
        ) : null}
      </header>

      <ArticlesIndex
        articles={articles.map((a) => ({
          id: a.id,
          title: a.title,
          date: a.date,
          dateLabel: formatDate(a.date),
          readMinutes: a.readMinutes,
          excerpt: a.excerpt,
        }))}
      />
    </article>
  );
}
