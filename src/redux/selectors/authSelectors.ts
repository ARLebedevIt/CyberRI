import { AppStateType } from '../reduxStore';

export const getIsAuthSelector = (state: AppStateType) => state.auth.isAuth

export const getLoginSelector = (state: AppStateType) => state.auth.login

export const getCaptchaSelector = (state: AppStateType) => state.auth.captchaUrl

export const getAuthFetching = (state: AppStateType) => state.auth.isFetching