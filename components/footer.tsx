import Link from 'next/link'
import { SvgInstagram } from './shared/svgs'

export function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  const mouth = date.toLocaleString('fr-fr', { month: 'long' })
  const formatMouth = mouth.charAt(0).toUpperCase() + mouth.slice(1)
  return (
    <footer className="flex flex-row justify-between items-center px-3 h-24">
      <p className="min-w-[20%]">Version 1.0.0</p>
      <div className="flex flex-col items-center">
        <p>{`${formatMouth} ${year}`}</p>
        <Link
          href="https://www.instagram.com/ape_nelson_mandela_bordeaux/"
          target="_blank"
        >
          <SvgInstagram />
        </Link>
      </div>
      <p className="min-w-[20%] text-right">
        <Link href="https://github.com/AlexTraveylan/FinalVersionAssociationNelsonMandela">
          Open source
        </Link>
      </p>
    </footer>
  )
}
