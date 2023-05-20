import Link from 'next/link'
import BtnAccueil from './shared/btn-accueil'

export function PresentationAsso() {
  const title = 'A.P.E. Nelson Mandela'
  const content =
    "Bienvenue sur le site de l'Association des Parents d'Élèves (A.P.E) du Groupe Scolaire Nelson Mandela de Bordeaux. Nous sommes une organisation engagée à soutenir notre école et à renforcer la communauté parentale. Nous nous efforçons d'apporter une aide matérielle et financière à l'école et d'encourager l'implication parentale pour créer un environnement scolaire enrichissant."

  return (
    <div className="w-[360px] flex flex-col gap-5 items-center">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <div className="flex flex-col gap-3">
        <h3>{content}</h3>
      </div>
      <div className="flex flex-row gap-5">
        <Link href="/join-us">
          <BtnAccueil mode="dark">Rejoindre</BtnAccueil>
        </Link>
        <Link
          target="_blank"
          href="https://www.helloasso.com/associations/ape-du-groupe-scolaire-nelson-mandela-de-bordeaux/formulaires/1"
        >
          <BtnAccueil mode="light">Donation</BtnAccueil>
        </Link>
      </div>
      <div className="w-full">
        <hr />
      </div>
      <div className="flex flex-col gap-3">
        <h4>Des questions ? Contactez-nous !</h4>
        <h4 className="font-semibold text-xl">
          parents.nelsonmandela33@gmail.com
        </h4>
      </div>
    </div>
  )
}
