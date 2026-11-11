import { DATA } from "@/data/resume";

// Base for every absolute URL the site emits (metadataBase, og:url, sitemap, robots, JSON-LD).
// DATA.url is the canonical domain, but it doesn't resolve until the domain is connected
// (issue #23), so link previews pointing at it fail. Until then:
// - SITE_URL wins when set (production sets it to its vercel.app alias).
// - Vercel previews use their own branch or deployment URL.
// - `next dev` uses localhost.
// Only server code (metadata, sitemap, robots) imports this, so SITE_URL has no
// NEXT_PUBLIC_ prefix and is never inlined into client bundles.
// SITE_URL is hand-typed in the Vercel dashboard, and VERCEL_URL (often copied into it) has
// no scheme. A bad value would make `new URL()` in the root layout throw and fail every
// route at build time, so normalize it here and fail with a clear message instead.
function normalizeSiteUrl(raw: string): string {
  const value = raw.trim();
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    throw new Error(`SITE_URL is not a valid URL: "${raw}"`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`SITE_URL must use http or https: "${raw}"`);
  }
  return url.origin;
}

function resolveSiteUrl(): string {
  if (process.env.SITE_URL?.trim()) return normalizeSiteUrl(process.env.SITE_URL);

  const previewHost = process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL;
  if (process.env.VERCEL_ENV === "preview" && previewHost) return `https://${previewHost}`;

  if (process.env.NODE_ENV === "development") return "http://localhost:3000";

  return DATA.url;
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");
