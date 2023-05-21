import { Contribution } from '@prisma/client'
import prisma from '../prisma/prisma-client'

export class ContributionService {
  async createContribution(
    data: Omit<Contribution, 'id' | 'status' | 'begin'>
  ): Promise<Contribution> {
    const contribution = await prisma.contribution.create({ data })
    return contribution
  }

  async updateContribution(
    id: number,
    data: Partial<Contribution>
  ): Promise<Contribution> {
    const contribution = await prisma.contribution.update({
      where: { id },
      data,
    })
    return contribution
  }

  async getContributionById(id: number): Promise<Contribution | null> {
    const contribution = await prisma.contribution.findUnique({ where: { id } })
    return contribution
  }
}
