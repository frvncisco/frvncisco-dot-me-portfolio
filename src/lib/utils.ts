import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  // Use UTC to ensure consistent formatting between server and client
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Frontmatter images may be absolute (e.g. Unsplash) or site-relative; only prefix the latter.
export function absoluteUrl(path: string, base: string) {
  return /^https?:\/\//.test(path) ? path : new URL(path, base).toString();
}
