/* eslint-disable react/prop-types */
import type { Metadata } from 'next'
import { Suspense, cache } from 'react'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { getViewsCount } from 'app/db/queries'
import { getBlogPosts } from 'app/db/blog'
import ViewCounter from '../view-counter'
import { increment } from 'app/db/actions'

export async function generateMetadata({
	params,
}): Promise<Metadata | undefined> {
	const post = getBlogPosts().find((post) => post.slug === params.slug)
	if (!post) {
		return
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata
	const ogImage = image
		? `https://frvncisco.me${image}`
		: `https://frvncisco.me/og?title=${title}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://frvncisco.me/blog/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

function formatDate(date: string) {
	const currentDate = new Date()
	if (!date.includes('T')) {
		date = `${date}T00:00:00`
	}
	const targetDate = new Date(date)

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
	const daysAgo = currentDate.getDate() - targetDate.getDate()

	let formattedDate = ''

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`
	} else {
		formattedDate = 'Today'
	}

	const fullDate = targetDate.toLocaleString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})

	return `${fullDate} (${formattedDate})`
}

export default function Blog({ params }) {
	const post = getBlogPosts().find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `https://frvncisco.me${post.metadata.image}`
							: `https://frvncisco.me?title=${post.metadata.title}`,
						url: `https://frvncisco.me/blog/${post.slug}`,
						author: {
							'@type': 'Person',
							name: 'Francisco Santana',
						},
					}),
				}}
			/>
			<h1 className="title max-w-[650px] text-2xl font-medium tracking-tighter">
				{post.metadata.title}
			</h1>
			<div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(post.metadata.publishedAt)}
				</p>
				<Suspense fallback={<p className="h-5" />}>
					<Views slug={post.slug} />
				</Suspense>
			</div>
			<article className="prose prose-neutral prose-quoteless dark:prose-invert">
				<CustomMDX source={post.content} />
			</article>
		</section>
	)
}

const incrementViews = cache(increment)

async function Views({ slug }: { slug: string }) {
	const views = await getViewsCount()
	incrementViews(slug)
	return <ViewCounter allViews={views} slug={slug} />
}
