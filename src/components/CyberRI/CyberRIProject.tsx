import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type CyberRIProjectProps = {
  img: string
  path: string
}

const CyberRIProject: FC<CyberRIProjectProps> = ({ img, path }) => {
  return (
    <Link className="cyberRiProjects__item_img" to={path}>
      <img src={img} alt="Здесь могла быть ваша картинка" />
    </Link>
  )
}

export default CyberRIProject
