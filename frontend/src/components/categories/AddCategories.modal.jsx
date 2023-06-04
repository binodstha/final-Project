import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Helper from "../../utils/helper";
// import agent from '../../agent'
import axios from "axios";

const INITIAL_STATE = {
  title: "",
  desc: "",
  complainTo: "ward",
  errMsg: [],
  btnDisable: false,
};

class AddComplainModal extends React.Component {
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
    if (this.state.desc.trim().length > 100) {
      err.push({
        code: "desc",
        detail: "Description must not be greater than 100 characters.",
      });
    }
    if (err.length === 0) {
      this.setState({ btnDisable: true });

      try {
        const res = await axios.post(
          "http://localhost:8800/admin/categories",
          this.state
        );

        if (res.status === 200) {
          handleClose();
          successResponse(true);
          this.setState(INITIAL_STATE);
        }
      } catch (err) {
        console.log("err", err);
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

  handleChange = (event) => {
    let err = [];
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (this.state.title.trim().length === 50) {
      err.push({
        code: "title",
        detail: "Title must not be greater than 50 characters.",
      });
    }
    if (this.state.desc.trim().length === 100) {
      err.push({
        code: "desc",
        detail: "Description must not be greater than 100 characters.",
      });
    }
    if (err.length !== 0) {
      this.setState({ errMsg: err });
    } else {
      this.setState({ errMsg: [] });
    }
  };

  modalClose = () => {
    const { handleClose } = this.props;
    this.setState({
      title: "",
      desc: "",
      errMsg: [],
    });
    handleClose();
  };

  render() {
    const { modalShow } = this.props;
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
            <Modal.Title>ADD CATEGORY</Modal.Title>
          </Modal.Header>
          <div className="modal-form">
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
                    value={this.state.title}
                    maxLength="51"
                    onChange={this.handleChange}
                    required
                    isInvalid={Helper.isColError("title", this.state.errMsg)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {Helper.getErrorMsg("title", this.state.errMsg)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="require">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="desc"
                    rows={1}
                    value={this.state.desc}
                    onChange={this.handleChange}
                    required
                    maxLength="100"
                    isInvalid={Helper.isColError("desc", this.state.errMsg)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {Helper.getErrorMsg("desc", this.state.errMsg)}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="errMsg">
                  {Helper.getErrorMsg(500, this.state.errMsg)}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="text-end">
                  <Button
                    onClick={this.modalClose}
                    variant="secondary"
                    className="me-3"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={this.state.btnDisable}>
                    Add Category
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

export default AddComplainModal;
