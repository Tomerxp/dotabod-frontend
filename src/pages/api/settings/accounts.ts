import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import * as z from 'zod'

import prisma from '@/lib/db'
import { withMethods } from '@/lib/api-middlewares/with-methods'
import { withAuthentication } from '@/lib/api-middlewares/with-authentication'

const accountUpdateSchema = z.array(
  z.object({
    steam32Id: z.number().min(0),
    mmr: z.number().min(0).max(20000),
    name: z.string(),
  })
)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const userId = req.query.id as string

  if (!userId && !session?.user?.id) {
    return res.status(500).end()
  }

  if (req.method === 'GET') {
    try {
      const accounts = await prisma.steamAccount.findMany({
        select: {
          mmr: true,
          name: true,
          steam32Id: true,
        },
        where: {
          userId: session ? session?.user?.id : userId,
        },
      })

      return res.json({ accounts })
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === 'PATCH') {
    try {
      const body = accountUpdateSchema.parse(JSON.parse(req.body))
      const promises = []
      body.forEach((account) => {
        promises.push(
          prisma.steamAccount.update({
            data: {
              steam32Id: account.steam32Id,
              mmr: account.mmr,
              name: account.name,
            },
            where: {
              steam32Id: account.steam32Id,
            },
            select: {
              steam32Id: true,
              mmr: true,
              name: true,
            },
          })
        )
      })

      await Promise.all(promises).then((accounts) => {
        return res.json({ accounts })
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(500).end()
    }
  }
}

export default withMethods(['GET', 'PATCH'], withAuthentication(handler))
