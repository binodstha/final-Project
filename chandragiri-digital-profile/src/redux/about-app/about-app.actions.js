import { AboutAppActionsTypes } from "./about-app.types";

export const setAboutApp = (aboutApp) => ({
  type: AboutAppActionsTypes.SET_ABOUT_APP,
  payload: aboutApp,
});

export const setCenter = (aboutApp) => ({
  type: AboutAppActionsTypes.SET_CENTER,
  payload: aboutApp,
});

export const setZoom = (aboutApp) => ({
  type: AboutAppActionsTypes.SET_ZOOM,
  payload: aboutApp,
});
