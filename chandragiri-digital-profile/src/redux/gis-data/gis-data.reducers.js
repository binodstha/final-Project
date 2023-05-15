import { GisDataActionTypes } from "./gis-data.types";
import { updateActiveCategory } from "./gis-data.utils";

const INITIAL_STATE = {
  autoSuggestion: [],
  searchResult: [],
  sourceLabel: null,
  sourceValue: null,
  destinationLabel: null,
  destinationValue: null,
  routingPath: null,
  routingDistance: null,
  mapPin: null,
};

const gisDataReducres = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GisDataActionTypes.SET_AUTO_SUGGESTION:
      return {
        ...state,
        autoSuggestion: action.payload,
      };
    case GisDataActionTypes.UPDATE_SUGGESTION_CATEGORY:
      return {
        ...state,
        autoSuggestion: updateActiveCategory(
          state.autoSuggestion,
          action.payload
        ),
      };
    case GisDataActionTypes.UPDATE_SEARCH_RESULT:
      return {
        ...state,
        searchResult: [...action.payload],
      };
    case GisDataActionTypes.SET_ROUTING_SOURCE:
      return {
        ...state,
        sourceLabel:
          action.payload.label === undefined
            ? state.sourceLabel
            : action.payload.label,
        sourceValue:
          action.payload.value === undefined
            ? state.sourceValue
            : action.payload.value === null
            ? null
            : [...action.payload.value],
      };
    case GisDataActionTypes.SET_ROUTING_DESTINATION:
      return {
        ...state,
        destinationLabel:
          action.payload.label === undefined
            ? state.destinationLabel
            : action.payload.label,
        destinationValue:
          action.payload.value === undefined
            ? state.destinationValue
            : action.payload.value === null
            ? null
            : [...action.payload.value],
      };
    case GisDataActionTypes.SET_ROUTING_PATH:
      return {
        ...state,
        routingPath: action.payload.path,
        routingDistance: action.payload.distance
      };
    case GisDataActionTypes.SET_MAP_PIN_TYPE:
      return {
        ...state,
        mapPin: action.payload,
      };
    default:
      return state;
  }
};
export default gisDataReducres;
