import { Carroussel, imageCaroussel } from './caroussel'

export function CarrousselIndex() {
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

  return (
    <>
      <div className="w-full flex flex-col gap-3 py-3 items-center justify-center">
        <h1 className="text-2xl text-emerald-500 p-5 font-semibold">
          En savoir plus
        </h1>
        <Carroussel images={images} />
      </div>
    </>
  )
}
