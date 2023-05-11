import Link from 'next/link'

export function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  const mouth = date.toLocaleString('fr-fr', { month: 'long' })
  const formatMouth = mouth.charAt(0).toUpperCase() + mouth.slice(1)
  return (
    <footer className="flex flex-row justify-between items-center px-3 h-24">
      <p className="min-w-[20%]">Alpha v 0.3.1</p>
      <p>{`${formatMouth} ${year}`}</p>
      <p className="min-w-[20%] text-right">
        <Link href="https://github.com/AlexTraveylan/FinalVersionAssociationNelsonMandela">
          Open source
        </Link>
      </p>
    </footer>
  )
}
