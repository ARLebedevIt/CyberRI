import React, { ReactNode } from 'react'
import './AppLink.scss'
import { Link } from 'react-router-dom'

export interface AppLinkProps {
  children?: ReactNode
  className?: string
  to: string
  returnType?: boolean
}

export const AppLink = (props: AppLinkProps) => {
  const { children, className, to, returnType, ...otherProps } = props

  if (returnType) {
    return (
      <div className="returnLink">
        <Link to={to} className={`defaultLink ${className ?? ''}`} {...otherProps}>
          {children}
        </Link>
      </div>
    )
  }

  return (
    <Link to={to} className={`defaultLink ${className ?? ''}`} {...otherProps}>
      {children}
    </Link>
  )
}
