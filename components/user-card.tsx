import Image from 'next/image'
import { UserApi } from '../pages/api/users/getUsers'

export function UserCard({ user }: { user: UserApi }) {
  const parsedName = user.name.split(' ')
  const name = parsedName[0].toUpperCase()
  const firstname = `${parsedName[1].charAt(0).toUpperCase()}${parsedName[1]
    .slice(1)
    .toLowerCase()}`
  const imageRatio = 0.2
  return (
    <div className="flex flex-col gap-3 items-center shadow-xl p-5 rounded-md">
      <Image
        src="/profil/F_default_profil.png"
        alt="photo de profil par defaut"
        width={428 * imageRatio}
        height={530 * imageRatio}
      />
      <div className="flex flex-col items-center">
        <h2 className="text-xl font bold">
          {name} {firstname}
        </h2>
        <h2 className="text-xs">({user.role})</h2>
      </div>
    </div>
  )
}
