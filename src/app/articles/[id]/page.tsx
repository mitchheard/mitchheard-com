import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/data/site";
import { formatDate, getArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

const articles = getArticles();

export function generateStaticParams() {
  // With output: 'export', we must return at least one param when the list is empty.
  const params = articles.map((a) => ({ id: a.id }));
  return params.length > 0 ? params : [{ id: "__placeholder" }];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);
  if (!article) return { robots: { index: false, follow: false } };
  return {
    ...pageMetadata(
      `/articles/${article.id}`,
      { title: article.title, description: article.excerpt },
      { publishedTime: article.date },
    ),
    alternates: { canonical: `/articles/${article.id}`, types: { "application/rss+xml": "/feed.xml" } },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    mainEntityOfPage: `${site.url}/articles/${article.id}`,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/articles" className="label plain article-back">
        ← Writing
      </Link>

      <header className="article-header">
        <p className="label">
          <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readMinutes} min read
        </p>
        <h1 className="article-title">{article.title}</h1>
      </header>

      {/* Markdown from src/data/articles/, written by the site owner and rendered at build time. */}
      <div className="prose-post" dangerouslySetInnerHTML={{ __html: article.html }} />
    </article>
  );
}
