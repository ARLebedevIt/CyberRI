import { AppStateType } from './../reduxStore'

export const getNoteSelector = (state: AppStateType) => state.assistant.notes
