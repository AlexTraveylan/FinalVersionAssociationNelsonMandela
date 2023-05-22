import type { NextApiRequest, NextApiResponse } from 'next'
import { generateRSAKeyPair } from '../../../services/security.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { privateKey, publicKey } = generateRSAKeyPair()
  console.log(String(privateKey), String(publicKey))

  return res.status(200).json({ privateKey: privateKey, publicKey: publicKey })
}
