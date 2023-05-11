import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from './nav-bar.module.css'

export function NavBar() {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    setActiveLink(router.pathname) // met à jour le lien actif lors du changement de route
  }, [router.pathname])

  const links = [
    { title: 'Accueil', href: '/' },
    { title: 'Qui sommes-nous ?', href: '/about-us' },
    // { title: 'Comptabilité', href: '/comptabilite' },
    { title: 'Nous rejoindre', href: '/join-us' },
  ]

  return (
    <>
      <div className={style.nav__container}>
        <nav>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={link.href === activeLink ? style.active : ''}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <hr />
    </>
  )
}
