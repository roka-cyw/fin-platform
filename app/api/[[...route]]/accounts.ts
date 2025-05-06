import { z } from 'zod'
import { Hono } from 'hono'
import { db } from '@/db/drizzle'
import { and, eq, inArray } from 'drizzle-orm'
import { accounts, insertAccountSchema } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { createId } from '@paralleldrive/cuid2'
// import { HTTPException } from 'hono/http-exception'

const validateInsertAccountSchema = zValidator('json', insertAccountSchema.pick({ name: true }))
const validateDeleteSchemaSchema = zValidator(
  'json',
  z.object({
    ids: z.array(z.string())
  })
)
const validateEditAccountSchema = zValidator('param', z.object({ id: z.string().optional() }))
const validatePatcSchema = zValidator('param', z.object({ id: z.string().optional() }))
const validatePatcSchema2 = zValidator('json', insertAccountSchema.pick({ name: true }))

const app = new Hono()
  .get('/', clerkMiddleware(), async c => {
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
        name: accounts.name
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId))

    return c.json({ data })
  })
  .get('/:id', validateEditAccountSchema, clerkMiddleware(), async c => {
    const auth = getAuth(c)
    const { id } = c.req.valid('param')

    if (!id) {
      return c.json({ error: 'Invalid id' }, 400)
    }

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const [data] = await db
      .select({
        id: accounts.id,
        name: accounts.name
      })
      .from(accounts)
      .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))

    if (!data) {
      return c.json({ error: 'Account not found' }, 404)
    }

    return c.json({ data })
  })
  .post('/', clerkMiddleware(), validateInsertAccountSchema, async c => {
    const auth = getAuth(c)
    const values = c.req.valid('json')

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const [data] = await db
      .insert(accounts)
      .values({
        id: createId(),
        userId: auth.userId,
        ...values
      })
      .returning()

    return c.json({ data })
  })
  .post('/bulk-delete', clerkMiddleware(), validateDeleteSchemaSchema, async c => {
    const auth = getAuth(c)
    const values = c.req.valid('json')
    const ids = values.ids

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const data = await db
      .delete(accounts)
      .where(and(eq(accounts.userId, auth.userId), inArray(accounts.id, values.ids)))
      .returning({
        id: accounts.id
      })

    return c.json({ data })
  })
  .patch('/:id', clerkMiddleware(), validatePatcSchema, validatePatcSchema2, async c => {
    const auth = getAuth(c)
    const { id } = c.req.valid('param')
    const values = c.req.valid('json')

    console.log('==', id)

    if (!id) {
      return c.json({ error: 'Id is missed' }, 400)
    }

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const [data] = await db
      .update(accounts)
      .set(values)
      .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))
      .returning()

    if (!data) {
      return c.json({ error: 'Not found' }, 404)
    }

    return c.json({ data })
  })

export default app
