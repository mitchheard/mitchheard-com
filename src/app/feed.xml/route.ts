import { site } from "@/data/site";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-static";

const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/* Feed readers have no base URL, so site-relative links and images in a post become absolute. */
const absolutize = (html: string) => html.replace(/(href|src)="\/(?!\/)/g, `$1="${site.url}/`);
const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

/* RSS 2.0 feed of published articles, newest first. Written at build time to /feed.xml. */
export function GET() {
  const articles = getArticles();
  const items = articles
    .map((a) => {
      const url = `${site.url}/articles/${a.id}`;
      return `    <item>
      <title>${xml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${xml(a.excerpt)}</description>
      <content:encoded>${cdata(absolutize(a.html))}</content:encoded>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.name)}: Writing</title>
    <link>${site.url}/articles</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Writing about product, systems, and building things.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
