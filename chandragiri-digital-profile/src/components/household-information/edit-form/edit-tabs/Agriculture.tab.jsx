import React from "react";
import { Col, Form, Row, Table, Accordion, Button } from "react-bootstrap";
import { Field } from "formik";

function AgricultureTab({
  editorConfig,
  editData,
  setValues,
  handleChange,
  handleBlur,
  errors,
  getWard,
}) {
  const addLandOwnDetail = (values, setValues, landOwnDetail) => {
    const land_own_detail = [...values.land_own_detail];
    land_own_detail.push(landOwnDetail);
    setValues({ ...values, land_own_detail });
  };

  const removeLandOwnDetail = (index, values, setValues) => {
    let land_own_detail = [...values.land_own_detail];
    land_own_detail.splice(index, 1);
    setValues({ ...values, land_own_detail });
  };

  const onToggleValues = (e, field, values, setValues, key) => {
    if (key === "used_land_for_agriculture" && e.target.value === "0") {
      let yearly_agriculture_production = [
        ...values.yearly_agriculture_production,
      ];
      yearly_agriculture_production.map((yap) => {
        yap.production = 0;
        yap.farm_area = 0;
        yap.unit = 0;
        yap.sales_quantity = 0;
        return yap;
      });
      setValues({
        ...values,
        yearly_agriculture_production,
        land_in_family_name: null,
        land_in_family_name_aana: null,
        land_with_other_people_ownership: null,
        land_in_other_person_name: null,
        land_in_other_person_name_aana: null,
      });
    } else if (
      key === "land_with_other_people_ownership" &&
      e.target.value === "0"
    ) {
      setValues({
        ...values,
        land_in_other_person_name: null,
        land_in_other_person_name_aana: null,
      });
    } else if (
      key === "irrigation_facility_available" &&
      e.target.value === "0"
    ) {
      setValues({
        ...values,
        how_much_land_has_irrigation_facility: null,
        irrigation_done_through: null,
      });
    }
    field.onChange(e);
  };

  return (
    <>
      <div className="sub-main_title">
        <h2>कृषि</h2>
      </div>
      <div className="sub-main_body">
        <Row>
          <Col sm={12}>
            <Form.Group className="mb-3" controlId="used_land_for_agriculture">
              <div
                className={`theme-radio d-flex ${
                  errors.used_land_for_agriculture ? "is-invalid" : null
                }`}
              >
                <Form.Label className="require theme-radio_label">
                  परिवारले कृषि तथा पशुपालन कार्यको लागी जग्गा प्रयोग गरको छ ?
                </Form.Label>
                <div className="d-flex">
                  <Field name="used_land_for_agriculture">
                    {({ field }) => (
                      <>
                        <Form.Check
                          {...field}
                          type="radio"
                          id="used_land_for_agriculture-1"
                          label="छ"
                          name="used_land_for_agriculture"
                          value="1"
                          checked={editData.used_land_for_agriculture === "1"}
                          onChange={(e) =>
                            onToggleValues(
                              e,
                              field,
                              editData,
                              setValues,
                              "used_land_for_agriculture"
                            )
                          }
                          onBlur={handleBlur}
                          className="me-4"
                        />
                        <Form.Check
                          {...field}
                          type="radio"
                          id="used_land_for_agriculture-0"
                          label="छैन"
                          name="used_land_for_agriculture"
                          value="0"
                          checked={editData.used_land_for_agriculture === "0"}
                          onChange={(e) =>
                            onToggleValues(
                              e,
                              field,
                              editData,
                              setValues,
                              "used_land_for_agriculture"
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
                {errors?.used_land_for_agriculture ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {editData.used_land_for_agriculture === "1" && (
            <>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="land_in_family_name">
                  <Form.Label className="require">रोपनी</Form.Label>
                  <Form.Control
                    type="number"
                    name="land_in_family_name"
                    value={editData.land_in_family_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.land_in_family_name ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.land_in_family_name ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} xl={4}>
                <Form.Group
                  className="mb-3"
                  controlId="land_in_family_name_aana"
                >
                  <Form.Label className="require">आना</Form.Label>
                  <Form.Control
                    type="number"
                    name="land_in_family_name_aana"
                    value={editData.land_in_family_name_aana}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.land_in_family_name_aana ? "is-invalid" : null
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.land_in_family_name_aana ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="land_with_other_people_ownership"
                >
                  <div
                    className={`theme-radio d-flex ${
                      errors.land_with_other_people_ownership
                        ? "is-invalid"
                        : null
                    }`}
                  >
                    <Form.Label className="require theme-radio_label">
                      परिवार बाहेक अरुको स्वामित्वमा जग्गा ?
                    </Form.Label>
                    <div className="d-flex">
                      <Field name="land_with_other_people_ownership">
                        {({ field }) => (
                          <>
                            <Form.Check
                              {...field}
                              type="radio"
                              id="land_with_other_people_ownership-1"
                              label="छ"
                              name="land_with_other_people_ownership"
                              value="1"
                              checked={
                                editData.land_with_other_people_ownership ===
                                "1"
                              }
                              onChange={(e) =>
                                onToggleValues(
                                  e,
                                  field,
                                  editData,
                                  setValues,
                                  "land_with_other_people_ownership"
                                )
                              }
                              onBlur={handleBlur}
                              className="me-4"
                            />
                            <Form.Check
                              {...field}
                              type="radio"
                              id="land_with_other_people_ownership-0"
                              label="छैन"
                              name="land_with_other_people_ownership"
                              value="0"
                              checked={
                                editData.land_with_other_people_ownership ===
                                "0"
                              }
                              onChange={(e) =>
                                onToggleValues(
                                  e,
                                  field,
                                  editData,
                                  setValues,
                                  "land_with_other_people_ownership"
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
                    {errors?.land_with_other_people_ownership ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {editData.land_with_other_people_ownership === "1" && (
                <>
                  <Col lg={6} xl={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="land_in_other_person_name"
                    >
                      <Form.Label className="require">रोपनी</Form.Label>
                      <Form.Control
                        type="number"
                        name="land_in_other_person_name"
                        value={editData.land_in_other_person_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.land_in_other_person_name ? "is-invalid" : null
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.land_in_other_person_name ?? ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6} xl={4}>
                    <Form.Group
                      className="mb-3"
                      controlId="land_in_other_person_name_aana"
                    >
                      <Form.Label className="require">आना</Form.Label>
                      <Form.Control
                        type="number"
                        name="land_in_other_person_name_aana"
                        value={editData.land_in_other_person_name_aana}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.land_in_other_person_name_aana
                            ? "is-invalid"
                            : null
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.land_in_other_person_name_aana ?? ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </>
              )}
              <Col sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="yearly_agriculture_production"
                >
                  <Form.Label>
                    तपाईको वार्षिक बाली उत्पादन तथा बिक्रि कति छ ?
                  </Form.Label>
                  <div className="theme-table-wrap">
                    <Table
                      borderless
                      responsive
                      className="theme-table agriculture-form"
                    >
                      <thead>
                        <tr>
                          <th>बाली</th>
                          <th>उत्पादन (के. जी.)</th>
                          <th>खेती गरिएको क्षेत्रफल</th>
                          <th>इकाई (रोपनीमा)</th>
                          <th>बिक्री परिमाण (के. जी.)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editorConfig.crop_group.map((crop) => (
                          <>
                            <tr key={`crop_group-top-${crop.title}`}>
                              <td className="border-bottom" colSpan={5}>
                                {crop.title}
                              </td>
                            </tr>
                            {editData.yearly_agriculture_production.map(
                              (el, index) => (
                                <>
                                  {crop.group.includes(
                                    editData.yearly_agriculture_production[
                                      index
                                    ].crop_name
                                  ) && (
                                    <tr key={`crop_group-detail-${crop.title}`}>
                                      <td>
                                        {
                                          editorConfig.crops[
                                            editData
                                              .yearly_agriculture_production[
                                              index
                                            ].crop_name
                                          ]
                                        }
                                      </td>
                                      <td>
                                        <Form.Control
                                          type="number"
                                          name={`yearly_agriculture_production.${index}.production`}
                                          value={
                                            editData
                                              .yearly_agriculture_production[
                                              index
                                            ].production
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          placeholder="उत्पादन (के. जी.)"
                                        />
                                      </td>
                                      <td>
                                        <Form.Control
                                          type="number"
                                          name={`yearly_agriculture_production.${index}.farm_area`}
                                          placeholder="खेती गरिएको क्षेत्रफल"
                                          value={
                                            editData
                                              .yearly_agriculture_production[
                                              index
                                            ].farm_area
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </td>
                                      <td>
                                        <Form.Control
                                          type="number"
                                          name={`yearly_agriculture_production.${index}.unit`}
                                          placeholder="इकाई"
                                          value={
                                            editData
                                              .yearly_agriculture_production[
                                              index
                                            ].unit
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </td>
                                      <td>
                                        <Form.Control
                                          type="number"
                                          placeholder="बिक्री परिमाण"
                                          name={`yearly_agriculture_production.${index}.sales_quantity`}
                                          value={
                                            editData
                                              .yearly_agriculture_production[
                                              index
                                            ].sales_quantity
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </td>
                                    </tr>
                                  )}
                                </>
                              )
                            )}
                          </>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Form.Group>
              </Col>
            </>
          )}

          <div className="mb-4 border-bottom"></div>

          <Col lg={8}>
            <Form.Group
              className="mb-4"
              controlId="how_management_of_land_done_for_production"
            >
              <div className="theme-radio">
                <Form.Label className="theme-radio_label mb-3">
                  तपाईले अन्नबाली उत्पादनको लागि जग्गाको व्यवस्थापन कसरी गर्नु
                  भएको छ?
                </Form.Label>
                <div className="d-flex">
                  {editorConfig.how_management_of_land_done_for_production.map(
                    (key) => (
                      <Form.Check
                        type="radio"
                        key={`how_management_of_land_done_for_production-${key}`}
                        id={`how_management_of_land_done_for_production-${key}`}
                        value={key}
                        checked={
                          key ===
                          editData.how_management_of_land_done_for_production
                        }
                        label={key}
                        name={`how_management_of_land_done_for_production`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    )
                  )}
                </div>
              </div>
            </Form.Group>
          </Col>
          <div className="sub-main_title">
            <h2>तपाईको स्वामित्वमा रहेका जग्गाका विवरण</h2>
          </div>
          <div className="theme-accordion mb-2">
            {editData.land_own_detail.length > 0 && (
              <>
                {[...Array(editData.land_own_detail.length)].map(
                  (el, index) => (
                    <Accordion
                      className="sub-acc"
                      key={`how_many_death_members-${index}`}
                      defaultActiveKey="0"
                    >
                      <Accordion.Item eventKey="0">
                        <div>
                          <Accordion.Header>
                            जग्गाका विवरण (कि. नं.
                            {editData?.land_own_detail?.[index]?.kitta_number})
                          </Accordion.Header>
                          <Button
                            className="btn-danger delete-feild"
                            onClick={() =>
                              removeLandOwnDetail(index, editData, setValues)
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
                                controlId={`land_own_detail.${index}.kitta_number`}
                              >
                                <Form.Label>कि. नं.</Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`land_own_detail.${index}.kitta_number`}
                                  value={
                                    editData?.land_own_detail?.[index]
                                      ?.kitta_number
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.land_own_detail?.[index]
                                      ?.kitta_number
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`land_own_detail.${index}.old_municipality`}
                              >
                                <Form.Label>गा.वि.स./ न.पा.</Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`land_own_detail.${index}.old_municipality`}
                                  value={
                                    editData?.land_own_detail?.[index]
                                      ?.old_municipality
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.land_own_detail?.[index]
                                      ?.old_municipality
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`land_own_detail.${index}.land_owner_name`}
                              >
                                <Form.Label>जग्गा धनीको नाम</Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`land_own_detail.${index}.land_owner_name`}
                                  value={
                                    editData?.land_own_detail?.[index]
                                      ?.land_owner_name
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.land_own_detail?.[index]
                                      ?.land_owner_name
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`land_own_detail.${index}.average_current_value`}
                              >
                                <Form.Label>चलन चल्तीको सरदर मुल्य</Form.Label>
                                <Form.Control
                                  type="number"
                                  name={`land_own_detail.${index}.average_current_value`}
                                  value={
                                    editData?.land_own_detail?.[index]
                                      ?.average_current_value
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.land_own_detail?.[index]
                                      ?.average_current_value
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`land_own_detail.${index}.old_ward`}
                              >
                                <Form.Label>वडा नं.</Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`land_own_detail.${index}.old_ward`}
                                  value={
                                    editData?.land_own_detail?.[index]?.old_ward
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.land_own_detail?.[index]?.old_ward
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`land_own_detail.${index}.current_ward`}
                              >
                                <Form.Label>हालको वडा नं.</Form.Label>
                                <Form.Control
                                  name={`land_own_detail.${index}.current_ward`}
                                  value={
                                    editData?.land_own_detail?.[index]
                                      ?.current_ward
                                  }
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value={""}>
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {getWard()}
                                </Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`land_own_detail.${index}.area`}
                              >
                                <Form.Label>टोल</Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`land_own_detail.${index}.area`}
                                  value={
                                    editData?.land_own_detail?.[index]?.area
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.land_own_detail?.[index]?.area
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`land_own_detail.${index}.land_use`}
                              >
                                <Form.Label>जग्गाको प्रयोग</Form.Label>
                                <Form.Control
                                  name={`land_own_detail.${index}.land_use`}
                                  value={
                                    editData?.land_own_detail?.[index]?.land_use
                                  }
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option key={`land_use-`} value={""}>
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(editorConfig.land_use).map(
                                    (key) => (
                                      <option
                                        key={`land_use-${key}`}
                                        value={key}
                                      >
                                        {editorConfig.land_use[key]}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`land_own_detail.${index}.land_touched_road_type`}
                              >
                                <Form.Label className="require">
                                  जग्गाले छोएको सडकको प्रकार
                                </Form.Label>
                                <Form.Control
                                  name={`land_own_detail.${index}.land_touched_road_type`}
                                  className={
                                    errors.land_own_detail?.[index]
                                      ?.land_touched_road_type
                                      ? "is-invalid"
                                      : null
                                  }
                                  value={
                                    editData?.land_own_detail?.[index]
                                      ?.land_touched_road_type
                                  }
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option
                                    key={`land_touched_road_type-`}
                                    value={""}
                                  >
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(
                                    editorConfig.land_touched_road_type
                                  ).map((key) => (
                                    <option
                                      key={`land_touched_road_type-${key}`}
                                      value={key}
                                    >
                                      {editorConfig.land_touched_road_type[key]}
                                    </option>
                                  ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.land_own_detail?.[index]
                                    ?.land_touched_road_type ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`land_own_detail.${index}.bahal_bitauri_type`}
                              >
                                <Form.Label>बहाल बिटौरीको प्रकार</Form.Label>
                                <Form.Control
                                  name={`land_own_detail.${index}.bahal_bitauri_type`}
                                  value={
                                    editData?.land_own_detail?.[index]
                                      ?.bahal_bitauri_type
                                  }
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option
                                    key={`bahal_bitauri_type-`}
                                    value={""}
                                  >
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(
                                    editorConfig.bahal_bitauri_type
                                  ).map((key) => (
                                    <option
                                      key={`bahal_bitauri_type-${key}`}
                                      value={key}
                                    >
                                      {editorConfig.bahal_bitauri_type[key]}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            </Col>
                            {editData?.land_own_detail?.[index]
                              ?.bahal_bitauri_type === "संस्थागत" && (
                              <Col lg={6} xl={4}>
                                <Form.Group
                                  className="mb-3"
                                  controlId={`ownership_type.${index}.institutionalized_type`}
                                >
                                  <Form.Label>संस्थागत भएमा</Form.Label>
                                  <Form.Control
                                    name={`land_own_detail.${index}.institutionalized_type`}
                                    value={
                                      editData?.land_own_detail?.[index]
                                        ?.institutionalized_type
                                    }
                                    as="select"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option
                                      key={`bahal_bitauri_type-`}
                                      value={""}
                                    >
                                      -- चयन गर्नुहोस् --
                                    </option>
                                    {Object.keys(
                                      editorConfig.institutionalized_type
                                    ).map((key) => (
                                      <option
                                        key={`bahal_bitauri_type-${key}`}
                                        value={key}
                                      >
                                        {
                                          editorConfig.institutionalized_type[
                                            key
                                          ]
                                        }
                                      </option>
                                    ))}
                                  </Form.Control>
                                </Form.Group>
                              </Col>
                            )}
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`ownership_type.${index}.ownership_type`}
                              >
                                <Form.Label>स्वामित्वको प्रकार</Form.Label>
                                <Form.Control
                                  name={`land_own_detail.${index}.ownership_type`}
                                  value={
                                    editData?.land_own_detail?.[index]
                                      ?.bahal_bitauri_type
                                  }
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option key={`ownership_type-`} value={""}>
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(editorConfig.ownership_type).map(
                                    (key) => (
                                      <option
                                        key={`ownership_type-${key}`}
                                        value={key}
                                      >
                                        {editorConfig.ownership_type[key]}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )
                )}
              </>
            )}
            <Button
              className="btn-lg me-3"
              onClick={() =>
                addLandOwnDetail(
                  editData,
                  setValues,
                  editorConfig.land_own_detail
                )
              }
            >
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
          <div className="mb-4 border-bottom"></div>

          <div className="mb-4 border-bottom">
            <Col sm={12}>
              <Form.Group
                className="mb-3"
                controlId="irrigation_facility_available"
              >
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    तपाईले खेती गरिरहनु भएको जमिनमा सिँचाइ सुविधा पुगेको छ ?
                  </Form.Label>
                  <div className="d-flex">
                    <Field name="irrigation_facility_available">
                      {({ field }) => (
                        <>
                          <Form.Check
                            {...field}
                            type="radio"
                            id="irrigation_facility_available-1"
                            label="छ"
                            name="irrigation_facility_available"
                            value="1"
                            checked={
                              editData.irrigation_facility_available === "1"
                            }
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "irrigation_facility_available"
                              )
                            }
                            onBlur={handleBlur}
                            className="me-4"
                          />
                          <Form.Check
                            {...field}
                            type="radio"
                            id="irrigation_facility_available-0"
                            label="छैन"
                            name="irrigation_facility_available"
                            value="0"
                            checked={
                              editData.irrigation_facility_available === "0"
                            }
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "irrigation_facility_available"
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
              </Form.Group>
            </Col>
            {editData.irrigation_facility_available === "1" && (
              <>
                <Col sm={12}>
                  <Form.Group controlId="how_much_land_has_irrigation_facility">
                    <Form.Label className="require">
                      तपाईले खेती गरिरहनु भएको जमिनमा सिँचाइ सुविधा पुगेको छ भने
                      कति जग्गामा वर्षै भरी सिँचाइ सुविधा पुगेको छ ?
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="how_much_land_has_irrigation_facility"
                      value={editData.how_much_land_has_irrigation_facility}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.how_much_land_has_irrigation_facility
                          ? "is-invalid"
                          : null
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.how_much_land_has_irrigation_facility ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="irrigation_done_through"
                  >
                    <div className="theme-radio">
                      <Form.Label className="theme-radio_label">
                        सिँचाइ के मार्फ गरिएको छ?
                      </Form.Label>
                      <div className="d-flex">
                        {editorConfig.irrigation_done_through.map((key) => (
                          <Form.Check
                            type="radio"
                            key={`irrigation_done_through-${key}`}
                            id={`irrigation_done_through-${key}`}
                            value={key}
                            checked={key === editData.irrigation_done_through}
                            label={key}
                            name={`irrigation_done_through`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="me-4"
                          />
                        ))}
                      </div>
                    </div>
                  </Form.Group>
                </Col>
              </>
            )}
          </div>
        </Row>
      </div>
    </>
  );
}

export default AgricultureTab;
