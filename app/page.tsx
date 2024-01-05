/* eslint-disable @next/next/no-img-element */
const Badge = (props) => {
	return (
		<a
			{...props}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
		/>
	)
}

export default function Page() {
	return (
		<section>
			<h1 className="mb-8 mt-2 text-3xl font-bold tracking-tight md:text-5xl">
				frvncisco.me is under construction 🏗️
			</h1>
			<h2 className="text-md mb-5 font-medium tracking-tighter">
				hola! I&apos;m Francisco Santana👋 — Frontend Engineer, Currently
				working @{' '}
				<Badge href="https://www.niche.com/about/">
					<img
						alt="Next.js logomark"
						src="/niche-logo.ico"
						className="ml-1 mr-1 inline-flex"
						width="14"
						height="14"
					/>
					Niche
				</Badge>
			</h2>
			<p className="prose prose-neutral mb-5 dark:prose-invert">
				My full website will be ready soon 😉 I&apos;m in the process of
				customizing a{' '}
				<span className="not-prose">
					<Badge href="https://vercel.com/templates/next.js/nextjs-portfolio">
						<img
							alt="Next.js logomark"
							src="/next-logo.svg"
							className="ml-1 mr-1 inline-flex"
							width="14"
							height="14"
						/>{' '}
						Next.js{' '}
					</Badge>
				</span>{' '}
				template that will serve as my little corner on the web. Feel free to
				follow my progress on the{' '}
				<Badge href="https://github.com/frvncisco/frvncisco-dot-me-portfolio">
					<img
						alt="Next.js logomark"
						src="/github-logo.svg"
						className="!mr-1"
						width="14"
						height="14"
					/>{' '}
					Github repo
				</Badge>
				.
			</p>
			<p className="prose prose-neutral mb-8 dark:prose-invert">
				Meanwhile, you can connect with me on{' '}
				<a
					href="https://www.linkedin.com/in/santanafrancisco/"
					target={'_blank'}
					rel="noopener noreferrer"
					className="underline"
				>
					Linkedin
				</a>{' '}
				or download my{' '}
				<a
					href="resume.pdf"
					target={'_blank'}
					rel="noopener noreferrer"
					className="underline"
				>
					resume
				</a>
			</p>
		</section>
	)
}
