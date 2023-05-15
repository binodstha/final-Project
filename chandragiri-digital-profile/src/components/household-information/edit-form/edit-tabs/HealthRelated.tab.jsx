import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import { Field } from "formik";

function getHealthCheckupOptions(options) {
  let arr = [];
  Object.keys(options).map((key) => arr.push({ name: options[key], id: key }));
  return arr;
}

function getHealthCheckupSelected(options, selected) {
  let arr = [];
  selected.map((value) => arr.push({ name: options[value], id: value }));
  return arr;
}

function HealthRelatedTab({
  editorConfig,
  editData,
  setValues,
  handleChange,
  handleBlur,
  errors,
}) {
  const onSelect = (e, values, setValues) => {
    let health_checkup_options = [...values.health_checkup_options];
    var output = [];
    for (var i = 0; i < e.length; ++i) output.push(e[i].id);
    health_checkup_options = output;
    setValues({ ...values, health_checkup_options });
  };

  const onToggleValues = (e, field, values, setValues, key) => {
    if (key === "pregnant_woman_checked_by_trained_health_workers") {
      if (e.target.value === "गर्भवती महिला नभएको") {
        setValues({
          ...values,
          reason_for_no_checkup_by_trained_health_workers: null,
          if_any_member_gave_birth_to_living_infant_child_where: null,
          if_any_member_gave_birth_to_living_infant_child_who_helped: null,
          reason_for_not_asking_help_of_trained_health_workers: null,
          any_female_member_pregnant_or_6_months_of_maternity_dead: null,
          any_child_born_in_maternity_or_6_months_of_maternity_dead: null,
          child_below_5_years_vaccinated_by_bcg_dpt_measles_vaccine: null,
          vaccine_type: null,
        });
      } else if (
        ["नियमित रूपमा", "कहिले काहीँ वा समस्या पर्दा"].includes(e.target.value)
      ) {
        setValues({
          ...values,
          reason_for_no_checkup_by_trained_health_workers: null,
        });
      }
    } else if (
      key === "if_any_member_gave_birth_to_living_infant_child_who_helped" &&
      [
        "विगत १२ महिनामा जिवित शिशुलाई जन्म नदिएको",
        "डाक्टर / नर्स / अ.न.मी",
        "मातृशिशु स्वास्थ्य कार्यकर्ता",
        "सुडेनी (त्द्यब्)",
        "स्वास्थ्य सहायक / अ.हे.व / ग्रामीण स्वास्थ्य कार्यकर्ता",
      ].includes(e.target.value)
    ) {
      setValues({
        ...values,
        reason_for_not_asking_help_of_trained_health_workers: null,
      });
    }
    field.onChange(e);
  };

  return (
    <>
      <div className="sub-main_title">
        <h2>स्वास्थ्य सम्बन्धित</h2>
      </div>
      <div className="sub-main_body">
        <Row>
          <Col lg={8}>
            <Form.Group className="mb-3" controlId="health_checkup_options">
              <Form.Label>
                तपाँइ वा तपाँइको परिवारका सदस्यहरु बिरामी हुँदा प्रायः उपचारको
                लागि कहाँ जानु हुन्छ ?
              </Form.Label>
              <Multiselect
                options={getHealthCheckupOptions(
                  editorConfig.health_checkup_options
                )} // Options to display in the dropdown
                selectedValues={getHealthCheckupSelected(
                  editorConfig.health_checkup_options,
                  editData.health_checkup_options
                )} // Preselected value to persist in dropdown
                onSelect={(e) => onSelect(e, editData, setValues)} // Function will trigger on select event
                onRemove={(e) => onSelect(e, editData, setValues)} // Function will trigger on remove event
                avoidHighlightFirstOption={true}
                displayValue="name" // Property name to display in the dropdown options
              />
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group
              className="mb-4"
              controlId="pregnant_woman_checked_by_trained_health_workers"
            >
              <div className="theme-radio">
                <Form.Label className="theme-radio_label mb-3">
                  गत १२ महिनामा तपाँइको परिवारमा गर्भवती महिलाले नियमित रूपमा
                  तालिम प्राप्त स्वास्थ्य कर्मीहरुबाट स्वास्थ्य जाच गराउन भयो?
                </Form.Label>
                <div className="d-flex">
                  {editorConfig.pregnant_woman_checked_by_trained_health_workers.map(
                    (key) => (
                      <Field name="pregnant_woman_checked_by_trained_health_workers">
                        {({ field }) => (
                          <Form.Check
                            {...field}
                            type="radio"
                            key={`pregnant_woman_checked_by_trained_health_workers-${key}`}
                            id={`pregnant_woman_checked_by_trained_health_workers-${key}`}
                            value={key}
                            checked={
                              key ===
                              editData.pregnant_woman_checked_by_trained_health_workers
                            }
                            label={key}
                            name={`pregnant_woman_checked_by_trained_health_workers`}
                            onChange={(e) =>
                              onToggleValues(
                                e,
                                field,
                                editData,
                                setValues,
                                "pregnant_woman_checked_by_trained_health_workers"
                              )
                            }
                            onBlur={handleBlur}
                            className="me-4"
                          />
                        )}
                      </Field>
                    )
                  )}
                </div>
              </div>
            </Form.Group>
          </Col>
          {editData.pregnant_woman_checked_by_trained_health_workers ===
            "स्वास्थ्य जाच नगराएको" && (
            <Col sm={12}>
              <Form.Group
                className="mb-4"
                controlId="reason_for_no_checkup_by_trained_health_workers"
              >
                <div className="theme-radio">
                  <Form.Label className="theme-radio_label mb-3">
                    यदि गर्भवती महिलालाइ नियमित रूपमा तालिम प्राप्त
                    स्वास्थ्यकमीबाट स्वास्थ्य जाँच नगराएको भए, कारण के हो ?
                  </Form.Label>
                  <div className="d-flex">
                    {editorConfig.reason_for_no_checkup_by_trained_health_workers.map(
                      (key) => (
                        <Form.Check
                          type="radio"
                          key={`reason_for_no_checkup_by_trained_health_workers-${key}`}
                          id={`reason_for_no_checkup_by_trained_health_workers-${key}`}
                          value={key}
                          checked={
                            key ===
                            editData.reason_for_no_checkup_by_trained_health_workers
                          }
                          label={key}
                          name={`reason_for_no_checkup_by_trained_health_workers`}
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
          )}
          {[
            "नियमित रूपमा",
            "कहिले काहीँ वा समस्या पर्दा",
            "स्वास्थ्य जाच नगराएको",
          ].includes(
            editData.pregnant_woman_checked_by_trained_health_workers
          ) && (
            <>
              <Col sm={12}>
                <Form.Group
                  className="mb-4"
                  controlId="if_any_member_gave_birth_to_living_infant_child_where"
                >
                  <div className="theme-radio">
                    <Form.Label className="theme-radio_label mb-3">
                      गत १२ महिनामा तपाँइको परिवारबाट कसैले जिवित शिशुलाइ जन्म
                      दिनु भएको भए कहाँ जन्म दिनु भयो?
                    </Form.Label>
                    <div className="d-flex flex-wrap">
                      {editorConfig.if_any_member_gave_birth_to_living_infant_child_where.map(
                        (key) => (
                          <Form.Check
                            type="radio"
                            key={`if_any_member_gave_birth_to_living_infant_child_where-${key}`}
                            id={`if_any_member_gave_birth_to_living_infant_child_where-${key}`}
                            value={key}
                            checked={
                              key ===
                              editData.if_any_member_gave_birth_to_living_infant_child_where
                            }
                            label={key}
                            name={`if_any_member_gave_birth_to_living_infant_child_where`}
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
              <Col sm={12}>
                <Form.Group
                  className="mb-4"
                  controlId="if_any_member_gave_birth_to_living_infant_child_who_helped"
                >
                  <div className="theme-radio">
                    <Form.Label className="theme-radio_label mb-3">
                      गत १२ महिनामा तपाईको परिवारबाट कसैल जिवित शिशुलाई जन्म
                      दिनु भएको भए बच्चा जन्माउँदा कसले सहयोग गरेको थियो?
                    </Form.Label>
                    <div className="d-flex">
                      {editorConfig.if_any_member_gave_birth_to_living_infant_child_who_helped.map(
                        (key) => (
                          <Field name="if_any_member_gave_birth_to_living_infant_child_who_helped">
                            {({ field }) => (
                              <Form.Check
                                {...field}
                                type="radio"
                                key={`if_any_member_gave_birth_to_living_infant_child_who_helped-${key}`}
                                id={`if_any_member_gave_birth_to_living_infant_child_who_helped-${key}`}
                                value={key}
                                checked={
                                  key ===
                                  editData.if_any_member_gave_birth_to_living_infant_child_who_helped
                                }
                                label={key}
                                name={`if_any_member_gave_birth_to_living_infant_child_who_helped`}
                                onChange={(e) =>
                                  onToggleValues(
                                    e,
                                    field,
                                    editData,
                                    setValues,
                                    "if_any_member_gave_birth_to_living_infant_child_who_helped"
                                  )
                                }
                                onBlur={handleBlur}
                                className="me-4"
                              />
                            )}
                          </Field>
                        )
                      )}
                    </div>
                  </div>
                </Form.Group>
              </Col>
              {[
                "परिवारका सदस्य / छिमेकी / साथी",
                "अन्य",
                "कसैको उपस्थिति नभएको",
              ].includes(
                editData.if_any_member_gave_birth_to_living_infant_child_who_helped
              ) && (
                <Col sm={12}>
                  <Form.Group
                    className="mb-4"
                    controlId="reason_for_not_asking_help_of_trained_health_workers"
                  >
                    <div className="theme-radio">
                      <Form.Label className="theme-radio_label mb-3">
                        यदि तालिम प्राप्त स्वास्थ्य कर्मी/स्वास्थ्य संस्थाबाट
                        सहयोग नलिनु भएको भए किन नलिनु भएको हो ?
                      </Form.Label>
                      <div className="d-flex">
                        {editorConfig.reason_for_not_asking_help_of_trained_health_workers.map(
                          (key) => (
                            <Form.Check
                              type="radio"
                              key={`reason_for_not_asking_help_of_trained_health_workers-${key}`}
                              id={`reason_for_not_asking_help_of_trained_health_workers-${key}`}
                              value={key}
                              checked={
                                key ===
                                editData.reason_for_not_asking_help_of_trained_health_workers
                              }
                              label={key}
                              name={`reason_for_not_asking_help_of_trained_health_workers`}
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
              )}
              <Col sm={12}>
                <Form.Group
                  className="mb-4"
                  controlId="any_female_member_pregnant_or_6_months_of_maternity_dead"
                >
                  <div className="theme-radio">
                    <Form.Label className="theme-radio_label mb-3">
                      गत १२ महिनामा तपाईको परिवारका कुन महिला सदस्यको गर्भवती
                      अवस्थामा वा सुत्केरी हुँदा वा सुत्केरी भएको ६ हप्ता भित्र
                      मृत्यु भएको थियो ?
                    </Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        type="radio"
                        id="any_female_member_pregnant_or_6_months_of_maternity_dead-1"
                        label="थियो"
                        value="1"
                        checked={
                          editData.any_female_member_pregnant_or_6_months_of_maternity_dead ===
                          "1"
                        }
                        name="any_female_member_pregnant_or_6_months_of_maternity_dead"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                      <Form.Check
                        type="radio"
                        id="any_female_member_pregnant_or_6_months_of_maternity_dead-0"
                        label="थिएन"
                        value="0"
                        checked={
                          editData.any_female_member_pregnant_or_6_months_of_maternity_dead ===
                          "0"
                        }
                        name="any_female_member_pregnant_or_6_months_of_maternity_dead"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    </div>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group
                  className="mb-4"
                  controlId="any_child_born_in_maternity_or_6_months_of_maternity_dead"
                >
                  <div className="theme-radio">
                    <Form.Label className="theme-radio_label mb-3">
                      गत १२ महिनामा तपाईको परिवारमा कुन जन्मिएको शिशुको सुत्केरी
                      हुँदा वा सुत्केरी भएको ६ हप्ता भित्र मृत्यु भएको थियो ?
                    </Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        type="radio"
                        id="any_child_born_in_maternity_or_6_months_of_maternity_dead-1"
                        label="थियो"
                        value="1"
                        checked={
                          editData.any_child_born_in_maternity_or_6_months_of_maternity_dead ===
                          "1"
                        }
                        name="any_child_born_in_maternity_or_6_months_of_maternity_dead"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                      <Form.Check
                        type="radio"
                        id="any_child_born_in_maternity_or_6_months_of_maternity_dead-0"
                        label="थिएन"
                        value="0"
                        checked={
                          editData.any_child_born_in_maternity_or_6_months_of_maternity_dead ===
                          "0"
                        }
                        name="any_child_born_in_maternity_or_6_months_of_maternity_dead"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </>
          )}
          {editData.member_detail.some((family) => family.age <= 5) && (
            <>
              <div className="mb-4 border-bottom"></div>
              <Col sm={12}>
                <Form.Group
                  className="mb-4"
                  controlId="child_below_5_years_vaccinated_by_bcg_dpt_measles_vaccine"
                >
                  <div className="theme-radio">
                    <Form.Label className="theme-radio_label mb-3">
                      तपाईको परिवारमा ५ वर्ष मुनिको केटाकेटीलाइ सबै खोपको मात्रा
                      (वि.सि.जी., डि.पि.टी., दादुरा आदी) दिनु भएको छ?
                    </Form.Label>
                    <div className="d-flex">
                      {editorConfig.child_below_5_years_vaccinated_by_bcg_dpt_measles_vaccine.map(
                        (key) => (
                          <Form.Check
                            type="radio"
                            key={`child_below_5_years_vaccinated_by_bcg_dpt_measles_vaccine-${key}`}
                            id={`child_below_5_years_vaccinated_by_bcg_dpt_measles_vaccine-${key}`}
                            value={key}
                            checked={
                              key ===
                              editData.child_below_5_years_vaccinated_by_bcg_dpt_measles_vaccine
                            }
                            label={key}
                            name={`child_below_5_years_vaccinated_by_bcg_dpt_measles_vaccine`}
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
              {editData.child_below_5_years_vaccinated_by_bcg_dpt_measles_vaccine ===
                "छ" && (
                <Col lg={8}>
                  <Form.Group className="mb-3" controlId="vaccine_type">
                    <Form.Label className="require">
                      खोपका प्रकार (थप गर्नु पर्ने)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="vaccine_type"
                      value={editData.vaccine_type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.vaccine_type ? "is-invalid" : null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.vaccine_type ?? ""}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
            </>
          )}
        </Row>
      </div>
    </>
  );
}

export default HealthRelatedTab;
