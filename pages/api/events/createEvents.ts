import { AssoEvent } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { AssoEventService } from '../../../services/asso-event.service'
import { UserAppAssoService } from '../../../services/userApp.service'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const userService = new UserAppAssoService()
  const eventService = new AssoEventService()
  // const ERROR = res.status(400).json({ message: 'Echec de la creation' })

  console.log(req.body)

  if (session?.user?.email && req.method === 'POST') {
    // const currentUser = await userService.getUserByEmail(session.user.email)
    // if (!currentUser?.isAdmin) return ERROR

    const { afficheUrl, beginAt, title, content, linkUrl, linkContent } =
      req.body

    console.log(req.body)

    const timeStampForBeginAt = Date.parse(beginAt)

    const newEvent: Omit<
      AssoEvent,
      'id' | 'createdAt' | 'modifyAt' | 'modifyBy'
    > = {
      afficheUrl: null,
      // createdBy: currentUser.name,
      createdBy: 'admin',
      beginAt: new Date(timeStampForBeginAt),
      title: title,
      content: content,
      linkUrl: linkUrl,
      linkContent: linkContent,
    }

    const createdEvent = await eventService.createAssoEvent(newEvent)
    if (!createdEvent)
      return res.status(400).json({ message: 'Echec de la creation' })

    return res.status(201).json({ message: 'Création réussie' })
  }
  return res.status(400).json({ message: 'Echec de la creation' })
}
