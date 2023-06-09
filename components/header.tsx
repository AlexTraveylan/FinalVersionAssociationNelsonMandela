import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from './nav-bar'
import { SvgConnexion, SvgDeconnexion } from './shared/svgs'

export default function Header() {
  const { data: session } = useSession()

  return (
    <>
      <header className="sticky top-0 bg-white z-50">
        <div className="flex flex-row justify-between items-center gap-5 h-24 px-3">
          <div className="sm:min-w-[10%] min-w-[50%]">
            <Link href="/">
              <Image
                src="/logo/LogoAsso.jpg"
                alt="Logo de l'association, c'est une image de Nelson Mandela avec l'inscription APE Nelson Mandela"
                width={145}
                height={73}
              />
            </Link>
          </div>
          <NavBar />
          {session && session.user ? (
            <>
              <Link
                className="min-w-[5%] flex justify-end"
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
                className="min-w-[5%] flex justify-end"
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                <div>
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
