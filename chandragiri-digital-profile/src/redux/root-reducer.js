import { combineReducers } from "redux";
import municipalityInfoReducer from "./municipality-info/municipality-info.reducers";
import customerServiceReducer from "./customer-service/customer-service.reducers";
import profileReducer from "./profile/profile.reducer";
import institutionalInformationReducer from "./institutional-information/institutional-information.reducers";
import aboutAppReducer from "./about-app/about-app.reducers";
import datasetReducer from "./dataset/dataset.reducers";
import gisDataReducres from "./gis-data/gis-data.reducers";

export default combineReducers({
  municipalityInfo: municipalityInfoReducer,
  customerService: customerServiceReducer,
  profile: profileReducer,
  institutionalInformation: institutionalInformationReducer,
  aboutApp: aboutAppReducer,
  dataset: datasetReducer,
  gisData: gisDataReducres,
});
