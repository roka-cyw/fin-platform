import { Hono } from 'hono'
import { db } from '@/db/drizzle'
import { eq } from 'drizzle-orm'
import { accounts } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
// import { HTTPException } from 'hono/http-exception'

const app = new Hono().get('/', clerkMiddleware(), async c => {
  const auth = getAuth(c)

  if (!auth?.userId) {
    return c.json({ error: 'Unauthorized' }, 401)
    // throw new HTTPException(401, {
    //   res: c.json(
    //     {
    //       error: 'Unauthorized'
    //     },
    //     401
    //   )
    // })
  }

  const data = await db
    .select({
      id: accounts.id,
      nanme: accounts.name
    })
    .from(accounts)
    .where(eq(accounts.userId, auth.userId))

  return c.json({ data })
})

export default app
