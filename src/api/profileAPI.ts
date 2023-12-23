import { DescriptionProfileType } from '../components/Profile/ProfileInfo/ProfileEditMode'
import { PhotosType, ResponseGeneric } from '../types/types'
import { instanceCRI } from './commonAPI'

export type ContactsType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string
  contacts: ContactsType
  aboutMe: string | null
  photos: PhotosType
}

export type SavePhotosType = {
  photos: PhotosType
}

export const profileAPI = {
  async getUserProfile(id: number) {
    return (await instanceCRI.get<ProfileType>(`profile/${id}`)).data
  },
  getStatus(id: number) {
    return instanceCRI.get<string>(`profile/status/${id}`).then((response) => response.data)
  },
  updateStatus(status: string) {
    return instanceCRI.put<ResponseGeneric>(`profile/status`, { status: status }).then((response) => response.data)
  },
  savePhoto(photoFile: File) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instanceCRI.put<ResponseGeneric<SavePhotosType>>('profile/photo', formData).then((response) => response.data)
  },
  updateDesc(descData: DescriptionProfileType) {
    return instanceCRI.put<ResponseGeneric>('profile', descData).then((response) => response.data)
  }
}
