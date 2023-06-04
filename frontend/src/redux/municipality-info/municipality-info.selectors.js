import { createSelector } from "reselect";
import {
  getWardFilter,
  getDoughnutChart,
  getDataByWard,
  getBuildingByWard,
  getNoticeByMyWard,
} from "./municipality-info.utils";

const selectMunicpalityInfo = (state) => state.municipalityInfo;

export const selectMunicipalityWardData = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => municipalityInfo.municipalityWardData
);

export const selectDataByWard = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) =>
    getDataByWard(
      municipalityInfo.municipalityWardData,
      municipalityInfo.filterWard
    )
);

export const selectWardfilterList = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => getWardFilter(municipalityInfo.municipalityWardData)
);

export const selectWardSelected = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => municipalityInfo.filterWard
);

export const selectMunicipalityStatistics = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => municipalityInfo.municipalityStatistics
);

export const selectLatestNotice = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) =>
    getNoticeByMyWard(
      municipalityInfo.latestNotice,
      municipalityInfo.isMyFilterNotice
    )
);

export const selectBanner = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => municipalityInfo.banner
);

export const selectNotice = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => municipalityInfo.notice
);

export const selectBuildingByWard = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => getBuildingByWard(municipalityInfo.municipalityWardData)
);

export const selectBuildingOwnership = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => getDoughnutChart(municipalityInfo.buildingOwnership)
);

export const selectBuildingUsed = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => getDoughnutChart(municipalityInfo.buildingUsed)
);

export const selectLocalProfile = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => municipalityInfo.localProfile
);

export const selectFilterNoticeByWard = createSelector(
  [selectMunicpalityInfo],
  (municipalityInfo) => municipalityInfo.isMyFilterNotice
);
