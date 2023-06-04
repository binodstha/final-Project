import { CustomerServiceActionTypes } from "./customer-service.types";
import { addComplain, addService, updateViewedStatus } from "./customer-service.utils";

const INITIAL_STATE = {
  dashboard: null,
  center: [27.7089543,85.284933],
  zoom: 15,
  householdInfo: null,
  updatedHouseholdInfo: null,
  institutionInfo: null,
  institutionCatList: [],
  complain: null,
  service: null,
  editConfig: {},
  showImageLayer: false,
  isUpdateSuccess: false,
}

const customerServiceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerServiceActionTypes.SET_DASHBOARD_DATA:
      return {
        ...state,
        dashboard: action.payload,
        center: [Number(action.payload.latitude), Number(action.payload.longitude)],
        zoom: 15
      }
    case CustomerServiceActionTypes.SET_HOUSEHOLD_INFORMATION:
      return {
        ...state,
        householdInfo: action.payload
      }
    case CustomerServiceActionTypes.SET_UPDATED_HOUSEHOLD_INFORMATION:
      return {
        ...state,
        updatedHouseholdInfo: action.payload
      }
    case CustomerServiceActionTypes.SET_INSTITUTION_INFORMATION:
    return {
      ...state,
      institutionInfo: action.payload
      }
      case CustomerServiceActionTypes.SET_INSTITUTION_CATEGORY_LIST:
        return {
          ...state,
          institutionCatList: action.payload
        }
    case CustomerServiceActionTypes.SET_COMPLAIN:
      return {
        ...state,
        complain: action.payload
      }
    case CustomerServiceActionTypes.ADD_COMPLAIN:
      return {
        ...state,
        complain: addComplain(state.complain, action.payload)
      }
    case CustomerServiceActionTypes.SET_SERVICE:
      return {
        ...state,
        service: action.payload
      }
    case CustomerServiceActionTypes.ADD_SERVICE:
      return {
        ...state,
        service: addService(state.service, action.payload)
      }
    case CustomerServiceActionTypes.TOGGLE_SHOW_IAMGE_LAYER:
      return {
        ...state,
        showImageLayer: !state.showImageLayer
      }
      case CustomerServiceActionTypes.TOGGLE_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: action.payload
      }
    case CustomerServiceActionTypes.UPDATE_VIEWED_STATUS:
      return {
        ...state,
        householdInfo: updateViewedStatus(state.householdInfo, action.payload)

      }
    default:
      return state
  }
}

export default customerServiceReducer
