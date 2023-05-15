import { InstitutionalInformationActionTypes } from './institutional-information.types';

export const setInstitutionalInformation = institutionalInfo => ({
    type: InstitutionalInformationActionTypes.SET_INSTITUTIONAL_INFORMATION,
    payload: institutionalInfo
})