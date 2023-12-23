import './Discourse.scss'
import { FC } from 'react'
import { DiscourseMessageAPIType } from '../../api/discourseAPI'
import userImage from '../../assets/images/avatarUser.jpg'
import { Link } from 'react-router-dom'
import React from 'react'

type PropsType = {
  message: DiscourseMessageAPIType
}

const DiscourseMessage: FC<PropsType> = React.memo(({ message }) => {
  return (
    <div className="discourse__message">
      <Link target="_blank" to={`/profile/${message.userId}`}>
        <img src={message.photo || userImage} alt="Здесь могла быть ваша картинка" />
      </Link>
      <div className="discourse__textMessage">
        <span>{message.userName}</span>
        <span>{message.message}</span>
      </div>
    </div>
  )
})

export default DiscourseMessage
