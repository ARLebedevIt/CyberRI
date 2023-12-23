import React, { FC, memo, useState } from 'react'
import { Link } from 'react-router-dom'
import userPhoto from '../../assets/images/avatarUser.jpg'
import { useDispatch } from 'react-redux'
import { follow, unfollow } from '../../redux/reducers/usersReducer'
import { Button } from '../../ui/Button/Button'

type Props = {
  id: number
  name: string
  followed: boolean
  photos: {
    small: string | null
  }
}

const UserCard: FC<Props> = memo(({ id, name, followed, photos }) => {
  const [followingInProgress, setFollowingInProgress] = useState(false)
  const dispatch: any = useDispatch()

  const subscribe = (userId: number) => {
    dispatch(follow(userId, setFollowingInProgress))
  }
  const unsubscribe = (userId: number) => {
    dispatch(unfollow(userId, setFollowingInProgress))
  }

  return (
    <div className="users__profile">
      <div className="users__bio_name">{name}</div>
      <Link to={'/profile/' + id}>
        <img src={photos.small || userPhoto} alt="Здесь могла быть ваша картинка" />
      </Link>
      {followed ? (
        <Button disabled={followingInProgress} onClick={() => unsubscribe(id)}>
          Забыть
        </Button>
      ) : (
        <Button disabled={followingInProgress} onClick={() => subscribe(id)}>
          Следить
        </Button>
      )}
    </div>
  )
})

export default UserCard
