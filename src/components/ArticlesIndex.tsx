"use client";

import Link from "next/link";
import { trackUmamiEvent } from "@/lib/umami-bootstrap";

export type ArticleSummary = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
};

type Props = { articles: ArticleSummary[] };

export function ArticlesIndex({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <p className="text-[var(--muted)] leading-relaxed">
        Nothing published yet — first post coming soon.
      </p>
    );
  }

  return (
    <ul className="space-y-8">
      {articles.map((a) => (
        <li key={a.id}>
          <Link
            href={`/articles/${a.id}`}
            className="group block no-underline"
            onClick={() =>
              trackUmamiEvent("article_clicked", { article_id: a.id })
            }
          >
            <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
              {a.title}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{a.date}</p>
            <p className="mt-2 text-[var(--foreground)] leading-relaxed">
              {a.excerpt}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
