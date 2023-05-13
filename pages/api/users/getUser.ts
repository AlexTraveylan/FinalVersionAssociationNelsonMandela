import type { NextApiRequest, NextApiResponse } from 'next'

export type UserApi = {
  id: string
  name: string
  role: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({ message: 'ok' })
}
