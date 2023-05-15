import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import uuid from 'react-uuid';
import Helper from "../../utils/helper";
function ViewInstitutionalInfoModal({ modalShow, institututionData, handleClose }) {
  return (
    <Modal scrollable={true} className='theme-modal' dialogClassName="modal-50w" show={modalShow} onHide={handleClose} centered>
      {(institututionData) && (<>
       <Modal.Header closeButton>
          <Modal.Title><h5>View Detail</h5></Modal.Title>
      </Modal.Header>
      <Modal.Body className='bordered'>
        <div className='modal-information view-info'>
          <Row className='w-100'>
            {Object.keys(institututionData).map(key => {
              return (
                <Col lg={6} key={uuid()}>
                <div className='d-flex align-items-center mb-4'>
                  <h5>{Helper.titleFormatter(key)}</h5>
                  <p>{institututionData[key]}</p>
                </div>
              </Col>)
            })}
          </Row>
        </div>
      </Modal.Body>
      </>
      )}
    </Modal>
  )
}

export default ViewInstitutionalInfoModal