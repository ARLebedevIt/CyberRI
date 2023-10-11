import { HTMLAttributes, ReactNode } from "react"
import './Page.scss'

export interface Page extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export const Page = (props: Page) => {
  const { children, className, ...otherProps } = props
  return (
    <div {...otherProps}  className={`defaultPage ${className ?? ''}`}>
      {children}
    </div>
  )
}