import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { SvgConnexion, SvgDeconnexion } from './shared/svgs'

export default function Header() {
  const { data: session } = useSession()
  const ratioImage = 0.35

  return (
    <>
      <header>
        <div className="flex flex-row justify-between items-center gap-5 flex-wrap h-24 px-3">
          <div className="min-w-[20%]">
            <Image
              src="/img/LogoAsso.jpg"
              alt="Logo de l'association, c'est une image de Nelson Mandela avec l'inscription APE Nelson Mandela"
              width={414 * ratioImage}
              height={208 * ratioImage}
            />
          </div>
          {session && session.user ? (
            <>
              <div className="hidden flex-col items-center sm:flex">
                <p>Connecté en tant que :</p>
                <p className="font-bold">
                  {session.user.name ?? session.user.email}
                </p>
              </div>
              <Link
                className="min-w-[20%] flex justify-end"
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                <div className="text-emerald-400">
                  <SvgDeconnexion />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link
                className="min-w-[20%] flex justify-end"
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                <div className="text-rose-500">
                  <SvgConnexion />
                </div>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  )
}
