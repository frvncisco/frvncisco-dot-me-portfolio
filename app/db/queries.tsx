'use server'

// import { auth, youtube } from '@googleapis/youtube'
import { sql } from '@vercel/postgres'
import {
  // unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache'

// const googleAuth = new auth.GoogleAuth({
// 	credentials: {
// 		client_email: process.env.GOOGLE_CLIENT_EMAIL,
// 		private_key: process.env.GOOGLE_PRIVATE_KEY,
// 	},
// 	scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
// })

// const yt = youtube({
// 	version: 'v3',
// 	auth: googleAuth,
// })

export async function getBlogViews() {
  if (!process.env.POSTGRES_URL) {
    return []
  }

  noStore()
  const data = await sql`
    SELECT count
    FROM views
  `

  return data.rows.reduce((acc, curr) => acc + Number(curr.count), 0)
}

export async function getViewsCount() {
  if (!process.env.POSTGRES_URL) {
    return []
  }

  noStore()
  const data = await sql`
    SELECT slug, count
    FROM views
  `

  return data.rows as { slug: string; count: number }[]
}

export async function getGuestbookEntries() {
  if (!process.env.POSTGRES_URL) {
    return []
  }

  noStore()
  const entries = await sql`
    SELECT id, body, created_by, updated_at
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT 100
  `
  return entries.rows
}
