import Image from 'next/image'
import Link from 'next/link'
export function ReservationBuvette() {
  return (
    <div>
      <Link
        href="https://www.helloasso.com/associations/ape-du-groupe-scolaire-nelson-mandela-de-bordeaux/boutiques/reservation-menu-chaud"
        target="_blank"
      >
        <Image
          src="/svg/buvette-reservation.svg"
          alt="Pré-réservez votre menu chaud à 2,5€ pour éviter les déceptions et nous aider à mieux gérer les stocks ! Le menu comprend un sandwich merguez et des chips, et une option végétarienne est disponible."
          width={450}
          height={450}
        />
      </Link>
    </div>
  )
}
