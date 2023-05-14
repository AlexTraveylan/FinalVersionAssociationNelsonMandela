import { Contribution, UserAppAsso } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import { ContributionService } from '../../../services/contribution.service'
import { UserAppAssoService } from '../../../services/userApp.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userService = new UserAppAssoService()
  const contributionService = new ContributionService()

  if (req.method != 'POST') {
    return res.status(405).json({ message: 'Methode non autorisée' })
  }

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

  // Validation du nom
  if (!validator.matches(nom.trim(), /^[a-zA-Zéèïôùç]+$/)) {
    return res
      .status(405)
      .json({ message: 'Tentative de passer outre les restrictions' })
  }
  if (!validator.isLength(nom.trim(), { min: 2 })) {
    return res
      .status(405)
      .json({ message: 'Tentative de passer outre les restrictions' })
  }
  // Validation du prenom
  if (!validator.matches(prenom.trim(), /^[a-zA-Zéèïôùç]+$/)) {
    return res
      .status(405)
      .json({ message: 'Tentative de passer outre les restrictions' })
  }
  if (!validator.isLength(prenom.trim(), { min: 2 })) {
    return res
      .status(405)
      .json({ message: 'Tentative de passer outre les restrictions' })
  }
  // Validation de l'email
  if (!validator.isEmail(email.trim())) {
    return res
      .status(405)
      .json({ message: 'Tentative de passer outre les restrictions' })
  }
  if (validator.matches(email.trim(), /\+/)) {
    return res
      .status(405)
      .json({ message: 'Tentative de passer outre les restrictions' })
  }
  // Validation du phone
  if (phone.trim() !== '' && !validator.isMobilePhone(phone.trim())) {
    return res
      .status(405)
      .json({ message: 'Tentative de passer outre les restrictions' })
  }

  const tryTofindUser = await userService.getUserByEmail(email)
  if (tryTofindUser) {
    return res.status(400).json({ message: 'Erreur' })
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
    return res.status(400).json({ message: 'Erreur' })
  }

  const newContribution: Omit<Contribution, 'id' | 'status' | 'begin'> = {
    userId: createdUser.id,
  }
  const createdContribution = await contributionService.createContribution(
    newContribution
  )
  if (!createdContribution) {
    return res.status(400).json({ message: 'Erreur' })
  }

  return res.status(201).json({ message: 'Création réussie' })
}
