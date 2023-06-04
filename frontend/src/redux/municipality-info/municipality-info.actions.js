import { MunicipalityInfoActionTypes } from "./municipality-info.types";

export const setMunicipalityData = (municipalityInfo) => ({
  type: MunicipalityInfoActionTypes.SET_MUNICIPALITY_DATA,
  payload: municipalityInfo,
});

export const setBanner = (municipalityInfo) => ({
  type: MunicipalityInfoActionTypes.SET_BANNER,
  payload: municipalityInfo,
});

export const setMunicipalityNotice = (municipalityInfo) => ({
  type: MunicipalityInfoActionTypes.SET_NOTICE,
  payload: municipalityInfo,
});

export const setChartData = (municipalityInfo) => ({
  type: MunicipalityInfoActionTypes.SET_CHART_DATA,
  payload: municipalityInfo,
});

export const updateFilterWard = (municipalityInfo) => ({
  type: MunicipalityInfoActionTypes.UPDATE_FILTER_WARD,
  payload: municipalityInfo,
});

export const updateFilterNotice = (municipalityInfo) => ({
  type: MunicipalityInfoActionTypes.SET_FILTER_NOTICE_WARD,
  payload: municipalityInfo,
});
