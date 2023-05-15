import React from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { setInstitutionInfo } from "../../redux/customer-service/customer-service.actions";
import Helper from "../../utils/helper";
import agent from "../../agent";

const INITIAL_STATE = {
  datatsetlist: [],
  activeCat: "Select Category",
  activeDataset: "Select Dataset",
  selectedDataset: "",
  formData: [],
  errMsg: [],
  btnDisabled: false,
};

class AddInstitutionalInfoModal extends React.Component {
  constructor(props) {
    super(props);
    const { institutionCategory } = props;
    let catList = [{ name: "Select Category", slug: "" }];
    institutionCategory.forEach((cat) => {
      catList.push({ name: cat.name, slug: cat.slug });
    });
    this.state = INITIAL_STATE;
    this.state.catList = catList;
  }

  handleCatCheck = (slug) => {
    const { institutionCategory } = this.props;
    const actCat = institutionCategory.find((cat) => cat.slug === slug);
    let datasetList = [];
    if (actCat !== undefined) {
      datasetList.push({ name: "Select Dataset", slug: "" });
      actCat.datasets.forEach((dataset) => {
        datasetList.push({ name: dataset.name, slug: dataset.slug });
      });
    }
    this.setState({
      activeCat: actCat ? actCat.name : "Select Category",
      datatsetlist: datasetList,
      activeDataset: "Select Dataset",
      selectedDataset: "",
      formData: [],
    });
  };

  handleDatasetCheck = async (slug) => {
    const actdataset = this.state.datatsetlist.find((cat) => cat.slug === slug);
    let attributes = [];
    if (slug !== "") {
      attributes =
        await agent.publicDigitalData.getInstitutionalDatasetAttribute(slug);
      attributes = attributes.map((attr) => {
        attr.value = undefined;
        return attr;
      });
    }
    this.setState({
      activeDataset: actdataset ? actdataset.name : "Select Dataset",
      selectedDataset: slug,
      formData: attributes,
    });
  };

  handleSubmit = async (event) => {
    const { setInstitutionInfo, handleClose, successResponse } = this.props;
    event.preventDefault();
    let urlParam = {};
    this.state.formData.forEach((fd) => {
      urlParam[fd.column_name] = fd.value;
    });
    this.setState({ btnDisabled: true });
    const res = await agent.publicDigitalData.postInstitutionalInfoData(
      this.state.selectedDataset,
      urlParam
    );
    if (res.errors === undefined) {
      setInstitutionInfo(await agent.publicDigitalData.getInstitutionalInfo());
      successResponse(res.message);
      this.setState(INITIAL_STATE);
      handleClose();
    } else {
      this.setState({
        btnDisabled: false,
        errMsg: res.errors,
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: prevState.formData.map((el) =>
        el.column_name === name
          ? {
              ...el,
              value:
                el.datatype === "integer"
                  ? value.replace(/[^0-9]/g, "")
                  : value,
            }
          : el
      ),
    }));
  };

  modalClose = () => {
    const { handleClose } = this.props;
    this.setState(INITIAL_STATE);
    handleClose();
  };

