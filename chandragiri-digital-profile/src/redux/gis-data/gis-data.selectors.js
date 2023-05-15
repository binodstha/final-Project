import { createSelector } from "reselect";
import {
  getCategoryList,
  getActiveCategory,
  getRoutingValue,
} from "./gis-data.utils";

const selectGisData = (state) => state.gisData;

export const selectCategoryList = createSelector(
  [selectGisData],
  (selectGisData) => getCategoryList(selectGisData.autoSuggestion)
);

export const selectActiveCategory = createSelector(
  [selectGisData],
  (selectGisData) => getActiveCategory(selectGisData.autoSuggestion)
);

export const selectSearchList = createSelector(
  [selectGisData],
  (selectGisData) => selectGisData.searchResult
);

export const selectRoutingSource = createSelector(
  [selectGisData],
  (selectGisData) =>
    getRoutingValue(selectGisData.sourceLabel, selectGisData.sourceValue)
);

export const selectRoutingDestination = createSelector(
  [selectGisData],
  (selectGisData) =>
    getRoutingValue(
      selectGisData.destinationLabel,
      selectGisData.destinationValue
    )
);

export const selectRoutingPath = createSelector(
  [selectGisData],
  (selectGisData) => selectGisData.routingPath
);

export const selectRoutingDistance = createSelector(
  [selectGisData],
  (selectGisData) => selectGisData.routingDistance
);

export const selectMapPin = createSelector(
  [selectGisData],
  (selectGisData) => selectGisData.mapPin
);
