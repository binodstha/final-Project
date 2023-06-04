export const addComplain = (complainList, complain) => {
  complainList = complainList.concat(complain)
  return complainList;
}

export const addService = (serviceList, service) => {
  serviceList = serviceList.concat(service)
  return serviceList;
}

export const updateViewedStatus = (householdInfo, status) => {
  householdInfo.updated_data_is_viewed = status
  return { ...householdInfo }
}