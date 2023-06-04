import { createSelector } from "reselect";
// import { selectDatasetSourcesData } from "./dataset.utils";

const selectDatasets = state => state.dataset;

export const selectDatasetCategories = createSelector(
  [selectDatasets],
  dataset => dataset.datasetCategories
)

export const selectDatasetSourcesByDataset = id => createSelector(
  [selectDatasets],
  dataset => dataset.datasetSources.find(source => {
    if (source.id === id) return source
  })
)