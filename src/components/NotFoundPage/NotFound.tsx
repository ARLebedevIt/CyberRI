import React, { FC } from 'react'
import './NotFound.scss'

const NotFound: FC = () => {
  return (
    <div className="notFound__wrapper">
      <div className="notFound__item">
        <span>404</span>
        <span>не найдено.</span>
      </div>
    </div>
  )
}

export default NotFound
