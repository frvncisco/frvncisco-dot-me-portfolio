import { promises as fs } from 'fs'
import path from 'path'
import dotenv from 'dotenv'

const template = `---
title: 'Hello, World!'
publishedAt: '2023-01-01'
summary: 'This is your first blog post.'
---

Hello, World!`

const homePage = `export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">hi, I'm frvncisco👋</h1>
      <p className="prose prose-neutral dark:prose-invert">
         This is my new portfolio. Currently under constuction🚧
      </p>
    </section>
  );
}
`

const aboutPage = `export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">About me</h1>
      <p className="prose prose-neutral dark:prose-invert">
         This is my about page.
      </p>
    </section>
  );
}
`

const projectsPage = `export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <p className="prose prose-neutral dark:prose-invert">
        This is where your work experience goes.
      </p>
    </section>
  );
}
`

const deleteFolderRecursive = async (path) => {
	const stat = await fs.stat(path)
	if (stat.isDirectory()) {
		const files = await fs.readdir(path)
		await Promise.all(
			files.map((file) => deleteFolderRecursive(`${path}/${file}`))
		)
		await fs.rmdir(path)
	} else {
		await fs.unlink(path)
	}
};

(async () => {
	dotenv.config()

	if (process.env.IS_TEMPLATE === 'false') {
		// This means it's not the template, it's my legit site
		// I orderride the env variable for my site. This means that when
		// folks clone this repo for the first time, it will delete my personal content
		return
	}

	const contentDir = path.join(process.cwd(), 'content')
	//const imagesDir = path.join(process.cwd(), 'public', 'images');
	const appDir = path.join(process.cwd(), 'app')
	const aboutDir = path.join(process.cwd(), 'app', 'about')
	const projectsDir = path.join(process.cwd(), 'app', 'projects')

	await deleteFolderRecursive(contentDir)
	//await deleteFolderRecursive(imagesDir);
	await fs.mkdir(contentDir)
	await fs.writeFile(path.join(contentDir, 'hello-world.mdx'), template)
	await fs.writeFile(path.join(appDir, 'page.tsx'), homePage)
	await fs.writeFile(path.join(aboutDir, 'page.tsx'), aboutPage)
	await fs.writeFile(path.join(projectsDir, 'page.tsx'), projectsPage)
})()
