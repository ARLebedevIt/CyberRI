import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AppStateType } from "../redux/reduxStore"
import { Action, AnyAction } from "redux"

export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
///////////////////////////////////////////////////////////////////////////////////
export type CommonThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
///////////////////////////////////////////////////////////////////////////////////

export type PostType = {
  id: number
  text: string
  date: number | string
}

export type PhotosType = {
  small: string | null
  large: string | null
}

export enum ResultCodesCRI {
  Success = 0,
  SomthingWrong = 1,
  CaptchaIsRequired = 10
}

export enum ResultCodesOther {
  NotFound = 404,
  NetworkError = 429,
  Success = 200
}

export type LoginType = {
  isAuth: boolean
  getAuthLogout: () => void
  login: null | string
}

export type ResponseGeneric<D = {} | ResultCodesCRI> = {
  resultCode: ResultCodesCRI
  messages: string[] | string
  data: D
}

export interface useBrowserHook  {
  name: string,
  version: string | number
}

export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>; 
