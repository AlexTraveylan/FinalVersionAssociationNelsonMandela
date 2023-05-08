import { UserApp } from '@prisma/client'
import { prisma } from '../prisma/prisma-client'

export class UserAppService {
  async createUser(data: Omit<UserApp, 'id'>): Promise<UserApp> {
    const user = await prisma.userApp.create({ data })
    return user
  }

  async getUserByEmail(email: string): Promise<UserApp | null> {
    const user = await prisma.userApp.findUnique({ where: { email } })
    return user
  }

  async updateUser(id: number, data: Partial<UserApp>): Promise<UserApp> {
    const user = await prisma.userApp.update({ where: { id }, data })
    return user
  }

  async deleteUser(id: number): Promise<UserApp> {
    const user = await prisma.userApp.delete({ where: { id } })
    return user
  }
}
