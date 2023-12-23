import { PhotosType, ResponseGeneric } from '../types/types'
import { instanceCRI } from './commonAPI'
import { profileAPI } from './profileAPI'

export type UserType = {
  id: number
  name: string
  status?: string
  photos: PhotosType
  followed: boolean
}

type GetUsersResponseType = {
  items: UserType[]
  totalCount: number
  error: string | null
}

export const usersAPI = {
  getUsers(pageSize: number, term: string, friend: boolean, page: number) {
    return instanceCRI
      .get<GetUsersResponseType>(`users?page=${page}&count=${pageSize}&term=${term}&friend=${friend}`)
      .then((response) => response.data)
  },
  unfollow(id: number) {
    return instanceCRI.delete<ResponseGeneric>(`follow/${id}`).then((response) => response.data)
  },
  follow(id: number) {
    return instanceCRI.post<ResponseGeneric>(`follow/${id}`).then((response) => response.data)
  },
  getUserProfile(id: number) {
    return profileAPI.getUserProfile(id)
  },
}
