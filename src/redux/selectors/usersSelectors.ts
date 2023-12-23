import { createSelector } from 'reselect'
import { AppStateType } from '../reduxStore'

export const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users
}

export const getUsersSuper = createSelector(getUsersSelector, (users) => {
  return users.filter(() => true)
})

export const getPageSizeSelector = (state: AppStateType) => {
  return state.usersPage.pageSize
}

export const getTotalItemsCountSelector = (state: AppStateType) => {
  return state.usersPage.totalItemsCount
}

export const getFilterUsersSelector = (state: AppStateType) => {
  return state.usersPage.filter
}

export const getIsLoadingUsersSelector = (state: AppStateType) => {
  return state.usersPage.isLoading
}
