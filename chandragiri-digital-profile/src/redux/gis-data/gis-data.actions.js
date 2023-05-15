import { GisDataActionTypes } from "./gis-data.types";

export const setAutoSuggestion = (gisData) => ({
  type: GisDataActionTypes.SET_AUTO_SUGGESTION,
  payload: gisData,
});

export const updateActiveCategory = (gisData) => ({
  type: GisDataActionTypes.UPDATE_SUGGESTION_CATEGORY,
  payload: gisData,
});

export const updateSearchResult = (gisData) => ({
  type: GisDataActionTypes.UPDATE_SEARCH_RESULT,
  payload: gisData,
});

export const setRoutingSource = (gisData) => ({
  type: GisDataActionTypes.SET_ROUTING_SOURCE,
  payload: gisData,
});

export const setRoutingDetination = (gisData) => ({
  type: GisDataActionTypes.SET_ROUTING_DESTINATION,
  payload: gisData,
});

export const setRoutePath = (gisData) => ({
  type: GisDataActionTypes.SET_ROUTING_PATH,
  payload: gisData,
});

export const setMapPinType = (gisData) => ({
  type: GisDataActionTypes.SET_MAP_PIN_TYPE,
  payload: gisData,
});
