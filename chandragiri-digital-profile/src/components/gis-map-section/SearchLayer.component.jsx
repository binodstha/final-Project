import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSearchList } from "../../redux/gis-data/gis-data.selectors";
import { GeoJSON, Popup } from "react-leaflet";
import Helper from "../../utils/helper";
import uuid from "react-uuid";
import { pointerIcon } from "../../utils/util";
import StartPin from "../../assets/images/icons/start.png";
import L from "leaflet";

class SearchLayer extends React.Component {
  onEachFeature = (feature, layer) => {
    if (!feature.type.includes("Point")) layer.setStyle({ color: "#292961" });
  };

  pointToLayer = (feature, latlng) => {
    return L.marker(latlng, {
      icon: pointerIcon(StartPin),
    });
  };

  render() {
    const { searchList } = this.props;
    return (
      <>
        {searchList.map((layer) => (
          <GeoJSON
            data={layer.geojson}
            key={uuid()}
            onEachFeature={this.onEachFeature}
            pointToLayer={this.pointToLayer}
          >
            <Popup className="map-popup">
              {Object.keys(layer.properties).map((key) => {
                return (
                  <p key={`search-layer-${key}`}>
                    <span>{Helper.titleFormatter(key)} : </span>
                    {layer.properties[key]}
                  </p>
                );
              })}
            </Popup>
          </GeoJSON>
        ))}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchList: selectSearchList,
});

export default connect(mapStateToProps)(SearchLayer);
