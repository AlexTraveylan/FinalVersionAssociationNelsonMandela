import { LogAssoEvent } from '@prisma/client'
import prisma from '../prisma/prisma-client'

export class LogAssoEventService {
  async createLogAssoEvent(
    objectId: string,
    message: string
  ): Promise<LogAssoEvent> {
    const logAssoEvent = await prisma.logAssoEvent.create({
      data: { objectId, message },
    })
    return logAssoEvent
  }

  async deleteLogAssoEvent(id: number): Promise<LogAssoEvent> {
    const logAssoEvent = await prisma.logAssoEvent.delete({ where: { id } })
    return logAssoEvent
  }

  async getAllLogAssoEvents(): Promise<LogAssoEvent[]> {
    const logAssoEvents = await prisma.logAssoEvent.findMany()
    return logAssoEvents
  }

  async getLogAssoEventById(id: number): Promise<LogAssoEvent | null> {
    const logAssoEvent = await prisma.logAssoEvent.findUnique({ where: { id } })
    return logAssoEvent
  }
}
