// petition.tsx
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './petition.module.css'

type Props = {}

function Petition() {
  const [showButton, setShowButton] = useState(true)

  const handleClose = () => {
    setShowButton(false)
  }

  return (
    <CSSTransition
      in={showButton}
      timeout={200}
      classNames={{
        enter: styles.slideEnter,
        enterActive: styles.slideEnterActive,
        exit: styles.slideExit,
        exitActive: styles.slideExitActive,
      }}
      unmountOnExit
    >
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50">
        <div className="bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative">
          <a
            href="https://chng.it/DPdPVhBWDd"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pétition pour demander des moyens
          </a>
          <button
            onClick={handleClose}
            className="absolute right-[-10px] top-[-20px] text-red-500 text-sm"
          >
            x
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Petition
