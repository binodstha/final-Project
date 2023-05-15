import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function EthnicDetailTab({ editorConfig, editData, handleChange, handleBlur }) {
  return (
    <>
      <div className="sub-main_title">
        <h2>जातीय विवरण</h2>
      </div>
      <div className="sub-main_body">
        <Row>
          <Col lg={6} xl={4}>
            <Form.Group className="mb-3" controlId="caste_group">
              <Form.Label>जातीय समूह</Form.Label>
              <Form.Control
                name="caste_group"
                value={editData.caste_group}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>-- चयन गर्नुहोस् --</option>
                {Object.keys(editorConfig.caste_group).map((key) => (
                  <option key={`caste_group-${key}`} value={key}>
                    {key}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={6} xl={4}>
            <Form.Group className="mb-3" controlId="castes">
              <Form.Label>जात</Form.Label>
              <Form.Control
                name="castes"
                value={editData.castes}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option key={`castes-select`}>-- चयन गर्नुहोस् --</option>
                {Object.keys(editorConfig.caste_group).map((key) => {
                  return (
                    <>
                      {key === editData.caste_group && (
                        <>
                          {Object.keys(
                            editorConfig.caste_group[key].castes
                          ).map((caste) => (
                            <option key={`castes-${caste}`} value={caste}>
                              {editorConfig.caste_group[key].castes[caste]}
                            </option>
                          ))}
                        </>
                      )}
                    </>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={6} xl={4}>
            <Form.Group className="mb-3" controlId="mother_tongue">
              <Form.Label>मातृ भाषा</Form.Label>
              <Form.Control
                name="mother_tongue"
                value={editData.mother_tongue}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={""}>-- चयन गर्नुहोस् --</option>
                {Object.keys(editorConfig.mother_tongue).map((key) => (
                  <option key={`mother_tongue-${key}`} value={key}>
                    {editorConfig.mother_tongue[key]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={6} xl={4}>
            <Form.Group className="mb-3" controlId="religions">
              <Form.Label>धर्म</Form.Label>
              <Form.Control
                name="religions"
                value={editData.religions}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={""}>-- चयन गर्नुहोस् --</option>
                {Object.keys(editorConfig.religions).map((key) => (
                  <option key={`religions-${key}`} value={key}>
                    {editorConfig.religions[key]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EthnicDetailTab;
