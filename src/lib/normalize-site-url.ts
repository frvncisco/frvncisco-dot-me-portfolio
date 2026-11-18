// SITE_URL is hand-typed in the Vercel dashboard, and VERCEL_URL (often copied into it) has
// no scheme. A bad value would make `new URL()` in the root layout throw and fail every
// route at build time, so normalize it here and fail with a clear message instead.
export function normalizeSiteUrl(raw: string): string {
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
