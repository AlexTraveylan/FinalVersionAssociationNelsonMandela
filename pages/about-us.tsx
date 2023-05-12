import { useEffect, useState } from 'react'
import { EventCard } from '../components/event-card'
import Layout from '../components/layout'
import { Loader } from '../components/shared/loader'
import { UserCard } from '../components/user-card'
import { eventAssoApi } from './api/events/getEvents'
import { UserApi } from './api/users/getUsers'

export default function AboutUs() {
  const [showForm, setShowForm] = useState(false)
  const [events, setEvents] = useState<eventAssoApi[]>([])
  const [users, setUsers] = useState<UserApi[]>([])
  const [isLoad, setLoading] = useState(true)

  async function recupUsers() {
    const response = await fetch('api/users/getUsers')
    if (response.ok) {
      const data: { usersApi: UserApi[] } = await response.json()
      setUsers(data.usersApi)
    }
  }

  async function recupEvents() {
    const response = await fetch('api/events/getEvents')
    if (response.ok) {
      const data: eventAssoApi[] = await response.json()
      setEvents(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    recupEvents()
    recupUsers()
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
      {/* <div className="flex flex-col items-center m-3">
        <h1>Créer un nouvel Evenement</h1>
        <div onClick={() => setShowForm(!showForm)}>
          <SvgPlus size={40} stroke={1.7} />
        </div>
      </div>
      {showForm && (
        <EventForm setShowForm={setShowForm} recupEvents={recupEvents} />
      )} */}
      {events.length > 0 && (
        <div className="flex flex-col gap-3 items-center py-3">
          <h1 className="text-3xl text-emerald-400">Nos Evenements</h1>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {events
              .sort((event1, event2) => {
                return (
                  new Date(event2.beginAt).getTime() -
                  new Date(event1.beginAt).getTime()
                )
              })
              .map((event) => {
                return (
                  <div key={event.id + 1000}>
                    <EventCard assoEvent={event} />
                  </div>
                )
              })}
          </div>
        </div>
      )}
      {users.length > 0 && (
        <div className="flex flex-col gap-3 items-center py-3">
          <h1 className="text-3xl text-emerald-400">Nos Membres</h1>
          <div className="flex flex-row flex-wrap items-center justify-center gap-5">
            {users.map((user) => {
              return (
                <div key={user.id + 10000}>
                  <UserCard user={user} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Layout>
  )
}
