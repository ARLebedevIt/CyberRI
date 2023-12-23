import { useSelector } from 'react-redux'
import { getIsLoadingUsersSelector, getUsersSelector } from '../../redux/selectors/usersSelectors'
import './Users.scss'
import { UserType } from '../../api/usersAPI'
import UserCard from './UserCard'
import Preloader from '../Common/Preloader/Preloader'

const Users = () => {
  const users = useSelector(getUsersSelector)
  const isLoading = useSelector(getIsLoadingUsersSelector)

  if (isLoading) {
    return <Preloader />
  }
  return (
    <div className="users__row">
      {users.length ? (
        users.map((user: UserType) => {
          return <UserCard followed={user.followed} id={user.id} name={user.name} photos={user.photos} key={user.id} />
        })
      ) : (
        <span className="users_not_found">Пользователь не найден</span>
      )}
    </div>
  )
}

export default Users
