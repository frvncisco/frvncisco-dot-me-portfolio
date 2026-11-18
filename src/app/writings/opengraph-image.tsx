import { notFound } from "next/navigation";
import { FEATURE_FLAGS } from "@/lib/flags";
import { renderOg } from "@/lib/og";

export const alt = "Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  if (!FEATURE_FLAGS.blog) notFound();

  return renderOg({
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  });
}
