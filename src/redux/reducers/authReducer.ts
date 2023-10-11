import { CommonThunkType, InferActionTypes, ResultCodesCRI as ResultCodesCRI } from "../../types/types";
import { loginAPI } from "../../api/loginAPI";
import { securityAPI } from "../../api/securityAPI";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null as string | null,
}

type InitialStateType = typeof initialState

type ActionTypes = InferActionTypes<typeof actionsAuth>

type ThunkType = CommonThunkType<ActionTypes>

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case "CRI/AUTH/SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      }
    case "CRI/AUTH/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export const actionsAuth = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({ type: "CRI/AUTH/SET_USER_DATA", payload: { userId, email, login, isAuth } } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({ type: "CRI/AUTH/GET_CAPTCHA_URL_SUCCESS", payload: { captchaUrl } } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let response = await loginAPI.getAuth()
  if (response.resultCode === ResultCodesCRI.Success) {
    let { id, email, login } = response.data
    dispatch(actionsAuth.setAuthUserData(id, email, login, true))
  }
}

export const getAuthLogin = (email: string, password: string, rememberMe: boolean | string, captcha: string,
  setStatus: (param: string[] | string) => void,
  setSubmitting: (param: boolean) => void): ThunkType => async (dispatch) => {
    if (rememberMe === 'false') rememberMe = false
    let response = await loginAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesCRI.Success) {
      dispatch(getAuthUserData())
    } else {
      if (response.resultCode === ResultCodesCRI.CaptchaIsRequired) {
        dispatch(getCaptcha());
      }
      setSubmitting(false)
      setStatus(response.messages)
    }
  }

export const getCaptcha = (): ThunkType => async (dispatch) => {
  let response = await securityAPI.getCaptcha()
  const captchaUrl = response.data.url
  dispatch(actionsAuth.getCaptchaUrlSuccess(captchaUrl))
}

export const getAuthLogout = (): ThunkType => async (dispatch) => {
  let response = await loginAPI.logout()
  if (response.resultCode === ResultCodesCRI.Success) {
    dispatch(actionsAuth.setAuthUserData(null, null, null, false))
  }
}

export default authReducer