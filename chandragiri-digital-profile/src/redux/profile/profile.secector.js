import { createSelector } from "reselect";

const selectUserProfile = state => state.profile;

export const selectProfile = createSelector(
  [selectUserProfile],
  selectUserProfile => selectUserProfile.profileDetail

)