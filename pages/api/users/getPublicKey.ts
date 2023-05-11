// This is an example of to protect an API route

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const public_keySingleLine = process.env.PUBLIC_KEY
  if (public_keySingleLine) {
    const public_key = public_keySingleLine.replace(/\\n/g, '\n')
    return res.status(200).json({ public_key: public_key })
  }
  return res.status(400).json({ message: 'clef non trouvée' })
}
