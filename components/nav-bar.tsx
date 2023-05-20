import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import style from './nav-bar.module.css'
import { SvgClose, SvgMenu } from './shared/svgs'

type LinksNav = {
  title: string
  href: string
}

function NavBarContent({
  links,
  activeLink,
}: {
  links: LinksNav[]
  activeLink: string
}) {
  return (
    <>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={link.href === activeLink ? style.active : ''}
        >
          {link.title}
        </Link>
      ))}
    </>
  )
}

function NavBar() {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState('')
  const [isMenuOpen, setMenuOpen] = useState(true)
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setActiveLink(router.pathname)
    setMenuOpen(true)
  }, [router.pathname])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navRef.current &&
        event.target instanceof Node &&
        !navRef.current.contains(event.target)
      ) {
        setMenuOpen(true)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const links: LinksNav[] = [
    { title: 'Accueil', href: '/' },
    { title: 'Qui sommes-nous ?', href: '/about-us' },
    // { title: 'Comptabilité', href: '/comptabilite' },
    { title: 'Nous rejoindre', href: '/join-us' },
  ]

  return (
    <>
      <button
        className={style.menu__button}
        onClick={(event) => {
          event.stopPropagation()
          setMenuOpen(!isMenuOpen)
        }}
      >
        {isMenuOpen ? <SvgMenu /> : <SvgClose />}
      </button>
      <div className={style.nav__container}>
        <nav>
          <NavBarContent links={links} activeLink={activeLink} />
        </nav>
        <div ref={navRef} className={isMenuOpen ? style.open : style.sidebar}>
          <NavBarContent links={links} activeLink={activeLink} />
        </div>
      </div>
    </>
  )
}

export default NavBar
