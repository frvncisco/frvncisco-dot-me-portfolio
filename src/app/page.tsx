export default function Page() {
	return (
		<section className="wrapper">
			<h1 className="tablet:text-5xl mb-8 mt-2 text-3xl font-bold tracking-tight">
				Hola, I&apos;m Francisco!
			</h1>
			<h2 className="text-md mb-5 font-medium tracking-tighter">
				Welcome to my little corner on the interwebs. 👨🏾‍💻
			</h2>
			<p className="prose prose-neutral mb-5 dark:prose-invert">
				I&apos;m a design-minded software developer in Atlanta. Currently working @ 
			</p>
			<p className="prose prose-neutral mb-8 dark:prose-invert">
				Connect with me on{' '}
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
