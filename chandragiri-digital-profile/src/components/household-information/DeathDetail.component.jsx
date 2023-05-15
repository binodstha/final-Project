import React from "react";
import { Row, Col } from "react-bootstrap";
import SubDetailBlock from "./sub-detail-block.component";
import uuid from "react-uuid";
function DeathDetail({ detail }) {
  return (
    <div className="survey-block mb-4">
      <h5 className="survey-block_title">{detail.title}</h5>
      {detail.death_member_in_last_1_year !== undefined && (
        <>
          <div className="survey-block_content">
            <Row>
              <Col lg={6}>
                <div className="survey-block_content-block">
                  <h5>
                    तपाइको परिवारमा १ बर्ष भित्र परिवारका कूनै सदस्यको मत्यृ
                    भएको छ कि छैन?
                  </h5>
                  <p>{detail.death_member_in_last_1_year}</p>
                </div>
              </Col>
            </Row>
          </div>
          <hr />
        </>
      )}

      {detail?.death_member?.length > 0 && (
        <div className="survey-block_content">
          <h4 className="mb-3">मृत्यु सदस्य विवरण</h4>
          {detail.death_member?.map((member) => {
            return <SubDetailBlock key={uuid()} subDetail={member} />;
          })}
        </div>
      )}
    </div>
  );
}

export default DeathDetail;
