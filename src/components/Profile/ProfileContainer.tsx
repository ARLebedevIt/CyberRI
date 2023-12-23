import './ProfileContainer.scss'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, getStatus } from '../../redux/reducers/profileReducer'
import { Params, useParams } from 'react-router-dom'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { getAuthIdSelector } from '../../redux/selectors/profileSelectors'
import withAuthRedirect from '../../redux/hoc/withAuthRedirect'
import { Page } from '../../ui/Page/Page'

const ProfileContainer: FC = () => {
  let { userId }: Readonly<Params<string>> = useParams()
  const dispatch: any = useDispatch()
  const authId = useSelector(getAuthIdSelector)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let profileID = userId ? +userId : authId
    if (!profileID) return
    dispatch(getUserProfile(profileID, setLoading))
    dispatch(getStatus(profileID))
  }, [userId, authId])
  return (
    <Page className="profile">
      <ProfileInfo setLoading={setLoading} loading={loading} isOwner={!userId} />
    </Page>
  )
}

const ProfileWrapper = withAuthRedirect(ProfileContainer)

export default ProfileWrapper
