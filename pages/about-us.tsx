import { useEffect, useState } from 'react'
import { EventForm } from '../components/event-form'
import Layout from '../components/layout'
import { Loader } from '../components/shared/loader'
import { SvgPlus } from '../components/shared/svgs'
import { eventAssoApi } from './api/getEvents'

export default function AboutUs() {
  const [showForm, setShowForm] = useState(false)
  const [events, setEvents] = useState<eventAssoApi[]>([])
  const [isLoad, setLoading] = useState(true)

  async function recupEvents() {
    setLoading(true)
    const response = await fetch('api/getEvents')
    if (response.ok) {
      const data: eventAssoApi[] = await response.json()
      setEvents(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    recupEvents()
  }, [])

  if (isLoad) {
    return (
      <Layout>
        <Loader show={isLoad} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col items-center m-3">
        <h1>Créer un nouvel Evenement</h1>
        <div onClick={() => setShowForm(!showForm)}>
          <SvgPlus size={40} stroke={1.7} />
        </div>
      </div>
      {showForm && <EventForm setShowForm={setShowForm} />}
    </Layout>
  )
}
