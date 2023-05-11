import type { NextApiRequest, NextApiResponse } from 'next'
import { UserAppAssoService } from '../../../services/userApp.service'

export type UserApi = {
  id: string
  name: string
  role: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userService = new UserAppAssoService()
  const users = await userService.getAllUsers()

  if (users) {
    const usersApi: UserApi[] = users.map((user) => {
      return {
        id: String(user.id),
        name: user.name,
        role: user.role ? user.role : 'Membre',
      }
    })
    return res.status(200).json({ usersApi })
  }

  return res.status(400).json({ message: 'clef non trouvée' })
}
