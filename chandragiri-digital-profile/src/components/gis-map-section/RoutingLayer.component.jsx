import React, { useMemo, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectRoutingSource,
  selectRoutingDestination,
  selectRoutingPath,
} from "../../redux/gis-data/gis-data.selectors";
import { selectMapPin } from "../../redux/gis-data/gis-data.selectors";
import {
  setRoutingSource,
  setRoutingDetination,
} from "../../redux/gis-data/gis-data.actions";
import { Marker, GeoJSON, useMapEvents } from "react-leaflet";
import uuid from "react-uuid";
import { pointerIcon } from "../../utils/util";
import StartPin from "../../assets/images/icons/start.png";
import EndPin from "../../assets/images/icons/end.png";

function MapViewClicked({
  mapPin,
  setRoutingSource,
  setRoutingDetination,
  routingSource,
  routingDestination,
}) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      if (mapPin === "source" && routingSource === null) {
        setRoutingSource({
          label: `${lat.toFixed(6)},${lng.toFixed(6)}`,
          value: [lat, lng],
        });
      } else if (mapPin === "destination" && routingDestination === null) {
        setRoutingDetination({
          label: `${lat.toFixed(6)},${lng.toFixed(6)}`,
          value: [lat, lng],
        });
      }
    },
  });
  return null;
}

function DraggableMarker({ position, markerIcon, eventAction }) {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          eventAction({
            label: `${lat.toFixed(6)},${lng.toFixed(6)}`,
            value: [lat, lng],
          });
        }
      },
    }),
    []
  );
  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={pointerIcon(markerIcon)}
    ></Marker>
  );
}

class RoutingLayer extends React.Component {
  onEachFeature = (feature, layer) => {
    let style = {
      weight: 4,
      color: "#00baf2",
      opacity: 1,
      fillColor: "#322196",
      fill: false,
      radius: 10,
      fillOpacity: 0.4,
    };
    if (!feature.type.includes("Point")) {
      if (feature.properties.type === "path") layer.setStyle(style);
      else {
        style.dashArray = 10;
        style.color = "#dbdbdb";
        layer.setStyle(style);
      }
    }
  };
  render() {
    const {
      routingSource,
      routingDestination,
      routingPath,
      mapPin,
      setRoutingSource,
      setRoutingDetination,
    } = this.props;
    return (
      <>
        <MapViewClicked
          mapPin={mapPin}
          setRoutingSource={setRoutingSource}
          setRoutingDetination={setRoutingDetination}
          routingSource={routingSource.value}
          routingDestination={routingDestination.value}
        />
        {routingSource.value !== null && (
          <DraggableMarker
            position={routingSource.value}
            markerIcon={StartPin}
            eventAction={setRoutingSource}
            key="routing-source"
          />
        )}
        {routingDestination.value !== null && (
          <DraggableMarker
            position={routingDestination.value}
            markerIcon={EndPin}
            eventAction={setRoutingDetination}
            key="routing-destination"
          />
        )}
        {routingPath !== null && (
          <>
            {routingPath.map((path) => (
              <GeoJSON
                key={uuid()}
                data={path.geometry}
                onEachFeature={this.onEachFeature}
              />
            ))}
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  routingSource: selectRoutingSource,
  routingDestination: selectRoutingDestination,
  routingPath: selectRoutingPath,
  mapPin: selectMapPin,
});

const mapDispatchToProps = (dispatch) => ({
  setRoutingSource: (gisData) => dispatch(setRoutingSource(gisData)),
  setRoutingDetination: (gisData) => dispatch(setRoutingDetination(gisData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutingLayer);
