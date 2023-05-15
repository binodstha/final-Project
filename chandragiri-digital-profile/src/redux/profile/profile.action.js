import { ProfileActionTypes } from "./profile.types";

export const setUserProfile = profile => ({
  type: ProfileActionTypes.SET_USER_PROFILE,
  payload: profile
})

export const setUserLogin = profile => ({
  type: ProfileActionTypes.SET_USER_LOGGED_IN,
  payload: profile
})

