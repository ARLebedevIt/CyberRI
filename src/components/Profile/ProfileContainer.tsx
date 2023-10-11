import './ProfileContainer.scss'
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getStatus } from '../../redux/reducers/profileReducer';
import { useParams, } from "react-router-dom";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { getAuthIdSelector } from '../../redux/selectors/profileSelectors';
import withAuthRedirect from '../../redux/hoc/withAuthRedirect';
import { Page } from '../../ui/Page/Page';

const ProfileContainer: FC = () => {
  let { userId }: any = useParams()
  const dispatch: any = useDispatch()
  const authId = useSelector(getAuthIdSelector)  
  useEffect(() => {
      let profileID = userId ? +userId : authId
      if (!profileID) return
      dispatch(getUserProfile(profileID))
      dispatch(getStatus(authId!))
  }, [userId, authId])
  return (
    <Page className='profile'>
      <ProfileInfo userId={userId} isOwner={!userId} />
    </Page>
  )
}

const ProfileWrapper = withAuthRedirect(ProfileContainer)

export default ProfileWrapper