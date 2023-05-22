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

  const privateKey =
    '-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEA5ruuf1oWrALDt023V0I447qPSZGd+A95HW0l59bOOE+AQiOb\nwzTRwQDbceH29HIu2BXTTKkoX2YeBwOsjJthKX1t3KfLlfDNN7AuFZmz9foWEPXI\n3n94qm7aYLBs7WpEfM5O7yy6GJyMuma5Zbc7yGCocDHZvrLxoIkcCA0Zc8aaVKag\nxmL0ZwYYmiFB9gy5yqnhf1tsorD+lxifeXsjAJHjwWpJ4BMYm69qswcrpU9jO1gY\nnJ1CmOU+9+iVUzmGO7T0n4pnB4e2UclYA4NDBrStT3CtHTkPMQyZ6Ts4z5VrwiMe\ncjLunJ2vJmGbzkibSe47CG/npx0cXu945L7xvQIDAQABAoH/IC0MDuma2WHvte0G\n8QqX5F05au9jmBqQST1vWJiCXL5TCuYfhcyLDUWRVJ0UuZuZH++E1Kv1dVhIPhiR\n3daaAuJhVhdDZliuRZXMCp1+Lk8xxJIbioU8NO6m69Thwjn17KTYkE7GC0Iv92go\npbnOHHArDRPmlmSRGlIEfRrwJOf8oBC1JscbcWuXrqAnEF6GxqYm0BYz5si4s3HA\nmXE9a8gPt5A5CPF371Jrf5rikeHI7eDRzGaQDhi/80XgesdBN0xW7ZTW+5i8Sdwx\npWkXBxxrCQJLtXbIzrTTW76Tps1FbJeh63TmwrL9ayctiVI4Kk/Q4TnDg6LtBKZ8\nz/+PAoGBAPYnmH+5nr5L8JX+fGUg3GjqTV1nrRLB5SsY3Um5T3FoUlldL21hdfMe\nb7pCkRXX379TDLNYvbwVBSbtZ4Fb1alcSsAr1ywy+KDB+/eUeyISCWbONb1IZXiI\ni9lzRAGgfhqjIptUpv7icnRY2zMsMiDv+0FBXmOzVVgh6d7UQrsbAoGBAO/2LuEb\n7hlF6YNOyS9fbg3c85+dgFiHQUN3TlBq4B4jNaChuMhtpboVVvXZsbjC6pYz2nak\niQlXtQilO1NpAs9J4Y9Vbp7DFnt+n5voMAbdtyMJSFb20XxUq4o3E6Wk2MRiq31K\nzQoi2/0BkHkzqcwySSkqcgKXRmdXuYy0zLwHAoGBAJmlL3gSGbb4WayWU3kgINPP\n5Ah4bTx3EJ9s/rtE0wSbtEMZekARBHmDNwQRBtSWkY+vvA66Rnv+tt+Mcf35n4z+\nEZ6P/tgU3MIjMy5fXNhwX7Pu5PZIGSY6POi3HOzTC8N+rlw8Y5xXJk/fIrt3S7bp\ndHBP6CXdS1kemgc/gIOfAoGAIjwXOBqJ/6UPyaIF5fJRezzYrR8FXpv9Xai5zZNR\n4jrXvdEU0dOC32eH/o9OYbO9UCyZsG+M9X5D37XjHuVOd1BtE8v2ekQPAxNvpgic\nQX6EUEVUwsN346sYxiFRdkJsgqgpGzj+w8FxbUk52XDberx535ukpGX8r2W+nSp2\nQyUCgYEA2H5rObHJs6Tmpm6QchVjwiHKtm+frjItY2hRHF+NIRvLQF0NCSf/Gvf2\n9zW6VT1OS9bUBpDqwcRqAb2h8+GYCVKBz09Bkha3zqMiEZwQLqhitN8SisdEOHa+\nBRojCYWy38M72bxGwH2r2GEV+5VL1kX9P2ot+IB9aJdIK8IjXyM=\n-----END RSA PRIVATE KEY-----\n'

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
