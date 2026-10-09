/**
 * Simple env-driven feature flags for hiding pages per environment (e.g.
 * keep a page hidden on production while showing it on a staging branch).
 *
 * Flags default to OFF — a flag is only on when its env var is literally
 * "true". These are read in server components only, so plain env vars are
 * enough; no NEXT_PUBLIC_ prefix is needed. Routes gated by a flag prerender
 * at build time, so flipping the env var on a host like Vercel requires a
 * redeploy to take effect.
 */
export const FEATURE_FLAGS = {
  blog: process.env.FEATURE_BLOG === "true",
  work: process.env.FEATURE_WORK === "true",
  contact: process.env.FEATURE_CONTACT === "true",
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;
