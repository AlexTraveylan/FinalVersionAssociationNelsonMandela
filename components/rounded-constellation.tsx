import { RoundedImage } from './rounded-image'

export type imgIndex = {
  src: string
  width: number
  height: number
  borderRadiusLocation: 'tl' | 'tr' | 'bl' | 'br' | 'full'
}

export function RoundedConstellation() {
  const images: imgIndex[] = [
    {
      src: '/img/gouter1.jpg',
      width: 120,
      height: 100,
      borderRadiusLocation: 'tl',
    },
    {
      src: '/img/gouter2.jpg',
      width: 40,
      height: 40,
      borderRadiusLocation: 'full',
    },
    {
      src: '/img/tombola1.jpg',
      width: 120,
      height: 100,
      borderRadiusLocation: 'tr',
    },
    {
      src: '/img/tombola2.jpg',
      width: 90,
      height: 70,
      borderRadiusLocation: 'bl',
    },
    {
      src: '/img/tombola3.jpg',
      width: 130,
      height: 130,
      borderRadiusLocation: 'tr',
    },
    {
      src: '/img/tombola4.jpg',
      width: 140,
      height: 140,
      borderRadiusLocation: 'br',
    },
    {
      src: '/accueil/ecole1.jpeg',
      width: 100,
      height: 100,
      borderRadiusLocation: 'bl',
    },
    {
      src: '/accueil/ecole2.jpeg',
      width: 90,
      height: 90,
      borderRadiusLocation: 'br',
    },
  ]
  return (
    <div className="w-[360px] h-96 relative">
      <div className="absolute top-0 left-0">
        <RoundedImage image={images[0]} />
      </div>
      <div className="absolute top-5 left-40 ">
        <RoundedImage image={images[1]} />
      </div>
      <div className="absolute top-0 right-0">
        <RoundedImage image={images[2]} />
      </div>
      <div className="absolute top-1/2 left-8">
        <RoundedImage image={images[3]} />
      </div>
      <div className="absolute top-28 left-40">
        <RoundedImage image={images[4]} />
      </div>
      <div className="absolute bottom-14 right-0">
        <RoundedImage image={images[5]} />
      </div>
      <div className="absolute bottom-0 left-0">
        <RoundedImage image={images[6]} />
      </div>
      <div className="absolute bottom-12 left-28">
        <RoundedImage image={images[7]} />
      </div>
    </div>
  )
}
