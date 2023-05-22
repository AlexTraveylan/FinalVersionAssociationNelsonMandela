import { Contribution, UserAppAsso } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import { ContributionService } from '../../../services/contribution.service'
import { privateKeyDecrypt } from '../../../services/security.service'
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

  const privateKey = process.env.PRIVATE_KEY
  console.log(String(privateKey))
  if (!privateKey) {
    return res.status(500).json({ message: 'Un probleme est survenu.' })
  }

  const {
    nom,
    prenom,
    encryptedEmail,
    membre,
    encryptedPhone,
  }: {
    nom: string
    prenom: string
    encryptedEmail: string
    membre: string
    encryptedPhone: string
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

  const encryptedEmailToBuffer = Buffer.from(encryptedEmail, 'base64')
  const emailBuffer = privateKeyDecrypt(encryptedEmailToBuffer, privateKey)
  const email = emailBuffer.toString('utf-8')
  console.log(email)

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
    phone: encryptedPhone === '' ? null : encryptedPhone,
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
    // TODO Supprimer l'utilisateur de la base de donnée
    return res.status(400).json({ message: 'Erreur' })
  }

  return res.status(201).json({ message: 'Création réussie' })
}
