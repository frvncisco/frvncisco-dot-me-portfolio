import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-[calc(100dvh-9rem)] sm:min-h-[calc(100dvh-12rem)] flex flex-col relative">
      <section id="hero" className="flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-12 md:gap-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </BlurFade>
          <div className="gap-4 flex flex-col">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="font-serif text-4xl font-semibold tracking-tight [font-synthesis-weight:none] sm:text-5xl lg:text-6xl"
              yOffset={8}
              text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
            />
            <BlurFadeText
              className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
              delay={BLUR_FADE_DELAY}
              text={DATA.description}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
