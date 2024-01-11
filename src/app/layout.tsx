import 'styles/global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from '../components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PreloadResources } from './preload'
import { Providers } from './context/providers'

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
			suppressHydrationWarning
			className={cx(GeistSans.variable, GeistMono.variable)}
		>
			<body>
				<main>
					<Providers>
						<div className="antialiased flex flex-col min-h-screen">
							<Navbar />
							{children}
						</div>
					</Providers>
					<Analytics />
					<SpeedInsights />
					<PreloadResources />
				</main>
			</body>
		</html>
	)
}
