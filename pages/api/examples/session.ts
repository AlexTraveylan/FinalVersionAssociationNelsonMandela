// This is an example of how to access a session from an API route

import type { NextApiRequest, NextApiResponse } from 'next'
import { generateRSAKeyPair } from '../../../services/security.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { privateKey, publicKey } = generateRSAKeyPair()
  console.log(String(privateKey), String(publicKey))
}
