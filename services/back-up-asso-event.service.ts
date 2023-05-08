import { BackUpAssoEvent } from '@prisma/client'
import { prisma } from '../prisma/prisma-client'

export class BackUpAssoEventService {
  async createBackUpAssoEvent(
    data: Omit<BackUpAssoEvent, 'id'>
  ): Promise<BackUpAssoEvent> {
    const backUpAssoEvent = await prisma.backUpAssoEvent.create({ data })
    return backUpAssoEvent
  }

  async deleteBackUpAssoEvent(id: number): Promise<BackUpAssoEvent> {
    const backUpAssoEvent = await prisma.backUpAssoEvent.delete({
      where: { id },
    })
    return backUpAssoEvent
  }

  async getAllBackUpAssoEvents(): Promise<BackUpAssoEvent[]> {
    const backUpAssoEvents = await prisma.backUpAssoEvent.findMany()
    return backUpAssoEvents
  }

  async getBackUpAssoEventById(id: number): Promise<BackUpAssoEvent | null> {
    const backUpAssoEvent = await prisma.backUpAssoEvent.findUnique({
      where: { id },
    })
    return backUpAssoEvent
  }
}
