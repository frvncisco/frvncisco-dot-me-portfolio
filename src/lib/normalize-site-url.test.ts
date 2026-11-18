import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeSiteUrl } from "./normalize-site-url.ts";

test("adds https when the scheme is missing (VERCEL_URL has none)", () => {
  assert.equal(normalizeSiteUrl("my-site.vercel.app"), "https://my-site.vercel.app");
});

test("keeps http and https, and drops the path and trailing slash", () => {
  assert.equal(normalizeSiteUrl("http://localhost:3000/"), "http://localhost:3000");
  assert.equal(normalizeSiteUrl("https://example.com/blog/"), "https://example.com");
});

test("trims whitespace from a hand-typed value", () => {
  assert.equal(normalizeSiteUrl("  https://example.com  "), "https://example.com");
});

test("throws a clear error on a value that is not a URL", () => {
  assert.throws(() => normalizeSiteUrl("not a url"), /SITE_URL is not a valid URL/);
});

test("throws on a scheme that is not http or https", () => {
  assert.throws(() => normalizeSiteUrl("ftp://example.com"), /must use http or https/);
});
