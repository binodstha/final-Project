import { CustomerServiceActionTypes } from "./customer-service.types";

export const setCustomerServiceDashboard = customerService => ({
  type: CustomerServiceActionTypes.SET_DASHBOARD_DATA,
  payload: customerService
})

export const setCustomerHouseholdInformation = customerService => ({
  type: CustomerServiceActionTypes.SET_HOUSEHOLD_INFORMATION,
  payload: customerService
})

export const setCustomerUpdatedHouseholdInformation = customerService => ({
  type: CustomerServiceActionTypes.SET_UPDATED_HOUSEHOLD_INFORMATION,
  payload: customerService
})

export const setInstitutionInfo = customerService => ({
  type: CustomerServiceActionTypes.SET_INSTITUTION_INFORMATION,
  payload: customerService
})

export const setInstitutionCatList = customerService => ({
  type: CustomerServiceActionTypes.SET_INSTITUTION_CATEGORY_LIST,
  payload: customerService
})

export const setCustomerComplain = customerService => ({
  type: CustomerServiceActionTypes.SET_COMPLAIN,
  payload: customerService
})

export const addCustomerComplain = customerService => ({
  type: CustomerServiceActionTypes.ADD_COMPLAIN,
  payload: customerService
})

export const setCustomerServices = customerService => ({
  type: CustomerServiceActionTypes.SET_SERVICE,
  payload: customerService
})


export const addCustomerServices = customerService => ({
  type: CustomerServiceActionTypes.ADD_SERVICE,
  payload: customerService
})

export const toggleShowImageLayer = customerService => ({
  type: CustomerServiceActionTypes.TOGGLE_SHOW_IAMGE_LAYER,
  payload: customerService
})
export const toggleUpdateSuccess = customerService => ({
  type: CustomerServiceActionTypes.TOGGLE_UPDATE_SUCCESS,
  payload: customerService
})

export const updateViewedStatus = customerService => ({
  type: CustomerServiceActionTypes.UPDATE_VIEWED_STATUS,
  payload:customerService
})



