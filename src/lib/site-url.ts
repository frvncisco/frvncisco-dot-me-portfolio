import { DATA } from "@/data/resume";

// Base for every absolute URL the site emits (metadataBase, og:url, sitemap, robots, JSON-LD).
// DATA.url is the canonical domain, but it doesn't resolve until the domain is connected
// (issue #23), so link previews pointing at it fail. Until then:
// - NEXT_PUBLIC_SITE_URL wins when set (production sets it to its vercel.app alias).
// - Vercel previews use their own branch or deployment URL.
// - `next dev` uses localhost.
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  const previewHost = process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL;
  if (process.env.VERCEL_ENV === "preview" && previewHost) return `https://${previewHost}`;

  if (process.env.NODE_ENV === "development") return "http://localhost:3000";

  return DATA.url;
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");
