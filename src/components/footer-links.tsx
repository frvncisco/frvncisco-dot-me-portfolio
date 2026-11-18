import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";
import { getExternalLinks } from "@/components/navbar";

// The nav shows these from `sm` up; below that there is no room beside the pill, so they live here.
export default function FooterLinks() {
  return (
    <footer className="relative z-10 sm:hidden">
      <Container className="flex h-12 items-center">
        <nav aria-label="Social links" className="-ml-2 flex">
          {getExternalLinks().map((link) => (
            <ExternalLink key={link.href} {...link} />
          ))}
        </nav>
      </Container>
    </footer>
  );
}
