import { createSelector } from "reselect";

const selectCustomerService = state => state.customerService;

export const selectCustomerServiceDashboard = createSelector(
  [selectCustomerService],
  customerService => customerService.dashboard
)

export const selectCenter = createSelector(
  [selectCustomerService],
  customerService => customerService.center
)

export const selectZoom = createSelector(
  [selectCustomerService],
  customerService => customerService.zoom
)
export const selectInstitutionInfo = createSelector (
  [selectCustomerService],
  customerService => customerService.institutionInfo
)
export const selectInstitutionCategory = createSelector (
  [selectCustomerService],
  customerService => customerService.institutionCatList
)

export const selectCustomerServiceHouseholdInfo = createSelector(
  [selectCustomerService],
  customerService => customerService.householdInfo
)

export const selectCustomerServiceUpdatedHouseholdInfo = createSelector(
  [selectCustomerService],
  customerService => customerService.updatedHouseholdInfo
)

export const selectCustomerServiceComplainList = createSelector(
  [selectCustomerService],
  customerService => customerService.complain
)

export const selectCustomerServiceServices = createSelector(
  [selectCustomerService],
  customerService => customerService.service
)

export const selectShowImageLayer = createSelector(
  [selectCustomerService],
  customerService => customerService.showImageLayer
)

export const selectUpdateSuccess = createSelector(
  [selectCustomerService],
  customerService => customerService.isUpdateSuccess
)


