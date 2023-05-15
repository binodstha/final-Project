import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Field } from "formik";

function HouseHoldDetailTab({
  editorConfig,
  editData,
  setValues,
  handleChange,
  handleBlur,
  errors,
  updateValidation,
}) {
  const onToggleFamilyMember = (e, field, values, setValues) => {
    if (e.target.value === "0")
      setValues({ ...values, number_of_families: undefined });
    field.onChange(e);
  };

  // const onChangeHouseOwnership = (e, field) => {
  //   updateValidation(e.target.value);
  //   field.onChange(e);
  // };

  return (
    <>
      <div className="sub-main_title">
        <h2>घर सर्वेक्षण विवरणहरू</h2>
      </div>
      <div className="sub-main_body">
        <Row>
          <Col lg={6} xl={4}>
            <Form.Group className="mb-3" controlId="ward">
              <Form.Label className="require">टोल</Form.Label>
              <Form.Control
                type="string"
                name="area_name"
                value={editData.area_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.area_name ? "is-invalid" : null}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.area_name ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={6} xl={4}>
            <Form.Group className="mb-3" controlId="street_name">
              <Form.Label>बाटोको नाम</Form.Label>
              <Form.Control
                type="text"
                name="street_name"
                value={editData.street_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.street_name ? "is-invalid" : null}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.street_name ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {/* <Col lg={6} xl={4}>
            <Form.Group controlId="house_ownership">
              <Form.Label className="require">
                तपाई बसेको घरको स्वामित्व कस्तो प्रकारको हो ?
              </Form.Label>
              <Field name="house_ownership">
                {({ field }) => (
                  <Form.Control
                    {...field}
                    name="house_ownership"
                    value={editData.house_ownership}
                    as="select"
                    onChange={(e) =>
                      onChangeHouseOwnership(e, field, editData, setValues)
                    }
                    onBlur={handleBlur}
                    className={errors.house_ownership ? "is-invalid" : null}
                  >
                    <option value={""}>-- चयन गर्नुहोस् --</option>
                    {Object.keys(editorConfig.house_ownership).map((key) => (
                      <option key={`house_ownership-${key}`} value={key}>
                        {editorConfig.house_ownership[key]}
                      </option>
                    ))}
                  </Form.Control>
                )}
              </Field>

              <Form.Control.Feedback type="invalid">
                {errors?.house_ownership ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col> */}
          {editData?.house_ownership === "निजि / आफ्नै" && (
            <>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="more_than_one_family">
                  <Form.Label className="require">
                    यो घरमा भाडामा बाहेक दुई वा सो भन्दा बढी परिवार बस्नुहुन्छ?
                  </Form.Label>
                  <div
                    className={`theme-radio d-flex ${
                      errors.more_than_one_family ? "is-invalid" : null
                    }`}
                  >
                    <Field name="more_than_one_family">
                      {({ field }) => (
                        <>
                          <Form.Check
                            {...field}
                            type="radio"
                            value="1"
                            label="छ"
                            name="more_than_one_family"
                            checked={editData.more_than_one_family === "1"}
                            onChange={(e) =>
                              onToggleFamilyMember(
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
                            {...field}
                            type="radio"
                            label="छैन"
                            value="0"
                            name="more_than_one_family"
                            checked={editData.more_than_one_family === "0"}
                            onChange={(e) =>
                              onToggleFamilyMember(
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
                  <Form.Control.Feedback type="invalid">
                    {errors?.more_than_one_family ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {editData.more_than_one_family === "1" && (
                <Col lg={6} xl={4}>
                  <Form.Group controlId="number_of_families">
                    <Form.Label className="require">
                      विवरण संकलन गरिएको परिवार नम्बर?
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="number_of_families"
                      value={editData.number_of_families}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.number_of_families ? "is-invalid" : null
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.number_of_families ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
            </>
          )}
          {editData?.house_ownership === "संस्थागत" && (
            <>
              <Col lg={6} xl={4}>
                <Form.Group controlId="house_owner_name">
                  <Form.Label className="require">
                    यो घरको स्वामित्व कसको नाममा छ?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="house_owner_name"
                    value={editData.house_owner_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.house_owner_name ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.house_owner_name ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} xl={4}>
                <Form.Group controlId="organizational_ownerships_type">
                  <Form.Label className="require">
                    स्वामित्वको प्रकार के हो?
                  </Form.Label>
                  <Form.Control
                    name="organizational_ownerships_type"
                    value={editData.organizational_ownerships_type}
                    as="select"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.organizational_ownerships_type
                        ? "is-invalid"
                        : null
                    }
                  >
                    <option value={""}>-- चयन गर्नुहोस् --</option>
                    {Object.keys(
                      editorConfig.organizational_ownerships_type
                    ).map((key) => (
                      <option
                        key={`organizational_ownerships_type-${key}`}
                        value={key}
                      >
                        {editorConfig.organizational_ownerships_type[key]}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors?.organizational_ownerships_type ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </>
          )}

          {editData?.house_ownership === "अन्य" && (
            <Col lg={6} xl={4}>
              <Form.Group controlId="if_other_house_ownership">
                <Form.Label className="require">
                  यदि अन्य घर स्वामित्व
                </Form.Label>
                <Form.Control
                  type="text"
                  name="if_other_house_ownership"
                  value={editData.if_other_house_ownership}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.if_other_house_ownership ? "is-invalid" : null
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.if_other_house_ownership ?? ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}

          <Col lg={6} xl={4}>
            <Form.Group controlId="use_of_building">
              <Form.Label className="require">भवनको प्रयोग</Form.Label>
              <Form.Control
                name="use_of_building"
                value={editData.use_of_building}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.use_of_building ? "is-invalid" : null}
              >
                <option value={""}>-- चयन गर्नुहोस् --</option>
                {Object.keys(editorConfig.use_of_building).map((key) => (
                  <option key={`use_of_building-${key}`} value={key}>
                    {editorConfig.use_of_building[key]}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors?.use_of_building ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={6} xl={4}>
            <Form.Group controlId="road_surface_type">
              <Form.Label className="require">सडक सतह प्रकार</Form.Label>
              <Form.Control
                name="road_surface_type"
                value={editData.road_surface_type}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.road_surface_type ? "is-invalid" : null}
              >
                <option value={""}>-- चयन गर्नुहोस् --</option>
                {Object.keys(editorConfig.road_surface_type).map((key) => (
                  <option key={`road_surface_type-${key}`} value={key}>
                    {editorConfig.road_surface_type[key]}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors?.road_surface_type ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HouseHoldDetailTab;
