import { useSelector } from 'react-redux'
import { getUsersSelector } from '../../redux/selectors/usersSelectors'
import './Users.scss'
import { UserType } from '../../api/usersAPI'
import UserCard from './UserCard'

const Users = () => {
  const users = useSelector(getUsersSelector)
  return (
    <div className='users__row'>
      {users.map((user: UserType) => {
      return <UserCard followed={user.followed} id={user.id} name={user.name} photos={user.photos} key={user.id} />
      })}
    </div>
  )
}

export default Users