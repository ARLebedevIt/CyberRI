import { PhotosType, ResponseGeneric } from "../types/types"
import { instanceCRI } from "./commonAPI"
import { profileAPI } from "./profileAPI"

export type UserType = {
  id: number
  name: string
  status?: string
  photos: PhotosType
  followed : boolean
}

type GetUsersResponseType = {
  items: UserType[]
  totalCount: number
  error: string | null
}

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number, term: string, friend: string | boolean) {
    return instanceCRI.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend === null ? '' : `&friend=${friend}`))
    .then(response => response.data)
  },
  unfollow(id: number) {
    return instanceCRI.delete<ResponseGeneric>(`follow/${id}`).then(response => response.data)
  },
  follow(id: number) {
    return instanceCRI.post<ResponseGeneric>(`follow/${id}`).then(response => response.data)
  },
  getUserProfile(id: number) {
    return profileAPI.getUserProfile(id)
  },
}