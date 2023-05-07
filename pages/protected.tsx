import { useSession } from 'next-auth/react'
import AccessDenied from '../components/access-denied'
import Layout from '../components/layout'

export default function ProtectedPage() {
  const { data: session } = useSession()

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
    </Layout>
  )
}
