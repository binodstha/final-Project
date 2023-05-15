import { InstitutionalInformationActionTypes } from './institutional-information.types';

const INITIAL_STATE = {

    institutionalInfo: [],
}


const institutionalInformationReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case InstitutionalInformationActionTypes.SET_INSTITUTIONAL_INFORMATION:
            return {
                ...state,
                institutionalInfo: action.payload
            }
        default:
            return state
    }
}
export default institutionalInformationReducer