import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Button, Form, Modal } from "react-bootstrap";
import {
  MapContainer,
  ScaleControl,
  ZoomControl,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
} from "react-leaflet";
import { selectCenter } from "../../redux/customer-service/customer-service.selectors";

import { selectAboutApp } from "../../redux/about-app/about-app.selectors";
import Helper from "../../utils/helper";
import L from "leaflet";
import axios from "axios";

const INITIAL_STATE = {
  name: "",
  category_id: "",
  details: "",
  lat: null,
  lng: null,
  errMsg: [],
  selectedFile: "",
  btnDisable: false,
};

const EXT = ["image/jpeg", "image/jpg", "image/png"];

function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.flyTo(coords, zoom);
  return null;
}

function MapViewClicked({ action }) {
  useMapEvents({
    click: (e) => {
      action(e);
    },
  });
  return null;
}
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

class AddGeolocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSubmit = async (event) => {
    const { handleClose, successResponse } = this.props;
    event.preventDefault();
    let err = [];
    if (
      this.state.name.trim().length < 1 ||
      this.state.name.trim().length > 50
    ) {
      err.push({
        code: "name",
        detail: "Name must not be greater than 50 characters.",
      });
    }

    if (this.state.details.trim().length > 100) {
      err.push({
        code: "details",
        detail: "Details must be less then 100 characters.",
      });
    }

    if (this.state.category_id === "") {
      err.push({
        code: "category_id",
        detail: "Department is required.",
      });
    }

    if (this.state.lat === "") {
      err.push({
        code: "lat",
        detail: "Latitude is required.",
      });
    }

    if (this.state.lng === "") {
      err.push({
        code: "lng",
        detail: "Longitude is required.",
      });
    }

    if (err.length === 0) {
      this.setState({ btnDisable: true });

      try {
        const res = await axios.post(
          "http://localhost:8800/admin/geodata",
          this.state
        );

        if (res.status === 200) {
          handleClose();
          successResponse(true);
          this.setState(INITIAL_STATE);
        }
      } catch (err) {
        this.setState({
          isError: true,
          errMsg: err.response.data.errors,
        });
        setTimeout(() => {
          this.setState({
            isError: false,
            errMsg: [],
          });
        }, 5000);
      }
    } else {
      this.setState({ errMsg: err });
    }
  };

  handleUpdateLocation = (event) => {
    const { lat, lng } = event.latlng;
    this.setState({ lat: lat, lng: lng });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let err = [];
    this.setState({ [name]: value });
    if (this.state.name.trim().length > 50) {
      err.push({
        code: "name",
        detail: "Name must not be greater than 50 characters.",
      });
    }

    if (this.state.details.trim().length >= 100) {
      err.push({
        code: "details",
        detail: "Details must be in between less then 100 characters.",
      });
    }
    if (err.length !== 0) {
      this.setState({ errMsg: err });
    } else {
      this.setState({ errMsg: [] });
    }
  };
  uploadHandler = (event) => {
    let err = [];

    if (!EXT.includes(event.target.files[0].type)) {
      err.push({
        code: "file",
        detail: "File must be of type PNG,JPEG,JPG ",
      });
    }
    if (
      event.target.files[0].size > process.env.REACT_APP_MAX_FILE_UPLOAD_SIZE
    ) {
      err.push({ code: "file", detail: "File must be of size less than 5 MB" });
    }
    if (err.length === 0) {
      let files = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        console.log(e.target.result);
        this.setState({
          selectedFile: e.target.result,
        });
      };
      reader.onerror = (error) => {
        return error;
      };
    } else {
      this.setState({ errMsg: err });
      event.target.value = "";
    }
  };

  modalClose = () => {
    const { handleClose } = this.props;
    this.setState(INITIAL_STATE);
    handleClose();
  };

  render() {
    const { modalShow, categoryList, center, aboutApp } = this.props;
    return (
      <>
        <Modal
          className="theme-modal"
          backdrop="static"
          dialogClassName="modal-50w"
          show={modalShow}
          onHide={this.modalClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Service Type</Modal.Title>
          </Modal.Header>

          <div className="modal-form">
            <Form className="form-lg" onSubmit={this.handleSubmit}>
              <Modal.Body className="bordered">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="require">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    maxLength="51"
                    required
                    isInvalid={Helper.isColError("name", this.state.errMsg)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {Helper.getErrorMsg("name", this.state.errMsg)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="category_id">
                  <Form.Label className="require">Category</Form.Label>
                  <Form.Control
                    name="category_id"
                    value={this.state.category_id}
                    as="select"
                    onChange={this.handleChange}
                    isInvalid={Helper.isColError(
                      "category_id",
                      this.state.errMsg
                    )}
                  >
                    <option value={""}>-- Select Category --</option>
                    {categoryList.map((category) => (
                      <option
                        key={`geo-category-${category.id}`}
                        value={category.id}
                      >
                        {category.title}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {Helper.getErrorMsg("category_id", this.state.errMsg)}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="require">Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="details"
                    onChange={this.handleChange}
                    value={this.state.details}
                    maxLength="1001"
                    required
                    isInvalid={Helper.isColError("details", this.state.errMsg)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {Helper.getErrorMsg("details", this.state.errMsg)}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>File Upload</Form.Label>
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={this.uploadHandler}
                    accept="image/jpeg,image/jpg,image/png,application/pdf"
                    isInvalid={Helper.isColError("file", this.state.errMsg)}
                  />
                  <Form.Text className="text-muted">
                    Only png, jpg, jpeg and pdf file is acceptable
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {Helper.getErrorMsg("file", this.state.errMsg)}
                  </Form.Control.Feedback>
                </Form.Group> */}

                <div className="d-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="require">Latitude</Form.Label>
                    <Form.Control
                      type="text"
                      name="lat"
                      onChange={this.handleChange}
                      value={this.state.lat}
                      required
                      readOnly
                      isInvalid={Helper.isColError("lat", this.state.errMsg)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg("lat", this.state.errMsg)}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="require">Longitude</Form.Label>
                    <Form.Control
                      type="text"
                      name="lng"
                      onChange={this.handleChange}
                      value={this.state.lng}
                      required
                      readOnly
                      isInvalid={Helper.isColError("lng", this.state.errMsg)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg("type", this.state.errMsg)}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="map__section" id="geodata">
                  <MapContainer
                    className="leaflet_map"
                    center={aboutApp.center}
                    zoom={10}
                    scrollWheelZoom={true}
                    zoomControl={false}
                  >
                    <MapViewClicked action={this.handleUpdateLocation} />
                    {this.state.lat && this.state.lng && (
                      <Marker
                        position={[this.state.lat, this.state.lng]}
                      ></Marker>
                    )}
                    <ZoomControl position="bottomright" />
                    <ChangeMapView coords={center} zoom={aboutApp.zoom} />
                    <ScaleControl position="bottomleft" />
                    <TileLayer
                      attribution={aboutApp.attr}
                      url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    />
                  </MapContainer>
                </div>

                <div className="errMsg">
                  {Helper.getErrorMsg(500, this.state.errMsg)}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="text-end">
                  <Button
                    variant="secondary"
                    className="me-3"
                    onClick={this.modalClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={this.state.btnDisable}>
                    Add Geolocation
                  </Button>
                </div>
              </Modal.Footer>
            </Form>
          </div>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  aboutApp: selectAboutApp,
  center: selectCenter,
});

export default connect(mapStateToProps)(AddGeolocationModal);
