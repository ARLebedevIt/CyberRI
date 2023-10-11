import { instanceCRI } from "./commonAPI"

type SecurityResponseType = {
  url: string
}

export const securityAPI = {
  getCaptcha() {
    return instanceCRI.get<SecurityResponseType>('security/get-captcha-url')
  },
}