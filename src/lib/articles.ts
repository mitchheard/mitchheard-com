import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/* Articles are Markdown files in src/data/articles/, one per post, read at build time.
   The file name (without .md) is the URL: why-specs-matter.md -> /articles/why-specs-matter.
   Files starting with "_" (the template) and posts marked `draft: true` are ignored.

   Frontmatter, between two "---" lines at the top:
     title:   required
     date:    required, YYYY-MM-DD
     excerpt: required, one or two sentences; used on the index, in link previews and in the feed
     draft:   optional, `true` keeps the post off the site */

export type ArticleSummary = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  readMinutes: number;
};

export type Article = ArticleSummary & { html: string };

const DIR = path.join(process.cwd(), "src", "data", "articles");
const WORDS_PER_MINUTE = 220;

function parse(file: string, raw: string): Article | null {
  const id = file.replace(/\.md$/, "");
  const match = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`articles/${file}: missing frontmatter (--- ... --- at the top)`);

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  if (meta.draft === "true") return null;

  for (const key of ["title", "date", "excerpt"]) {
    if (!meta[key]) throw new Error(`articles/${file}: frontmatter is missing "${key}"`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date) || Number.isNaN(Date.parse(meta.date))) {
    throw new Error(`articles/${file}: date must be YYYY-MM-DD, got "${meta.date}"`);
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
    throw new Error(`articles/${file}: file name must be lowercase letters, numbers and hyphens`);
  }

  const body = match[2].trim();
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    id,
    title: meta.title,
    date: meta.date,
    excerpt: meta.excerpt,
    readMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    html: marked.parse(body, { async: false }),
  };
}

/** All published articles, newest first. Empty while there are none (the Writing section stays hidden). */
export function getArticles(): Article[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => parse(f, fs.readFileSync(path.join(DIR, f), "utf8")))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** "Nov 22, 2026". Parsed as UTC so the date never shifts with the build machine's time zone. */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
