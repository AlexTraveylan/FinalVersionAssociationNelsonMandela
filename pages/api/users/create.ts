import { Contribution, UserAppAsso } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ContributionService } from '../../../services/contribution.service'
import { privateKeyDecrypt } from '../../../services/security.service'
import { UserAppAssoService } from '../../../services/userApp.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userService = new UserAppAssoService()
  const contributionService = new ContributionService()
  const ERROR = res.status(400).json({ message: 'Echec de la creation' })

  if (req.method === 'POST') {
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

    const privateKey = process.env.PRIVATE_KEY
    if (!privateKey || !encryptedEmail) return ERROR
    const encryptedEmail_buffer = Buffer.from(encryptedEmail, 'utf-8')
    const privateKey_buffer = Buffer.from(privateKey, 'utf-8')
    const emailDecrypted = privateKeyDecrypt(
      encryptedEmail_buffer,
      privateKey_buffer
    )
    const emailDecryptedToString = emailDecrypted.toString('utf-8')

    const tryToFindUser = await userService.getUserByEmail(
      emailDecryptedToString
    )
    if (tryToFindUser) return ERROR

    let phoneDecrypted: Buffer | null = null
    if (encryptedPhone != '') {
      const encryptedPhone_buffer = Buffer.from(encryptedPhone, 'utf-8')
      phoneDecrypted = privateKeyDecrypt(
        encryptedPhone_buffer,
        privateKey_buffer
      )
    }

    const newUser: Omit<
      UserAppAsso,
      'id' | 'role' | 'profilePictureUrl' | 'createdAt' | 'isAdmin'
    > = {
      name: `${prenom} ${nom}`,
      email: emailDecryptedToString,
      isActive: membre === 'actif',
      phone: phoneDecrypted ? phoneDecrypted.toString('utf-8') : null,
    }

    const createdUser = await userService.createUser(newUser)
    if (!createdUser) return ERROR

    const newContribution: Omit<Contribution, 'id' | 'status' | 'begin'> = {
      userId: createdUser.id,
    }
    const createdContribution = await contributionService.createContribution(
      newContribution
    )
    if (!createdContribution) return ERROR

    return res.status(201).json({ message: 'Création réussie' })
  }
}
