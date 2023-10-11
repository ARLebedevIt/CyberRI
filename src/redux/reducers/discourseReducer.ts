import { CommonThunkType, InferActionTypes, ResultCodesCRI } from "../../types/types";
import { Dispatch } from 'redux';
import { v1 } from 'uuid'
import { DiscourseMessageAPIType, SubscriberType, discourseAPI } from "../../api/discourseAPI";

let initialState = {
  messages: [] as DiscourseMessageType[],
}

export type DiscourseMessageType = DiscourseMessageAPIType & { id?: string }

export type SendMessageDiscourse = {
  newMessageText: string
}

type InitialStateType = typeof initialState

type ActionTypes = InferActionTypes<typeof actionsDiscourse>

export type ThunkType = CommonThunkType<ActionTypes>

const discourseReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "CRI/DISCOURSE/SET_MESSAGES":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
          .filter((m, index, array) => index >= array.length - 50)
      }
    case "CRI/DISCOURSE/SET_CLEAR_MESSAGES":
      return {
        ...state,
        messages: action.payload.messages
      }
    default:
      return state;
  }
}

export const actionsDiscourse = {
  setDiscourseMessages: (messages: DiscourseMessageType[]) => ({ type: "CRI/DISCOURSE/SET_MESSAGES", payload: { messages } } as const),
  setClearMessages: (messages: []) => ({ type: 'CRI/DISCOURSE/SET_CLEAR_MESSAGES', payload: { messages } } as const)
}

let _newMessageHandler: SubscriberType | null = null

const newMessageHandler = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => dispatch(actionsDiscourse.setDiscourseMessages(messages))
  }
  return _newMessageHandler
}

export const sendMessageDS = (message: SendMessageDiscourse): ThunkType => async (dispatch) => {
  const { newMessageText } = message
  discourseAPI.sendMessage(newMessageText)
}

export const startMessageListening = (): ThunkType => async (dispatch) => {
  discourseAPI.start()
  discourseAPI.subscribe(newMessageHandler(dispatch))
}

export const clearMessage = (messages: []) => (dispatch: Dispatch) => {
  dispatch(actionsDiscourse.setClearMessages(messages))
}

export const stopMessageListening = (): ThunkType => async (dispatch) => {
  discourseAPI.stop()
  discourseAPI.unsubscribe(newMessageHandler(dispatch))
  actionsDiscourse.setDiscourseMessages([])
}

export default discourseReducer