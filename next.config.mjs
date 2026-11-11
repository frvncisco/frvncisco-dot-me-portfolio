import { withContentCollections } from "@content-collections/next";

const isDev = process.env.NODE_ENV === "development";

// 'unsafe-inline' scripts: Next.js bootstraps with inline scripts and next-themes injects
// one to set the theme before paint. Nonces would avoid this, but they force every page
// to render dynamically. 'wasm-unsafe-eval' lets shiki compile its WebAssembly regex
// engine for code blocks (it doesn't allow JS eval). 'unsafe-eval' is only needed by
// React's dev tooling.
// vercel.live (and its Pusher socket) is the Vercel toolbar on preview deployments; the
// directives follow https://vercel.com/docs/vercel-toolbar/managing-toolbar.
// img-src allows https: because the placeholder projects load external images.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""} https://vercel.live`,
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "font-src 'self' data: https://vercel.live https://assets.vercel.com",
  `connect-src 'self' https://vercel.live wss://*.pusher.com${isDev ? " ws:" : ""}`,
  "frame-src https://vercel.live",
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
