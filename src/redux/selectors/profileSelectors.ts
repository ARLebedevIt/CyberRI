import { AppStateType } from "../reduxStore"

export const getProfileSelector = (state: AppStateType) => state.profilePage.profile

export const getStatusSelector = (state: AppStateType) => state.profilePage.status

export const getAuthIdSelector = (state: AppStateType) => state.auth.userId

export const getPostsSelector = (state: AppStateType) => state.profilePage.posts

export const getEditDataProfile = {
  getProfile: (state: AppStateType) => state.profilePage.profile,
  getStatus: (state: AppStateType) => state.profilePage.status,
  getFullName: (state: AppStateType) => state.profilePage.profile?.fullName,
  getLookingForAJobDesc: (state: AppStateType) => state.profilePage.profile?.lookingForAJobDescription,
  getLookingForAJob: (state: AppStateType) => state.profilePage.profile?.lookingForAJob,
  getAboutMe: (state: AppStateType) => state.profilePage.profile?.aboutMe,
  getContacts: (state: AppStateType) => state.profilePage.profile?.contacts,
  getMainLink: (state: AppStateType) => state.profilePage.profile?.contacts.mainLink,
  getGitHub: (state: AppStateType) => state.profilePage.profile?.contacts.github
}