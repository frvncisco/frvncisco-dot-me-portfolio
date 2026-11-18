import { notFound } from "next/navigation";
import { FEATURE_FLAGS } from "@/lib/flags";
import { renderOg } from "@/lib/og";

export const alt = "Writings";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  if (!FEATURE_FLAGS.blog) notFound();

  return renderOg({
    title: "Writings",
    description: "Thoughts on software development, life, and more.",
  });
}
