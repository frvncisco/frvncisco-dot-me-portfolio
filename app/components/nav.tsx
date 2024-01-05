'use client'

import { motion, LayoutGroup } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

const navItems = {
	'/': {
		name: 'Home',
	},
	'/about': {
		name: 'About',
	},
	'/projects': {
		name: 'Projects',
	},
	'/blog': {
		name: 'Blog',
	},
	'/guestbook': {
		name: 'Guestbook',
	},
}

export function Navbar() {
	return (
		<aside className="-ml-[8px] mb-16 tracking-tight">
			<div className="lg:sticky lg:top-20">
				<LayoutGroup>
					<nav
						className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
						id="nav"
					>
						<div className="flex flex-row space-x-0 pr-10">
							<Suspense fallback={null}>
								{Object.entries(navItems).map(([path, { name }]) => {
									return <NavItem key={path} path={path} name={name} />
								})}
							</Suspense>
						</div>
					</nav>
				</LayoutGroup>
			</div>
		</aside>
	)
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

function NavItem({ path, name }: { path: string; name: string }) {
	let pathname = usePathname() || '/'
	if (pathname.includes('/blog/')) {
		pathname = '/blog'
	}
	const isActive = path === pathname

	return (
		<Link
			key={path}
			href={path}
			className={cx(
				'flex align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200',
				{
					'text-neutral-500': !isActive,
				},
			)}
		>
			<span className="relative px-2 py-1">
				{name}
				{path === pathname ? (
					<motion.div
						className="absolute inset-0 top-7 z-[-1] mx-2 h-[1px] bg-neutral-200 from-transparent to-neutral-900 dark:bg-neutral-800 dark:bg-gradient-to-r"
						layoutId="sidebar"
						transition={{
							type: 'spring',
							stiffness: 350,
							damping: 30,
						}}
					/>
				) : null}
			</span>
		</Link>
	)
}
