import Image from 'next/image'
import { eventAssoApi } from '../pages/api/events/getEvents'

export function EventCard({ assoEvent }: { assoEvent: eventAssoApi }) {
  const beginAtToDate = new Date(assoEvent.beginAt)
  const day = beginAtToDate.getDate()
  const mouth = beginAtToDate.toLocaleDateString('fr-FR', {
    month: 'short',
  })
  const year = beginAtToDate.getFullYear()
  const ratioImage = 0.1
  const contentParsed = assoEvent.content.split('\n')
  return (
    <div className="flex flex-row gap-5 p-3 rounded-md shadow-md w-[340px] h-[180px] overflow-hidden justify-center items-center">
      <div className="w-[70px]">
        <Image
          src="/affiche/defaultAffiche.jpeg"
          alt="affiche par default"
          width={683 * ratioImage}
          height={1024 * ratioImage}
        />
      </div>
      <div className="flex flex-col gap-2 w-[220px]">
        <div className="flex flex-row gap-3 justify-start">
          <div className="flex flex-row gap-2 items-center justify-center">
            <h3 className="text-2xl">{day}</h3>
            <div className="flex flex-col">
              <h3 className="font-semibold">{mouth}</h3>
              <h3 className="text-xs text-slate-500">{year}</h3>
            </div>
          </div>
          <h2 className="text-2xl text-center w-[80%]">{assoEvent.title}</h2>
        </div>
        <div>
          {contentParsed.map((content) => {
            return <h2>{content}</h2>
          })}
        </div>
      </div>
    </div>
  )
}
