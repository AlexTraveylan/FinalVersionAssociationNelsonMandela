import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'
import { SvgClose } from './shared/svgs'

interface FormData {
  afficheUrl: string
  createdBy: string
  modifyAt: string
  modifyBy: string
  beginAt: string
  title: string
  content: string
  linkUrl: string
  linkContent: string
}

export function EventForm({
  setShowForm,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>
}) {
  const [formData, setFormData] = useState<FormData>({
    afficheUrl: '',
    createdBy: '',
    modifyAt: '',
    modifyBy: '',
    beginAt: '',
    title: '',
    content: '',
    linkUrl: '',
    linkContent: '',
  })
  const ratioImage = 0.45

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('Form Data:', formData)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newValue = formData.content + '\n  '
      setFormData({ ...formData, content: newValue })
    }
  }

  return (
    <div className="fixed top-1/2 translate-y-[-50%] z-99 bg-indigo-900 px-4 py-8 rounded-xl flex flex-col items-center">
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
          <label htmlFor="affiche" className="mb-1 text-white">
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
          <label htmlFor="affiche" className="mb-1 text-white">
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
          <label htmlFor="content" className="mb-1 text-white">
            Contenu
          </label>
          <textarea
            name="content"
            placeholder="Contenu"
            value={formData.content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full p-1 bg-gray-300 rounded rounded-xl indent-2 h-48 overflow-y-auto resize-none"
          ></textarea>
        </div>
        <div>
          <label htmlFor="affiche" className="mb-1 text-white">
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
          <label htmlFor="affiche" className="mb-1 text-white">
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
          <label htmlFor="affiche" className="mb-1 text-white">
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
          className="w-full py-1 font-bold text-white bg-emerald-400 rounded-xl"
        >
          Ajouter à la liste des évenements
        </button>
      </form>
    </div>
  )
}
