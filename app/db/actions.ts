// 'use server'

// import { auth } from 'app/auth'
// import { type Session } from 'next-auth'
// import { sql } from '@vercel/postgres'
// import { revalidatePath, unstable_noStore as noStore } from 'next/cache'

// export async function increment(slug: string) {
// 	noStore()
// 	await sql`
//     INSERT INTO views (slug, count)
//     VALUES (${slug}, 1)
//     ON CONFLICT (slug)
//     DO UPDATE SET count = views.count + 1
//   `
// }

// async function getSession(): Promise<Session> {
// 	const session = await auth()
// 	if (!session || !session.user) {
// 		throw new Error('Unauthorized')
// 	}

// 	return session
// }
