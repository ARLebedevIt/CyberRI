import { AppStateType } from './../reduxStore'

export const getMailStatusSelector = (state: AppStateType) => state.mail.status
