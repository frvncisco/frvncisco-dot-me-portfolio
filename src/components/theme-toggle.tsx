'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const ThemeToggle = () => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<button
			type="button"
			aria-label="Toggle Dark Mode"
			className="theme-toggle"
			onClick={() => {
				setTheme(theme === 'light' ? 'dark' : 'light')
			}}
		>
			{theme === 'dark' && <SunIcon className="h-5 w-5" />}
			{theme === 'light' && <MoonIcon className="h-5 w-5" />}
		</button>
	)
}

export default ThemeToggle
