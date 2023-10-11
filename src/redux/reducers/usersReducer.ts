import { UserType, usersAPI } from "../../api/usersAPI"
import { Dispatch } from 'redux';
import { CommonThunkType, InferActionTypes, ResponseGeneric } from "../../types/types";

let initialState = {
  users: [] as UserType[],
  pageSize: 6,
  totalItemsCount: 0,
  currentPage: 1,
  filter: {
    term: '',
    friend: '' as string | boolean
  }
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
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: true }
          }
          return u
        })
      }
    case 'CRI/USERS/UNFOLLOW':
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: false }
          }
          return u
        })
      }
    case 'CRI/USERS/SET_USERS': {
      return { ...state, users: action.users }
    }
    case 'CRI/USERS/SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage }
    }
    case 'CRI/USERS/SET_TOTAL_USERS_COUNT': {
      return { ...state, totalItemsCount: action.count }
    }
    case 'CRI/USERS/SET_FILTER': {
      return { ...state, ...action.payload }
    }
    default:
      return state;
  }
}

export const actionsUsers = {
  followSuccess: (userId: number) => ({ type: "CRI/USERS/FOLLOW", userId } as const),
  setFilter: (filter: FilterType) => ({ type: "CRI/USERS/SET_FILTER", payload: { filter } } as const),
  unfollowSuccess: (userId: number) => ({ type: "CRI/USERS/UNFOLLOW", userId } as const),
  setUsers: (users: UserType[]) => ({ type: "CRI/USERS/SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) => ({
    type: "CRI/USERS/SET_CURRENT_PAGE", currentPage:
      currentPage
  } as const),
  setTotalItemsCount: (totalItemsCount: number) => ({
    type: "CRI/USERS/SET_TOTAL_USERS_COUNT",
    count: totalItemsCount
  } as const),
}

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType,
  setSubmitting?: (isSubmitting: boolean) => void): ThunkType =>
  async (dispatch, getState) => {
    if (filter.friend == false) filter.friend = ''
    let response = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    if (setSubmitting) setSubmitting(false)
    dispatch(actionsUsers.setUsers(response.items))

    let stateTotalCount = getState().usersPage.totalItemsCount
    let stateFilter = getState().usersPage.filter

    if (stateFilter.friend != filter.friend || stateFilter.term != filter.term || stateTotalCount == 0) {
      dispatch(actionsUsers.setTotalItemsCount(response.totalCount))
      dispatch(actionsUsers.setFilter(filter))
    }
  }

export const flowFollowUnfollow = async (id: number, dispatch: Dispatch<ActionTypes>,
  apiMethod: (id: number) => Promise<ResponseGeneric>, actionCreator: (id: number) => ActionTypes, setFollowInProgress: (param: boolean) => void) => {
  setFollowInProgress(true)
  let response = await apiMethod(id)
  if (response.resultCode == 0) {
    dispatch(actionCreator(id))
  }
  setFollowInProgress(false)
}

export const follow = (id: number, setFollowInProgress: (param: boolean) => void): ThunkType => async (dispatch) => {
  let apiMethod = usersAPI.follow.bind(usersAPI)
  let actionCreator = actionsUsers.followSuccess
  flowFollowUnfollow(id, dispatch, apiMethod, actionCreator, setFollowInProgress)
}

export const unfollow = (id: number, setFollowInProgress: (param: boolean) => void): ThunkType => async (dispatch) => {
  setFollowInProgress(true)
  let apiMethod = usersAPI.unfollow.bind(usersAPI)
  let actionCreator = actionsUsers.unfollowSuccess
  flowFollowUnfollow(id, dispatch, apiMethod, actionCreator, setFollowInProgress)
}

export default usersReducer