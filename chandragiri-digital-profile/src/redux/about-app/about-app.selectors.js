import { createSelector } from "reselect";

const selectAboutAppSelector = state => state.aboutApp;

export const selectAboutApp = createSelector(
  [selectAboutAppSelector],
  aboutApp => aboutApp
)
