import { withContentCollections } from "@content-collections/next";

const isDev = process.env.NODE_ENV === "development";
const toolbar = process.env.VERCEL_ENV !== "production";
const live = toolbar ? " https://vercel.live" : "";

// 'unsafe-inline' scripts: Next.js bootstraps with inline scripts and next-themes injects
// one to set the theme before paint. Nonces would avoid this, but they force every page
// to render dynamically. 'unsafe-eval' is only needed by React's dev tooling. Code blocks
// are highlighted at build time, so no WebAssembly runs in the browser.
// vercel.live (and its Pusher socket) is the Vercel toolbar, which only runs on preview
// deployments, so production doesn't allow those hosts. The directives follow
// https://vercel.com/docs/vercel-toolbar/managing-toolbar. Local builds count as non-production.
// img-src allows https: because the placeholder projects load external images.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${live}`,
  `style-src 'self' 'unsafe-inline'${live}`,
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  `font-src 'self' data:${toolbar ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self'${live}${toolbar ? " wss://*.pusher.com" : ""}${isDev ? " ws:" : ""}`,
  `frame-src ${toolbar ? "https://vercel.live" : "'none'"}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          // No `preload` until the site is on its own domain (issue #23). Once it is,
          // includeSubDomains forces HTTPS on every subdomain of that domain too.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
