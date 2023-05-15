import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  MapContainer,
  ScaleControl,
  ZoomControl,
  TileLayer,
  useMap,
} from "react-leaflet";
import { selectAboutApp } from "../../redux/about-app/about-app.selectors";
import DatasetLayer from "./DatasetLayer.component";
import ImageTileLayer from "./ImageTileLayer.comonent";
import ImageLayerToggle from "./ImageLayerToggle.component";
import SearchLayer from "./SearchLayer.component";
import TopSearch from "./TopSearch.component";
import RoutingForm from "./RoutingForm.component";
import RoutingLayer from "./RoutingLayer.component";
import "./gis-map-section.styles.scss";

function ChangeMapView({ coords, zoom }) {
  useMap().flyTo(coords, zoom);
  return null;
}

class GisMapSection extends React.Component {
  render() {
    const { aboutApp } = this.props;
    return (
      <div className="map__section" id="gis-map">
        <MapContainer
          className="leaflet_map"
          center={aboutApp.center}
          zoom={aboutApp.zoom}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <ChangeMapView coords={aboutApp.center} zoom={aboutApp.zoom} />
          <ScaleControl position="bottomleft" />
          <TileLayer
            attribution={aboutApp.attr}
            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          />
          <ImageTileLayer />
          <DatasetLayer />
          <SearchLayer />
          <RoutingLayer />
        </MapContainer>
        <ImageLayerToggle />
        <TopSearch />
        <RoutingForm />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  aboutApp: selectAboutApp,
});

export default connect(mapStateToProps)(GisMapSection);
