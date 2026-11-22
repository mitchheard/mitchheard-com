"use client";

import Link from "next/link";
import { trackUmamiEvent } from "@/lib/umami-bootstrap";

export type ArticleListItem = {
  id: string;
  title: string;
  /** Already formatted for display, e.g. "Nov 22, 2026". */
  dateLabel: string;
  date: string;
  readMinutes: number;
  excerpt: string;
};

export function ArticlesIndex({ articles }: { articles: ArticleListItem[] }) {
  if (articles.length === 0) {
    return <p className="project-page-sub">Nothing published yet. First post coming soon.</p>;
  }

  return (
    <ul className="article-list">
      {articles.map((a) => (
        <li key={a.id}>
          <Link
            href={`/articles/${a.id}`}
            className="article-item"
            onClick={() => trackUmamiEvent("article_clicked", { article_id: a.id })}
          >
            <span className="article-meta label">
              <time dateTime={a.date}>{a.dateLabel}</time> · {a.readMinutes} min read
            </span>
            <span className="article-item-title">{a.title}</span>
            <span className="article-item-excerpt">{a.excerpt}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
