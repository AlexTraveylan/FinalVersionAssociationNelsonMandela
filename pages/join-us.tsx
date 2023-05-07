import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import style from './joinus.module.css'

export default function JoinusPage() {
  const { data: session } = useSession()
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [membre, setMembre] = useState<'actif' | 'passif'>('passif')
  const [phone, setPhone] = useState('')
  const ratioImage = 0.45

  useEffect(() => {
    if (session?.user?.name) {
      const parsedName = session.user.name.split(' ')
      setNom(parsedName[0])
      setPrenom(parsedName[1])
    }
    if (session?.user?.email) {
      setEmail(session.user.email)
    }
  }, [])

  function helloAssoRedirect(e: React.MouseEvent) {
    e.preventDefault()
    const destination =
      'https://www.helloasso.com/associations/ape-du-groupe-scolaire-nelson-mandela-de-bordeaux/adhesions/cotisation/widget'
    window.open(destination, '_blank')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const data = {
      nom,
      prenom,
      email,
      membre,
      phone,
    }

    console.log(data)
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 space-y-5">
        <div className="flex justify-center">
          <Image
            src="/img/LogoAsso.jpg"
            alt="Logo de l'association, c'est une image de Nelson Mandela avec l'inscription APE Nelson Mandela"
            width={414 * ratioImage}
            height={208 * ratioImage}
          />
        </div>
        <h2 className="text-emerald-400 text-3xl">Rejoignez-nous !</h2>
        <form className="flex flex-col w-80 space-y-4">
          <div className="flex space-x-2.5">
            <div className="flex flex-col w-1/2">
              <label htmlFor="nom" className="mb-1">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                value={nom}
                className="w-full p-1 bg-gray-300 rounded rounded-xl indent-2"
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="prenom" className="mb-1">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full p-1 bg-gray-300 rounded-xl indent-2"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-1 bg-gray-300 rounded-xl indent-2"
              />
            </div>
            <div
              className={`flex justify-between pt-1 ${style.radio__form__field}`}
            >
              <label>
                <input
                  type="radio"
                  name="membre"
                  value="actif"
                  checked={membre === 'actif'}
                  onChange={(e) =>
                    setMembre(e.target.value as 'actif' | 'passif')
                  }
                  className="radio-green"
                />
                Membre actif
              </label>
              <label>
                <input
                  type="radio"
                  name="membre"
                  value="passif"
                  checked={membre === 'passif'}
                  onChange={(e) =>
                    setMembre(e.target.value as 'actif' | 'passif')
                  }
                  className="radio-green"
                />
                Membre passif
              </label>
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-1">
                Numéro de téléphone
                <span className="text-gray-500"> (facultatif*)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-1 bg-gray-300 rounded-xl indent-2"
              />
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              onClick={(e) => helloAssoRedirect(e)}
              className="w-full py-1 font-bold text-white bg-emerald-400 rounded-xl"
            >
              Payer la cotisation : 1€
            </button>
          </div>
          <div className="flex flex-col text-gray-500">
            <p>
              * Permet de vous faire intégrer les groupes WhatsApp "membres
              actifs" ou "membres passifs" pour vous tenir informé de
              l'organisation des événements.
            </p>
          </div>
        </form>
      </div>
    </Layout>
  )
}
