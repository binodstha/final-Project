import { DatasetActionTypes } from "./dataset.types";
import { updateDatasetChecked, addDatasetSources, updateCategoryChecked } from "./dataset.utils";

const INITIAL_STATE = {
  datasetCategories: [],
  datasetSources: [],
};
const datasetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DatasetActionTypes.SET_DATASET_CATEGORIES:
      return {
        ...state,
        datasetCategories: action.payload,
      };
    case DatasetActionTypes.UPDATE_CATEGORY_CHECKED:
      return {
        ...state,
        datasetCategories: [
          ...updateCategoryChecked(state.datasetCategories, action.payload),
        ],
      };
    case DatasetActionTypes.UPDATE_DATASET_CHECKED:
      return {
        ...state,
        datasetCategories: [
          ...updateDatasetChecked(state.datasetCategories, action.payload),
        ],
      };
    case DatasetActionTypes.SET_DATASET_SOURCES:
      return {
        ...state,
        datasetSources: addDatasetSources(state.datasetSources, action.payload),
      };
    default:
      return state;
  }
};

export default datasetReducer;
