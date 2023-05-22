import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import validator from 'validator'
import Layout from '../components/layout'
import { useError } from '../components/shared/hooks'
import { publicKeyEncrypt } from '../services/security.service'
import style from './joinus.module.css'

export default function JoinusPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [membre, setMembre] = useState<'actif' | 'passif'>('passif')
  const [phone, setPhone] = useState('')
  const [errorMessage, pushError] = useError()

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

  function helloAssoRedirect() {
    const destination =
      'https://www.helloasso.com/associations/ape-du-groupe-scolaire-nelson-mandela-de-bordeaux/adhesions/cotisation/widget'
    window.open(destination, '_blank')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validation du nom
    if (!validator.matches(nom.trim(), /^[a-zA-Zéèïôùç]+$/)) {
      pushError('Le nom doit contenir uniquement des lettres')
      return
    }
    if (!validator.isLength(nom.trim(), { min: 2 })) {
      pushError('Le nom doit avoir au moins 2 lettres')
      return
    }
    // Validation du prenom
    if (!validator.matches(prenom.trim(), /^[a-zA-Zéèïôùç]+$/)) {
      pushError('Le prenom doit contenir uniquement des lettres')
      return
    }
    if (!validator.isLength(prenom.trim(), { min: 2 })) {
      pushError('Le prenom doit avoir au moins 2 lettres')
      return
    }
    // Validation de l'email
    if (!validator.isEmail(email.trim())) {
      pushError('Veuillez entrer une adresse email valide')
      return
    }
    // Validation du phone
    if (phone.trim() !== '' && !validator.isMobilePhone(phone.trim())) {
      pushError('Veuillez entrer un numéro de téléphone valide')
      return
    }

    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY
    if (!publicKey) return

    const emailBuffer = Buffer.from(email, 'utf-8')
    const phoneBuffer = Buffer.from(phone, 'utf-8')
    console.log(email, phone, emailBuffer, phoneBuffer, publicKey)
    try {
      const encryptedEmail = publicKeyEncrypt(emailBuffer, publicKey)
      const encryptedPhone = publicKeyEncrypt(phoneBuffer, publicKey)
      console.log('coucou1')
      const newUser = {
        nom: nom,
        prenom: prenom,
        encryptedEmail: encryptedEmail,
        membre: membre,
        encryptedPhone: encryptedPhone,
      }

      const response = await fetch('api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        helloAssoRedirect()
        router.push('/about-us')
      } else {
        const rep: { message: string } = await response.json()
        pushError(rep.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 space-y-5">
        <div className="flex justify-center">
          <Image
            src="/logo/LogoAsso.jpg"
            alt="Logo de l'association, c'est une image de Nelson Mandela avec l'inscription APE Nelson Mandela"
            width={200}
            height={100}
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
                onChange={(e) => {
                  const content = e.target.value
                  const correctedEmail = content.replace('+', '')
                  setEmail(correctedEmail)
                }}
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
              onClick={(e) => handleSubmit(e)}
              className="w-full py-1 font-bold text-white bg-emerald-400 rounded-xl"
            >
              Payer la cotisation : 1€
            </button>
          </div>
          {errorMessage != '' && (
            <div className="text-center text-xs text-red-500">
              {errorMessage}
            </div>
          )}
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
