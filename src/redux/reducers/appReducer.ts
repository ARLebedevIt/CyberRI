import { CommonThunkType } from '../../types/types';
import { getAuthUserData } from "./authReducer";
import { InferActionTypes } from "../../types/types";

let initialState = {
  initialized: false,
}

export type InitialStateType = typeof initialState

type ActionTypes = InferActionTypes<typeof actionsApp>

type ThunkType = CommonThunkType<ActionTypes, void>

const appReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case "CRI/APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: action.initialized
      }
    default:
      return state;
  }
}

export const actionsApp = {
  initializedSuccess: (param: boolean) => ({ type: "CRI/APP/INITIALIZED_SUCCESS", initialized: param } as const)
}

export const initializeApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(actionsApp.initializedSuccess(true))
  })
}

export default appReducer