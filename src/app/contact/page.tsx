import BlurFade from "@/components/magicui/blur-fade";
import ContactSection from "@/components/section/contact-section";
import type { Metadata } from "next";

const description = "Get in touch.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  openGraph: {
    title: "Contact",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function ContactPage() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
