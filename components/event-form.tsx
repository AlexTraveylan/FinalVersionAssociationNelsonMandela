import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'
import { supabase } from '../services/supabase-client'
import { SvgClose } from './shared/svgs'

interface FormData {
  afficheUrl: string
  beginAt: string
  title: string
  content: string
  linkUrl?: string
  linkContent?: string
}

export function EventForm({
  setShowForm,
  recupEvents,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>
  recupEvents: () => Promise<void>
}) {
  const [formData, setFormData] = useState<FormData>({
    afficheUrl: '',
    beginAt: '',
    title: '',
    content: '',
    linkUrl: '',
    linkContent: '',
  })

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setShowForm(false)

    const formData2 = new FormData(e.target as HTMLFormElement)
    const file = formData2.get('afficheUrl') as File | null | undefined
    if (!file) return
    const extension = file.name.split('.').pop()

    console.log(
      !(extension == 'jpg' || extension == 'jpeg' || extension == 'png')
    )

    if (!(extension == 'jpg' || extension == 'jpeg' || extension == 'png'))
      return
    const fileName = `${file.name
      .split('.')[0]
      .replaceAll(' ', '_')}_${new Date().getTime()}.${extension}`

    const { error: uploadError } = await supabase.storage
      .from('APE_bucket')
      .upload(fileName, file)

    console.log(fileName)

    // const response = await fetch('api/events/createEvents', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })

    // if (!response) return
    // const data = await response.json()
    recupEvents()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newValue = formData.content + '\n'
      setFormData({ ...formData, content: newValue })
    }
  }

  return (
    <div className="fixed top-1/2 translate-y-[-50%] z-99 bg-white px-4 py-8 rounded-xl shadow-2xl flex flex-col items-center">
      <div
        className="absolute top-2 right-2 text-red-500 text-2xl cursor-pointer"
        onClick={() => setShowForm(false)}
      >
        <SvgClose stroke={1.7} />
      </div>
      <h2 className="text-emerald-400 text-3xl font-semibold mb-5 text-center">
        Ajout d'un événement
      </h2>
      <form className="flex flex-col w-72 gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="affiche" className="mb-1">
            Date de l'évenement
          </label>
          <input
            type="datetime-local"
            name="beginAt"
            className="w-full p-1 bg-gray-300 rounded rounded-xl indent-2"
            value={formData.beginAt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="affiche" className="mb-1">
            Titre de l'évenement
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-1 bg-gray-300 rounded rounded-xl indent-2"
          />
        </div>
        <div>
          <label htmlFor="content" className="mb-1">
            Contenu
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full p-1 bg-gray-300 rounded rounded-xl px-3 h-32 overflow-y-auto resize-none"
          ></textarea>
        </div>
        <div>
          <label htmlFor="affiche" className="mb-1">
            Photo de l'affiche (facultatif)
          </label>
          <input
            type="file"
            name="afficheUrl"
            className="w-full p-1 bg-gray-300 rounded rounded-xl indent-2"
            value={formData.afficheUrl}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="affiche" className="mb-1">
            Lien (facultatif)
          </label>
          <input
            type="text"
            name="linkUrl"
            className="w-full p-1 bg-gray-300 rounded rounded-xl indent-2"
            value={formData.linkUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="affiche" className="mb-1">
            Phrase pour le lien (facultatif)
          </label>
          <input
            type="text"
            name="linkContent"
            className="w-full p-1 bg-gray-300 rounded rounded-xl indent-2"
            value={formData.linkContent}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full py-1 font-bold bg-emerald-400 text-white rounded-xl"
        >
          Ajouter à la liste des évenements
        </button>
      </form>
    </div>
  )
}
