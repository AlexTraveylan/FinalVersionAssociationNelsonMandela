import { Contribution, UserAppAsso } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ContributionService } from '../../../services/contribution.service'
import { UserAppAssoService } from '../../../services/userApp.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userService = new UserAppAssoService()
  const contributionService = new ContributionService()

  if (req.method === 'POST') {
    const {
      nom,
      prenom,
      email,
      membre,
      phone,
    }: {
      nom: string
      prenom: string
      email: string
      membre: string
      phone: string
    } = req.body

    const tryTofindUser = await userService.getUserByEmail(email)
    if (tryTofindUser) {
      return res.status(400).json({ message: 'Echec de la creation' })
    }

    const newUser: Omit<
      UserAppAsso,
      'id' | 'role' | 'profilePictureUrl' | 'createdAt' | 'isAdmin'
    > = {
      name: `${prenom} ${nom}`,
      email: email,
      isActive: membre === 'actif',
      phone: phone === '' ? null : phone,
    }

    const createdUser = await userService.createUser(newUser)
    if (!createdUser) {
      return res.status(400).json({ message: 'Echec de la creation' })
    }

    const newContribution: Omit<Contribution, 'id' | 'status' | 'begin'> = {
      userId: createdUser.id,
    }
    const createdContribution = await contributionService.createContribution(
      newContribution
    )
    if (!createdContribution) {
      return res.status(400).json({ message: 'Echec de la creation' })
    }

    return res.status(201).json({ message: 'Création réussie' })
  }

  return res.status(400).json({ message: 'Echec de la creation' })
}
