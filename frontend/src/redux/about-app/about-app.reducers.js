import { AboutAppActionsTypes } from "./about-app.types";

const INITIAL_STATE = {
  title: "Geoloacation Mapping and Routing",
  center: [27.7089543,85.284933],
  zoom: 10,
  basemap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  minZoom: 10,
  maxZoom: 21,
  attr: "2023 Binod",
};
const aboutAppReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AboutAppActionsTypes.SET_ABOUT_APP:
      return {
        ...state,
        title: action.payload.title,
        center: [action.payload.latitude, action.payload.longitude],
        zoom: action.payload.zoom,
        basemap: action.payload.basemap,
        minZoom: action.payload.min_zoom,
        maxZoom: action.payload.max_zoom,
        attr: action.payload.attribute,
      };
    case AboutAppActionsTypes.SET_CENTER:
      return {
        ...state,
        center: action.payload,
      };
    case AboutAppActionsTypes.SET_ZOOM:
      return {
        ...state,
        zoom: action.payload,
      };
    default:
      return state;
  }
};

export default aboutAppReducer;
