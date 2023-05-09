import { AssoEvent } from '@prisma/client'
import { prisma } from '../prisma/prisma-client'

export class AssoEventService {
  async createAssoEvent(
    data: Omit<AssoEvent, 'id' | 'createdAt' | 'modifyAt' | 'modifyBy'>
  ): Promise<AssoEvent> {
    const assoEvent = await prisma.assoEvent.create({ data })
    return assoEvent
  }

  async updateAssoEvent(
    id: number,
    data: Partial<AssoEvent>
  ): Promise<AssoEvent> {
    const assoEvent = await prisma.assoEvent.update({ where: { id }, data })
    return assoEvent
  }

  async deleteAssoEvent(id: number): Promise<AssoEvent> {
    const assoEvent = await prisma.assoEvent.delete({ where: { id } })
    return assoEvent
  }

  async getAllAssoEvents(): Promise<AssoEvent[]> {
    const assoEvents = await prisma.assoEvent.findMany()
    return assoEvents
  }

  async getAssoEventById(id: number): Promise<AssoEvent | null> {
    const assoEvent = await prisma.assoEvent.findUnique({ where: { id } })
    return assoEvent
  }
}
