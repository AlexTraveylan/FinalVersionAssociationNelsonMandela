import Link from 'next/link'
import Layout from '../components/layout'

export default function Organigramme() {
  return (
    <Layout>
      <Link href="join-us">Retour</Link>
      <img src="/svg/organi.svg" alt="" width={1000} />
    </Layout>
  )
}
