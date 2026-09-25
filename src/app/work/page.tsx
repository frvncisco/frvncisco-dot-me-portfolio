import BlurFade from "@/components/magicui/blur-fade";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import type { Metadata } from "next";

const description = "Projects I've built and hackathons I've competed in.";

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
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <HackathonsSection />
        </BlurFade>
      </section>
    </main>
  );
}
