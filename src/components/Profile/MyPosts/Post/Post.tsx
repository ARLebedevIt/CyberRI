import './Post.scss'
import postAvatar from '../../../../assets/images/avatarUser.jpg'
import React, { FC, memo } from 'react'

type PropsType = {
  date: number | string
  message: string
  profilePhoto: string | null
}

const Post: FC<PropsType> = memo((props) => {  
  return (
    <div className='post__content'>
      <div className='post'>
        <img src={props.profilePhoto ?? postAvatar} alt="Здесь могла быть ваша картинка" />
        <div className='post__data'>
          <div className='post__text'>{props.message}</div>
          <div className='post__date'>{props.date}</div>
        </div>
      </div>
    </div>
  )
})

export default Post;