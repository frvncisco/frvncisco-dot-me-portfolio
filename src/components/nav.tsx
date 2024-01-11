import Link from 'next/link'
import ThemeToggle from './theme-toggle'

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
}

/**
 * TODO: create NavLink component that tracks active page
 */
export function Navbar() {
	return (
		<aside className="navigation">
			<div className="navigation-wrapper">
				<nav>
					{Object.entries(navItems).map(([path, { name }]) => {
						return (
							<Link key={path} href={path} className="nav-item">
								{name}
							</Link>
						)
					})}
				</nav>
				<div className="self-center">
					<ThemeToggle />
				</div>
			</div>
		</aside>
	)
}
