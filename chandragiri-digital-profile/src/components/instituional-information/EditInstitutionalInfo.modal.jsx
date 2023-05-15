import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setInstitutionInfo } from '../../redux/customer-service/customer-service.actions';
import Helper from '../../utils/helper';
import agent from '../../agent';

function EditInstitutionalInfoModal({ modalShow, handleClose, successResponse, formAttribute, slug, id, setInstitutionInfo }) {
  const [formFields, setFormFields] = useState(formAttribute)
  const [errMsg, setErrMsg] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    let urlParam = {};
    formFields.forEach(fd => {
      urlParam[fd.column_name] = fd.value;
    })
    const res = await agent.publicDigitalData.putInstitutionalInfoData(slug, id, urlParam)
    if (res.errors === undefined) {
      setInstitutionInfo(await agent.publicDigitalData.getInstitutionalInfo())
      successResponse(res.message);
      handleClose();
    } else {
      setErrMsg(res.errors)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    let data = [...formFields];
    data.map(dt => {
      if (dt.column_name === name) {
        dt.value = (dt.datatype === "integer") ? value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1') : value;
      }
      return dt
    })
    setFormFields(data);
  };

  return (

    <Modal scrollable={true} className='theme-modal' backdrop="static" dialogClassName="modal-75w" show={modalShow} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Edit {Helper.titleFormatter(slug)} data</h5>
        </Modal.Title>
      </Modal.Header>

      <div className="modal-form">
        {(formFields.length > 0) && (
          <Form className='form-lg' onSubmit={handleSubmit}>
            <Modal.Body className='bordered'>
              <Row>
                {formFields.map((attributes, index) => {
                  if (attributes.datatype === "string") {
                    return (
                      <Col key={`${index}-${attributes.column_name}`} lg={6} xl={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label className={`${attributes.is_required ? "require" : ""}`}>{Helper.titleFormatter(attributes.column_name)}</Form.Label>
                          <Form.Control type="text"
                            name={attributes.column_name}
                            value={attributes.value}
                            required={attributes.is_required}
                            onChange={event => handleChange(event)}
                            isInvalid={Helper.isColError(attributes.column_name, errMsg)} />
                          <Form.Control.Feedback type="invalid">
                            {Helper.getErrorMsg(attributes.column_name, errMsg)}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    )
                  } else if (attributes.datatype === "integer") {
                    return (
                      <Col key={`${index}-${attributes.column_name}`} lg={6} xl={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label className={`${attributes.is_required ? "require" : ""}`}>{Helper.titleFormatter(attributes.column_name)}</Form.Label>
                          <Form.Control type="number"
                            pattern="[0-9]*"
                            name={attributes.column_name}
                            value={attributes.value}
                            required={attributes.is_required}
                            onChange={event => handleChange(event)}
                            isInvalid={Helper.isColError(attributes.column_name, errMsg)} />
                          <Form.Control.Feedback type="invalid">
                            {Helper.getErrorMsg(attributes.column_name, errMsg)}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    )
                  } else if (attributes.datatype === "float") {
                    return (
                      <Col key={`${index}-${attributes.column_name}`} lg={6} xl={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label className={`${attributes.is_required ? "require" : ""}`}>{Helper.titleFormatter(attributes.column_name)}</Form.Label>
                          <Form.Control type="number"
                            name={attributes.column_name}
                            value={attributes.value}
                            required={attributes.is_required}
                            onChange={event => handleChange(event)}
                            isInvalid={Helper.isColError(attributes.column_name, errMsg)} />
                          <Form.Control.Feedback type="invalid">
                            {Helper.getErrorMsg(attributes.column_name, errMsg)}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    )
                  } else if (attributes.datatype === "date") {
                    return (
                      <Col key={`${index}-${attributes.column_name}`} lg={6} xl={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label className={`${attributes.is_required ? "require" : ""}`}>{Helper.titleFormatter(attributes.column_name)}</Form.Label>
                          <Form.Control type="date"
                            name={attributes.column_name}
                            value={attributes.value}
                            required={attributes.is_required}
                            onChange={event => handleChange(event)}
                            isInvalid={Helper.isColError(attributes.column_name, errMsg)} />
                          <Form.Control.Feedback type="invalid">
                            {Helper.getErrorMsg(attributes.column_name, errMsg)}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    )
                  } else if (attributes.datatype === "boolean") {
                    return (
                      <Col key={`${index}-${attributes.column_name}`} lg={6} xl={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label className={`${attributes.is_required ? "require" : ""}`}>{Helper.titleFormatter(attributes.column_name)}</Form.Label>
                          <div className='theme-radio d-flex'>
                            <Form.Check
                              type='radio'
                              id='yes'
                              label='Yes'
                              name={attributes.column_name}
                              value="true"
                              checked={attributes.value === "true" || attributes.value === true}
                              onChange={event => handleChange(event)}
                              className='me-4'
                              isInvalid={Helper.isColError(attributes.column_name, errMsg)}
                              feedback={Helper.getErrorMsg(attributes.column_name, errMsg)}
                            />
                            <Form.Check
                              type='radio'
                              id='no'
                              label='No'
                              name={attributes.column_name}
                              value="false"
                              checked={attributes.value === "false" || attributes.value === false}
                              onChange={event => handleChange(event)}
                              className='me-4'
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    )
                  }
                })}
                <div className='errMsg'>
                  {Helper.getErrorMsg(500, errMsg)}
                </div>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <div className='text-end'>
                <Button variant='secondary' className='me-3' >CANCEL</Button>
                <Button type='submit'>UPDATE</Button>
              </div>
            </Modal.Footer>
          </Form>
        )}
      </div>


    </Modal>
  )
}
const mapDispatchToProps = dispatch => ({
  setInstitutionInfo: customerService => dispatch(setInstitutionInfo(customerService)),
})


export default connect(null, mapDispatchToProps)(EditInstitutionalInfoModal)