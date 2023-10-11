import React, { ButtonHTMLAttributes, FC, InputHTMLAttributes, memo } from 'react'
import './Button.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export const Button = (props: ButtonProps) => {
  const {children, className, ...otherProps} = props
  return (
    <button className={`defaultButton ${className ?? ''}`} {...otherProps}>{children}</button>
  )
}
