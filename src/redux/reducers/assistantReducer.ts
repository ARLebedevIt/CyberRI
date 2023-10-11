import { Dispatch } from "redux"
import { InferActionTypes } from "../../types/types"

let initialState = {
  notes: 'Заметок нет',
}

type InitialStateType = typeof initialState

type ActionTypes = InferActionTypes<typeof actionsAssistant>

const assistantReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'CRI/ASSISTANT/SET_NOTE':
      return {
        ...state,
        notes: action.text,
      }
    default:
      return state
  }
}

const actionsAssistant = {
  setNote: (text: string) => ({ type: 'CRI/ASSISTANT/SET_NOTE', text: text } as const)
}

export const getNote = (text: string) => (dispatch: Dispatch) => {
  dispatch(actionsAssistant.setNote(text))
}

export default assistantReducer