import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import { NepaliDatePicker } from "datepicker-nepali-reactjs";
import { Field } from "formik";

function getTypeOfRiskOptions(options) {
  let arr = [];
  Object.keys(options).map((key) => arr.push({ name: options[key], id: key }));
  return arr;
}

function getTypeOfRiskOptionsSelected(options, selected) {
  let arr = [];
  selected.map((value) => arr.push({ name: options[value], id: value }));
  return arr;
}

function HouseRelatedDetailTab({
  editorConfig,
  editData,
  handleChange,
  handleBlur,
  setValues,
  errors,
  getYear,
}) {
  const onSelect = (e, values, setValues) => {
    let what_type_of_risk_is_house_in = [
      ...values.what_type_of_risk_is_house_in,
    ];
    var output = [];
    for (var i = 0; i < e.length; ++i) output.push(e[i].id);
    what_type_of_risk_is_house_in = output;
    setValues({ ...values, what_type_of_risk_is_house_in });
  };

  const onDateSelect = (date, values, setValues) => {
    setValues({ ...values, start_date: date });
  };

  const onToggleValues = (e, field, values, setValues, key) => {
    if (
      key === "female_members_engaged_in_any_institutions" &&
      e.target.value === "0"
    ) {
      setValues({
        ...values,
        female_members_involved_institution: null,
      });
    } else if (
      key === "family_affected_by_disaster_in_last_1_year" &&
      e.target.value === "0"
    ) {
      setValues({
        ...values,
        disaster_name: null,
        estimated_destruction: null,
      });
    } else if (key === "is_house_room_rented" && e.target.value === "0") {
      setValues({
        ...values,
        male_members: null,
        female_members: null,
        rented_by: null,
        used_for: null,
        number_of_rooms: null,
        agreement_period: null,
        start_date: null,
        rent_period: null,
        rent_money_monthly: null,
      });
    }
    field.onChange(e);
  };
  return (
    <>
      <div className="sub-main_title">
        <h2>घर सम्बन्धित विवरण</h2>
      </div>
      <div className="sub-main_body">
        <div className="mb-4 border-bottom">
          <Form.Label className="mb-5">
            तपाईको घरको बनावट/प्रकार र क्षेत्र उल्लेख गर्नुहोस?
          </Form.Label>
          <Row>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="house_located_area">
                <Form.Label>घर स्थित क्षेत्र</Form.Label>
                <Form.Control
                  name="house_located_area"
                  value={editData.house_located_area}
                  as="select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option key={`house_located_area-`} value="">
                    -- चयन गर्नुहोस् --
                  </option>
                  {Object.keys(editorConfig.house_located_area).map((key) => (
                    <option key={`house_located_area-${key}`} value={key}>
                      {editorConfig.house_located_area[key]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="house_texture">
                <Form.Label>घर बनावट</Form.Label>
                <Form.Control
                  name="house_texture"
                  value={editData.house_texture}
                  as="select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option key={`house_texture-`} value="">
                    -- चयन गर्नुहोस् --
                  </option>
                  {Object.keys(editorConfig.house_texture).map((key) => (
                    <option key={`house_texture-${key}`} value={key}>
                      {editorConfig.house_texture[key]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="floor_number">
                <Form.Label>तल्ला संख्या</Form.Label>
                <Form.Control
                  type="number"
                  name="floor_number"
                  value={editData.floor_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors?.floor_number ? "is-invalid" : null}
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="house_area">
                <Form.Label>घरको क्षेत्रफल (वर्ग फिटमा)</Form.Label>
                <Form.Control
                  type="number"
                  name="house_area"
                  value={editData.house_area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors?.house_area ? "is-invalid" : null}
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="year_made">
                <Form.Label>बनेको साल</Form.Label>
                <Form.Control
                  name="year_made"
                  as="select"
                  value={editData.year_made}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={""}>-- चयन गर्नुहोस् --</option>
                  {getYear()}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="map_passed">
                <Form.Label>नक्सापास भए/नभएको?</Form.Label>
                <div className="theme-radio d-flex">
                  <Form.Check
                    type="radio"
                    id="map_passed-1"
                    label="भएको"
                    name="map_passed"
                    value="1"
                    checked={editData.map_passed === "1"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="me-4"
                  />
                  <Form.Check
                    type="radio"
                    id="map_passed-0"
                    label="नभएको"
                    name="map_passed"
                    value="0"
                    checked={editData.map_passed === "0"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="me-4"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="standard_followed">
                <Form.Label>भवन मापदण्ड पालना भए/नभएको?</Form.Label>
                <div className="theme-radio d-flex">
                  <Form.Check
                    type="radio"
                    id="standard_followed-1"
                    label="छ"
                    name="standard_followed"
                    value="1"
                    checked={editData.standard_followed === "1"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="me-4"
                  />
                  <Form.Check
                    type="radio"
                    id="standard_followed-0"
                    label="छैन"
                    name="standard_followed"
                    value="0"
                    checked={editData.standard_followed === "0"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="me-4"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group
                className="mb-3"
                controlId="road_jurisdiction_to_house"
              >
                <Form.Label>घरसग जोडिएको सडकको अधिकार क्षेत्र</Form.Label>
                <Form.Control
                  type="number"
                  name="road_jurisdiction_to_house"
                  value={editData.road_jurisdiction_to_house}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors?.road_jurisdiction_to_house ? "is-invalid" : null
                  }
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="road_unit">
                <Form.Label>सडक केन्द्रबिन्दुबाट छोड्नुपर्ने एकाइ</Form.Label>
                <Form.Control
                  name="road_unit"
                  value={editData.road_unit}
                  as="select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option key={`road_unit-`} value="">
                    -- चयन गर्नुहोस् --
                  </option>
                  {Object.keys(editorConfig.road_unit).map((key) => (
                    <option key={`house_texture-${key}`} value={key}>
                      {editorConfig.road_unit[key]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="floor_area_ratio">
                <Form.Label>भुइँ क्षेत्र अनुपात</Form.Label>
                <Form.Control
                  type="text"
                  name="floor_area_ratio"
                  value={editData.floor_area_ratio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors?.floor_area_ratio ? "is-invalid" : null}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="mb-4 border-bottom">
          <Form.Label className="mb-5">
            तपाईको घरबाट नजिकको स्वास्थ्य संस्थामा पुग्न कति समय लाग्छ?
          </Form.Label>
          <Row>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="health_post_location">
                <Form.Label>स्वास्थ्य चौकी -हेल्थ पोष्ट रहेको स्थान</Form.Label>
                <Form.Control
                  type="text"
                  name="health_post_location"
                  value={editData.health_post_location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors?.health_post_location ? "is-invalid" : null}
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="health_post_reach_time">
                <Form.Label>
                  स्वास्थ्य चौकी पुग्न लाग्ने समय (मिनेटमा)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="health_post_reach_time"
                  value={editData.health_post_reach_time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors?.health_post_reach_time ? "is-invalid" : null
                  }
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group
                className="mb-3"
                controlId="health_post_reaching_medium"
              >
                <Form.Label>स्वास्थ्य चौकी पुग्ने माध्यम</Form.Label>
                <div className="theme-radio d-flex">
                  {editorConfig.reaching_medium.map((key) => (
                    <Form.Check
                      type="radio"
                      key={`health_post_reaching_medium-${key}`}
                      id={`health_post_reaching_medium-${key}`}
                      value={key}
                      checked={key === editData.health_post_reaching_medium}
                      label={key}
                      name={`health_post_reaching_medium`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="me-4"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className=" mb-4 border-bottom">
          <Form.Label className="mb-5">
            तपाईको घरबाट नजिकको अस्पताल पुग्न कति समय (मिनेटमा) लाग्छ?
          </Form.Label>
          <Row>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="hospital_location">
                <Form.Label>अस्पताल रहेको स्थान</Form.Label>
                <Form.Control
                  type="text"
                  name="hospital_location"
                  value={editData.hospital_location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors?.hospital_location ? "is-invalid" : null}
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="hospital_reach_time">
                <Form.Label>अस्पताल पुग्न लाग्ने समय (मिनेटमा)</Form.Label>
                <Form.Control
                  type="number"
                  name="hospital_reach_time"
                  value={editData.hospital_reach_time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors?.hospital_reach_time ? "is-invalid" : null}
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="hospital_reaching_medium">
                <Form.Label>अस्पताल पुग्ने माध्यम</Form.Label>
                <div className="theme-radio d-flex">
                  {editorConfig.reaching_medium.map((key) => (
                    <Form.Check
                      type="radio"
                      key={`hospital_reaching_medium-${key}`}
                      id={`hospital_reaching_medium-${key}`}
                      value={key}
                      checked={key === editData.hospital_reaching_medium}
                      label={key}
                      name={`hospital_reaching_medium`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="me-4"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="mb-4 border-bottom">
          <Form.Label className="mb-5">
            तपाईको घरबाट नजिकको विद्यालयसम्म पुग्न कति समय (मिनेटमा) लाग्छ?
          </Form.Label>
          <Row>
            <Form.Label>१. बाल विकास केन्द्र</Form.Label>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="school_reach_time">
                <Form.Label>पुग्न लाग्ने समय (मिनेटमा)</Form.Label>
                <Form.Control
                  type="number"
                  name="school_reach_time"
                  value={editData.school_reach_time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors?.school_reach_time ? "is-invalid" : null}
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="school_reaching_medium">
                <Form.Label>पुग्ने माध्यम</Form.Label>
                <div className="theme-radio d-flex">
                  {editorConfig.reaching_medium.map((key) => (
                    <Form.Check
                      type="radio"
                      key={`school_reaching_medium-${key}`}
                      id={`school_reaching_medium-${key}`}
                      value={key}
                      checked={key === editData.school_reaching_medium}
                      label={key}
                      name={`school_reaching_medium`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="me-4"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Label>२. आधारभूत विद्यालय</Form.Label>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="basic_school_reach_time">
                <Form.Label>पुग्न लाग्ने समय (मिनेटमा)</Form.Label>
                <Form.Control
                  type="number"
                  name="basic_school_reach_time"
                  value={editData.basic_school_reach_time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors?.basic_school_reach_time ? "is-invalid" : null
                  }
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group
                className="mb-3"
                controlId="basic_school_reaching_medium"
              >
                <Form.Label>पुग्ने माध्यम</Form.Label>
                <div className="theme-radio d-flex">
                  {editorConfig.reaching_medium.map((key) => (
                    <Form.Check
                      type="radio"
                      key={`basic_school_reaching_medium-${key}`}
                      id={`basic_school_reaching_medium-${key}`}
                      value={key}
                      checked={key === editData.basic_school_reaching_medium}
                      label={key}
                      name={`basic_school_reaching_medium`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="me-4"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Label>३. माध्यमिक विद्यालय</Form.Label>
            <Col lg={6} xl={4}>
              <Form.Group
                className="mb-3"
                controlId="secondary_school_reach_time"
              >
                <Form.Label>पुग्न लाग्ने समय (मिनेटमा)</Form.Label>
                <Form.Control
                  type="number"
                  name="secondary_school_reach_time"
                  value={editData.secondary_school_reach_time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors?.secondary_school_reach_time ? "is-invalid" : null
                  }
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group
                className="mb-3"
                controlId="secondary_school_reaching_medium"
              >
                <Form.Label>पुग्ने माध्यम</Form.Label>
                <div className="theme-radio d-flex">
                  {editorConfig.reaching_medium.map((key) => (
                    <Form.Check
                      type="radio"
                      key={`secondary_school_reaching_medium-${key}`}
                      id={`secondary_school_reaching_medium-${key}`}
                      value={key}
                      checked={
                        key === editData.secondary_school_reaching_medium
                      }
                      label={key}
                      name={`secondary_school_reaching_medium`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="me-4"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Label>४. उच्च शिक्षा (विश्वविद्यालय)</Form.Label>
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="university_reach_time">
                <Form.Label>पुग्न लाग्ने समय (मिनेटमा)</Form.Label>
                <Form.Control
                  type="number"
                  name="university_reach_time"
                  value={editData.university_reach_time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors?.university_reach_time ? "is-invalid" : null
                  }
                />
              </Form.Group>
            </Col>
            <Col lg={6} xl={4}>
              <Form.Group
                className="mb-3"
                controlId="university_reaching_medium"
              >
                <Form.Label>पुग्ने माध्यम</Form.Label>
                <div className="theme-radio d-flex">
                  {editorConfig.reaching_medium.map((key) => (
                    <Form.Check
                      type="radio"
                      key={`university_reaching_medium-${key}`}
                      id={`university_reaching_medium-${key}`}
                      value={key}
                      checked={key === editData.university_reaching_medium}
                      label={key}
                      name={`university_reaching_medium`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="me-4"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className=" mb-4 border-bottom">
          <Row>
            <Col lg={12} xl={8}>
              <Form.Group
                className="mb-3"
                controlId="how_active_is_community_for_public_development_activities"
              >
                <div className="theme-radio">
                  <Form.Label className="theme-radio_label">
                    तपाईको टोलमा सार्वजनिक विकास निर्माण सम्वन्धी कार्यको लागतमा
                    समुदायको सहभागीता कति सम्म हुनसक्छ?
                  </Form.Label>
                  <div className="d-flex">
                    {editorConfig.how_active_is_community_for_public_development_activities.map(
                      (key) => (
                        <Form.Check
                          type="radio"
                          key={`how_active_is_community_for_public_development_activities-${key}`}
                          id={`how_active_is_community_for_public_development_activities-${key}`}
                          value={key}
                          checked={
                            key ===
                            editData.how_active_is_community_for_public_development_activities
                          }
                          label={key}
                          name={`how_active_is_community_for_public_development_activities`}
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
            <Col lg={12} xl={8}>
              <Form.Group
                className="mb-3"
                controlId="female_members_engaged_in_any_institutions"
              >
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    तपाईको परिवारमा महिला सदस्य कन सङघ/सस्थामा सलग्न भएका छन ?
                  </Form.Label>
                  <div className="d-flex">
                    <Field name="female_members_engaged_in_any_institutions">
                      {({ field }) => (
                        <>
                          <Form.Check
                            {...field}
                            type="radio"
                            id="female_members_engaged_in_any_institutions-1"
                            label="छन्"
                            name="female_members_engaged_in_any_institutions"
                            value="1"
                            checked={
                              editData.female_members_engaged_in_any_institutions ===
                              "1"
                            }
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "female_members_engaged_in_any_institutions"
                              )
                            }
                            onBlur={handleBlur}
                            className="me-4"
                          />
                          <Form.Check
                            {...field}
                            type="radio"
                            id="female_members_engaged_in_any_institutions-0"
                            label="छैनन्"
                            name="female_members_engaged_in_any_institutions"
                            value="0"
                            checked={
                              editData.female_members_engaged_in_any_institutions ===
                              "0"
                            }
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "female_members_engaged_in_any_institutions"
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
            {editData.female_members_engaged_in_any_institutions === "1" && (
              <Col lg={12} xl={8}>
                <Form.Group
                  className="mb-3"
                  controlId="female_members_involved_institution"
                >
                  <Form.Label className="require">
                    छन् भन कुन संस्थामा छन्?
                  </Form.Label>
                  <Form.Control
                    name="female_members_involved_institution"
                    value={editData.female_members_involved_institution}
                    as="select"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option
                      key={`female_members_involved_institution-`}
                      value=""
                    >
                      -- चयन गर्नुहोस् --
                    </option>
                    {Object.keys(
                      editorConfig.female_members_involved_institution
                    ).map((key) => (
                      <option key={`house_texture-${key}`} value={key}>
                        {editorConfig.female_members_involved_institution[key]}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            )}

            <Col lg={12} xl={8}>
              <Form.Group
                className="mb-3"
                controlId="what_type_of_risk_is_house_in"
              >
                <Form.Label>
                  तपाईको घरपरिवारलाई कुनै प्राकृतिक प्रकोपको बढी खतरा छ?
                </Form.Label>
                <Multiselect
                  options={getTypeOfRiskOptions(
                    editorConfig.what_type_of_risk_is_house_in
                  )} // Options to display in the dropdown
                  selectedValues={getTypeOfRiskOptionsSelected(
                    editorConfig.what_type_of_risk_is_house_in,
                    editData.what_type_of_risk_is_house_in
                  )} // Preselected value to persist in dropdown
                  onSelect={(e) => onSelect(e, editData, setValues)} // Function will trigger on select event
                  onRemove={(e) => onSelect(e, editData, setValues)} // Function will trigger on remove event
                  avoidHighlightFirstOption={true}
                  displayValue="name" // Property name to display in the dropdown options
                />
              </Form.Group>
            </Col>
            <Col lg={12} xl={8}>
              <Form.Group
                className="mb-3"
                controlId="family_affected_by_disaster_in_last_1_year"
              >
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    वितेको एक वर्षभत्र कुन प्रकोपबाट तपाईको परिवार पिडीत भयो ?
                  </Form.Label>
                  <div className="d-flex">
                    <Field name="family_affected_by_disaster_in_last_1_year">
                      {({ field }) => (
                        <>
                          <Form.Check
                            {...field}
                            type="radio"
                            id="family_affected_by_disaster_in_last_1_year-1"
                            label="पीडित भएको छ"
                            name="family_affected_by_disaster_in_last_1_year"
                            value="1"
                            checked={
                              editData.family_affected_by_disaster_in_last_1_year ===
                              "1"
                            }
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "family_affected_by_disaster_in_last_1_year"
                              )
                            }
                            onBlur={handleBlur}
                            className="me-4"
                          />
                          <Form.Check
                            {...field}
                            type="radio"
                            id="family_affected_by_disaster_in_last_1_year-0"
                            label="पीडित भएको छैन"
                            name="family_affected_by_disaster_in_last_1_year"
                            value="0"
                            checked={
                              editData.family_affected_by_disaster_in_last_1_year ===
                              "0"
                            }
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "family_affected_by_disaster_in_last_1_year"
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
            {editData.family_affected_by_disaster_in_last_1_year === "1" && (
              <>
                <Col lg={6} xl={4}></Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="disaster_name">
                    <Form.Label className="require">प्रकोपको नाम</Form.Label>
                    <Form.Control
                      type="text"
                      name="disaster_name"
                      value={editData.disaster_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors?.disaster_name ? "is-invalid" : null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.disaster_name ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} xl={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="estimated_destruction"
                  >
                    <Form.Label className="require">
                      अनुमानित क्षति भएको रकम -वस्तु र नगद सहित
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="estimated_destruction"
                      value={editData.estimated_destruction}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors?.estimated_destruction ? "is-invalid" : null
                      }
                    />
                  </Form.Group>
                </Col>
              </>
            )}

            <Form.Label>
              तपाईको परिवारमा सामान्यतया निम्न कार्यहरु कसले गर्दछ?
            </Form.Label>
            <Col lg={12} xl={8}>
              <Form.Group className="mb-3" controlId="household_decisions">
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    घरव्यवहारसम्बन्धी विषयमा निर्णय
                  </Form.Label>
                  <div className="d-flex">
                    {Object.keys(editorConfig.decision_by).map((key) => (
                      <Form.Check
                        type="radio"
                        key={`household_decisions-${key}`}
                        id={`household_decisions-${key}`}
                        value={key}
                        checked={key === editData.household_decisions}
                        label={editorConfig.decision_by[key]}
                        name={`household_decisions`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    ))}
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col lg={12} xl={8}>
              <Form.Group
                className="mb-3"
                controlId="housework_related_decisions"
              >
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    घरायसी काम
                  </Form.Label>
                  <div className="d-flex">
                    {Object.keys(editorConfig.decision_by).map((key) => (
                      <Form.Check
                        type="radio"
                        key={`housework_related_decisions-${key}`}
                        id={`housework_related_decisions-${key}`}
                        value={key}
                        checked={key === editData.housework_related_decisions}
                        label={editorConfig.decision_by[key]}
                        name={`housework_related_decisions`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    ))}
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col lg={12} xl={8}>
              <Form.Group className="mb-3" controlId="bank_account_operation">
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    बैंकमा खाता सञ्चालन
                  </Form.Label>
                  <div className="d-flex">
                    {Object.keys(editorConfig.decision_by).map((key) => (
                      <Form.Check
                        type="radio"
                        key={`bank_account_operation-${key}`}
                        id={`bank_account_operation-${key}`}
                        value={key}
                        checked={key === editData.bank_account_operation}
                        label={editorConfig.decision_by[key]}
                        name={`bank_account_operation`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    ))}
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col lg={12} xl={8}>
              <Form.Group
                className="mb-3"
                controlId="consumer_committee_participation"
              >
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    उपभोक्ता समितिमा सहभागिता
                  </Form.Label>
                  <div className="d-flex">
                    {Object.keys(editorConfig.decision_by).map((key) => (
                      <Form.Check
                        type="radio"
                        key={`consumer_committee_participation-${key}`}
                        id={`consumer_committee_participation-${key}`}
                        value={key}
                        checked={
                          key === editData.consumer_committee_participation
                        }
                        label={editorConfig.decision_by[key]}
                        name={`consumer_committee_participation`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    ))}
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col lg={12} xl={8}>
              <Form.Group
                className="mb-3"
                controlId="school_management_committee_participation"
              >
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    विद्यालय व्यवस्थापन समितिमा सहभागिता
                  </Form.Label>
                  <div className="d-flex">
                    {Object.keys(editorConfig.decision_by).map((key) => (
                      <Form.Check
                        type="radio"
                        key={`school_management_committee_participation-${key}`}
                        id={`school_management_committee_participation-${key}`}
                        value={key}
                        checked={
                          key ===
                          editData.school_management_committee_participation
                        }
                        label={editorConfig.decision_by[key]}
                        name={`school_management_committee_participation`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    ))}
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col lg={12} xl={8}>
              <Form.Group
                className="mb-3"
                controlId="business_industry_participation"
              >
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    उद्योग व्यापारमा सहभागिता
                  </Form.Label>
                  <div className="d-flex">
                    {Object.keys(editorConfig.decision_by).map((key) => (
                      <Form.Check
                        type="radio"
                        key={`business_industry_participation-${key}`}
                        id={`business_industry_participation-${key}`}
                        value={key}
                        checked={
                          key === editData.business_industry_participation
                        }
                        label={editorConfig.decision_by[key]}
                        name={`business_industry_participation`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    ))}
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="mb-4">
          <Row>
            <Col lg={12} xl={8}>
              <Form.Group className="mb-3" controlId="registered_as_taxpayer">
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    तपाई पालिकामा करदाताका रुपमा दर्ता हुनभएको छ कि छैन ?
                  </Form.Label>
                  <div className="d-flex">
                    <Field name="registered_as_taxpayer">
                      {({ field }) => (
                        <>
                          <Form.Check
                            {...field}
                            type="radio"
                            id="registered_as_taxpayer-1"
                            label="भएको छ"
                            name="registered_as_taxpayer"
                            value="1"
                            checked={editData.registered_as_taxpayer === "1"}
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "registered_as_taxpayer"
                              )
                            }
                            onBlur={handleBlur}
                            className="me-4"
                          />
                          <Form.Check
                            {...field}
                            type="radio"
                            id="registered_as_taxpayer-0"
                            label="भएको छैन"
                            name="registered_as_taxpayer"
                            value="0"
                            checked={editData.registered_as_taxpayer === "0"}
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "registered_as_taxpayer"
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
            {editData.registered_as_taxpayer === "1" && (
              <Col lg={8}>
                <Form.Group className="mb-3" controlId="taxpayer_details">
                  <Form.Label className="require">करदाता विवरण</Form.Label>
                  <Form.Control
                    type="text"
                    name="taxpayer_details"
                    value={editData.taxpayer_details}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors?.taxpayer_details ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.taxpayer_details ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
            <Col lg={12} xl={8}>
              <Form.Group className="mb-3" controlId="is_house_room_rented">
                <div className="theme-radio d-flex">
                  <Form.Label className="theme-radio_label">
                    तपाईको घर भाडामा दिनु भएको छ भने?
                  </Form.Label>
                  <div className="d-flex">
                    <Field name="is_house_room_rented">
                      {({ field }) => (
                        <>
                          <Form.Check
                            {...field}
                            type="radio"
                            id="is_house_room_rented-1"
                            label="छ"
                            name="is_house_room_rented"
                            value="1"
                            checked={editData.is_house_room_rented === "1"}
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "is_house_room_rented"
                              )
                            }
                            onBlur={handleBlur}
                            className="me-4"
                          />
                          <Form.Check
                            {...field}
                            type="radio"
                            id="is_house_room_rented-0"
                            label="छैन"
                            name="is_house_room_rented"
                            value="0"
                            checked={editData.is_house_room_rented === "0"}
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "is_house_room_rented"
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
            {editData.is_house_room_rented === "1" && (
              <>
                <Col lg={6} xl={4}></Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="male_members">
                    <Form.Label className="require">पुरुष सदस्यहरु </Form.Label>
                    <Form.Control
                      type="number"
                      name="male_members"
                      value={editData.male_members}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors?.male_members ? "is-invalid" : null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.male_members ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="female_members">
                    <Form.Label className="require">महिला सदस्यहरु </Form.Label>
                    <Form.Control
                      type="number"
                      name="female_members"
                      value={editData.female_members}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors?.female_members ? "is-invalid" : null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.female_members ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="rented_by">
                    <Form.Label className="require">
                      बहालमा लिनेको नाम
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="rented_by"
                      value={editData.rented_by}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors?.rented_by ? "is-invalid" : null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.rented_by ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="used_for">
                    <Form.Label className="require">प्रयोग</Form.Label>
                    <Form.Control
                      type="text"
                      name="used_for"
                      value={editData.used_for}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors?.used_for ? "is-invalid" : null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.used_for ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="number_of_rooms">
                    <Form.Label className="require">कोठा संख्या</Form.Label>
                    <Form.Control
                      type="number"
                      name="number_of_rooms"
                      value={editData.number_of_rooms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors?.number_of_rooms ? "is-invalid" : null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.number_of_rooms ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="agreement_period">
                    <Form.Label className="require">
                      सम्झौता अवधी (महिनामा)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="agreement_period"
                      value={editData.agreement_period}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors?.agreement_period ? "is-invalid" : null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.agreement_period ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="start_date">
                    <Form.Label className="require">बसेको मिति</Form.Label>
                    <NepaliDatePicker
                      className="form-control"
                      defaultDate={editData?.start_date ?? true}
                      onDateSelect={(date) =>
                        onDateSelect(date, editData, setValues)
                      }
                      options={{ valueLocale: "ne" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.start_date ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="rent_period">
                    <Form.Label className="require">
                      बहाल अवधी (महिनामा)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="rent_period"
                      value={editData.rent_period}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors?.rent_period ? "is-invalid" : null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.rent_period ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg={6} xl={4}>
                  <Form.Group className="mb-3" controlId="rent_money_monthly">
                    <Form.Label className="require">बहाल रकम मासिक</Form.Label>
                    <Form.Control
                      type="number"
                      name="rent_money_monthly"
                      value={editData.rent_money_monthly}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors?.rent_money_monthly ? "is-invalid" : null
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.rent_money_monthly ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}
export default HouseRelatedDetailTab;
