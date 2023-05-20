import Image from 'next/image'
import { imgIndex } from './rounded-constellation'

export function RoundedImage({ image }: { image: imgIndex }) {
  const borderRadiusStyles = {
    tl: { borderTopLeftRadius: '50%' },
    tr: { borderTopRightRadius: '50%' },
    bl: { borderBottomLeftRadius: '50%' },
    br: { borderBottomRightRadius: '50%' },
    full: { borderRadius: '25%' },
  }

  const style = borderRadiusStyles[image.borderRadiusLocation]

  return (
    <div>
      <Image
        style={style}
        src={image.src}
        width={image.width}
        height={image.height}
        alt="Rounded Image"
      />
    </div>
  )
}
