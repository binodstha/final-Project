import React from "react";
import { connect } from "react-redux";
import { setDatasetSources } from "../../redux/dataset/dataset.actions";
import { selectDatasetSourcesByDataset } from "../../redux/dataset/dataset.selectors";
import { Marker, Popup } from "react-leaflet";
import { Image } from "react-bootstrap";
import { pointerIcon } from "../../utils/util";
import axios from "axios";
import StartPin from "../../assets/images/icons/start.png";

class GeoLayer extends React.Component {
  async componentDidMount() {
    const { datasetSources } = this.props;
    if (datasetSources === undefined) {
      this.getGeolocation();
    }
  }

  getGeolocation = () => {
    const { dataset, setDatasetSources } = this.props;
    const apiUrl = "http://localhost:8800/admin/geodata-search"; // Replace with your API URL
    axios
      .get(apiUrl, {
        params: {
          category_id: dataset.id,
        },
      })
      .then((response) => {
        if (response.data.results.length > 0) {
          setDatasetSources({ id: dataset.id, geojson: response.data.results });
        }
        console.log("response", response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    const { datasetSources } = this.props;
    return (
      <>
        {datasetSources !== undefined && (
          <>
            {datasetSources.geojson.map((geodata) => (
              <>
                <Marker
                  position={[geodata.lat, geodata.lng]}
                  icon={pointerIcon(StartPin)}
                >
                  <Popup className="map-popup">
                    <div className="popup-detail">
                      {geodata.image && <Image src={geodata.image}></Image>}
                      <p>
                        <span>Name : </span>
                        {geodata.name}
                      </p>
                      <p>
                        <span>Detail : </span>
                        {geodata.detail}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </>
            ))}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  datasetSources: selectDatasetSourcesByDataset(props.dataset.id)(state),
});

const mapDispatchToProps = (dispatch) => ({
  setDatasetSources: (dataset) => dispatch(setDatasetSources(dataset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoLayer);
