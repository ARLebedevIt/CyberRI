import { UserType, usersAPI } from '../../api/usersAPI'
import { Dispatch } from 'redux'
import { CommonThunkType, InferActionTypes, ResponseGeneric } from '../../types/types'
import { addQueryParams } from '../../hooks/useURLQuery'

let initialState = {
  users: [] as UserType[],
  pageSize: 6,
  totalItemsCount: 0,
  _inited: false,
  filter: {
    term: '',
    friend: false,
    currentPage: 1
  },
  isLoading: false
}

export type InitialStateType = typeof initialState

export type FilterType = typeof initialState.filter

export type ActionTypes = InferActionTypes<typeof actionsUsers>

type ThunkType = CommonThunkType<ActionTypes>

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'CRI/USERS/FOLLOW':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true }
          }
          return u
        })
      }
    case 'CRI/USERS/UNFOLLOW':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false }
          }
          return u
        })
      }
    case 'CRI/USERS/SET_USERS': {
      return { ...state, users: action.users }
    }
    case 'CRI/USERS/SET_INITED': {
      return { ...state, _inited: action._inited }
    }
    case 'CRI/USERS/SET_IS_LOADING': {
      return { ...state, isLoading: action.isLoading }
    }
    case 'CRI/USERS/SET_TOTAL_USERS_COUNT': {
      return { ...state, totalItemsCount: action.count }
    }
    case 'CRI/USERS/SET_FILTER': {
      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}

export const actionsUsers = {
  followSuccess: (userId: number) => ({ type: 'CRI/USERS/FOLLOW', userId } as const),
  setFilter: (filter: FilterType) => ({ type: 'CRI/USERS/SET_FILTER', payload: { filter } } as const),
  unfollowSuccess: (userId: number) => ({ type: 'CRI/USERS/UNFOLLOW', userId } as const),
  setUsers: (users: UserType[]) => ({ type: 'CRI/USERS/SET_USERS', users } as const),
  setTotalItemsCount: (totalItemsCount: number) =>
    ({
      type: 'CRI/USERS/SET_TOTAL_USERS_COUNT',
      count: totalItemsCount
    } as const),
  setInited: (_inited: boolean) => ({ type: 'CRI/USERS/SET_INITED', _inited } as const),
  setIsLoading: (isLoading: boolean) => ({ type: 'CRI/USERS/SET_IS_LOADING', isLoading } as const)
}

export const initUsersPage =
  (searchParams: URLSearchParams): ThunkType =>
  async (dispatch, getState) => {
    const inited = getState().usersPage._inited
    let filter = { ...getState().usersPage.filter }

    if (!inited) {
      searchParams.forEach((value, key) => {
        if (value) {
          switch (key) {
            case 'page':
              filter.currentPage = Number(value)
              break
            case 'friend':
              filter.friend = value === 'true' ? true : false
              break
            case 'search':
              filter.term = value ?? ''
              break
            default:
              break
          }
        }
      })
      dispatch(actionsUsers.setFilter(filter))
    }
    dispatch(actionsUsers.setInited(true))
    dispatch(requestUsers())
  }

export const requestUsers = (): ThunkType => async (dispatch, getState) => {
  const pageSize = getState().usersPage.pageSize
  const filter = { ...getState().usersPage.filter }
  const actualTotalUsers = getState().usersPage.totalItemsCount

  dispatch(actionsUsers.setIsLoading(true))
  addQueryParams(filter)

  let response = await usersAPI.getUsers(pageSize, filter.term, filter.friend, filter.currentPage)

  dispatch(actionsUsers.setUsers(response.items))

  if (actualTotalUsers !== response.totalCount) {
    dispatch(actionsUsers.setTotalItemsCount(response.totalCount))
  }
  
  dispatch(actionsUsers.setIsLoading(false))
}

export const flowFollowUnfollow = async (
  id: number,
  dispatch: Dispatch<ActionTypes>,
  apiMethod: (id: number) => Promise<ResponseGeneric>,
  actionCreator: (id: number) => ActionTypes,
  setFollowInProgress: (param: boolean) => void
) => {
  setFollowInProgress(true)
  let response = await apiMethod(id)
  if (response.resultCode == 0) {
    dispatch(actionCreator(id))
  }
  setFollowInProgress(false)
}

export const follow =
  (id: number, setFollowInProgress: (param: boolean) => void): ThunkType =>
  async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    let actionCreator = actionsUsers.followSuccess
    flowFollowUnfollow(id, dispatch, apiMethod, actionCreator, setFollowInProgress)
  }

export const unfollow =
  (id: number, setFollowInProgress: (param: boolean) => void): ThunkType =>
  async (dispatch) => {
    setFollowInProgress(true)
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    let actionCreator = actionsUsers.unfollowSuccess
    flowFollowUnfollow(id, dispatch, apiMethod, actionCreator, setFollowInProgress)
  }

export default usersReducer
