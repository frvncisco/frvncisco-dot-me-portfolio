import BlurFadeText from '@/components/magicui/blur-fade-text'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'
import { DATA } from '@/data/resume'

const BLUR_FADE_DELAY = 0.04

export default function Page() {
	return (
		<main className="min-h-[calc(100dvh-9rem)] sm:min-h-[calc(100dvh-12rem)] flex flex-col relative">
			<div className="fixed inset-0 z-0 overflow-hidden">
				<FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
			</div>
			<section id="hero" className="relative z-10 flex flex-1 flex-col justify-center">
				<div className="mx-auto w-full max-w-2xl flex flex-col gap-4">
					<BlurFadeText
						delay={BLUR_FADE_DELAY}
						className="font-serif text-4xl font-semibold tracking-tight [font-synthesis-weight:none] sm:text-5xl lg:text-6xl"
						yOffset={8}
						text={`Hey! 👋  I'm ${DATA.name.split(' ')[0]}, a Frontend Engineer building user-centric, visually captivating
digital interfaces`}
					/>
					{/* <BlurFadeText
            className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
            delay={BLUR_FADE_DELAY}
            text={DATA.description}
          /> */}
				</div>
			</section>
		</main>
	)
}
