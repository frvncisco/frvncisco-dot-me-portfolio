export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
				disallow: '/resume.pdf',
			},
		],
		sitemap: 'https://frvncisco.me/sitemap.xml',
		host: 'https://frvncisco.me',
	}
}
