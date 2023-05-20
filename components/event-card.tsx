import Image from 'next/image'
import { eventAssoApi } from '../pages/api/events/getEvents'
import style from './event-card.module.css'

export function EventCard({ assoEvent }: { assoEvent: eventAssoApi }) {
  const beginAtToDate = new Date(assoEvent.beginAt)
  const day = beginAtToDate.getDate()
  const mouth = `${beginAtToDate
    .toLocaleDateString('fr-FR', {
      month: 'short',
    })
    .slice(0, 3)}.`
  const year = beginAtToDate.getFullYear()
  const contentParsed = assoEvent.content.split('\n')
  return (
    <div className="flex flex-row w-[345px] h-56 justify-center overflow-hidden">
      <div className="w-[100px] flex flex-col justify-between py-3">
        <div className="flex flex-row gap-2 items-center justify-center">
          <h3 className="text-xl">{day}</h3>
          <div className="flex flex-col">
            <h3 className="font-semibold">{mouth}</h3>
            <h3 className="text-xs text-slate-500">{year}</h3>
          </div>
        </div>
        <a
          target="__blank"
          href={
            assoEvent.affichieUrl
              ? assoEvent.affichieUrl
              : '/affiche/defaultAffiche.jpeg'
          }
        >
          <Image
            src={
              assoEvent.affichieUrl
                ? assoEvent.affichieUrl
                : '/affiche/defaultAffiche.jpeg'
            }
            alt="affiche par default"
            height={100}
            width={200}
            style={{
              height: '150px',
              width: 'auto',
              objectFit: 'cover',
            }}
          />
        </a>
      </div>
      <div className="flex flex-col gap-1 w-[245px]">
        <div className="flex flex-row gap-1 justify-start items-center">
          <h2 className="text-xl text-center w-full">{assoEvent.title}</h2>
        </div>
        <div>
          {contentParsed.map((content) => {
            return <h2 className={style.content_area}>{content}</h2>
          })}
        </div>
      </div>
    </div>
  )
}
