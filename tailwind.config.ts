import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		'./app/**/*.{ts,tsx}',
		'./content/**/*.mdx',
		'./public/**/*.svg',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			mobile: '640px',
			tablet: '768px',
			laptop: '1024px',
			desktop: '1280px',
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-geist-sans)'],
				mono: ['var(--font-geist-mono)'],
			},
			typography: {
				quoteless: {
					css: {
						'blockquote p:first-of-type::before': { content: 'none' },
						'blockquote p:first-of-type::after': { content: 'none' },
					},
				},
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [typography],
}