  render() {
    const { modalShow } = this.props;
    return (
      <Modal
        className="theme-modal modal-content-add"
        backdrop="static"
        dialogClassName="modal-75w"
        show={modalShow}
        onHide={this.modalClose}
        centered
      >
        <Modal.Header closeButton>
          <h5>Add Institutional Information</h5>
        </Modal.Header>
        <Row className="w-100">
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <DropdownButton
                id="dropdown-cat-button"
                className="dropdown-select"
                type="button"
                data-toggle="dropdown"
                title={`${this.state.activeCat}`}
              >
                {this.state.catList.map((cat) => {
                  return (
                    <Dropdown.Item
                      key={cat.slug}
                      className="dropdown-item"
                      as="button"
                      onClick={() => this.handleCatCheck(cat.slug)}
                    >
                      {cat.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Form.Group>
          </Col>
          <Col>
            {this.state.datatsetlist.length > 0 && (
              <>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Dataset</Form.Label>
                  <DropdownButton
                    id="dropdown-cat-button"
                    type="button"
                    data-toggle="dropdown"
                    className="dropdown-select"
                    title={`${this.state.activeDataset}`}
                  >
                    {this.state.datatsetlist.map((cat) => {
                      return (
                        <Dropdown.Item
                          key={cat.slug}
                          className="dropdown-item"
                          as="button"
                          onClick={() => this.handleDatasetCheck(cat.slug)}
                        >
                          {cat.name}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </Form.Group>
              </>
            )}
          </Col>
        </Row>

        <div className="modal-form">
          {this.state.formData.length > 0 && (
            <Form className="form-lg" onSubmit={this.handleSubmit}>
              <Modal.Body className="bordered">
                <Modal.Title>{this.state.activeDataset}</Modal.Title>
                <Row>
                  {this.state.formData.map((attributes, index) => {
                    if (attributes.datatype === "string") {
                      return (
                        <Col
                          key={`${index}-${attributes.column_name}`}
                          lg={6}
                          xl={4}
                        >
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label
                              className={`${
                                attributes.is_required ? "require" : ""
                              }`}
                            >
                              {Helper.titleFormatter(attributes.column_name)}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name={attributes.column_name}
                              value={attributes.value}
                              required={attributes.is_required}
                              onChange={this.handleChange}
                              isInvalid={Helper.isColError(
                                attributes.column_name,
                                this.state.errMsg
                              )}
                            />
                            <Form.Control.Feedback type="invalid">
                              {Helper.getErrorMsg(
                                attributes.column_name,
                                this.state.errMsg
                              )}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      );
                    } else if (attributes.datatype === "integer") {
                      return (
                        <Col
                          key={`${index}-${attributes.column_name}`}
                          lg={6}
                          xl={4}
                        >
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              {Helper.titleFormatter(attributes.column_name)}
                            </Form.Label>
                            <Form.Control
                              type="number"
                              pattern="[0-9]*"
                              name={attributes.column_name}
                              value={attributes.value}
                              required={attributes.is_required}
                              onChange={this.handleChange}
                              isInvalid={Helper.isColError(
                                attributes.column_name,
                                this.state.errMsg
                              )}
                            />
                            <Form.Control.Feedback type="invalid">
                              {Helper.getErrorMsg(
                                attributes.column_name,
                                this.state.errMsg
                              )}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      );
                    } else if (attributes.datatype === "float") {
                      return (
                        <Col
                          key={`${index}-${attributes.column_name}`}
                          lg={6}
                          xl={4}
                        >
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label
                              className={`${
                                attributes.is_required ? "require" : ""
                              }`}
                            >
                              {Helper.titleFormatter(attributes.column_name)}
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name={attributes.column_name}
                              value={attributes.value}
                              required={attributes.is_required}
                              onChange={this.handleChange}
                              isInvalid={Helper.isColError(
                                attributes.column_name,
                                this.state.errMsg
                              )}
                            />
                            <Form.Control.Feedback type="invalid">
                              {Helper.getErrorMsg(
                                attributes.column_name,
                                this.state.errMsg
                              )}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      );
                    } else if (attributes.datatype === "date") {
                      return (
                        <Col
                          key={`${index}-${attributes.column_name}`}
                          lg={6}
                          xl={4}
                        >
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label
                              className={`${
                                attributes.is_required ? "require" : ""
                              }`}
                            >
                              {Helper.titleFormatter(attributes.column_name)}
                            </Form.Label>
                            <Form.Control
                              type="date"
                              name={attributes.column_name}
                              value={attributes.value}
                              required={attributes.is_required}
                              onChange={this.handleChange}
                              isInvalid={Helper.isColError(
                                attributes.column_name,
                                this.state.errMsg
                              )}
                            />
                            <Form.Control.Feedback type="invalid">
                              {Helper.getErrorMsg(
                                attributes.column_name,
                                this.state.errMsg
                              )}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      );
                    } else if (attributes.datatype === "boolean") {
                      return (
                        <Col
                          key={`${index}-${attributes.column_name}`}
                          lg={6}
                          xl={4}
                        >
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                            isInvalid={Helper.isColError(
                              attributes.column_name,
                              this.state.errMsg
                            )}
                            feedback={Helper.getErrorMsg(
                              attributes.column_name,
                              this.state.errMsg
                            )}
                          >
                            <Form.Label
                              className={`${
                                attributes.is_required ? "require" : ""
                              }`}
                            >
                              {Helper.titleFormatter(attributes.column_name)}
                            </Form.Label>
                            <div
                              className={`theme-radio d-flex ${
                                Helper.isColError(
                                  attributes.column_name,
                                  this.state.errMsg
                                )
                                  ? "is-invalid"
                                  : ""
                              }`}
                            >
                              <Form.Check
                                type="radio"
                                id="yes"
                                label="Yes"
                                name={attributes.column_name}
                                value="true"
                                checked={attributes.value === "true"}
                                onChange={this.handleChange}
                                className="me-4"
                              />
                              <Form.Check
                                type="radio"
                                id="no"
                                label="No"
                                name={attributes.column_name}
                                value="false"
                                checked={attributes.value === "false"}
                                onChange={this.handleChange}
                                className="me-4"
                              />
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {Helper.getErrorMsg(
                                attributes.column_name,
                                this.state.errMsg
                              )}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      );
                    }
                  })}
                  <div className="errMsg">
                    {Helper.getErrorMsg(500, this.state.errMsg)}
                  </div>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <div className="text-end">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={this.modalClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={this.state.btnDisabled}>
                    Add
                  </Button>
                </div>
              </Modal.Footer>
            </Form>
          )}
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setInstitutionInfo: (customerService) =>
    dispatch(setInstitutionInfo(customerService)),
});

export default connect(null, mapDispatchToProps)(AddInstitutionalInfoModal);
