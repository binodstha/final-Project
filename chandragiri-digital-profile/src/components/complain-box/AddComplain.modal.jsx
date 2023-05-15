import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import Helper from '../../utils/helper';
import agent from '../../agent'

const INITIAL_STATE = {
  title: "",
  details: "",
  complainTo: "ward",
  errMsg: [],
  btnDisable: false
}

class AddComplainModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }
  handleSubmit = async (event) => {
    const { handleClose, successResponse } = this.props;;
    event.preventDefault();
    let err = [];
    if (this.state.title.trim().length < 1 || this.state.title.trim().length > 50) {
      err.push({ code: 'title', detail: "Title must not be greater than 50 characters." })
    }
    if (this.state.details.trim().length < 100 || this.state.details.trim().length > 1000) {
      err.push({ code: "details", detail: "Details must be in between 100 and 1000 characters." })

    }
    if (err.length === 0) {
      this.setState({ btnDisable: true })
      const body = `title=${this.state.title}&details=${this.state.details}&complain_to=${this.state.complainTo}`;
      let res = await agent.publicDigitalData.addComplain(body)
      if (res.errors === undefined) {
        handleClose()
        successResponse(true)
        this.setState(INITIAL_STATE)
      } else {
        this.setState({
          btnDisable: false,
          errMsg: res.errors
        })
      }

    } else {
      this.setState({ 'errMsg': err })
    }

  }

  handleChange = (event) => {
    let err = []
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (this.state.title.trim().length === 50) {
      err.push({ code: 'title', detail: "Title must not be greater than 50 characters." })
    }
    if (this.state.details.trim().length === 1000) {
      err.push({ code: 'details', detail: "Details must be in between 100 and 1000 characters." })
    }
    if (err.length !== 0) {
      this.setState({ 'errMsg': err })
    } else {
      this.setState({ 'errMsg': [] })

    }

  };

  modalClose = () => {
    const { handleClose } = this.props;
    this.setState({
      "title": "",
      "details": "",
      "complainTo": "ward",
      "errMsg": []
    })
    handleClose()
  }

  render() {
    const { modalShow, allowAdd } = this.props;
    return (
      <>
        <Modal className='theme-modal' backdrop="static" dialogClassName="modal-50w" show={modalShow} onHide={this.modalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>COMPLAINT BOX</Modal.Title>
          </Modal.Header>
          <div className="modal-form">
            {(allowAdd) ? (
              <Form className='form-lg' onSubmit={this.handleSubmit}>
                <Modal.Body className='bordered'>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className='require'>Title</Form.Label>
                    <Form.Control type="text"
                      name="title"
                      value={this.state.title}
                      maxLength="51"
                      onChange={this.handleChange} required
                      isInvalid={Helper.isColError("title", this.state.errMsg)} />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg("title", this.state.errMsg)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput1">
                    <Form.Label className='require me-3'>Complain to</Form.Label>
                    <div className='d-flex'>
                      <Form.Check
                        type="checkbox"
                        checked={(this.state.complainTo === "ward")}
                        id="ward"
                        value="ward"
                        name="complainTo"
                        label="Ward"
                        className='me-3'
                        onChange={this.handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="municipality"
                        value="municipality"
                        name="complainTo"
                        label="Municipality"
                        checked={(this.state.complainTo === "municipality")}
                        className='me-3'
                        onChange={this.handleChange}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className='require'>Details</Form.Label>
                    <Form.Control as="textarea"
                      name="details"
                      rows={3}
                      value={this.state.details}
                      onChange={this.handleChange}
                      required
                      maxLength='1001'
                      isInvalid={Helper.isColError("details", this.state.errMsg)} />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg("details", this.state.errMsg)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className='errMsg'>
                    {Helper.getErrorMsg(500, this.state.errMsg)}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className='text-end'>
                    <Button onClick={this.modalClose} variant='secondary' className='me-3'>Cancel</Button>
                    <Button type="submit" disabled={this.state.btnDisable}>Add Complain</Button>
                  </div>
                </Modal.Footer>
              </Form>
            ) : (
              <Modal.Body className='bordered'>
                Unable to add Complain You already have 5 pending complaints
              </Modal.Body>
            )}
          </div>
        </Modal>
      </>
    )
  }
}

export default AddComplainModal