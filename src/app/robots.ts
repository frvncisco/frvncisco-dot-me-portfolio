import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Only production is crawlable. Previews (which run with every feature flag on)
// and local builds disallow everything, so staging pages never get indexed.
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
