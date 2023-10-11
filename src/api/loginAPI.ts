import { ResponseGeneric } from "../types/types"
import { instanceCRI } from "./commonAPI"

export type AuthDataType = {
  id: number
  email: string,
  login: string
}

export type LoginDataType = {
  userId: number
}

export const loginAPI = {
  getAuth() {
    return instanceCRI.get<ResponseGeneric<AuthDataType>>('auth/me').then(response => response.data)
  },
  login(email: string, password: string, rememberMe: boolean | string, captcha: null | string) {
    return instanceCRI.post<ResponseGeneric<LoginDataType>>('auth/login', { email, password, rememberMe, captcha })
      .then(response => response.data)
  },
  logout() {
    return instanceCRI.delete<ResponseGeneric>('auth/login').then(response => response.data)
  },
}
