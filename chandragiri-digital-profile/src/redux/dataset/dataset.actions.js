import { DatasetActionTypes } from "./dataset.types";

export const setDatasetCatrgories = dataset => ({
  type: DatasetActionTypes.SET_DATASET_CATEGORIES,
  payload: dataset
})

export const updateDatasetChecked = dataset => ({
  type: DatasetActionTypes.UPDATE_DATASET_CHECKED,
  payload: dataset
})

export const setDatasetSources = dataset => ({
  type: DatasetActionTypes.SET_DATASET_SOURCES,
  payload: dataset
})