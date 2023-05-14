import { useState } from 'react'

export const useError = (): [string, (message: string) => void] => {
  const [errorMessage, setErrorMessage] = useState('')
  const pushError = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 2000)
  }
  return [errorMessage, pushError]
}
