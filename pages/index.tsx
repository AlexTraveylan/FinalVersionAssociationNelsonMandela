import { useEffect, useState } from 'react'
import { Carroussel, imageCaroussel } from '../components/caroussel'
import { EventCard } from '../components/event-card'
import Layout from '../components/layout'
import { ReservationBuvette } from '../components/reservation-buvette'
import { eventAssoApi } from './api/events/getEvents'

export default function HomePage() {
  const [lastEvent, setLastEvent] = useState<eventAssoApi>()
  const images: imageCaroussel[] = [
    {
      id: 0,
      imageUrl: '/accueil/ecole1.jpeg',
      width: 1024,
      height: 768,
      alt: 'Une image de la facade du groupe scolaire Nelson Mandela',
      titleContent: 'A propos de Nous',
      textContent:
        "L'APE a pour but d'animer la communauté de parents et d'aider l'école de diverses manière.",
      linkUrl: 'about-us',
    },
    // {
    //   id: 1,
    //   imageUrl: '/accueil/ecole2.jpeg',
    //   width: 1024,
    //   height: 768,
    //   alt: "Cette image montre l'entrée de la Maternelle du groupe scolaire",
    //   titleContent: 'Comptabilité',
    //   textContent: 'Une comptabilité transparente.',
    //   linkUrl: 'comptabilite',
    // },
    {
      id: 2,
      imageUrl: '/accueil/ecole3.jpg',
      width: 4032,
      height: 3024,
      alt: "Ici, on voit la cours de récréation des élémentaire du groupe scolaire lorsqu'on rentre par l'entrée Maternelle",
      titleContent: 'Historique',
      textContent: "Venez voir ce qu'on a déjà fait.",
      linkUrl: 'about-us',
    },
    {
      id: 3,
      imageUrl: '/accueil/ecole4.jpg',
      width: 4032,
      height: 3024,
      alt: 'Dans cette derniere image, on voit encore la cours de récréation des élementaire du groupe scolaire mais cette fois ci du point de vue de la sente.',
      titleContent: 'Rejoignez-nous',
      textContent: "Rejoignez l'association, et participez à l'aventure.",
      linkUrl: 'join-us',
    },
  ]

  async function recupEvents() {
    const response = await fetch('api/events/getEvents')
    if (response.ok) {
      const data: eventAssoApi[] = await response.json()
      const lastData: eventAssoApi = data.sort(
        (a, b) => new Date(b.beginAt).getTime() - new Date(a.beginAt).getTime()
      )[0]
      setLastEvent(lastData)
    }
  }

  useEffect(() => {
    recupEvents()
  }, [])

  return (
    <Layout>
      {lastEvent && (
        <div className="flex flex-col items-center py-3 gap-3 w-full">
          <h1 className="text-2xl text-emerald-500 font-semibold">
            Notre dernier événemment :
          </h1>
          <EventCard assoEvent={lastEvent} />
        </div>
      )}
      <div className="flex flex-col items-center py-3 gap-3 w-full">
        <h1 className="text-2xl text-emerald-500 font-semibold">
          En ce moment
        </h1>
        <ReservationBuvette />
      </div>
      <div className="w-full flex flex-col gap-3 py-3 items-center justify-center">
        <h1 className="text-2xl text-emerald-500 font-semibold">
          En savoir plus
        </h1>
        <Carroussel images={images} />
      </div>
    </Layout>
  )
}
