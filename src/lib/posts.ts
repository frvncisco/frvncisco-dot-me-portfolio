import { allPosts } from "content-collections";

// Newest first. Dates are ISO strings, so comparing them as strings sorts them correctly.
export function getSortedPosts() {
  return [...allPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
