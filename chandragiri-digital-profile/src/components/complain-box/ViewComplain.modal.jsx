import React from 'react'
import { Modal } from 'react-bootstrap'

function ViewComplainModal({ complain, viewModelShow, handleClose }) {
  return (
    <>
      <Modal centered className='theme-modal' backdrop="static" dialogClassName="modal-50w" show={viewModelShow} onHide={handleClose}>
        {(complain) && (
          <>
            <Modal.Header closeButton className='m-0'>
              <Modal.Title className='mb-3'>{ complain.title  }</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bordered'>
              <div className='modal-information'>
                {/* <div className='d-flex align-items-center mb-4'>
                  <h5>Status :</h5>
                  <p>{complain.status}</p>
                </div> */}
                <div className='d-flex align-items-center mb-4'>
                  <h5>Date :</h5>
                  <p>{complain.date}</p>
                </div>
                <div className='d-flex align-items-center mb-4'>
                  <h5>Complain To :</h5>
                  <p>{complain.complain_to}</p>
                </div>
                <div>
                  <h5 className='mb-2'>Details</h5>
                  <span>{complain.details}</span>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  )
}

export default ViewComplainModal