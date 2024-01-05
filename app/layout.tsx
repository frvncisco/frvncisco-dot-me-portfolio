import 'styles/global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PreloadResources } from './preload'

export const metadata: Metadata = {
	metadataBase: new URL('https://frvncisco.me'),
	title: {
		default: 'Francisco Santana',
		template: '%s | Francisco Santana',
	},
	description: 'UI/UX Engineer',
	openGraph: {
		title: 'Francisco Santana',
		description: 'UI/UX Engineer',
		url: 'https://frvncisco.me',
		siteName: 'Francisco Santana',
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
		yandex: '14d2e73487fa6c71',
	},
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			className={cx(
				'bg-white text-black dark:bg-[#111010] dark:text-white',
				GeistSans.variable,
				GeistMono.variable,
			)}
		>
			<body className="mx-4 mb-40 mt-8 flex max-w-2xl flex-col antialiased md:flex-row lg:mx-auto">
				<main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
					<Navbar />
					{children}
					<Analytics />
					<SpeedInsights />
					<PreloadResources />
				</main>
			</body>
		</html>
	)
}
