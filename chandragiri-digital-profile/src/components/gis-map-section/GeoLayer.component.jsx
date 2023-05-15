import React from "react";
import { connect } from "react-redux";
import { setDatasetSources } from "../../redux/dataset/dataset.actions";
import { selectDatasetSourcesByDataset } from "../../redux/dataset/dataset.selectors";
import { GeoJSON, Popup, Tooltip } from "react-leaflet";
import { Image } from "react-bootstrap";
import agent from "../../agent";
import { pointerIcon } from "../../utils/util";
import Helper from "../../utils/helper";
import L from "leaflet";

class GeoLayer extends React.Component {
  async componentDidMount() {
    const { dataset, setDatasetSources, datasetSources } = this.props;
    if (datasetSources === undefined) {
      setDatasetSources(
        await agent.gisDigitalData.getDatasetSources(dataset.tbl_name)
      );
    }
  }

  onEachFeature = (feature, layer) => {
    const { dataset } = this.props;
    if (dataset.geom_type === "ST_Point") {
      if (dataset.style.shape !== "icon") layer.setStyle(dataset.style.style);
    } else {
      layer.setStyle(dataset.style.style);
    }
  };

  pointToLayer = (feature, latlng) => {
    const { dataset } = this.props;
    if (latlng) {
      if (dataset.style.shape === "icon")
        return L.marker(latlng, {
          icon: pointerIcon(dataset.style.style.icon),
        });
      else
        return L.circleMarker(latlng, {
          radius: 7,
        });
    }
  };
  render() {
    const { datasetSources, dataset } = this.props;
    return (
      <>
        {datasetSources !== undefined && (
          <>
            {datasetSources.geojson.map((geodata) => (
              <GeoJSON
                key={`${dataset.tbl_name}-${geodata.id}`}
                data={geodata.geojson}
                onEachFeature={this.onEachFeature}
                pointToLayer={this.pointToLayer}
              >
                {geodata.properties && (
                  <Popup className="map-popup">
                    <div className="popup-detail">
                    {geodata.properties.image &&
                      geodata.properties.image !== undefined && (
                        <Image src={geodata.properties.image}></Image>
                      )}
                    {Object.keys(geodata.properties).map(
                      (key) =>
                        key !== "image" &&
                        geodata.properties[key] !== "" &&
                        geodata.properties[key] !== null && (
                          <p key={`${dataset.tbl_name}-${geodata.id}-${key}`}>
                            <span>{Helper.titleFormatter(key)} : </span>
                            {geodata.properties[key]}
                          </p>
                        )
                      )}
                      </div>
                  </Popup>
                )}
                {dataset.show_label && (
                  <Tooltip
                    className="map-tooltip"
                    direction="center"
                    offset={[0, -10]}
                    opacity={1}
                    permanent
                  >
                    {geodata.properties.name}
                  </Tooltip>
                )}
              </GeoJSON>
            ))}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  datasetSources: selectDatasetSourcesByDataset(props.dataset.tbl_name)(state),
});

const mapDispatchToProps = (dispatch) => ({
  setDatasetSources: (dataset) => dispatch(setDatasetSources(dataset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoLayer);
