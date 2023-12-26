/* eslint-disable @next/next/no-img-element */
const Badge = (props) =>{
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
    />
  )
}

export default function Page() {
  return (
    <section>
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mt-2 mb-8">frvncisco.dev is under construction 🏗️</h1>
      <h2 className="font-medium text-md mb-5 tracking-tighter">hola! I&apos;m Francisco Santana👋 — Frontend Engineer, Currently working @ <Badge href="https://www.niche.com/about/">	<img
        alt="Next.js logomark"
        src="/niche-logo.ico"
        className="inline-flex mr-1 ml-1"
        width="14"
        height="14"
      />Niche</Badge></h2>
      <p className="prose prose-neutral dark:prose-invert mb-5">
         My full website will be ready soon 😉 I&apos;m in the process of customizing a <span className="not-prose"><Badge href="https://vercel.com/templates/next.js/nextjs-portfolio"> 
          <img
            alt="Next.js logomark"
            src="/next-logo.svg"
            className="inline-flex mr-1 ml-1"
            width="14"
            height="14"
          /> Next.js </Badge></span> template that will serve as my little corner on the web. Feel free to follow my progress on the <Badge href="https://github.com/frvncisco/frvncisco-dot-me-portfolio">
          <img
            alt="Next.js logomark"
            src="/github-logo.svg"
            className="!mr-1"
            width="14"
            height="14"
          /> Github repo
        </Badge>.
      </p>
      <p className="prose prose-neutral dark:prose-invert mb-8">Meanwhile, you can connect with me on <a href="https://www.linkedin.com/in/santanafrancisco/" target={'_blank'} rel="noopener noreferrer" className="underline">Linkedin</a> or download my <a href="resume.pdf" target={'_blank'} rel="noopener noreferrer" className="underline">resume</a></p>
    </section>
  )
}
