import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const shikiOptions: Parameters<typeof rehypeShiki>[0] = {
  themes: { light: "github-light", dark: "github-dark" },
  // No default color: globals.css picks --shiki-light or --shiki-dark per theme.
  defaultColor: false,
  defaultLanguage: "text",
  fallbackLanguage: "text",
  // ```ts title="file.ts" -> data-title on the <pre> (shiki copies meta keys onto it), shown
  // by CodeBlock.
  parseMetaString: (meta) => {
    const title = meta.match(/title="([^"]+)"/)?.[1];
    return title ? { "data-title": title } : undefined;
  },
};

const posts = defineCollection({
  name: "posts",
  directory: "content",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    // Plain ISO dates: a typo like 2025-13-45 would otherwise build and show "Invalid Date".
    publishedAt: z.iso.date(),
    updatedAt: z.iso.date().optional(),
    author: z.string().optional(),
    summary: z.string(),
    image: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeShiki, shikiOptions]],
    });
    return {
      ...document,
      slug: document._meta.path,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
