import React, { ButtonHTMLAttributes, ChangeEvent, MouseEventHandler } from 'react'
import './Button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = React.memo((props: ButtonProps) => {
  const { children, className, ...otherProps } = props
  return (
    <button className={`defaultButton ${className ?? ''}`} {...otherProps}>
      {children}
    </button>
  )
})
