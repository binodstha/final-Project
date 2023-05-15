import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Helper from "../../utils/helper";
import agent from "../../agent";

const INITIAL_STATE = {
  title: "",
  type: "",
  details: "",
  is_ward: "1",
  ward_num: "",
  department_id: "",
  errMsg: [],
  selectedFile: "",
  btnDisable: false,
};

const EXT = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

class AddServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSubmit = async (event) => {
    const { handleClose, successResponse } = this.props;
    event.preventDefault();
    let err = [];
    if (
      this.state.title.trim().length < 1 ||
      this.state.title.trim().length > 50
    ) {
      err.push({
        code: "title",
        detail: "Title must not be greater than 50 characters.",
      });
    }
    if (
      this.state.type.trim().length < 1 ||
      this.state.type.trim().length > 20
    ) {
      err.push({
        code: "type",
        detail: "Type must not be greater than 20 characters.",
      });
    }
    if (
      this.state.details.trim().length < 100 ||
      this.state.details.trim().length > 1000
    ) {
      err.push({
        code: "details",
        detail: "Details must be in between 100 and 1000 characters.",
      });
    }
    if (this.state.ward_num === "" && this.state.is_ward === "1") {
      err.push({
        code: "ward_num",
        detail: "ward number is required.",
      });
    }
    if (this.state.department_id === "" && this.state.is_ward === "0") {
      err.push({
        code: "department_id",
        detail: "Department is required.",
      });
    }

    if (err.length === 0) {
      this.setState({ btnDisable: true });
      const formData = new FormData();
      formData.append("file", this.state.selectedFile);
      formData.append("title", this.state.title);
      formData.append("type", this.state.type);
      formData.append("details", this.state.details);
      formData.append("is_ward", this.state.is_ward);
      formData.append("ward_num", this.state.ward_num);
      formData.append("department_id", this.state.department_id);

      let res = await agent.publicDigitalData.addService(formData);
      if (res.errors === undefined) {
        handleClose();
        successResponse(true);
        this.setState(INITIAL_STATE);
      } else {
        this.setState({
          btnDisable: false,
          errMsg: res.errors,
        });
      }
    } else {
      this.setState({ errMsg: err });
    }
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    let err = [];
    this.setState({ [name]: value });
    if (this.state.title.trim().length > 50) {
      err.push({
        code: "title",
        detail: "Title must not be greater than 50 characters.",
      });
    }
    if (this.state.type.trim().length > 20) {
      err.push({
        code: "type",
        detail: "Type must not be greater than 20 characters.",
      });
    }
    if (this.state.details.trim().length >= 1000) {
      err.push({
        code: "details",
        detail: "Details must be in between 100 and 1000 characters.",
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
        detail: "File must be of type PNG,JPEG,JPG or PDF",
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
    const { modalShow, profile, departments, wards } = this.props;
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
            {profile.email !== null ? (
              <Form className="form-lg" onSubmit={this.handleSubmit}>
                <Modal.Body className="bordered">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="require">Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                      maxLength="51"
                      required
                      isInvalid={Helper.isColError("title", this.state.errMsg)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg("title", this.state.errMsg)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="require">Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="type"
                      onChange={this.handleChange}
                      value={this.state.type}
                      maxLength="21"
                      required
                      isInvalid={Helper.isColError("type", this.state.errMsg)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg("type", this.state.errMsg)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="require me-3">
                      Service Request to
                    </Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        type="checkbox"
                        checked={this.state.is_ward === "1"}
                        id="ward"
                        value="1"
                        name="is_ward"
                        label="Ward"
                        className="me-3"
                        onChange={this.handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="municipality"
                        value="0"
                        name="is_ward"
                        label="Municipality"
                        checked={this.state.is_ward === "0"}
                        className="me-3"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Form.Group>
                  {this.state.is_ward === "1" ? (
                    <Form.Group controlId="ward_num">
                      <Form.Label className="require">Ward</Form.Label>
                      <Form.Control
                        name="ward_num"
                        value={this.state.ward_num}
                        as="select"
                        onChange={this.handleChange}
                        isInvalid={Helper.isColError(
                          "ward_num",
                          this.state.errMsg
                        )}
                      >
                        <option value={""}>-- Select Ward --</option>
                        {wards.map((key) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))}
                      </Form.Control>

                      <Form.Control.Feedback type="invalid">
                        {Helper.getErrorMsg("ward_num", this.state.errMsg)}
                      </Form.Control.Feedback>
                    </Form.Group>
                  ) : (
                    <Form.Group controlId="department_id">
                      <Form.Label className="require">Department</Form.Label>
                      <Form.Control
                        name="department_id"
                        value={this.state.department_id}
                        as="select"
                        onChange={this.handleChange}
                        isInvalid={Helper.isColError(
                          "department_id",
                          this.state.errMsg
                        )}
                      >
                        <option value={""}>-- Select Department --</option>
                        {Object.keys(departments).map((key) => (
                          <option key={key} value={key}>
                            {departments[key]}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {Helper.getErrorMsg("department_id", this.state.errMsg)}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
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
                      isInvalid={Helper.isColError(
                        "details",
                        this.state.errMsg
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg("details", this.state.errMsg)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="require">File Upload</Form.Label>
                    <Form.Control
                      type="file"
                      name="file"
                      onChange={this.uploadHandler}
                      accept="image/jpeg,image/jpg,image/png,application/pdf"
                      required
                      isInvalid={Helper.isColError("file", this.state.errMsg)}
                    />
                    <Form.Text className="text-muted">
                      Only png, jpg, jpeg and pdf file is acceptable
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg("file", this.state.errMsg)}
                    </Form.Control.Feedback>
                  </Form.Group>
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
                      Add Service Request
                    </Button>
                  </div>
                </Modal.Footer>
              </Form>
            ) : (
              <Modal.Body className="bordered">
                User email is required. Please update your email in your profile section.
              </Modal.Body>
            )}
          </div>
        </Modal>
      </>
    );
  }
}

export default AddServiceModal;
