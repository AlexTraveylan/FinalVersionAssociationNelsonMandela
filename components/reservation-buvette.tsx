import Image from 'next/image'
import Link from 'next/link'
export function ReservationBuvette() {
  return (
    <div className="w-full bg-black text-white flex flex-col items-center py-5">
      <div className="flex flex-col items-center justify-center p-5 w-[360px] md:w-full">
        <h2 className="text-xs">EN CE MOMENT</h2>
        <h3 className="text-2xl font-semibold mb-3">Fête de l'école</h3>
        <p className="text-xs">
          L'association participe à la fête de l'école. Nous tiendrons des
          stands d'animation. Et nous vendrons un menu chaud. Reservez
          maintenant !
        </p>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-5">
        <div className="w-[360px] flex flex-col items-center gap-2">
          <h2 className="font-semibold text-xl">Plus de détails ?</h2>
          <h3 className="text-center">
            Cliquez sur l'affiche pour voir les détails du déroulement de
            l'événement.
          </h3>
          <Link href="/prospectus">
            <Image
              src="/affiche/affiche_fete_ecole.jpg"
              alt="Pré-réservez votre menu chaud à 2,5€ pour éviter les déceptions et nous aider à mieux gérer les stocks ! Le menu comprend un sandwich merguez et des chips, et une option végétarienne est disponible."
              width={256}
              height={256}
            />
          </Link>
        </div>
        <div className="w-[360px] flex flex-col items-center gap-2">
          <h2 className="font-semibold text-xl">Réservez maintenant !</h2>
          <h3 className="text-center">
            Cliquez sur la buvette pour être redirigé vers notre formulaire de
            reservation des menus.
          </h3>
          <Link
            href="https://www.helloasso.com/associations/ape-du-groupe-scolaire-nelson-mandela-de-bordeaux/boutiques/reservation-menu-chaud"
            target="_blank"
          >
            <Image
              src="/svg/buvette-reservation.svg"
              alt="Pré-réservez votre menu chaud à 2,5€ pour éviter les déceptions et nous aider à mieux gérer les stocks ! Le menu comprend un sandwich merguez et des chips, et une option végétarienne est disponible."
              width={256}
              height={256}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
