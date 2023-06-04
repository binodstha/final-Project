import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDatasetCategories } from "../../redux/dataset/dataset.selectors";
import GeoLayer from "./GeoLayer.component";

const Datasetlayer = ({ datasetCategories }) => {
  return (
    <>
      {datasetCategories.map(
        (category) =>
          category.is_checked && (
            <GeoLayer
              key={`dataset-geolayer-${category.id}`}
              dataset={category}
            />
          )
      )}
    </>
  );
  // {console.log(category)}
  // </>
  // return (<div key={`dataset-cat-${category.id}`}>
  //   {category.datasets.map(dataset => {
  //     return (<div key={`dataset-plot-${dataset.tbl_name}`}>{(dataset.is_checked) && (<GeoLayer dataset={dataset} />)}</div>)
  //   })}
  // </div>)
  // )}
  // </>)
};

const mapStateToProps = createStructuredSelector({
  datasetCategories: selectDatasetCategories,
});
export default connect(mapStateToProps)(Datasetlayer);
