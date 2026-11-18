import { Container } from "@/components/container";
import BlurFade from "@/components/magicui/blur-fade";
import { DitherField } from "@/components/magicui/dither-field";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;
const PIXEL_WORD = "design";
// Full class names, so Tailwind can see them. One per letter, repeating if the word is longer.
const PIXEL_LETTER_COLORS = [
  "text-(--pixel-lime)",
  "text-(--pixel-orange)",
  "text-(--pixel-pink)",
  "text-(--pixel-blue)",
  "text-(--pixel-teal)",
];

export default function Page() {
  return (
    <Container
      as="main"
      className="relative flex min-h-[calc(100dvh-11rem)] flex-col sm:min-h-[calc(100dvh-12rem)]"
    >
      <DitherField
        aria-hidden
        className="fixed inset-0 z-0 bg-(--sky)"
        pattern="clouds"
        dotSize={2}
        intensity={0.9}
        color={["var(--sky-haze)", "var(--sky-mist)", "var(--sky-cloud)"]}
      />
      <section id="hero" className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY} yOffset={8}>
            <h1 className="font-serif text-[clamp(34px,9.6vw,44px)] leading-[1.1] font-normal sm:text-[clamp(44px,7.2vw,68px)] lg:text-[clamp(38px,6vw,76px)]">
              <span className="block">Hi, I&rsquo;m {DATA.name},</span>{" "}
              <span className="block">a frontend engineer</span>{" "}
              <span className="block">
                with an eye for{" "}
                <span className="font-pixel-square text-[1.12em] tracking-normal [-webkit-text-stroke:0.03em_currentColor]">
                  {[...PIXEL_WORD].map((letter, i) => (
                    <span key={i} className={PIXEL_LETTER_COLORS[i % PIXEL_LETTER_COLORS.length]}>
                      {letter}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2} yOffset={8}>
            <p className="text-lg text-pretty text-foreground/80 sm:max-w-120 lg:max-w-(--measure-sub)">
              I build polished web applications, with a focus on design systems and accessibility.
            </p>
          </BlurFade>
        </div>
      </section>
    </Container>
  );
}
