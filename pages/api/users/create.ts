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

    const privateKeySingleLine = process.env.PRIVATE_KEY
    if (!privateKeySingleLine || !encryptedEmail) {
      return res.status(400).json({ message: 'Echec de la creation' })
    }

    const privateKey = privateKeySingleLine.replace(/\\n/g, '\n')

    const encryptedEmail_buffer = Buffer.from(encryptedEmail, 'base64')
    const privateKey_buffer = Buffer.from(privateKey, 'base64')

    try {
      const emailDecrypted = privateKeyDecrypt(
        encryptedEmail_buffer,
        privateKey_buffer
      )
    } catch (error) {
      console.error('Erreur lors du décryptage :', error)
      // Vous pouvez renvoyer une réponse avec l'erreur pour la voir côté client
      return res
        .status(500)
        .json({ message: 'Erreur lors du décryptage', error: error })
    }

    // const emailDecrypted = privateKeyDecrypt(
    //   encryptedEmail_buffer,
    //   privateKey_buffer
    // )

    // const emailDecryptedToString = emailDecrypted.toString('utf-8')

    //   const tryToFindUser = await userService.getUserByEmail(
    //     emailDecryptedToString
    //   )
    //   if (tryToFindUser) {
    //     return res.status(400).json({ message: 'Echec de la creation' })
    //   }

    //   let phoneDecrypted!: Buffer
    //   if (encryptedPhone != '') {
    //     const encryptedPhone_buffer = Buffer.from(encryptedPhone, 'utf-8')
    //     phoneDecrypted = privateKeyDecrypt(
    //       encryptedPhone_buffer,
    //       privateKey_buffer
    //     )
    //   }

    //   const newUser: Omit<
    //     UserAppAsso,
    //     'id' | 'role' | 'profilePictureUrl' | 'createdAt' | 'isAdmin'
    //   > = {
    //     name: `${prenom} ${nom}`,
    //     email: emailDecryptedToString,
    //     isActive: membre === 'actif',
    //     phone: encryptedPhone === '' ? null : phoneDecrypted.toString('utf-8'),
    //   }

    //   const createdUser = await userService.createUser(newUser)
    //   if (!createdUser) {
    //     return res.status(400).json({ message: 'Echec de la creation' })
    //   }

    //   const newContribution: Omit<Contribution, 'id' | 'status' | 'begin'> = {
    //     userId: createdUser.id,
    //   }
    //   const createdContribution = await contributionService.createContribution(
    //     newContribution
    //   )
    //   if (!createdContribution) {
    //     return res.status(400).json({ message: 'Echec de la creation' })
    //   }

    return res.status(201).json({ message: 'Création réussie' })
  }

  return res.status(400).json({ message: 'Echec de la creation' })
}
