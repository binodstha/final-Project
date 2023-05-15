import React from "react";
import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { Field } from "formik";

function DeathMemberDetailTab({
  editorConfig,
  editData,
  setValues,
  handleChange,
  handleBlur,
  errors,
}) {
  const removeDeadMember = (index, values, setValues) => {
    let death_detail = [...values.death_detail];
    death_detail.splice(index, 1);
    setValues({
      ...values,
      death_detail,
    });
  };

  const addDeadMember = (values, setValues, deathValue) => {
    let death_detail = [...values.death_detail];
    death_detail.push(deathValue);
    setValues({
      ...values,
      death_detail,
    });
  };

  const getDeathMemberCount = (death_detail) => {
    return death_detail.filter((member) => member.is_dead !== "0").length;
  };

  const onToggleDeathStatus = (index, values, setValues) => {
    let death_detail = [...values.death_detail];
    death_detail[index]["is_dead"] =
      death_detail[index]["is_dead"] === "1" ? "0" : "1";
    setValues({ ...values, death_detail });
  };

  const onToggleDeathMember = (e, field, values, setValues) => {
    if (e.target.value === "0")
      setValues({
        ...values,

        death_detail: [],
      });
    field.onChange(e);
  };

  const checkFieldDisable = (index) => {
    return editData?.death_detail?.[index]?.is_dead === "0";
  };

  return (
    <>
      <div className="sub-main_title">
        <h2>मृतक सदस्य विवरण</h2>
      </div>
      <div className="sub-main_body">
        <Row>
          <Col sm={16}>
            <Form.Group
              className="mb-3"
              controlId="death_member_in_last_1_year"
            >
              <div
                className={`theme-radio d-flex ${
                  errors.death_member_in_last_1_year ? "is-invalid" : null
                }`}
              >
                <Form.Label className="theme-radio_label require">
                  तपाइको परिवारमा १ बर्ष भित्र परिवारका कूनै सदस्यको मत्यृ भएको
                  छ कि छैन?
                </Form.Label>
                <div className="d-flex">
                  <Field name="more_than_one_family">
                    {({ field }) => (
                      <>
                        <Form.Check
                          type="radio"
                          {...field}
                          id="death_member_in_last_1_year-1"
                          label="छ"
                          name="death_member_in_last_1_year"
                          value="1"
                          checked={editData.death_member_in_last_1_year === "1"}
                          onChange={(e) =>
                            onToggleDeathMember(
                              e,
                              field,
                              editData,
                              setValues
                            )
                          }
                          onBlur={handleBlur}
                          className="me-4"
                        />
                        <Form.Check
                          type="radio"
                          {...field}
                          id="death_member_in_last_1_year-0"
                          label="छैन"
                          name="death_member_in_last_1_year"
                          value="0"
                          checked={editData.death_member_in_last_1_year === "0"}
                          onChange={(e) =>
                            onToggleDeathMember(
                              e,
                              field,
                              editData,
                              setValues
                            )
                          }
                          onBlur={handleBlur}
                          className="me-4"
                        />
                      </>
                    )}
                  </Field>
                </div>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors?.death_member_in_last_1_year ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {editData.death_member_in_last_1_year === "1" && (
            <>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="how_many_death_members">
                  <Form.Label>मृतक सदस्य संख्या</Form.Label>
                  <Form.Control
                    type="number"
                    name={`death_detail.how_many_death_members`}
                    value={getDeathMemberCount(editData.death_detail)}

                    readOnly
                    className={
                      errors.how_many_death_members ? "is-invalid" : null
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.how_many_death_members ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </>
          )}
        </Row>
        {editData.death_member_in_last_1_year === "1" && (
          <div className="theme-accordion mb-5">
            {editData?.death_detail.map((death_member, index) => (
              <Accordion
                className="sub-acc"
                key={`how_many_death_members-${index}`}
                defaultActiveKey="0"
              >
                <Accordion.Item eventKey="0">
                  <div>
                    {death_member.is_dead !== null && (
                      <div className="item-toggle">
                        <>
                          <p>मृतक सदस्य हो?</p>
                          <label className="switch">
                            <input
                              type="checkbox"
                              name={`death_detail.${index}.is_dead`}
                              checked={death_member.is_dead.toString() === "1"}
                              onChange={() => {
                                onToggleDeathStatus(index, editData, setValues);
                              }}
                            />
                            <span className="slider round"></span>
                          </label>
                        </>
                      </div>
                    )}
                    <Accordion.Header>
                      मृत्यु सदस्य विवरण {index + 1}
                    </Accordion.Header>
                    <Button
                      className="btn-danger delete-feild"
                      onClick={() =>
                        removeDeadMember(index, editData, setValues)
                      }
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </Button>
                  </div>
                  <Accordion.Body>
                    <Row>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.first_name`}
                        >
                          <Form.Label className="require">पहिलो नाम</Form.Label>
                          <Form.Control
                            type="text"
                            name={`death_detail.${index}.first_name`}
                            value={death_member.first_name}
                            disabled={checkFieldDisable(index)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors?.death_detail?.[index]?.first_name
                                ? "is-invalid"
                                : null
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.first_name ?? ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.middle_name`}
                        >
                          <Form.Label>बीचको नाम</Form.Label>
                          <Form.Control
                            type="text"
                            name={`death_detail.${index}.middle_name`}
                            value={death_member.middle_name}
                            disabled={checkFieldDisable(index)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors?.death_detail?.[index]?.middle_name
                                ? "is-invalid"
                                : null
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.middle_name ?? ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.last_name`}
                        >
                          <Form.Label className="require">थर</Form.Label>
                          <Form.Control
                            type="text"
                            name={`death_detail.${index}.last_name`}
                            value={death_member.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={checkFieldDisable(index)}
                            className={
                              errors?.death_detail?.[index]?.last_name
                                ? "is-invalid"
                                : null
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.last_name ?? ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.relation_with_family_head`}
                        >
                          <Form.Label className="require">
                            घरमुलीसंगको नाता
                          </Form.Label>
                          <Form.Control
                            name={`death_detail.${index}.relation_with_family_head`}
                            value={death_member.relation_with_family_head}
                            as="select"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={checkFieldDisable(index)}
                            className={
                              errors?.death_detail?.[index]
                                ?.relation_with_family_head
                                ? "is-invalid"
                                : null
                            }
                          >
                            <option value={""}>-- चयन गर्नुहोस् --</option>
                            {Object.keys(
                              editorConfig.relation_with_house_owner
                            ).map((key) => (
                              <option
                                key={`death_detail.${index}.relation_with_family_head-${key}`}
                                value={key}
                              >
                                {editorConfig.relation_with_house_owner[key]}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]
                              ?.relation_with_family_head ?? ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.gender`}
                        >
                          <Form.Label className="require">
                            लैङ्गिक विवरण
                          </Form.Label>
                          <div
                            className={`theme-radio d-flex ${
                              errors.death_detail?.[index]?.gender
                                ? "is-invalid"
                                : null
                            } `}
                          >
                            {Object.keys(editorConfig.gender).map((key) => (
                              <Form.Check
                                type="radio"
                                key={`death_detail.${index}.gender-${key}`}
                                id={`death_detail.${index}.gender-${key}`}
                                value={key}
                                checked={key === death_member.gender}
                                label={editorConfig.gender[key]}
                                name={`death_detail.${index}.gender`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={checkFieldDisable(index)}
                                className="me-4"
                              />
                            ))}
                          </div>
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.gender ?? ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.age_when_death`}
                        >
                          <Form.Label className="require">
                            मत्यृ हुँदाको उमेर
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name={`death_detail.${index}.age_when_death`}
                            value={death_member.age_when_death}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={checkFieldDisable(index)}
                            className={
                              errors?.death_detail?.[index]?.age_when_death
                                ? "is-invalid"
                                : null
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.age_when_death ??
                              ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.death_reason`}
                        >
                          <Form.Label className="require">
                            मत्यृको कारण
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name={`death_detail.${index}.death_reason`}
                            value={death_member.death_reason}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={checkFieldDisable(index)}
                            className={
                              errors?.death_detail?.[index]?.death_reason
                                ? "is-invalid"
                                : null
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.death_reason ?? ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.disease`}
                        >
                          <Form.Label>रोग</Form.Label>
                          <Form.Control
                            type="text"
                            value={death_member.disease}
                            name={`death_detail.${index}.disease`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={checkFieldDisable(index)}
                            className={
                              errors?.death_detail?.[index]?.disease
                                ? "is-invalid"
                                : null
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.disease ?? ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.death_certificate`}
                        >
                          <Form.Label className="require">
                            मृत्यु दर्ता भएको छ/छैन ?
                          </Form.Label>
                          <div
                            className={`theme-radio d-flex ${
                              errors?.death_detail?.[index]?.death_certificate
                                ? "is-invalid"
                                : null
                            }`}
                          >
                            <Form.Check
                              type="radio"
                              id={`death_detail.${index}.death_certificate-1`}
                              label="छ"
                              name={`death_detail.${index}.death_certificate`}
                              value="1"
                              disabled={checkFieldDisable(index)}
                              checked={death_member.death_certificate === "1"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-4"
                            />
                            <Form.Check
                              type="radio"
                              id={`death_detail.${index}.death_certificate-0`}
                              label="छैन"
                              name={`death_detail.${index}.death_certificate`}
                              value="0"
                              disabled={checkFieldDisable(index)}
                              checked={death_member.death_certificate === "0"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-4"
                            />
                          </div>
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.death_certificate ??
                              ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.is_pregnant_woman`}
                        >
                          <Form.Label className="require">
                            गभवती महिला हो/होइन ?
                          </Form.Label>
                          <div
                            className={`theme-radio d-flex ${
                              errors?.death_detail?.[index]?.is_pregnant_woman
                                ? "is-invalid"
                                : null
                            }`}
                          >
                            <Form.Check
                              type="radio"
                              id={`death_detail.${index}.is_pregnant_woman-1`}
                              label="छ"
                              name={`death_detail.${index}.is_pregnant_woman`}
                              value="1"
                              disabled={checkFieldDisable(index)}
                              checked={death_member.is_pregnant_woman === "1"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-4"
                            />
                            <Form.Check
                              type="radio"
                              id={`death_detail.${index}.is_pregnant_woman-0`}
                              label="छैन"
                              name={`death_detail.${index}.is_pregnant_woman`}
                              value="0"
                              disabled={checkFieldDisable(index)}
                              checked={death_member.is_pregnant_woman === "0"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-4"
                            />
                          </div>
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.is_pregnant_woman ??
                              ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`death_detail.${index}.is_infant_child`}
                        >
                          <Form.Label className="require">
                            नवजात शिश हो/होइन ?
                          </Form.Label>
                          <div
                            className={`theme-radio d-flex ${
                              errors?.death_detail?.[index]?.is_infant_child
                                ? "is-invalid"
                                : null
                            }`}
                          >
                            <Form.Check
                              type="radio"
                              id={`death_detail.${index}.is_infant_child-1`}
                              label="छ"
                              name={`death_detail.${index}.is_infant_child`}
                              value="1"
                              disabled={checkFieldDisable(index)}
                              checked={death_member.is_infant_child === "1"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-4"
                            />
                            <Form.Check
                              type="radio"
                              id={`death_detail.${index}.is_infant_child-0`}
                              label="छैन"
                              name={`death_detail.${index}.is_infant_child`}
                              value="0"
                              disabled={checkFieldDisable(index)}
                              checked={death_member.is_infant_child === "0"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-4"
                            />
                          </div>
                          <Form.Control.Feedback type="invalid">
                            {errors?.death_detail?.[index]?.is_infant_child ??
                              ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
            <Button
              className="btn-lg me-3"
              onClick={() =>
                addDeadMember(editData, setValues, editorConfig.death_detail)
              }
            >
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default DeathMemberDetailTab;
