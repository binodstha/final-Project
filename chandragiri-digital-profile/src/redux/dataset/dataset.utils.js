export const updateDatasetChecked = (datasetCategory, dataset) => {
   datasetCategory.map(category =>
    category.datasets.map(dt => {
      if (dt.tbl_name === dataset.tbl_name)
      dt.is_checked = !dt.is_checked
      return dt;
    })
   )
  return datasetCategory
}

export const addDatasetSources = (baseDatasource, newDataSource) => {
  return baseDatasource.concat([newDataSource])
}