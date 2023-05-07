import Link from 'next/link'
import { useState } from 'react'
import style from './nav-bar.module.css'

export function NavBar() {
  const [activeLink, setActiveLink] = useState<number | null>(null)

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    setActiveLink(index)
  }

  const links = [
    { title: 'Accueil', href: '/' },
    { title: 'Nous', href: '/about-us' },
    { title: 'Comptabilité', href: '/comptabilite' },
    { title: 'Nous rejoindre', href: 'join-us' },
  ]
  return (
    <>
      <div className={style.nav__container}>
        <nav>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={(event) => handleLinkClick(event, index)}
              className={index === activeLink ? style.active : ''}
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
