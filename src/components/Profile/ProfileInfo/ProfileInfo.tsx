import Preloader from '../../Common/Preloader/Preloader';
import './ProfileInfo.scss'
import userPhoto from '../../../assets/images/avatarUser.jpg'
import { FC, useState } from 'react';
import ProfileEditMode from './ProfileEditMode';
import { useSelector } from 'react-redux';
import { getEditDataProfile } from '../../../redux/selectors/profileSelectors';
import MyPosts from '../MyPosts/MyPosts';
import { Button } from '../../../ui/Button/Button';

type ProfileInfo = {
  isOwner: boolean
  userId: number
}

const ProfileInfo: FC<ProfileInfo> = ({ isOwner, userId }) => {
  let [editMode, setEditMode] = useState<boolean>(false)
  const profile = useSelector(getEditDataProfile.getProfile)
  const status = useSelector(getEditDataProfile.getStatus)
  if (!profile) {
    return <Preloader />
  }
  return (
    <div className='profile__content'>
      <div className={`description__items ${editMode && '_descriptionEdit'}`}>
        <div className='description__item_avatar'>
          <img src={profile.photos.large != null ? profile.photos.large : userPhoto} />
        </div>
        <div className='description__items_bio'>
          {editMode ? <ProfileEditMode setEditMode={setEditMode} editMode={editMode} />
            :
            <form>
              <div className='description__items_bio'>
                <span>{`Имя: ${profile.fullName}`}</span>
                <span>{profile.aboutMe ? `Характеристика: ${profile.aboutMe}` : `Характеристика: Отсутствует`}</span>
                <span>{profile.lookingForAJob ? `Ищу работу: Да` : `Ищу работу: Нет`}</span>
                <span>{profile.lookingForAJobDescription ? `Навыки: ${profile.lookingForAJobDescription}`
                  : `Навыки: Отсутствуют`}</span>
                <span>{profile.contacts.github ? `ГитХаб: ${profile.contacts.github}` : `ГитХаб: Отсутствует`}
                </span>
                <span>{profile.contacts.mainLink ?
                  `Портфолио ${profile.contacts.mainLink}` : `Портфолио: Отсутствует`}</span>
                <span>{status ? `Статус: ${status}` : 'Статус отсутствует'}</span>
                {isOwner && <Button className='description__button' onClick={() => setEditMode(true)}>
                <span>Править</span>
                </Button>}
              </div>
            </form>
           }
        </div>
      </div>
      {isOwner ? <MyPosts profilePhoto={profile.photos.large} userId={userId} /> :
        <div className='profile__missingPost'>
          <span>Нет записей</span>
        </div>}
    </div>
  )
}

export default ProfileInfo;