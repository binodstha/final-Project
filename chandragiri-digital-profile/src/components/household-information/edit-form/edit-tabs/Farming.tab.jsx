import React from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import { Field } from "formik";

function FarmingTab({
  editorConfig,
  editData,
  setValues,
  handleChange,
  handleBlur,
  errors,
}) {
  const onToggleValues = (e, field, values, setValues, key) => {
    if (key === "quadruped_and_livestock_farming" && e.target.value === "0") {
      let yearly_farming_production = [...values.yearly_farming_production];
      yearly_farming_production.map((yfp) => {
        Object.keys(yfp).forEach((key) => {
          if (key !== "quadruped_and_livestock_name" && yfp[key] !== null) {
            yfp[key] = 0;
          }
        });
        return yfp;
      });
      setValues({
        ...values,
        yearly_farming_production,
      });
    } else if (
      key === "if_fish_bee_silk_rearing_done" &&
      e.target.value === "0"
    ) {
      setValues({
        ...values,
        no_of_fishing_ponds: null,
        pond_area: null,
        yearly_production: null,
        bee_hive_no: null,
        yearly_honey_production: null,
        no_of_silk_cultivation: null,
        silk_production: null,
      });
    }
    field.onChange(e);
  };

  return (
    <>
      <div className="sub-main_title">
        <h2>खेती</h2>
      </div>
      <div className="sub-main_body">
        <Row>
          <Col sm={12}>
            <Form.Group
              className="mb-3"
              controlId="quadruped_and_livestock_farming"
            >
              <div
                className={`theme-radio d-flex ${
                  errors.quadruped_and_livestock_farming ? "is-invalid" : null
                }`}
              >
                <Form.Label className="theme-radio_label require">
                  परिवारले चौपाया तथा पशुपंक्षी पालेको छ ?
                </Form.Label>
                <div className="d-flex">
                  <Field name="quadruped_and_livestock_farming">
                    {({ field }) => (
                      <>
                        <Form.Check
                          {...field}
                          type="radio"
                          id="quadruped_and_livestock_farming-1"
                          label="छ"
                          name="quadruped_and_livestock_farming"
                          value="1"
                          checked={
                            editData.quadruped_and_livestock_farming === "1"
                          }
                          onChange={(e) =>
                            onToggleValues(
                              e,
                              field,
                              editData,
                              setValues,
                              "quadruped_and_livestock_farming"
                            )
                          }
                          onBlur={handleBlur}
                          className="me-4"
                        />
                        <Form.Check
                          {...field}
                          type="radio"
                          id="quadruped_and_livestock_farming-0"
                          label="छैन"
                          name="quadruped_and_livestock_farming"
                          value="0"
                          checked={
                            editData.quadruped_and_livestock_farming === "0"
                          }
                          onChange={(e) =>
                            onToggleValues(
                              e,
                              field,
                              editData,
                              setValues,
                              "quadruped_and_livestock_farming"
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
                {errors?.quadruped_and_livestock_farming ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {editData.quadruped_and_livestock_farming === "1" && (
            <Col sm={12}>
              <Form.Group className="mb-3" controlId="agriculture-form">
                <Form.Label>चौपाया तथा पशुपंक्षीहरुको विवरण दिनुहोस</Form.Label>
                <div className="theme-table-wrap">
                  <Table
                    borderless
                    responsive
                    className="theme-table agriculture-form"
                  >
                    <tbody>
                      {editData.yearly_farming_production.map((el, index) => (
                        <tr key={`agriculture-form-${index}`}>
                          <td className="border-bottom">
                            {
                              editorConfig.quadruped_and_livestock[
                                editData.yearly_farming_production?.[index]
                                  ?.quadruped_and_livestock_name
                              ]
                            }
                          </td>
                          <td className="border-bottom">
                            <Form.Control
                              type="number"
                              placeholder="नम्बरहरू"
                              name={`yearly_farming_production.${index}.numbers`}
                              value={
                                editData.yearly_farming_production?.[index]
                                  ?.numbers
                              }
                              disabled={
                                editData.yearly_farming_production?.[index]
                                  ?.numbers === null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <Form.Control
                              type="number"
                              placeholder="अण्डा"
                              name={`yearly_farming_production.${index}.eggs`}
                              value={
                                editData.yearly_farming_production?.[index]
                                  ?.eggs
                              }
                              disabled={
                                editData.yearly_farming_production?.[index]
                                  ?.eggs === null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <Form.Control
                              type="number"
                              placeholder="अन्य"
                              name={`yearly_farming_production.${index}.others`}
                              value={
                                editData.yearly_farming_production?.[index]
                                  ?.others
                              }
                              disabled={
                                editData.yearly_farming_production?.[index]
                                  ?.others === null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </td>
                          <td className="border-bottom">
                            <Form.Control
                              type="number"
                              placeholder="मासु उत्पादन (के.जी.)"
                              name={`yearly_farming_production.${index}.meat_production`}
                              value={
                                editData.yearly_farming_production?.[index]
                                  ?.meat_production
                              }
                              disabled={
                                editData.yearly_farming_production?.[index]
                                  ?.meat_production === null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <Form.Control
                              type="number"
                              placeholder="हड्डी र छाला (के.जी.)"
                              name={`yearly_farming_production.${index}.bone_and_skin`}
                              value={
                                editData.yearly_farming_production?.[index]
                                  ?.bone_and_skin
                              }
                              disabled={
                                editData.yearly_farming_production?.[index]
                                  ?.bone_and_skin === null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <Form.Control
                              type="number"
                              placeholder="वार्षिक आय बिक्री (रु.)"
                              name={`yearly_farming_production.${index}.yearly_income_from_sales`}
                              value={
                                editData.yearly_farming_production?.[index]
                                  ?.yearly_income_from_sales
                              }
                              disabled={
                                editData.yearly_farming_production?.[index]
                                  ?.yearly_income_from_sales === null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </td>
                          <td className="border-bottom">
                            <Form.Control
                              type="number"
                              placeholder="दूध उत्पादन (लिटर)"
                              name={`yearly_farming_production.${index}.milk_production`}
                              value={
                                editData.yearly_farming_production?.[index]
                                  ?.milk_production
                              }
                              disabled={
                                editData.yearly_farming_production?.[index]
                                  ?.milk_production === null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <Form.Control
                              type="number"
                              placeholder="ऊन (के.जी.)"
                              name={`yearly_farming_production.${index}.wools`}
                              value={
                                editData.yearly_farming_production?.[index]
                                  ?.wools
                              }
                              disabled={
                                editData.yearly_farming_production?.[index]
                                  ?.wools === null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Form.Group>
            </Col>
          )}

          <Col sm={12}>
            <Form.Group
              className="mb-3"
              controlId="if_fish_bee_silk_rearing_done"
            >
              <div
                className={`theme-radio d-flex ${
                  errors.if_fish_bee_silk_rearing_done ? "is-invalid" : null
                }`}
              >
                <Form.Label className="theme-radio_label require">
                  तपाईको परिवारमा माछा, मौरी र रेशमपालन गरिएको छ?
                </Form.Label>
                <div className="d-flex">
                  <Field name="if_fish_bee_silk_rearing_done">
                    {({ field }) => (
                      <>
                        <Form.Check
                          {...field}
                          type="radio"
                          id="if_fish_bee_silk_rearing_done-1"
                          label="छ"
                          name="if_fish_bee_silk_rearing_done"
                          value="1"
                          checked={
                            editData.if_fish_bee_silk_rearing_done === "1"
                          }
                          onChange={(e) =>
                            onToggleValues(
                              e,
                              field,
                              editData,
                              setValues,
                              "if_fish_bee_silk_rearing_done"
                            )
                          }
                          onBlur={handleBlur}
                          className="me-4"
                        />
                        <Form.Check
                          {...field}
                          type="radio"
                          id="if_fish_bee_silk_rearing_done-0"
                          label="छैन"
                          name="if_fish_bee_silk_rearing_done"
                          value="0"
                          checked={
                            editData.if_fish_bee_silk_rearing_done === "0"
                          }
                          onChange={(e) =>
                            onToggleValues(
                              e,
                              field,
                              editData,
                              setValues,
                              "if_fish_bee_silk_rearing_done"
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
                {errors?.if_fish_bee_silk_rearing_done ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {editData.if_fish_bee_silk_rearing_done === "1" && (
            <Col lg={12}>
              <Form.Group className="mb-3" controlId="no_of_fishing_ponds">
                <Form.Label className="mb-3">
                  तपाईको परिवारमा माछा, मौरी र रेशमपालन गरिएको छ भने विवरण
                  दिनुहोला?
                </Form.Label>
                <Row>
                  <Col lg={6} xl={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="no_of_fishing_ponds"
                    >
                      <Form.Label>माछापालन पोखरी संख्या</Form.Label>
                      <Form.Control
                        type="number"
                        name="no_of_fishing_ponds"
                        value={editData.no_of_fishing_ponds}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.no_of_fishing_ponds ? "is-invalid" : null
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xl={4}>
                    <Form.Group className="mb-3" controlId="pond_area">
                      <Form.Label className="require">
                        पोखरीको क्षेत्रफल (हेक्टरमा)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="pond_area"
                        value={editData.pond_area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.pond_area ? "is-invalid" : null}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.pond_area ?? ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6} xl={4}>
                    <Form.Group className="mb-3" controlId="yearly_production">
                      <Form.Label>बार्षिक उत्पादन (के.जी.)</Form.Label>
                      <Form.Control
                        type="number"
                        name="yearly_production"
                        value={editData.yearly_production}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.yearly_production ? "is-invalid" : null
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xl={4}>
                    <Form.Group className="mb-3" controlId="bee_hive_no">
                      <Form.Label>मौरी घार संख्या</Form.Label>
                      <Form.Control
                        type="number"
                        name="bee_hive_no"
                        value={editData.bee_hive_no}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.bee_hive_no ? "is-invalid" : null}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xl={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="yearly_honey_production"
                    >
                      <Form.Label>बार्षिक मह उत्पादन (के.जी.)</Form.Label>
                      <Form.Control
                        type="number"
                        name="yearly_honey_production"
                        value={editData.yearly_honey_production}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.yearly_honey_production ? "is-invalid" : null
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xl={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="no_of_silk_cultivation"
                    >
                      <Form.Label>रेशम खेती को संख्या</Form.Label>
                      <Form.Control
                        type="number"
                        name="no_of_silk_cultivation"
                        value={editData.no_of_silk_cultivation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.no_of_silk_cultivation ? "is-invalid" : null
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xl={4}>
                    <Form.Group className="mb-3" controlId="silk_production">
                      <Form.Label>बार्षिक रेशम उत्पादन (के.जी.)</Form.Label>
                      <Form.Control
                        type="number"
                        name="silk_production"
                        value={editData.silk_production}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.silk_production ? "is-invalid" : null}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default FarmingTab;
