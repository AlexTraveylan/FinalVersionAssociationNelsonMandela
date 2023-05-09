import { AssoEvent } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AssoEventService } from '../../../services/asso-event.service'

export type eventAssoApi = {
  id: string
  beginAt: string
  title: string
  content: string
  linkContent: string | null
  linkUrl?: string | undefined | null
  affichieUrl?: string | undefined | null
}

export function convertEventToEventApi(eventAsso: AssoEvent) {
  const id = String(eventAsso.id)
  const beginAt = eventAsso.beginAt.toISOString()

  const eventApi: eventAssoApi = {
    id: id,
    beginAt: beginAt,
    title: eventAsso.title,
    content: eventAsso.content,
    linkContent: eventAsso.linkContent,
    linkUrl: eventAsso?.linkUrl,
    affichieUrl: eventAsso?.afficheUrl,
  }

  return eventApi
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventService = new AssoEventService()
  const events = await eventService.getAllAssoEvents()

  if (events) {
    return res
      .status(200)
      .json(events.map((event) => convertEventToEventApi(event)))
  }

  return res
    .status(404)
    .json({ error: 'Echec dans la recuperation des events' })
}
