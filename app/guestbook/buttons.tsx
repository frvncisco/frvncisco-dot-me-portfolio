/* eslint-disable @next/next/no-img-element */
'use client'

import { signIn, signOut } from 'next-auth/react'

export function SignOut() {
	return (
		<button
			className="mb-6 mt-2 text-xs text-neutral-700 dark:text-neutral-300"
			onClick={() => signOut()}
		>
			Sign out
		</button>
	)
}

export function SignIn() {
	return (
		<button
			className="mb-8 inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-3 py-2 text-sm leading-4 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
			onClick={() => signIn('github')}
		>
			<img alt="GitHub logo" src="/github-logo.svg" width="20" height="20" />
			<div className="ml-3">Sign in with GitHub</div>
		</button>
	)
}
