import React from "react";
import { Col, Row } from 'react-bootstrap'
import uuid from "react-uuid";

function DetailBlock({ detail }) {
  return (
    <Row>
        {detail?.map(dl => {
        return (
          <Col lg={6} key={uuid()}>
            <div className="survey-block_content-block">
              <h5>{dl.label}</h5>
              <p>{Array.isArray(dl.value) ? ((dl.value.length > 0) ? dl.value.join(", ") : "N/A") : (dl.value ? dl.value : "N/A")}</p>
            </div>
          </Col>)
      })}
    </Row>
  )
}

export default DetailBlock