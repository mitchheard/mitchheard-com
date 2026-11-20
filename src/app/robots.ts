import { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

/* Allow everything and point at the sitemap. Private pages are kept out of search with a
   noindex meta tag, not a Disallow rule: a Disallow line would only advertise the path. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
