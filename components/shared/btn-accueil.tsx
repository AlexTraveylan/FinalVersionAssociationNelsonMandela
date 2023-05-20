import { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  mode: 'dark' | 'light'
  children: ReactNode
}

export default function Button({ mode, children, ...props }: ButtonProps) {
  const sharedStyle = {
    fontWeight: 600,
    borderRadius: '200px',
    padding: '21px 46px',
    cursor: 'pointer',
  }

  const lightStyle = {
    ...sharedStyle,
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
  }

  const darkStyle = {
    ...sharedStyle,
    backgroundColor: '#059669',
    color: 'white',
    border: '1px solid #059669',
  }

  return (
    <button style={mode === 'dark' ? darkStyle : lightStyle} {...props}>
      {children}
    </button>
  )
}
