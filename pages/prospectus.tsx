import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/layout'

export default function Prospectus() {
  return (
    <Layout>
      <div className="flex flex-col gap-3 items-center py-5 gap-3">
        <h1 className="text-2xl font-semibold">
          Détails de la fête de l'école
        </h1>
        <div className="flex flex-col gap-10">
          <Link href="/img/prospectus1.png">
            <Image
              src="/img/prospectus1.png"
              width={1000}
              height={1000}
              alt="La page 1 du prospectus qui décrit le deroulement de la fete de l'ecole "
            />
          </Link>
          <Link href="/img/prospectus2.png">
            <Image
              src="/img/prospectus2.png"
              width={1000}
              height={1000}
              alt="La page 2 du prospectus qui décrit le deroulement de la fete de l'ecole "
            />
          </Link>
        </div>
        <h1 className="text-2xl font-semibold py-5">Reserver votre menu</h1>
        <div>
          <Link
            href="https://www.helloasso.com/associations/ape-du-groupe-scolaire-nelson-mandela-de-bordeaux/boutiques/reservation-menu-chaud"
            target="_blank"
          >
            <Image
              src="/svg/buvette-reservation.svg"
              alt="Pré-réservez votre menu chaud à 2,5€ pour éviter les déceptions et nous aider à mieux gérer les stocks ! Le menu comprend un sandwich merguez et des chips, et une option végétarienne est disponible."
              width={500}
              height={500}
            />
          </Link>
        </div>
      </div>
    </Layout>
  )
}
