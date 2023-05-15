import React from 'react'
import { Accordion, Col, Row } from 'react-bootstrap';
import SubDetailFieldset from './SubDetailFieldset.component';
import uuid from 'react-uuid';

function SubDetailBlock({ subDetail }) {
  return (
    <div className='family-member-accordion'>
      <div className="theme-accordion mb-3">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <div>
              <Accordion.Header>
                {subDetail.title} {(subDetail.status !== undefined) && (<span class={`update-status ${subDetail.status}`}>*{ subDetail.status }</span>) }
              </Accordion.Header>
            </div>
            <Accordion.Body>
              <Row>
                {subDetail?.detail?.map(detail => {
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
              {(subDetail.sub_detail !== undefined) && (
                <>
                  <div className='mb-3'></div>
                  {subDetail.sub_detail?.map(detail => {
                    return (<SubDetailFieldset key={uuid()} subDetail={detail} />)
                  }
                  )}
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}

export default SubDetailBlock