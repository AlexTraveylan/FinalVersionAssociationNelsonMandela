import { ReactNode } from 'react'
import { Footer } from './footer'
import Header from './header'
import styles from './home.module.css'
import { NavBar } from './nav-bar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}
