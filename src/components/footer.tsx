import { Container } from "@/components/container";
import { SOCIAL_ICONS } from "@/components/social-icons";
import { DATA } from "@/data/resume";
import { ArrowRight } from "lucide-react";

const labelClass = "font-mono text-xs tracking-wider uppercase";
const ringClass =
  "focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-hidden";

export default function Footer() {
  return (
    <footer className="relative z-10 pb-12">
      <Container className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6 rounded-3xl border bg-card p-6 sm:p-8 lg:row-span-2">
          <p className={`${labelClass} text-muted-foreground`}>The end</p>
          <h2 className="text-3xl sm:text-4xl">Made it this far?</h2>
          <p className="max-w-(--measure-sub) text-lg text-muted-foreground">
            If you&rsquo;re interested in working together, collaborating on open source, or just
            networking, let&rsquo;s get in touch.
          </p>
        </div>

        <a
          href={`mailto:${DATA.contact.email}`}
          className={`group flex min-h-56 flex-col justify-between rounded-3xl bg-(--pixel-blue) p-6 text-white sm:p-8 ${ringClass}`}
        >
          <span aria-hidden className={`${labelClass} text-white/80`}>
            Let&rsquo;s talk
          </span>
          <span className="flex items-end justify-between gap-4">
            <span className="font-serif text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              Say hello
            </span>
            <ArrowRight
              className="size-8 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden
            />
          </span>
        </a>

        <div className="rounded-3xl border bg-card p-6 sm:p-8">
          <p className={`${labelClass} text-muted-foreground`}>Elsewhere</p>
          <nav aria-label="Footer social links" className="mt-6 -ml-2 flex gap-1">
            {Object.values(DATA.contact.social)
              .filter((social) => social.footer)
              .map(({ url: href, name: label }) => {
                const Icon = SOCIAL_ICONS[label];
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`grid size-11 place-items-center rounded-lg text-foreground transition-colors hover:bg-accent ${ringClass}`}
                  >
                    {Icon ? <Icon className="size-6" /> : label}
                    <span className="sr-only">{Icon ? `${label} ` : ""}(opens in a new tab)</span>
                  </a>
                );
              })}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
