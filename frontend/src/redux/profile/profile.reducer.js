
import { ProfileActionTypes } from "./profile.types";

const INITIAL_STATE = {
  isLoggedIn: false,
  profileDetail: null
}

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileActionTypes.SET_USER_PROFILE:
      return {
        ...state,
        profileDetail: action.payload
      }
    case ProfileActionTypes.SET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      }
    default:
      return state
  }
}

export default profileReducer;