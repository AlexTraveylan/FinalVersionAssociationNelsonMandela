import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Petition from '../components/petition'
import { PresentationAsso } from '../components/presentation-asso'
import { ReservationBuvette } from '../components/reservation-buvette'
import { RoundedConstellation } from '../components/rounded-constellation'
import Button from '../components/shared/btn-accueil'
import { eventAssoApi } from './api/events/getEvents'

export default function HomePage() {
  const [lastEvent, setLastEvent] = useState<eventAssoApi>()

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
      <Petition />
      <div className="flex flex-row flex-wrap gap-20 items-center justify-center py-5">
        <RoundedConstellation />
        <PresentationAsso />
      </div>
      {lastEvent && (
        <div className="w-full min-[1480px]:relative">
          <div className="min-[1480px]:w-full min-[1480px]:bg-white min-[1480px]:h-72"></div>
          <div className="min-[1480px]:w-full min-[1480px]:bg-black min-[1480px]:h-72"></div>
          <div className="min-[1480px]:absolute min-[1480px]:top-1/2 min-[1480px]:left-1/2 min-[1480px]:translate-x-[-50%] min-[1480px]:translate-y-[-50%] bg-slate-50">
            <div className="flex flex-row flex-wrap gap-5 justify-center p-5">
              <div className="p-5 flex flex-col gap-3 w-[360px] items-center">
                <h2 className="font-semibold text-2xl text-center">
                  Qui sommes nous ?
                </h2>
                <p>
                  Bienvenue à l'Association des Parents d'Élèves. Nous mettons
                  en scène des événements mémorables pour enrichir l'expérience
                  éducative de nos enfants. Nos kermesses sont des festivals
                  vibrants avec des jeux pour nos enfants, nos goûters sont des
                  moments de convivialité avec des mets préparés par nos parents
                  bénévoles et nous soutenons activement les fêtes scolaires
                  pour célébrer la diversité et le talent de nos enfants.
                  Rejoignez-nous dans cette belle aventure.
                </p>
                <Link href="/about-us">
                  <Button mode="dark">En savoir plus</Button>
                </Link>
              </div>
              <Link
                href={lastEvent.affichieUrl!}
                target="_blank"
                className="flex items-center justify-center w-[360px]"
              >
                <Image
                  src={lastEvent.affichieUrl!}
                  alt="image de l'affiche du dernier événement de l'association"
                  width={256}
                  height={256}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
      <ReservationBuvette />
    </Layout>
  )
}
