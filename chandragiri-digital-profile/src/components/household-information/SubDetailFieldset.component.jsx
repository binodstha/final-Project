import React from 'react';
import { Col, Row } from 'react-bootstrap';
import uuid from 'react-uuid';

function SubDetailFieldset({ subDetail }) {
  return (
    <div className='family-member-accordion'>
      <div className="theme-accordion mb-3">
        <fieldset className="form-group border p-3">
          <legend className="w-auto px-2 float-none"><h6>{subDetail.title}</h6></legend>
          <Row>
            {subDetail.detail.map(detail => {
              return (
                <Col key={uuid()} lg={6}>
                  <div className="survey-block_content-block">
                    <h5>{detail.label}</h5>
                    <p>{Array.isArray(detail.value) ? ((detail.value.length > 0) ? detail.value.join(", ") : "N/A") : (detail.value ? detail.value : "N/A")}</p>
                  </div>
                </Col>
              )
            })}
          </Row>
        </fieldset>
      </div>
    </div>
  )
}
export default SubDetailFieldset