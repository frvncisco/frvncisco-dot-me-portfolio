import { getBlogPosts } from 'app/db/blog'

export default async function sitemap() {
	const blogs = getBlogPosts().map((post) => ({
		url: `https://frvncisco.me/blog/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}))

	// const routes = ['', '/about', '/blog', '/uses', '/projects'].map((route) => ({
	// 	url: `https://frvncisco.me${route}`,
	// 	lastModified: new Date().toISOString().split('T')[0],
	// }))

	const routes = [''].map((route) => ({
		url: `https://frvncisco.me${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))

	return [...routes, ...blogs]
}
