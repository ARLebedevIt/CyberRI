import { FC, useEffect } from 'react'
import './Users.scss'
import Paginator from '../Common/Paginator/Paginator'
import { useDispatch, useSelector } from 'react-redux'
import { getPageSizeSelector, getTotalItemsCountSelector } from '../../redux/selectors/usersSelectors'
import withAuthRedirect from '../../redux/hoc/withAuthRedirect'
import UsersFilter from './UsersFilter'
import { Page } from '../../ui/Page/Page'
import Users from './Users'
import { initUsersPage } from '../../redux/reducers/usersReducer'
import { useSearchParams } from 'react-router-dom'

const UsersContainer: FC = () => {
  const totalItemsCount = useSelector(getTotalItemsCountSelector)
  const pageSize = useSelector(getPageSizeSelector)
  const dispatch: any = useDispatch()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    dispatch(initUsersPage(searchParams))
  }, [])
  
  return (
    <Page className="users__wrapper">
      <div className="users__items">
        <UsersFilter />
        <Users />
        <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize} />
      </div>
    </Page>
  )
}

const UsersWrapper = withAuthRedirect(UsersContainer)

export default UsersWrapper
