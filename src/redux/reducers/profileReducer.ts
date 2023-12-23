import { CommonThunkType, InferActionTypes, PhotosType, PostType, ResultCodesCRI } from '../../types/types'
import { usersAPI } from '../../api/usersAPI'
import { ProfileType, profileAPI } from '../../api/profileAPI'
import { DescriptionProfileType } from '../../components/Profile/ProfileInfo/ProfileEditMode'

let initialState = {
  posts: [
    { id: 4, text: `Настало время деплоя`, date: '15 / 5 / 2122 21:56' },
    { id: 3, text: 'Если отладка — это поиск ошибок, то программирование — их создание', date: '1 / 1 / 2123 0:10' },
    {
      id: 2,
      text: `— Папа, а почему никак не наступит светлое будущее?
    — Как же оно наступит, если оно будущее...`,
      date: '25 / 12 / 2122 21:56'
    },
    { id: 1, text: 'Первая запись', date: '22 / 12 / 2122 3:56' }
  ] as PostType[],
  profile: null as ProfileType | null,
  status: '',
  newPostText: ''
}

type ActionTypes = InferActionTypes<typeof actionsProfile>

type ThunkTypes = CommonThunkType<ActionTypes>

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'CRI/PROFILE/ADD_POST':
      let newPost = {
        id: action.id,
        text: action.value,
        date: action.date
      }
      return {
        ...state,
        posts: [newPost, ...state.posts]
      }
    case 'CRI/PROFILE/SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile
      }
    }
    case 'CRI/PROFILE/SET_STATUS': {
      return {
        ...state,
        status: action.status
      }
    }
    case 'CRI/PROFILE/SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      }
    }
    default:
      return state
  }
}

export const actionsProfile = {
  addPost: (value: string, date: string, id: number) => ({ type: 'CRI/PROFILE/ADD_POST', value, date, id } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'CRI/PROFILE/SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'CRI/PROFILE/SET_STATUS', status } as const),
  setPhotoSuccess: (photos: PhotosType) => ({ type: 'CRI/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
}

export const getUserProfile =
  (userId: number, setLoading: (arg: boolean) => void): ThunkTypes =>
  async (dispatch) => {
    setLoading(true)
    let response = await usersAPI.getUserProfile(userId)
    dispatch(actionsProfile.setUserProfile(response))
    setLoading(false)
  }

export const getStatus =
  (userId: number): ThunkTypes =>
  async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actionsProfile.setStatus(response))
  }

export const updateStatus =
  (status: string): ThunkTypes =>
  async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode == ResultCodesCRI.Success) {
      dispatch(actionsProfile.setStatus(status))
    }
  }

export const savePhoto =
  (file: File): ThunkTypes =>
  async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.resultCode == ResultCodesCRI.Success) {
      dispatch(actionsProfile.setPhotoSuccess(response.data.photos))
    }
  }

export const saveDescripton =
  (
    descData: DescriptionProfileType,
    setStatus: (param: string | string[]) => void,
    setSubmitting: (param: boolean) => void,
    setEditMode: (param: boolean) => void,
    setLoading: (arg: boolean) => void
  ): ThunkTypes =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.updateDesc(descData)
    if (response.resultCode === ResultCodesCRI.Success) {
      if (userId != null) {
        dispatch(getUserProfile(userId, setLoading))
      }
      setEditMode(false)
    } else {
      setStatus(response.messages)
      setSubmitting(false)
    }
  }

export default profileReducer
