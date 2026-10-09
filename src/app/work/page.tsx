import BlurFade from "@/components/magicui/blur-fade";
import ProjectsSection from "@/components/section/projects-section";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURE_FLAGS } from "@/lib/flags";

const description = "Projects I've built.";

export const metadata: Metadata = {
  title: "Work",
  description,
  openGraph: {
    title: "Work",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Work",
    description,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function WorkPage() {
  if (!FEATURE_FLAGS.work) {
    notFound();
  }

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <div>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <ProjectsSection />
        </BlurFade>
      </div>
    </main>
  );
}
