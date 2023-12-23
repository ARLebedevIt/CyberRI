import './Discourse.scss'
import { Navigate } from 'react-router-dom'
import { FC, useEffect, useRef } from 'react'
import DiscourseNav from './DiscourseNav'
import DiscourseMessages from './DiscourseMessages'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, startMessageListening, stopMessageListening } from '../../redux/reducers/discourseReducer'
import { getIsAuthSelector } from '../../redux/selectors/authSelectors'
import { AppLink } from '../../ui/AppLink/AppLink'
import { useScrollToBottom } from '../../hooks/useScrollToBottom'
import { getMessageSelector } from '../../redux/selectors/discourseSelectors'
import { Page } from '../../ui/Page/Page'

const DiscoursePage: FC = () => {
  const isAuth = useSelector(getIsAuthSelector)
  const messages = useSelector(getMessageSelector)
  const dispatch: any = useDispatch()
  const anchorRef = useRef(null)
  const scrollHandler = useScrollToBottom(anchorRef, messages)

  useEffect(() => {
    dispatch(startMessageListening())
    return () => {
      dispatch(stopMessageListening())
      dispatch(clearMessage([]))
    }
  }, [])

  if (!isAuth) {
    return <Navigate to={'/login'} />
  }

  return (
    <Page className="discourse__content" onScroll={scrollHandler}>
      <AppLink returnType to="/lab/projects">
        {'<'}
      </AppLink>
      <span className="discourse__title">Дискурс</span>
      <div className="discourse__items">
        <div className="discourse__item">
          <DiscourseMessages messages={messages} />
        </div>
        <div className="discourse__item">
          <DiscourseNav />
        </div>
      </div>
      <div ref={anchorRef}></div>
    </Page>
  )
}

export default DiscoursePage
