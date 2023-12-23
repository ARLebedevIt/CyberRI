import { AppStateType } from '../reduxStore'

export const getImageSpaceSelector = (state: AppStateType) => state.space.img

export const getTitleSpaceSelector = (state: AppStateType) => state.space.title
