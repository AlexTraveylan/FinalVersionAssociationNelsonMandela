import { UserAppAsso } from '@prisma/client'
import { prisma } from '../prisma/prisma-client'

export class UserAppAssoService {
  async createUser(
    data: Omit<
      UserAppAsso,
      'id' | 'role' | 'profilePictureUrl' | 'createdAt' | 'isAdmin'
    >
  ): Promise<UserAppAsso> {
    const user = await prisma.userAppAsso.create({ data })
    return user
  }

  async getUserByEmail(email: string): Promise<UserAppAsso | null> {
    const user = await prisma.userAppAsso.findUnique({ where: { email } })
    return user
  }

  async updateUser(
    id: number,
    data: Partial<UserAppAsso>
  ): Promise<UserAppAsso> {
    const user = await prisma.userAppAsso.update({ where: { id }, data })
    return user
  }

  async deleteUser(id: number): Promise<UserAppAsso> {
    const user = await prisma.userAppAsso.delete({ where: { id } })
    return user
  }

  async getAllUsers(): Promise<UserAppAsso[]> {
    const users = await prisma.userAppAsso.findMany()
    return users
  }
}
