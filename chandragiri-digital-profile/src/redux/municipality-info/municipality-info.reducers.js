import { MunicipalityInfoActionTypes } from "./municipality-info.types";

const INITIAL_STATE = {
  municipalityWardData: [],
  latestNotice: [],
  notice: null,
  municipalityStatistics: [],
  buildingOwnership: [],
  buildingUsed: [],
  localProfile: [],
  banner: [],
  filterWard: { key: "नगरपालिका", value: "Municipality" },
  isMyFilterNotice: false,
};

const municipalityInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MunicipalityInfoActionTypes.SET_MUNICIPALITY_DATA:
      return {
        ...state,
        municipalityWardData: action.payload.municipalityData,
        latestNotice: action.payload.latestNotice,
      };

    case MunicipalityInfoActionTypes.SET_NOTICE:
      return {
        ...state,
        notice: action.payload.notice,
      };
    case MunicipalityInfoActionTypes.SET_BANNER:
      return {
        ...state,
        banner: action.payload,
      };

    case MunicipalityInfoActionTypes.SET_CHART_DATA:
      return {
        ...state,
        municipalityStatistics: action.payload.municipalityStatistics,
        buildingOwnership: action.payload.buildingOwnership,
        buildingUsed: action.payload.buildingUsed,
        localProfile: action.payload.localProfile,
      };
    case MunicipalityInfoActionTypes.UPDATE_FILTER_WARD:
      return {
        ...state,
        filterWard: action.payload,
      };
    case MunicipalityInfoActionTypes.SET_FILTER_NOTICE_WARD:
      return {
        ...state,
        isMyFilterNotice: !state.isMyFilterNotice,
      };
    default:
      return state;
  }
};

export default municipalityInfoReducer;
