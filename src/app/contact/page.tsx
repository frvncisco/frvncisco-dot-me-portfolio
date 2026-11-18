import { Container } from "@/components/container";
import BlurFade from "@/components/magicui/blur-fade";
import ContactSection from "@/components/section/contact-section";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURE_FLAGS } from "@/lib/flags";

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
  if (!FEATURE_FLAGS.contact) {
    notFound();
  }

  return (
    <Container as="main" className="relative">
      <section id="contact" className="max-w-(--measure-prose)">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <ContactSection />
        </BlurFade>
      </section>
    </Container>
  );
}
