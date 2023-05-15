import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import { Field } from "formik";

function getMultiSelectOptions(options) {
  let arr = [];
  Object.keys(options).map((key) => arr.push({ name: options[key], id: key }));
  return arr;
}

function getMultiSelectSelected(options, selected) {
  let arr = [];
  selected?.map((value) => arr.push({ name: options[value], id: value }));
  return arr;
}

function FacilitiesTab({
  editorConfig,
  editData,
  setValues,
  handleChange,
  handleBlur,
  errors,
}) {
  const onSelectFacilities = (e, values, setValues) => {
    let facility_use = [...values.facility_use];
    var output = [];
    for (var i = 0; i < e.length; ++i) output.push(e[i].id);
    facility_use = output;
    setValues({ ...values, facility_use });
  };

  const onSelectWasteManagement = (e, values, setValues) => {
    let waste_management_done_by = [...values.waste_management_done_by];
    var output = [];
    for (var i = 0; i < e.length; ++i) output.push(e[i].id);
    waste_management_done_by = output;
    setValues({ ...values, waste_management_done_by });
  };

  const onDrainageSystemManagement = (e, values, setValues) => {
    let if_no_drainage_system_how_to_manage_waste = [
      ...values.if_no_drainage_system_how_to_manage_waste,
    ];
    var output = [];
    for (var i = 0; i < e.length; ++i) output.push(e[i].id);
    if_no_drainage_system_how_to_manage_waste = output;
    setValues({
      ...values,
      if_no_drainage_system_how_to_manage_waste,
    });
  };

  const onToggleValues = (e, field, values, setValues, key) => {
    if (
      key === "water_purification_before_drinking" &&
      e.target.value === "0"
    ) {
      setValues({
        ...values,
        purification_method: null,
      });
    } else if (key === "electricity_main_source") {
      if (e.target.value === "बिधुत / बिजुली") {
        setValues({
          ...values,
        });
      } else if (
        ["मट्टीतेल", "वायो ग्यास / गोबर ग्यास", "सोलार", "अन्य"].includes(
          e.target.value
        )
      ) {
        setValues({
          ...values,
          electricity_meter_connected_in_home: null,
        });
      } else {
        setValues({
          ...values,
          not_using_electricity_reason: null,
          electricity_meter_connected_in_home: null,
        });
      }
    } else if (
      key === "drainage_management" &&
      [
        "पक्कि (स्लाबले ढाकेको)",
        "पक्कि (खुल्ला/ स्लाबले नढाकेको)",
        "कच्चि",
      ].includes(e.target.value)
    ) {
      setValues({
        ...values,
        if_no_drainage_system_how_to_manage_waste: [],
      });
    }
    field.onChange(e);
  };

  return (
    <>
      <div className="sub-main_title">
        <h2>सुविधा</h2>
      </div>
      <div className="sub-main_body">
        <Row>
          <Col lg={8}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                तपाईको परिवारको खानेपानीको मुख्य स्रोत के हो ?
              </Form.Label>
              <Form.Control
                name="drinking_water_source"
                value={editData.drinking_water_source}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option key={`drinking_water_source-`} value={""}>
                  -- चयन गर्नुहोस् --
                </option>
                {Object.keys(editorConfig.drinking_water_source).map((key) => (
                  <option key={`drinking_water_source-${key}`} value={key}>
                    {editorConfig.drinking_water_source[key]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col lg={12} xl={8}>
            <Form.Group
              className="mb-3"
              controlId="water_purification_before_drinking"
            >
              <div className="theme-radio d-flex">
                <Form.Label className="theme-radio_label">
                  पिउने पानी पिउनु अघि शुद्धिकरण गर्ने गर्नुहुन्छ ?
                </Form.Label>
                <div className="d-flex">
                  <Field name="water_purification_before_drinking">
                    {({ field }) => (
                      <>
                        <Form.Check
                          type="radio"
                          id="water_purification_before_drinking-1"
                          label="छ"
                          name="water_purification_before_drinking"
                          value="1"
                          checked={
                            editData.water_purification_before_drinking === "1"
                          }
                          onChange={(e) =>
                            onToggleValues(
                              e,
                              field,
                              editData,
                              setValues,
                              "water_purification_before_drinking"
                            )
                          }
                          onBlur={handleBlur}
                          className="me-4"
                        />
                        <Form.Check
                          type="radio"
                          id="water_purification_before_drinking-0"
                          label="छैन"
                          name="water_purification_before_drinking"
                          value="0"
                          checked={
                            editData.water_purification_before_drinking === "0"
                          }
                          onChange={(e) =>
                            onToggleValues(
                              e,
                              field,
                              editData,
                              setValues,
                              "water_purification_before_drinking"
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
          {editData.water_purification_before_drinking === "1" && (
            <Col sm={8}>
              <Form.Group className="mb-4" controlId="purification_method">
                <Form.Label className="require">
                  यदि शुद्धिकरण गर्नुहन्छ भने कुन विधिकेा प्रयोग गर्नुभएको छ ?
                </Form.Label>
                <Form.Control
                  name="purification_method"
                  value={editData.purification_method}
                  as="select"
                  className={errors.purification_method ? "is-invalid" : null}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option key={`purification_method-`}>
                    -- चयन गर्नुहोस् --
                  </option>
                  {editorConfig.purification_method.map((key) => (
                    <option key={`purification_method-${key}`} value={key}>
                      {key}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors?.purification_method ?? ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}

          <div className="mb-4 border-bottom"></div>
          <Col sm={8}>
            <Form.Group className="mb-4" controlId="main_fuel_for_cooking">
              <Form.Label>
                तपाईको परिवारले खाना पकाउन प्रयोग गर्ने मुख्य इन्धन कुन हो?
              </Form.Label>
              <Form.Control
                name="main_fuel_for_cooking"
                value={editData.main_fuel_for_cooking}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option key={`main_fuel_for_cooking-`} value={""}>
                  -- चयन गर्नुहोस् --
                </option>
                {Object.keys(editorConfig.main_fuel_for_cooking).map((key) => (
                  <option key={`main_fuel_for_cooking-${key}`} value={key}>
                    {editorConfig.main_fuel_for_cooking[key]}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors?.main_fuel_for_cooking ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={8}>
            <Form.Group className="mb-4" controlId="type_of_stove_used">
              <Form.Label>
                तपाईको घरमा कस्ता प्रकारकेा चुल्हो प्रयोग गर्नु हुन्छ ?
              </Form.Label>
              <Form.Control
                name="type_of_stove_used"
                value={editData.type_of_stove_used}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option key={`type_of_stove_used-`} value={""}>
                  -- चयन गर्नुहोस् --
                </option>
                {editorConfig.type_of_stove_used.map((key) => (
                  <option key={`type_of_stove_used-${key}`} value={key}>
                    {key}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col sm={8}>
            <Form.Group className="mb-4" controlId="electricity_main_source">
              <Form.Label>
                तपाईको परिवारले प्रयोग गर्ने बत्तीकेा मुख्य स्रोत के हो ?
              </Form.Label>
              <Field name="electricity_main_source">
                {({ field }) => (
                  <>
                    <Form.Control
                      {...field}
                      name="electricity_main_source"
                      value={editData.electricity_main_source}
                      as="select"
                      onChange={(e) =>
                        onToggleValues(
                          e,
                          field,
                          editData,
                          setValues,
                          "electricity_main_source"
                        )
                      }
                      onBlur={handleBlur}
                    >
                      <option key={`electricity_main_source-`} value={""}>
                        -- चयन गर्नुहोस् --
                      </option>
                      {Object.keys(editorConfig.electricity_main_source).map(
                        (key) => (
                          <option
                            key={`electricity_main_source-${key}`}
                            value={key}
                          >
                            {editorConfig.electricity_main_source[key]}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </>
                )}
              </Field>
            </Form.Group>
          </Col>
          {editData.electricity_main_source === "बिधुत / बिजुली" && (
            <Col lg={12} xl={8}>
              <Form.Group
                className="mb-3"
                controlId="electricity_meter_connected_in_home"
              >
                <div
                  className={`theme-radio d-flex ${
                    errors.electricity_meter_connected_in_home
                      ? "is-invalid"
                      : null
                  }`}
                >
                  <Form.Label className="theme-radio_label require">
                    वत्ति वाल्न विजुलीको प्रयोग गर्नुभएको छ भने, आफ्नै घरमा
                    विजुलीको मिटर जडान भएको छ ?
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      id="electricity_meter_connected_in_home-1"
                      label="छ"
                      name="electricity_meter_connected_in_home"
                      value="1"
                      checked={
                        editData.electricity_meter_connected_in_home === "1"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="me-4"
                    />
                    <Form.Check
                      type="radio"
                      id="electricity_meter_connected_in_home-0"
                      label="छैन"
                      name="electricity_meter_connected_in_home"
                      value="0"
                      checked={
                        editData.electricity_meter_connected_in_home === "0"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="me-4"
                    />
                  </div>
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors?.electricity_meter_connected_in_home ?? ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}
          {["मट्टीतेल", "वायो ग्यास / गोबर ग्यास", "सोलार", "अन्य"].includes(
            editData.electricity_main_source
          ) && (
            <Col sm={8}>
              <Form.Group
                className="mb-4"
                controlId="not_using_electricity_reason"
              >
                <Form.Label className="require">
                  यदि वत्ति वाल्न विजुलीको प्रयोग गर्नुभएको छैन भने किन प्रयोग
                  नगर्नु भएको हो ?
                </Form.Label>
                <Form.Control
                  name="not_using_electricity_reason"
                  value={editData.not_using_electricity_reason}
                  className={
                    errors.not_using_electricity_reason ? "is-invalid" : null
                  }
                  as="select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option key={`not_using_electricity_reason-`} value={""}>
                    -- चयन गर्नुहोस् --
                  </option>
                  {editorConfig.not_using_electricity_reason.map((key) => (
                    <option
                      key={`not_using_electricity_reason-${key}`}
                      value={key}
                    >
                      {key}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors?.not_using_electricity_reason ?? ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}

          <Col sm={8}>
            <Form.Group className="mb-4" controlId="type_of_toilet_used">
              <Form.Label>
                तपाईको परिवारले प्रयोग गर्ने शौचालय कस्तो प्रकारको छ ?
              </Form.Label>
              <Form.Control
                name="type_of_toilet_used"
                value={editData.type_of_toilet_used}
                as="select"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option key={`type_of_toilet_used-`} value={""}>
                  -- चयन गर्नुहोस् --
                </option>
                {Object.keys(editorConfig.type_of_toilet_used).map((key) => (
                  <option key={`type_of_toilet_used-${key}`} value={key}>
                    {editorConfig.type_of_toilet_used[key]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Form.Label>
            निम्न कुन कुन सुविधाहरु परिवारले उपभोग गरेको छ ?
          </Form.Label>
          <Col lg={8}>
            <Form.Group className="mb-3" controlId="health_checkup_options">
              <Form.Label>प्रयोग गरिएका सुविधाहरू</Form.Label>
              <Multiselect
                options={getMultiSelectOptions(editorConfig.facilities)} // Options to display in the dropdown
                selectedValues={getMultiSelectSelected(
                  editorConfig.facilities,
                  editData.facility_use
                )}
                onSelect={(e) => onSelectFacilities(e, editData, setValues)} // Function will trigger on select event
                onRemove={(e) => onSelectFacilities(e, editData, setValues)} // Function will trigger on remove event
                avoidHighlightFirstOption={true}
                displayValue="name" // Property name to display in the dropdown options
              />
            </Form.Group>
          </Col>

          <Col lg={8}>
            <Form.Group className="mb-3" controlId="waste_management_done_by">
              <Form.Label>
                तपाईको परिवारले घरबाट निस्कने ठोस फोहरमैला सामान्यतया कहाँ
                फाल्नुहुन्छ?
              </Form.Label>
              <Multiselect
                options={getMultiSelectOptions(
                  editorConfig.waste_management_done_by
                )} // Options to display in the dropdown
                // selectedValues=""
                selectedValues={getMultiSelectSelected(
                  editorConfig.waste_management_done_by,
                  editData.waste_management_done_by
                )} // Preselected value to persist in dropdown
                onSelect={(e) =>
                  onSelectWasteManagement(e, editData, setValues)
                } // Function will trigger on select event
                onRemove={(e) =>
                  onSelectWasteManagement(e, editData, setValues)
                } // Function will trigger on remove event
                avoidHighlightFirstOption={true}
                displayValue="name" // Property name to display in the dropdown options
              />
            </Form.Group>
          </Col>
          <Col sm={8}>
            <Form.Group className="mb-4" controlId="drainage_management">
              <Form.Label>
                तपाईको घर सम्म कस्तो सतह ढलको व्यवस्था छ ?
              </Form.Label>
              <Field name="drainage_management">
                {({ field }) => (
                  <Form.Control
                    {...field}
                    name="drainage_management"
                    value={editData.drainage_management}
                    as="select"
                    onChange={(e) =>
                      onToggleValues(
                        e,
                        field,
                        editData,
                        setValues,
                        "drainage_management"
                      )
                    }
                    onBlur={handleBlur}
                  >
                    <option key={`drainage_management-`} value={""}>
                      -- चयन गर्नुहोस् --
                    </option>
                    {editorConfig.drainage_management.map((key) => (
                      <option key={`drainage_management-${key}`} value={key}>
                        {key}
                      </option>
                    ))}
                  </Form.Control>
                )}
              </Field>
            </Form.Group>
          </Col>

          {editData.drainage_management === "ढल छैन" && (
            <Col lg={8}>
              <Form.Group
                className="mb-3"
                controlId="if_no_drainage_system_how_to_manage_waste"
              >
                <Form.Label className="require">
                  तपाईको परिवारले घरबाट निस्कने ठोस फोहरमैला सामान्यतया कहाँ
                  फाल्नुहुन्छ?
                </Form.Label>
                <Multiselect
                  options={getMultiSelectOptions(
                    editorConfig.if_no_drainage_system_how_to_manage_waste
                  )} // Options to display in the dropdown
                  // selectedValues=""
                  selectedValues={getMultiSelectSelected(
                    editorConfig.if_no_drainage_system_how_to_manage_waste,
                    editData.if_no_drainage_system_how_to_manage_waste
                  )} // Preselected value to persist in dropdown
                  onSelect={(e) =>
                    onDrainageSystemManagement(e, editData, setValues)
                  } // Function will trigger on select event
                  onRemove={(e) =>
                    onDrainageSystemManagement(e, editData, setValues)
                  } // Function will trigger on remove event
                  avoidHighlightFirstOption={true}
                  displayValue="name" // Property name to display in the dropdown options
                />
                <Form.Control.Feedback type="invalid d-block">
                  {errors?.if_no_drainage_system_how_to_manage_waste ?? ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default FacilitiesTab;
