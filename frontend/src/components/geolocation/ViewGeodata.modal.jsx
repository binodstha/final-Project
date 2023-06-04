import React from "react";
import { Modal } from "react-bootstrap";

function ViewGeodataModal({ service, showDetail, viewModelShow, handleClose }) {
  let extension;
  if (viewModelShow === true) {
    extension = service.file.split(".").pop();
  }

  return (
    <>
      <Modal
        centered
        className="theme-modal"
        backdrop="static"
        dialogClassName="modal-50w"
        show={viewModelShow}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="m-0">
          <Modal.Title className="mb-3">Service Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bordered">
          <div className="modal-information">
            {showDetail === "detail" ? (
              <>
                <div className="d-flex align-items-center mb-4">
                  <h5>Title :</h5>
                  <p>{service.title}</p>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5>Type :</h5>
                  <p>{service.type}</p>
                </div>
                <div className="mb-4">
                  {service.is_ward ? (
                    <>
                      <h5 className="mb-2">Ward</h5>
                      <span>{service.ward}</span>
                    </>
                  ) : (
                    <>
                      <h5 className="mb-2">Department</h5>
                      <span>{service.department}</span>
                    </>
                  )}
                </div>
                <div>
                  <h5 className="mb-2">File</h5>
                  <div className="file-container">
                    {extension === "pdf" ? (
                      <a href={service.file} rel="noreferrer" target="_blank">
                        View File
                      </a>
                    ) : (
                      <a href={service.file} rel="noreferrer" target="_blank">
                        <div className="service-Modal">
                          <img src={service.file} alt="img" />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center mb-4">
                <h5>Response :</h5>
                <p>{service.response}</p>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewGeodataModal;
