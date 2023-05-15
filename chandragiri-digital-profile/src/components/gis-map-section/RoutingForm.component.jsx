import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Button } from "react-bootstrap";
import { decode, encode } from "geojson-polyline";
import {
  selectMapPin,
  selectRoutingSource,
  selectRoutingDestination,
  selectRoutingDistance,
} from "../../redux/gis-data/gis-data.selectors";
import {
  setMapPinType,
  setRoutingSource,
  setRoutingDetination,
  setRoutePath,
} from "../../redux/gis-data/gis-data.actions";
import { setCenter } from "../../redux/about-app/about-app.actions";
import Helper from "../../utils/helper";
import agent from "../../agent";

const RoutingForm = ({
  mapPin,
  routingSource,
  routingDestination,
  routingDistance,
  setMapPinType,
  setRoutingSource,
  setRoutingDetination,
  setRoutePath,
  setCenter,
}) => {
  const [hide, setHide] = useState(false);
  const handleChange = async (event) => {
    const inputValue = event.target.value;
    if (event.target.name === "source") setRoutingSource({ label: inputValue });
    else
      setRoutingDetination({
        label: inputValue,
      });
    if (event.target.name !== mapPin) {
      const point = await agent.gisDigitalData.gisLocationByHn(inputValue);
      if (point.centroid) {
        const pointLatLng = [
          Number(point.centroid.lat),
          Number(point.centroid.lng),
        ];
        if (event.target.name === "source")
          setRoutingSource({ value: pointLatLng });
        else setRoutingDetination({ value: pointLatLng });
        setCenter(pointLatLng);
      }
    }
  };

  const findPath = async () => {
    if (routingSource.value !== null && routingDestination.value !== null) {
      const path = await agent.gisDigitalData.gisLocationRoute(
        routingSource.value.toString(),
        routingDestination.value.toString()
      );
      let routingPath = path.path.map((pth) => {
        pth.geometry.properties = pth.properties;
        pth.geometry = decode(pth.geometry);
        delete pth.properties;
        return pth;
      });

      setRoutePath({ path: routingPath, distance: path.totalLength });
      setCenter([Number(path.centroid.lat), Number(path.centroid.lng)]);
    }
  };

  const clearRouting = () => {
    setRoutingSource({ label: null, value: null });
    setRoutingDetination({ label: null, value: null });
    setRoutePath({ path: null, distance: null });
    setMapPinType(null);
  };

  const handleMapClick = (value) => {
    setMapPinType(value !== mapPin ? value : null);
  };

  return (
    <div className="routing-form">
      <div className="routing-header">
        Find Direction{" "}
        <span className="toggle" onClick={() => setHide(!hide)}>
          <i
            className={`fa fa-angle-${hide ? "down" : "up"}`}
            aria-hidden="true"
          ></i>
        </span>
      </div>
      <div className={`routing-body ${hide ? "hide" : ""}`}>
        {routingDistance && (
          <Form.Group>
            <Form.Label className="distance">
              Total Distance :
              <span>{Helper.numberFormatter(routingDistance)}m</span>
            </Form.Label>
          </Form.Group>
        )}
        <Form.Group className="mb-1" controlId="formBasicEmail">
          <Form.Label>Start</Form.Label>
          <Form.Control
            type="text"
            name="source"
            placeholder="Start House no."
            value={routingSource.label ? routingSource.label : ""}
            readOnly={mapPin === "source"}
            onChange={handleChange}
            autoComplete="off"
          />
          <Form.Text
            className={`text-muted ${mapPin === "source" ? "active" : ""}`}
            onClick={() => handleMapClick("source")}
          >
            {mapPin === "source" ? "Search By house no." : "choose from map"}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            name="destination"
            placeholder="Destination House no."
            value={routingDestination.label ? routingDestination.label : ""}
            onChange={handleChange}
            readOnly={mapPin === "destination"}
            autoComplete="off"
          />
          <Form.Text
            className={`text-muted ${mapPin === "destination" ? "active" : ""}`}
            onClick={() => handleMapClick("destination")}
          >
            {mapPin === "destination"
              ? "Search By house no."
              : "choose from map"}
          </Form.Text>
        </Form.Group>
        <div className="btn-section">
          {routingSource.value !== null && routingDestination.value !== null && (
            <Button variant="primary" size="sm" onClick={findPath}>
              Find Path
            </Button>
          )}
          {(routingSource.label !== null ||
            routingDestination.label !== null) && (
            <Button variant="primary" size="sm" onClick={clearRouting}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  mapPin: selectMapPin,
  routingSource: selectRoutingSource,
  routingDestination: selectRoutingDestination,
  routingDistance: selectRoutingDistance,
});

const mapDispatchToProps = (dispatch) => ({
  setMapPinType: (gisData) => dispatch(setMapPinType(gisData)),
  setRoutingSource: (gisData) => dispatch(setRoutingSource(gisData)),
  setRoutingDetination: (gisData) => dispatch(setRoutingDetination(gisData)),
  setRoutePath: (gisData) => dispatch(setRoutePath(gisData)),
  setCenter: (aboutApp) => dispatch(setCenter(aboutApp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutingForm);
