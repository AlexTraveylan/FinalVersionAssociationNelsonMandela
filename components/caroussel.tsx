import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SvgChevronLeft, SvgChevronRight } from './shared/svgs'

export type imageCaroussel = {
  id: number
  imageUrl: string
  width: number
  height: number
  alt: string
  titleContent?: string
  textContent?: string
  linkUrl?: string
}

export function Carroussel({ images }: { images: imageCaroussel[] }) {
  const [currentIndex, setCurrentindex] = useState(0)
  const imagesLength = images.length
  const image = images[currentIndex]

  function next() {
    setCurrentindex((currentIndex + 1) % imagesLength)
  }

  function previous() {
    setCurrentindex((currentIndex + imagesLength - 1) % imagesLength)
  }

  return (
    <>
      {imagesLength > 0 && (
        <div className="relative">
          <div className="images__container">
            <>
              <div>
                <Image
                  alt={image.alt}
                  src={image.imageUrl}
                  width={image.width}
                  height={image.height}
                />
              </div>
              {image.titleContent && image.textContent && (
                <div className="text__content absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-gray-900/60 py-5 px-12 text-white flex flex-col items-center justify-center gap-3">
                  <h1 className="font-bold text-center">
                    {image.titleContent}
                  </h1>
                  <p className="text-center">{image.textContent}</p>
                  {image.linkUrl && (
                    <Link href={image.linkUrl} className="text-center">
                      En savoir plus
                    </Link>
                  )}
                </div>
              )}
            </>
          </div>

          <div
            className="absolute top-1/2 translate-y-[-50%] cursor-pointer left-0 bg-slate-50/40 rounded-3xl mx-5 hover:bg-slate-50/75 ease-in-out duration-300"
            onClick={previous}
          >
            <SvgChevronLeft stroke={2.5} size={45} />
          </div>

          <div
            className="absolute top-1/2 translate-y-[-50%] cursor-pointer right-0 bg-slate-50/40 rounded-3xl mx-5 hover:bg-slate-50/75 ease-in-out duration-300"
            onClick={next}
          >
            <SvgChevronRight stroke={2.5} size={45} />
          </div>
        </div>
      )}
    </>
  )
}
