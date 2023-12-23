import { AppStateType } from '../reduxStore'

export const getImageSelector = (state: AppStateType) => {
  return state.dvizhenimator.image
}

export const getErrorImageSelector = (state: AppStateType) => {
  return state.dvizhenimator.error
}
