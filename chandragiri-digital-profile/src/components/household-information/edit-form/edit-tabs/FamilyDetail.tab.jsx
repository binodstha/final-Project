import React, { useEffect } from "react";
import { Col, Form, Row, Button, Accordion } from "react-bootstrap";
import { NepaliDatePicker } from "datepicker-nepali-reactjs";
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

function ageCalculate(dob, today) {
  let age = 0;
  if (dob.year < today.year) {
    age = today.year - dob.year;
    if (
      today.month < dob.month ||
      (today.month === dob.month && today.day < dob.day)
    )
      age--;
  }
  return age;
}

function FamilyDetailTab({
  editorConfig,
  editData,
  setValues,
  handleChange,
  handleBlur,
  errors,
  getYear,
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/nepali-date-picker/dist/nepali.datepicker.v3.7.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const today = new Date();

  //Remove Family member
  const removeFamilyMember = (index, values, setValues) => {
    let member_detail = [...values.member_detail];
    member_detail.splice(index, 1);
    setValues({
      ...values,
      member_detail,
    });
  };

  //Add Family member
  const addFamilyMember = (values, setValues, memberValue) => {
    let member_detail = [...values.member_detail];
    member_detail.push(memberValue);
    setValues({
      ...values,
      member_detail,
    });
  };

  const getFamilyMemberCount = (member_detail) => {
    return member_detail.filter((member) => member.death_status !== "1").length;
  };

  //Change DOB
  const onDateSelect = (date, index, values, setValues, key) => {
    let member_detail = [...values.member_detail];
    member_detail[index][key] = date;
    if (window.NepaliFunctions !== undefined) {
      if (key === "dob") {
        const age = ageCalculate(
          window.NepaliFunctions.ConvertToDateObject(date, "YYYY-MM-DD"),
          window.NepaliFunctions.GetCurrentBsDate()
        );
        if (age < 10) {
          member_detail[index]["education_qualification"] = null;
          member_detail[index]["reason_for_leaving_school"] = null;
          member_detail[index]["faculty_of_study"] = null;
          member_detail[index]["passed_date"] = null;
          member_detail[index]["qualification_assessment_type"] = null;
          member_detail[index]["scored_gpa_marks"] = null;
          member_detail[index]["studied_institution"] = null;
          member_detail[index]["marital_status"] = null;
          member_detail[index]["occupation"] = null;
          member_detail[index]["government_job_type"] = null;
          member_detail[index]["government_job_post"] = null;
          member_detail[index]["retired_or_reinstated"] = null;
          member_detail[index]["post"] = null;
          member_detail[index]["office"] = null;
          member_detail[index]["work_experience_year"] = null;
          member_detail[index]["residence_condition"] = null;
          member_detail[index]["country_if_living_abroad"] = null;
          member_detail[index]["reason_for_going_abroad"] = null;
          member_detail[index]["subject_of_study"] = null;
          member_detail[index]["which_employment"] = null;
          member_detail[index][
            "if_living_in_other_part_of_country_local_level_name"
          ] = null;
          member_detail[index]["for_living_in_other_place"] = null;
          member_detail[index]["foreign_employment_returned"] = null;
          member_detail[index]["foreign_employment_country"] = null;
          member_detail[index]["foreign_employment_occupation"] = null;
          member_detail[index]["work_period"] = null;
          member_detail[index]["skill_training"] = null;
          member_detail[index]["training_period"] = null;
          member_detail[index]["training_year"] = null;
          member_detail[index]["interested_area"] = null;
        }
        if (age < 16) {
          member_detail[index]["citizenship"] = null;
          member_detail[index]["citizenship_number"] = null;
          member_detail[index]["citizenship_issue_date"] = null;
          member_detail[index]["citizenship_issued_district"] = null;
          member_detail[index]["reason_if_no_citizenship"] = null;
          member_detail[index]["national_id_card"] = null;
          member_detail[index]["national_id_card_number"] = null;
          member_detail[index]["national_id_card_issue_date"] = null;
          member_detail[index]["passport"] = null;
          member_detail[index]["passport_number"] = null;
          member_detail[index]["passport_issue_place"] = null;
          member_detail[index]["passport_issue_date"] = null;
          member_detail[index]["passport_deadline_date"] = null;
          member_detail[index]["pan"] = null;
          member_detail[index]["pan_number"] = null;
          member_detail[index]["social_security_fund_id_card"] = null;
          member_detail[index]["social_security_fund_id_card_number"] = null;
          member_detail[index]["driver_license"] = null;
          member_detail[index]["driver_license_number"] = null;
          member_detail[index]["driver_license_issue_date"] = null;
          member_detail[index]["driver_license_expiry_date"] = null;
          member_detail[index]["driver_license_category"] = [];
          member_detail[index]["voters_id_card_number"] = null;
          member_detail[index]["voting_place"] = null;
        }
        member_detail[index]["age"] = age;
      }
    }
    setValues({ ...values, member_detail });
  };

  const toFhUpperCase = (e, values, setValues) => {
    setValues({ ...values, family_head_name_en: e.target.value.toUpperCase() });
  };

  const toFmUpperCase = (e, index, values, setValues) => {
    let member_detail = [...values.member_detail];
    member_detail[index]["name_en"] = e.target.value.toUpperCase();
    setValues({ ...values, member_detail });
  };

  //Change license category
  const onSelectLicenseCategory = (e, index, values, setValues) => {
    let member_detail = [...values.member_detail];
    let output = [];
    for (var i = 0; i < e.length; ++i) output.push(e[i].id);
    member_detail[index]["driver_license_category"] = output;
    setValues({ ...values, member_detail });
  };

  const onToggleLocalResident = (e, field, values, setValues) => {
    if (e.target.value === "1")
      setValues({
        ...values,
        shifted_from_district: undefined,
        shifted_date: undefined,
      });
    field.onChange(e);
  };

  const onToggleValues = (e, index, field, values, setValues, key) => {
    let member_detail = [...values.member_detail];
    if (key === "citizenship") {
      if (e.target.value === "1") {
        member_detail[index]["reason_if_no_citizenship"] = null;
      } else if (e.target.value === "0") {
        member_detail[index]["citizenship_number"] = null;
        member_detail[index]["citizenship_issue_date"] = null;
        member_detail[index]["citizenship_issued_district"] = null;
      }
    } else if (key === "national_id_card" && e.target.value === "0") {
      member_detail[index]["national_id_card_number"] = null;
      member_detail[index]["national_id_card_issue_date"] = null;
    } else if (key === "passport" && e.target.value === "0") {
      member_detail[index]["passport_number"] = null;
      member_detail[index]["passport_issue_place"] = null;
      member_detail[index]["passport_issue_date"] = null;
      member_detail[index]["passport_deadline_date"] = null;
    } else if (key === "pan" && e.target.value === "0") {
      member_detail[index]["pan_number"] = null;
    } else if (
      key === "social_security_fund_id_card" &&
      e.target.value === "0"
    ) {
      member_detail[index]["social_security_fund_id_card_number"] = null;
    } else if (key === "driver_license" && e.target.value === "0") {
      member_detail[index]["driver_license_number"] = null;
      member_detail[index]["driver_license_issue_date"] = null;
      member_detail[index]["driver_license_expiry_date"] = null;
      member_detail[index]["driver_license_category"] = [];
    } else if (key === "education_qualification") {
      if (e.target.value === "1") {
        member_detail[index]["faculty_of_study"] = null;
        member_detail[index]["passed_date"] = null;
        member_detail[index]["qualification_assessment_type"] = null;
        member_detail[index]["scored_gpa_marks"] = null;
        member_detail[index]["studied_institution"] = null;
      } else if (["5", "6", "7", "8", "9"].includes(e.target.value)) {
        member_detail[index]["reason_for_leaving_school"] = null;
      } else if (["2", "3", "4"].includes(e.target.value)) {
        member_detail[index]["reason_for_leaving_school"] = null;
        member_detail[index]["faculty_of_study"] = null;
      }
    } else if (key === "occupation") {
      if (e.target.value === "1") {
        member_detail[index]["post"] = null;
        member_detail[index]["office"] = null;
        member_detail[index]["work_experience_year"] = null;
      } else if (
        ["2", "3", "4", "5", "6", "10", "11", "12"].includes(e.target.value)
      ) {
        member_detail[index]["government_job_type"] = null;
        member_detail[index]["government_job_post"] = null;
        member_detail[index]["retired_or_reinstated"] = null;
      } else if (["7", "8", "9"].includes(e.target.value)) {
        member_detail[index]["post"] = null;
        member_detail[index]["office"] = null;
        member_detail[index]["work_experience_year"] = null;
        member_detail[index]["government_job_type"] = null;
        member_detail[index]["government_job_post"] = null;
        member_detail[index]["retired_or_reinstated"] = null;
      }
    } else if (key === "residence_condition") {
      if (e.target.value === "गणना गरेको स्थानमा") {
        member_detail[index]["country_if_living_abroad"] = null;
        member_detail[index]["reason_for_going_abroad"] = null;
        member_detail[index]["subject_of_study"] = null;
        member_detail[index]["which_employment"] = null;
        member_detail[index][
          "if_living_in_other_part_of_country_local_level_name"
        ] = null;
        member_detail[index]["for_living_in_other_place"] = null;
      } else if (e.target.value === "विदेशमा") {
        member_detail[index][
          "if_living_in_other_part_of_country_local_level_name"
        ] = null;
        member_detail[index]["for_living_in_other_place"] = null;
      } else if (e.target.value === "स्वदेशमा अन्यत्र") {
        member_detail[index]["country_if_living_abroad"] = null;
        member_detail[index]["reason_for_going_abroad"] = null;
        member_detail[index]["subject_of_study"] = null;
        member_detail[index]["which_employment"] = null;
      }
    } else if (key === "reason_for_going_abroad") {
      if (e.target.value === "अध्ययन")
        member_detail[index]["which_employment"] = null;
      else if (e.target.value === "रोजगारी")
        member_detail[index]["subject_of_study"] = null;
    } else if (
      key === "foreign_employment_returned" &&
      e.target.value === "0"
    ) {
      member_detail[index]["foreign_employment_country"] = null;
      member_detail[index]["foreign_employment_occupation"] = null;
      member_detail[index]["work_period"] = null;
    } else if (key === "skill_training") {
      if (
        e.target.value === "" ||
        e.target.value === null ||
        e.target.value === undefined
      ) {
        member_detail[index]["training_period"] = null;
        member_detail[index]["training_year"] = null;
      }
    } else if (key === "health_condition" && e.target.value !== "दीर्घ रोगी") {
      member_detail[index]["disease_name"] = null;
    } else if (key === "infected_by_epidemic" && e.target.value === "0") {
      member_detail[index]["epidemic_name"] = null;
      member_detail[index]["infected_date"] = null;
      member_detail[index]["observed_symptoms"] = null;
      member_detail[index]["living_place_after_infection"] = null;
      member_detail[index]["treatment_room"] = null;
      member_detail[index]["oxygen_support_needed_for_treatment"] = null;
      member_detail[index]["hospital_discharged_in_how_many_days"] = null;
    } else if (
      key === "living_place_after_infection" &&
      e.target.value !== "अस्पताल"
    ) {
      member_detail[index]["treatment_room"] = null;
      member_detail[index]["hospital_discharged_in_how_many_days"] = null;
    } else if (key === "vaccine_against_covid" && e.target.value !== "0") {
      member_detail[index]["which_dose"] = null;
      member_detail[index]["vaccine_name"] = null;
    } else if (key === "is_bank_account_exist" && e.target.value !== "0") {
      member_detail[index]["bank_institution_name"] = null;
    } else if (
      key === "death_status" &&
      (e.target.value === "0" || e.target.value === null)
    ) {
      member_detail[index]["age_when_death"] = null;
      member_detail[index]["death_reason"] = null;
      member_detail[index]["death_disease"] = null;
      member_detail[index]["death_certificate"] = null;
      member_detail[index]["is_pregnant_woman"] = null;
      member_detail[index]["is_infant_child"] = null;
    }
    setValues({ ...values, member_detail });
    field.onChange(e);
  };

  return (
    <>
      <div className="sub-main_title">
        <h2>घरमुलीको ब्यक्तिगत विवरण</h2>
      </div>
      <div className="sub-main_body">
        <Row>
          {editData?.house_ownership === "निजि / आफ्नै" && (
            <>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="family_head_name">
                  <Form.Label className="require">
                    घरधनीको नाम (नेपाली)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="family_head_name"
                    value={editData.family_head_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.family_head_name ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.family_head_name ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="family_head_name_en">
                  <Form.Label className="require">
                    घरधनीको नाम (BLOCK LETTER)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="family_head_name_en"
                    value={editData.family_head_name_en}
                    onKeyUp={(e) => toFhUpperCase(e, editData, setValues)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.family_head_name_en ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.family_head_name_en ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="fathers_name">
                  <Form.Label>बाबुको नाम</Form.Label>
                  <Form.Control
                    type="text"
                    name="fathers_name"
                    value={editData.fathers_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.fathers_name ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.fathers_name ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="mothers_name">
                  <Form.Label>आमाको नाम</Form.Label>
                  <Form.Control
                    type="text"
                    name="mothers_name"
                    value={editData.mothers_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.mothers_name ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.mothers_name ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="grandfathers_name">
                  <Form.Label>हजुरबुबाको नाम</Form.Label>
                  <Form.Control
                    type="text"
                    name="grandfathers_name"
                    value={editData.grandfathers_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.grandfathers_name ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.grandfathers_name ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="grandmothers_name">
                  <Form.Label>हजुरआमाको नाम</Form.Label>
                  <Form.Control
                    type="text"
                    name="grandmothers_name"
                    value={editData.grandmothers_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.grandmothers_name ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.grandmothers_name ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="phone_no">
                  <Form.Label className="require">घरधनीको फोन नं</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone_no"
                    value={editData.phone_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.phone_no ? "is-invalid" : null}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.phone_no ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </>
          )}

          {[
            "भोग चलनमा रहेको तर स्थायी पुर्जा प्राप्त नभएको",
            "सार्वजनिक जग्गा / सुकुम्बासी",
          ].includes(editData?.house_ownership) && (
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3" controlId="living_persons_no">
                <Form.Label className="require">
                  यस घरमा वसोवास गर्ने व्यक्तिको फोन नं.
                </Form.Label>
                <Form.Control
                  type="text"
                  name="living_persons_no"
                  value={editData.living_persons_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.living_persons_no ? "is-invalid" : null}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.living_persons_no ?? ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}

          <Col lg={6} xl={4}>
            <Form.Group className="mb-3" controlId="local_resident">
              <Form.Label className="require">
                तपाईंको परिवार यहाको स्थायी वासिन्दा हो?
              </Form.Label>
              <div
                className={`theme-radio d-flex ${
                  errors.local_resident ? "is-invalid" : null
                }`}
              >
                <Field name="local_resident">
                  {({ field }) => (
                    <>
                      <Form.Check
                        {...field}
                        type="radio"
                        id="local_resident-1"
                        value="1"
                        label="हो"
                        name="local_resident"
                        checked={editData.local_resident === "1"}
                        onChange={(e) =>
                          onToggleLocalResident(e, field, editData, setValues)
                        }
                        onBlur={handleBlur}
                        className="me-4"
                      />
                      <Form.Check
                        {...field}
                        type="radio"
                        id="local_resident-0"
                        label="होइन"
                        value="0"
                        name="local_resident"
                        checked={editData.local_resident === "0"}
                        onChange={(e) =>
                          onToggleLocalResident(e, field, editData, setValues)
                        }
                        onBlur={handleBlur}
                        className="me-4"
                      />
                    </>
                  )}
                </Field>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors?.local_resident ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {editData.local_resident === "0" && (
            <>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="shifted_from_district">
                  <Form.Label className="require">
                    बसाई सराई गरेर आएको जिल्ला
                  </Form.Label>
                  <Form.Control
                    name="shifted_from_district"
                    value={editData.shifted_from_district}
                    as="select"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.shifted_from_district ? "is-invalid" : null
                    }
                  >
                    <option key={`shifted_from_district-`} value="">
                      -- चयन गर्नुहोस् --
                    </option>
                    {Object.keys(editorConfig.nepali_district).map((key) => (
                      <option key={`shifted_from_district-${key}`} value={key}>
                        {editorConfig.nepali_district[key]}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors?.shifted_from_district ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={6} xl={4}>
                <Form.Group className="mb-3" controlId="shifted_date">
                  <Form.Label className="require">
                    बसाई सराई गरेर आएको मिति
                  </Form.Label>
                  <Form.Control
                    name="shifted_date"
                    as="select"
                    value={editData.shifted_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.shifted_date ? "is-invalid" : null}
                  >
                    <option value=""> -- चयन गर्नुहोस् --</option>
                    {getYear()}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors?.shifted_date ?? ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </>
          )}

          <Col lg={6} xl={4}>
            <Form.Group className="mb-3" controlId="total_family_member">
              <Form.Label>कुल परिवार सदस्य </Form.Label>
              <Form.Control
                type="number"
                name={`death_detail.total_family_member`}
                value={getFamilyMemberCount(editData.member_detail)}
                readOnly
                className={errors.total_family_member ? "is-invalid" : null}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.total_family_member ?? ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="theme-accordion mb-5">
          {editData.member_detail.map((member, index) => (
            <Accordion
              className="sub-acc"
              key={`total_family_member-${index}`}
              defaultActiveKey="0"
            >
              <Accordion.Item eventKey="0">
                <div>
                  <Accordion.Header>
                    परिवार सदस्य विवरण {index + 1}
                  </Accordion.Header>
                  <Button
                    className="btn-danger delete-feild"
                    onClick={() =>
                      removeFamilyMember(index, editData, setValues)
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
                        controlId={`member_detail.${index}.first_name`}
                      >
                        <Form.Label className="require">पहिलो नाम</Form.Label>
                        <Form.Control
                          type="hidden"
                          name={`member_detail.${index}.id`}
                          value={member.id}
                        />
                        <Form.Control
                          type="text"
                          name={`member_detail.${index}.first_name`}
                          value={member.first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.member_detail?.[index]?.first_name
                              ? "is-invalid"
                              : null
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.first_name ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.middle_name`}
                      >
                        <Form.Label>बीचको नाम</Form.Label>
                        <Form.Control
                          type="text"
                          name={`member_detail.${index}.middle_name`}
                          value={member.middle_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.member_detail?.[index]?.middle_name
                              ? "is-invalid"
                              : null
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.middle_name ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.last_name`}
                      >
                        <Form.Label className="require">थर</Form.Label>
                        <Form.Control
                          type="text"
                          name={`member_detail.${index}.last_name`}
                          value={member.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.member_detail?.[index]?.last_name
                              ? "is-invalid"
                              : null
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.last_name ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.name_en`}
                      >
                        <Form.Label className="require">
                          नाम (BLOCK LETTER)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name={`member_detail.${index}.name_en`}
                          onKeyUp={(e) =>
                            toFmUpperCase(e, index, editData, setValues)
                          }
                          value={member.name_en}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.member_detail?.[index]?.name_en
                              ? "is-invalid"
                              : null
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.name_en ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.gender`}
                      >
                        <Form.Label className="require">
                          लैङ्गिक विवरण
                        </Form.Label>
                        <div
                          className={`theme-radio d-flex ${
                            errors.member_detail?.[index]?.gender
                              ? "is-invalid"
                              : null
                          }`}
                        >
                          {Object.keys(editorConfig.gender).map((key) => (
                            <Form.Check
                              type="radio"
                              key={`member_detail.${index}.gender-${key}`}
                              id={`member_detail.${index}.gender-${key}`}
                              value={key}
                              checked={key === member.gender}
                              label={editorConfig.gender[key]}
                              name={`member_detail.${index}.gender`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-4"
                            />
                          ))}
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.gender ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.relation_with_house_owner`}
                      >
                        <Form.Label className="require">
                          घर मालिक संग सम्बन्ध
                        </Form.Label>
                        <Form.Control
                          name={`member_detail.${index}.relation_with_house_owner`}
                          value={member.relation_with_house_owner}
                          as="select"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.member_detail?.[index]
                              ?.relation_with_house_owner
                              ? "is-invalid"
                              : null
                          }
                        >
                          <option value=""> -- चयन गर्नुहोस् --</option>
                          {Object.keys(
                            editorConfig.relation_with_house_owner
                          ).map((key) => (
                            <option
                              key={`member_detail.${index}.relation_with_house_owner-${key}`}
                              value={key}
                            >
                              {editorConfig.relation_with_house_owner[key]}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]
                            ?.relation_with_house_owner ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.blood_group`}
                      >
                        <Form.Label>रक्त समुह</Form.Label>
                        <Form.Control
                          name={`member_detail.${index}.blood_group`}
                          value={member.blood_group}
                          className={
                            errors.member_detail?.[index]?.blood_group
                              ? "is-invalid"
                              : null
                          }
                          as="select"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value=""> -- चयन गर्नुहोस् --</option>
                          {Object.keys(editorConfig.blood_group).map((key) => (
                            <option
                              key={`member_detail.${index}.blood_group-${key}`}
                              value={key}
                            >
                              {editorConfig.blood_group[key]}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.blood_group ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.mobile_number`}
                      >
                        <Form.Label>मोबाईल नं.</Form.Label>
                        <Form.Control
                          type="number"
                          name={`member_detail.${index}.mobile_number`}
                          value={member.mobile_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.member_detail?.[index]?.mobile_number
                              ? "is-invalid"
                              : null
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.mobile_number ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.email`}
                      >
                        <Form.Label>इमेल</Form.Label>
                        <Form.Control
                          type="email"
                          name={`member_detail.${index}.email`}
                          value={member.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.member_detail?.[index]?.email
                              ? "is-invalid"
                              : null
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.email ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.dob`}
                      >
                        <Form.Label className="require">
                          जन्म मिति (B.S.)
                        </Form.Label>
                        <NepaliDatePicker
                          className="form-control"
                          defaultDate={member.dob ?? true}
                          onDateSelect={(date) =>
                            onDateSelect(
                              date,
                              index,
                              editData,
                              setValues,
                              "dob"
                            )
                          }
                        />

                        <Form.Control.Feedback
                          className="d-block"
                          type="invalid"
                        >
                          {errors?.member_detail?.[index]?.dob ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.age`}
                      >
                        <Form.Label>उमेर</Form.Label>
                        <Form.Control
                          type="number"
                          disabled
                          name={`member_detail.${index}.age`}
                          value={member.age}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.member_detail?.[index]?.age
                              ? "is-invalid"
                              : null
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.age ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}></Col>
                    {member.age > 15 && (
                      <>
                        <Col lg={8} xl={12}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.citizenship`}
                          >
                            <div
                              className={`theme-radio d-flex ${
                                errors.member_detail?.[index]?.citizenship
                                  ? "is-invalid"
                                  : null
                              }`}
                            >
                              <Form.Label className="theme-radio_label require">
                                नागरिकताको प्रमाणपत्र छ/छैन ?
                              </Form.Label>
                              <div className="d-flex">
                                <Field
                                  name={`member_detail.${index}.citizenship`}
                                >
                                  {({ field }) => (
                                    <>
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="citizenship-1"
                                        value="1"
                                        label="छ"
                                        name={`member_detail.${index}.citizenship`}
                                        checked={member.citizenship === "1"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "citizenship"
                                          )
                                        }
                                        onBlur={handleBlur}
                                        className="me-4"
                                      />
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="citizenshipship-0"
                                        label="छैन"
                                        value="0"
                                        name={`member_detail.${index}.citizenship`}
                                        checked={member.citizenship === "0"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "citizenship"
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
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors?.member_detail?.[index]?.citizenship ??
                                ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.citizenship === "1" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.citizenship_number`}
                              >
                                <Form.Label className="require">
                                  नागरिकता नंम्बर
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.citizenship_number`}
                                  value={member.citizenship_number}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.citizenship_number
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.citizenship_number ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.citizenship_issue_date`}
                              >
                                <Form.Label className="require">
                                  नागरिकता जारी मिति (वि.सं.)
                                </Form.Label>
                                <NepaliDatePicker
                                  className="form-control"
                                  defaultDate={
                                    member.citizenship_issue_date ?? true
                                  }
                                  onDateSelect={(date) =>
                                    onDateSelect(
                                      date,
                                      index,
                                      editData,
                                      setValues,
                                      "citizenship_issue_date"
                                    )
                                  }
                                />
                                <Form.Control.Feedback
                                  className="d-block"
                                  type="invalid"
                                >
                                  {errors?.member_detail?.[index]
                                    ?.citizenship_issue_date ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.citizenship_issued_district`}
                              >
                                <Form.Label className="require">
                                  नागरिकता जारी जिल्ला
                                </Form.Label>
                                <Form.Control
                                  name={`member_detail.${index}.citizenship_issued_district`}
                                  value={member.citizenship_issued_district}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.citizenship_issued_district
                                      ? "is-invalid"
                                      : null
                                  }
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value="">-- चयन गर्नुहोस् --</option>
                                  {Object.keys(
                                    editorConfig.nepali_district
                                  ).map((key) => (
                                    <option
                                      key={`citizenship_issued_district-${key}`}
                                      value={key}
                                    >
                                      {editorConfig.nepali_district[key]}
                                    </option>
                                  ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.citizenship_issued_district ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                        {member.citizenship === "0" && (
                          <Col lg={12} xl={8}>
                            <Form.Group
                              className="mb-3"
                              controlId={`member_detail.${index}.reason_if_no_citizenship`}
                            >
                              <Form.Label className="require">
                                नागरिकता छैन भने कारण
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name={`member_detail.${index}.reason_if_no_citizenship`}
                                value={member.reason_if_no_citizenship}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.member_detail?.[index]
                                    ?.reason_if_no_citizenship
                                    ? "is-invalid"
                                    : null
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors?.member_detail?.[index]
                                  ?.reason_if_no_citizenship ?? ""}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        )}
                        <Col lg={12} xl={12}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.national_id_card`}
                          >
                            <div
                              className={`theme-radio d-flex ${
                                errors.member_detail?.[index]?.national_id_card
                                  ? "is-invalid"
                                  : null
                              }`}
                            >
                              <Form.Label className="theme-radio_label require">
                                राष्ट्रिय परिचयपत्र छ/छैन?
                              </Form.Label>
                              <div className="d-flex">
                                <Field
                                  name={`member_detail.${index}.national_id_card`}
                                >
                                  {({ field }) => (
                                    <>
                                      <Form.Check
                                        type="radio"
                                        id="national_id_card-1"
                                        value="1"
                                        label="छ"
                                        name={`member_detail.${index}.national_id_card`}
                                        checked={
                                          member.national_id_card === "1"
                                        }
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "national_id_card"
                                          )
                                        }
                                        onBlur={handleBlur}
                                        className="me-4"
                                      />
                                      <Form.Check
                                        type="radio"
                                        id="national_id_card-0"
                                        label="छैन"
                                        value="0"
                                        name={`member_detail.${index}.national_id_card`}
                                        checked={
                                          member.national_id_card === "0"
                                        }
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "national_id_card"
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
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors?.member_detail?.[index]
                                ?.national_id_card ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.national_id_card === "1" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.national_id_card_number`}
                              >
                                <Form.Label className="require">
                                  राष्ट्रिय परिचयपत्र नं
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.national_id_card_number`}
                                  value={member.national_id_card_number}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.national_id_card_number
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.national_id_card_number ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.national_id_card_issue_date`}
                              >
                                <Form.Label className="require">
                                  राष्ट्रिय परिचयपत्र जारी गर्ने मिति (वि.सं.)
                                </Form.Label>
                                <NepaliDatePicker
                                  className="form-control"
                                  defaultDate={
                                    member.national_id_card_issue_date ?? true
                                  }
                                  onDateSelect={(date) =>
                                    onDateSelect(
                                      date,
                                      index,
                                      editData,
                                      setValues,
                                      "national_id_card_issue_date"
                                    )
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.national_id_card_issue_date ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                        <Col lg={12} xl={12}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.passport`}
                          >
                            <div
                              className={`theme-radio d-flex ${
                                errors.member_detail?.[index]?.national_id_card
                                  ? "is-invalid"
                                  : null
                              }`}
                            >
                              <Form.Label className="theme-radio_label require">
                                राहदानी छ/छैन?
                              </Form.Label>
                              <div className="d-flex">
                                <Field name={`member_detail.${index}.passport`}>
                                  {({ field }) => (
                                    <>
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="passport-1"
                                        value="1"
                                        label="छ"
                                        name={`member_detail.${index}.passport`}
                                        checked={member.passport === "1"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "passport"
                                          )
                                        }
                                        onBlur={handleBlur}
                                        className="me-4"
                                      />
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="passport-0"
                                        label="छैन"
                                        value="0"
                                        name={`member_detail.${index}.passport`}
                                        checked={member.passport === "0"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "passport"
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
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors?.member_detail?.[index]?.passport ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.passport === "1" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.passport_number`}
                              >
                                <Form.Label className="require">
                                  राहदानी नं.
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.passport_number`}
                                  value={member.passport_number}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.passport_number
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.passport_number ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.passport_issue_place`}
                              >
                                <Form.Label className="require">
                                  राहदानी जारी स्थान
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.passport_issue_place`}
                                  value={member.passport_issue_place}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.passport_issue_place
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.passport_issue_place ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.passport_issue_date`}
                              >
                                <Form.Label className="require">
                                  राहदानी जारी मिति
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  name={`member_detail.${index}.passport_issue_date`}
                                  value={member.passport_issue_date}
                                  max={today.toJSON().slice(0, 10)}
                                  format="YYYY-MM-DD"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.passport_issue_date
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.passport_issue_date ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.passport_deadline_date`}
                              >
                                <Form.Label className="require">
                                  राहदानी अन्तिम मिति
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  name={`member_detail.${index}.passport_deadline_date`}
                                  value={member.passport_deadline_date}
                                  min={member.passport_issue_date}
                                  format="YYYY-MM-DD"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.passport_deadline_date
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.passport_deadline_date ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                        <Col lg={12} xl={12}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.pan`}
                          >
                            <div
                              className={`theme-radio d-flex ${
                                errors.member_detail?.[index]?.pan
                                  ? "is-invalid"
                                  : null
                              }`}
                            >
                              <Form.Label className="theme-radio_label require">
                                स्थायी लेखा छ/छैन ?
                              </Form.Label>
                              <div className="d-flex">
                                <Field name={`member_detail.${index}.pan`}>
                                  {({ field }) => (
                                    <>
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="pan-1"
                                        value="1"
                                        label="छ"
                                        name={`member_detail.${index}.pan`}
                                        checked={member.pan === "1"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "pan"
                                          )
                                        }
                                        onBlur={handleBlur}
                                        className="me-4"
                                      />
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="pan-0"
                                        label="छैन"
                                        value="0"
                                        name={`member_detail.${index}.pan`}
                                        checked={member.pan === "0"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "pan"
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
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors?.member_detail?.[index]?.pan ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.pan === "1" && (
                          <Col lg={6} xl={4}>
                            <Form.Group
                              className="mb-3"
                              controlId={`member_detail.${index}.pan_number`}
                            >
                              <Form.Label className="require">
                                स्थायी लेखा नं
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name={`member_detail.${index}.pan_number`}
                                value={member.pan_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.member_detail?.[index]?.pan_number
                                    ? "is-invalid"
                                    : null
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors?.member_detail?.[index]?.pan_number ??
                                  ""}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        )}
                        <Col lg={12} xl={12}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.social_security_fund_id_card`}
                          >
                            <div
                              className={`theme-radio d-flex ${
                                errors.member_detail?.[index]
                                  ?.social_security_fund_id_card
                                  ? "is-invalid"
                                  : null
                              }`}
                            >
                              <Form.Label className="theme-radio_label require">
                                सामाजिक सुरक्षा कोष छ/छैन?
                              </Form.Label>
                              <div className="d-flex">
                                <Field
                                  name={`member_detail.${index}.social_security_fund_id_card`}
                                >
                                  {({ field }) => (
                                    <>
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="social_security_fund_id_card-1"
                                        value="1"
                                        label="छ"
                                        name={`member_detail.${index}.social_security_fund_id_card`}
                                        checked={
                                          member.social_security_fund_id_card ===
                                          "1"
                                        }
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "social_security_fund_id_card"
                                          )
                                        }
                                        onBlur={handleBlur}
                                        className="me-4"
                                      />
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="social_security_fund_id_card-0"
                                        label="छैन"
                                        value="0"
                                        name={`member_detail.${index}.social_security_fund_id_card`}
                                        checked={
                                          member.social_security_fund_id_card ===
                                          "0"
                                        }
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "social_security_fund_id_card"
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
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors?.member_detail?.[index]
                                ?.social_security_fund_id_card ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.social_security_fund_id_card === "1" && (
                          <Col lg={12} xl={8}>
                            <Form.Group
                              className="mb-3"
                              controlId={`member_detail.${index}.social_security_fund_id_card_number`}
                            >
                              <Form.Label className="require">
                                सामाजिक सुरक्षा कोष परिचय पत्र नं
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name={`member_detail.${index}.social_security_fund_id_card_number`}
                                value={
                                  member.social_security_fund_id_card_number
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.member_detail?.[index]
                                    ?.social_security_fund_id_card_number
                                    ? "is-invalid"
                                    : null
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors?.member_detail?.[index]
                                  ?.social_security_fund_id_card_number ?? ""}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        )}
                        <Col lg={12} xl={12}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.driver_license`}
                          >
                            <div
                              className={`theme-radio d-flex ${
                                errors.member_detail?.[index]?.driver_license
                                  ? "is-invalid"
                                  : null
                              }`}
                            >
                              <Form.Label className="theme-radio_label require">
                                सवारी चालक अनुमति पत्र छ/छैन?
                              </Form.Label>
                              <div className="d-flex">
                                <Field
                                  name={`member_detail.${index}.driver_license`}
                                >
                                  {({ field }) => (
                                    <>
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="driver_license-1"
                                        value="1"
                                        label="छ"
                                        name={`member_detail.${index}.driver_license`}
                                        checked={member.driver_license === "1"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "driver_license"
                                          )
                                        }
                                        onBlur={handleBlur}
                                        className="me-4"
                                      />
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="driver_license-0"
                                        label="छैन"
                                        value="0"
                                        name={`member_detail.${index}.driver_license`}
                                        checked={member.driver_license === "0"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "driver_license"
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
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors?.member_detail?.[index]?.driver_license ??
                                ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.driver_license === "1" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.driver_license_number`}
                              >
                                <Form.Label className="require">
                                  सवारी चालक अनुमति नं.
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.driver_license_number`}
                                  value={member.driver_license_number}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.driver_license_number
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.driver_license_number ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.driver_license_issue_date`}
                              >
                                <Form.Label className="require">
                                  सवारी चालक अनुमति पत्र जारी मिति
                                </Form.Label>

                                <Form.Control
                                  type="date"
                                  name={`member_detail.${index}.driver_license_issue_date`}
                                  value={member.driver_license_issue_date}
                                  max={today.toJSON().slice(0, 10)}
                                  format="YYYY-MM-DD"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.driver_license_issue_date
                                      ? "is-invalid"
                                      : null
                                  }
                                />

                                <Form.Control.Feedback
                                  className="d-block"
                                  type="invalid"
                                >
                                  {errors?.member_detail?.[index]
                                    ?.driver_license_issue_date ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.driver_license_expiry_date`}
                              >
                                <Form.Label className="require">
                                  सवारी चालक अनुमति पत्र समाप्त मिति
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  name={`member_detail.${index}.driver_license_expiry_date`}
                                  value={member.driver_license_expiry_date}
                                  min={member.driver_license_issue_date}
                                  format="YYYY-MM-DD"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.driver_license_expiry_date
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback
                                  className="d-block"
                                  type="invalid"
                                >
                                  {errors?.member_detail?.[index]
                                    ?.driver_license_expiry_date ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={8}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.driver_license_category`}
                              >
                                <Form.Label className="require">
                                  सवारी चालक अनुमति पत्र वर्ग
                                </Form.Label>
                                <Multiselect
                                  options={getMultiSelectOptions(
                                    editorConfig.driver_license_category
                                  )} // Options to display in the dropdown
                                  selectedValues={getMultiSelectSelected(
                                    editorConfig.driver_license_category,
                                    member.driver_license_category
                                  )}
                                  onSelect={(e) =>
                                    onSelectLicenseCategory(
                                      e,
                                      index,
                                      editData,
                                      setValues
                                    )
                                  } // Function will trigger on select event
                                  onRemove={(e) =>
                                    onSelectLicenseCategory(
                                      e,
                                      index,
                                      editData,
                                      setValues
                                    )
                                  } // Function will trigger on remove event
                                  avoidHighlightFirstOption={true}
                                  displayValue="name" // Property name to display in the dropdown options
                                />

                                <Form.Control.Feedback
                                  className="d-block"
                                  type="invalid"
                                >
                                  {errors?.member_detail?.[index]
                                    ?.driver_license_category ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}></Col>
                          </>
                        )}
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.voters_id_card_number`}
                          >
                            <Form.Label>मतदाता परिचय पत्र नं.</Form.Label>
                            <Form.Control
                              type="text"
                              name={`member_detail.${index}.voters_id_card_number`}
                              value={member.voters_id_card_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.member_detail?.[index]
                                  ?.voters_id_card_number
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]
                                ?.voters_id_card_number ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.voting_place`}
                          >
                            <Form.Label>मतदान स्थल</Form.Label>
                            <Form.Control
                              type="text"
                              name={`member_detail.${index}.voting_place`}
                              value={member.voting_place}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.member_detail?.[index]?.voting_place
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]?.voting_place ??
                                ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg={6} xl={4}></Col>
                      </>
                    )}
                    {member.age > 10 && (
                      <>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.education_qualification`}
                          >
                            <Form.Label className="require">
                              शैक्षिक योग्यता
                            </Form.Label>
                            <Field
                              name={`member_detail.${index}.education_qualification`}
                            >
                              {({ field }) => (
                                <>
                                  <Form.Control
                                    {...field}
                                    name={`member_detail.${index}.education_qualification`}
                                    value={member.education_qualification}
                                    as="select"
                                    className={
                                      errors.member_detail?.[index]
                                        ?.education_qualification
                                        ? "is-invalid"
                                        : null
                                    }
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "education_qualification"
                                      )
                                    }
                                    onBlur={handleBlur}
                                  >
                                    <option
                                      key={`education_qualification-`}
                                      value=""
                                    >
                                      -- चयन गर्नुहोस् --
                                    </option>
                                    {Object.keys(
                                      editorConfig.education_qualification
                                    ).map((key) => (
                                      <option
                                        key={`education_qualification-${key}`}
                                        value={key}
                                      >
                                        {
                                          editorConfig.education_qualification[
                                            key
                                          ]
                                        }
                                      </option>
                                    ))}
                                  </Form.Control>
                                </>
                              )}
                            </Field>

                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]
                                ?.education_qualification ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.education_qualification === "1" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.reason_for_leaving_school`}
                              >
                                <Form.Label className="require">
                                  विद्यालय बिचमा छाडेको हो/होइन (१० कक्षा भन्दा
                                  कम याग्यतामा साध्ने)
                                </Form.Label>
                                <Form.Control
                                  name={`member_detail.${index}.reason_for_leaving_school`}
                                  value={member.reason_for_leaving_school}
                                  as="select"
                                  className={
                                    errors.member_detail?.[index]
                                      ?.reason_for_leaving_school
                                      ? "is-invalid"
                                      : null
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option
                                    key={`reason_for_leaving_school-`}
                                    value=""
                                  >
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(
                                    editorConfig.reason_for_leaving_school
                                  ).map((key) => (
                                    <option
                                      key={`reason_for_leaving_school-${key}`}
                                      value={key}
                                    >
                                      {
                                        editorConfig.reason_for_leaving_school[
                                          key
                                        ]
                                      }
                                    </option>
                                  ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.reason_for_leaving_school ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}></Col>
                          </>
                        )}
                        {["5", "6", "7", "8", "9"].includes(
                          member.education_qualification
                        ) && (
                          <Col lg={6} xl={4}>
                            <Form.Group
                              className="mb-3"
                              controlId={`member_detail.${index}.faculty_of_study`}
                            >
                              <Form.Label className="require">
                                अध्धयन गरेको क्षेत्र (सकाय)
                              </Form.Label>
                              <Form.Control
                                name={`member_detail.${index}.faculty_of_study`}
                                value={member.faculty_of_study}
                                as="select"
                                className={
                                  errors.member_detail?.[index]
                                    ?.faculty_of_study
                                    ? "is-invalid"
                                    : null
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option key={`faculty_of_study-`} value="">
                                  -- चयन गर्नुहोस् --
                                </option>
                                {Object.keys(editorConfig.faculty_of_study).map(
                                  (key) => (
                                    <option
                                      key={`faculty_of_study-${key}`}
                                      value={key}
                                    >
                                      {editorConfig.faculty_of_study[key]}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                              <Form.Control.Feedback type="invalid">
                                {errors?.member_detail?.[index]
                                  ?.faculty_of_study ?? ""}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        )}
                        {["2", "3", "4", "5", "6", "7", "8", "9"].includes(
                          member.education_qualification
                        ) && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3 "
                                controlId={`member_detail.${index}.passed_date`}
                              >
                                <Form.Label className="require">
                                  उर्तीण गरको साल
                                </Form.Label>
                                <Form.Control
                                  name={`member_detail.${index}.passed_date`}
                                  value={member.passed_date}
                                  className={
                                    errors.member_detail?.[index]?.passed_date
                                      ? "is-invalid"
                                      : null
                                  }
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value={""}>
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {getYear()}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.passed_date ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.qualification_assessment_type`}
                              >
                                <Form.Label className="require">
                                  योग्यता निर्धारणको प्रकार
                                </Form.Label>
                                <Form.Control
                                  name={`member_detail.${index}.qualification_assessment_type`}
                                  value={member.qualification_assessment_type}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.qualification_assessment_type
                                      ? "is-invalid"
                                      : null
                                  }
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option
                                    key={`qualification_assessment_type-`}
                                    value=""
                                  >
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(
                                    editorConfig.qualification_assessment_type
                                  ).map((key) => (
                                    <option
                                      key={`qualification_assessment_type-${key}`}
                                      value={key}
                                    >
                                      {key}
                                    </option>
                                  ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.qualification_assessment_type ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            {member.qualification_assessment_type !== "" &&
                              member.qualification_assessment_type !== null && (
                                <Col lg={6} xl={4}>
                                  <Form.Group
                                    className="mb-3"
                                    controlId={`member_detail.${index}.scored_gpa_marks`}
                                  >
                                    <Form.Label className="require">
                                      स्कोर गरेको ग्रेड
                                    </Form.Label>
                                    <Form.Control
                                      name={`member_detail.${index}.scored_gpa_marks`}
                                      value={member.scored_gpa_marks}
                                      as="select"
                                      className={
                                        errors.member_detail?.[index]
                                          ?.scored_gpa_marks
                                          ? "is-invalid"
                                          : null
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    >
                                      <option
                                        key={`qualification_assessment_type-`}
                                        value=""
                                      >
                                        -- चयन गर्नुहोस् --
                                      </option>
                                      {Object.keys(
                                        editorConfig
                                          .qualification_assessment_type[
                                          member.qualification_assessment_type
                                        ]?.scored_gpa_marks
                                      ).map((key) => (
                                        <option
                                          key={`qualification_assessment_type-${key}`}
                                          value={key}
                                        >
                                          {
                                            editorConfig
                                              .qualification_assessment_type[
                                              member
                                                .qualification_assessment_type
                                            ]?.scored_gpa_marks[key]
                                          }
                                        </option>
                                      ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                      {errors?.member_detail?.[index]
                                        ?.scored_gpa_marks ?? ""}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                              )}
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.studied_institution`}
                              >
                                <Form.Label className="require">
                                  अध्ययन गरेको संस्था.
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.studied_institution`}
                                  value={member.studied_institution}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.studied_institution
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.studied_institution ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            {["2", "3", "4"].includes(
                              member.education_qualification
                            ) && <Col lg={6} xl={4}></Col>}
                          </>
                        )}
                        <Col lg={12}></Col>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.marital_status`}
                          >
                            <Form.Label className="require">
                              वैवाहिक स्थिति
                            </Form.Label>
                            <Form.Control
                              name={`member_detail.${index}.marital_status`}
                              value={member.marital_status}
                              className={
                                errors.member_detail?.[index]?.marital_status
                                  ? "is-invalid"
                                  : null
                              }
                              as="select"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option key={`marital_status-`} value="">
                                -- चयन गर्नुहोस् --
                              </option>
                              {Object.keys(editorConfig.marital_status).map(
                                (key) => (
                                  <option
                                    key={`marital_status-${key}`}
                                    value={key}
                                  >
                                    {editorConfig.marital_status[key]}
                                  </option>
                                )
                              )}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]?.marital_status ??
                                ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg={12}></Col>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.occupation`}
                          >
                            <Form.Label className="require">पेशा</Form.Label>
                            <Field name={`member_detail.${index}.occupation`}>
                              {({ field }) => (
                                <>
                                  <Form.Control
                                    name={`member_detail.${index}.occupation`}
                                    value={member.occupation}
                                    as="select"
                                    className={
                                      errors.member_detail?.[index]?.occupation
                                        ? "is-invalid"
                                        : null
                                    }
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "occupation"
                                      )
                                    }
                                    onBlur={handleBlur}
                                  >
                                    <option key={`occupation-`} value="">
                                      -- चयन गर्नुहोस् --
                                    </option>
                                    {Object.keys(editorConfig.occupation).map(
                                      (key) => (
                                        <option
                                          key={`occupation-${key}`}
                                          value={key}
                                        >
                                          {editorConfig.occupation[key]}
                                        </option>
                                      )
                                    )}
                                  </Form.Control>
                                </>
                              )}
                            </Field>

                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]?.occupation ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.occupation === "1" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.government_job_type`}
                              >
                                <Form.Label className="require">
                                  सरकारी जागिरको प्रकार
                                </Form.Label>
                                <Form.Control
                                  name={`member_detail.${index}.government_job_type`}
                                  value={member.government_job_type}
                                  as="select"
                                  className={
                                    errors.member_detail?.[index]
                                      ?.government_job_type
                                      ? "is-invalid"
                                      : null
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option key={`government_job_type-`} value="">
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(
                                    editorConfig.government_job_type
                                  ).map((key) => (
                                    <option
                                      key={`government_job_type-${key}`}
                                      value={key}
                                    >
                                      {editorConfig.government_job_type[key]}
                                    </option>
                                  ))}
                                </Form.Control>

                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.government_job_type ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.government_job_post`}
                              >
                                <Form.Label className="require">
                                  सरकारी जागिर पद
                                </Form.Label>
                                <Form.Control
                                  name={`member_detail.${index}.government_job_post`}
                                  value={member.government_job_post}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.government_job_post
                                      ? "is-invalid"
                                      : null
                                  }
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option key={`government_job_post-`} value="">
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(
                                    editorConfig.government_job_post
                                  ).map((key) => (
                                    <option
                                      key={`government_job_post-${key}`}
                                      value={key}
                                    >
                                      {editorConfig.government_job_post[key]}
                                    </option>
                                  ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.government_job_post ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.retired_or_reinstated`}
                              >
                                <Form.Label className="require">
                                  सेवा निबृत हो कि बहालवाला
                                </Form.Label>
                                <div
                                  className={`theme-radio d-flex ${
                                    errors.member_detail?.[index]
                                      ?.retired_or_reinstated
                                      ? "is-invalid"
                                      : null
                                  }`}
                                >
                                  {Object.keys(
                                    editorConfig.retired_or_reinstated
                                  ).map((key) => (
                                    <Form.Check
                                      type="radio"
                                      key={`member_detail.${index}.retired_or_reinstated-${key}`}
                                      id={`member_detail.${index}.retired_or_reinstated-${key}`}
                                      value={key}
                                      checked={
                                        key === member.retired_or_reinstated
                                      }
                                      label={
                                        editorConfig.retired_or_reinstated[key]
                                      }
                                      name={`member_detail.${index}.retired_or_reinstated`}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className="me-4"
                                    />
                                  ))}
                                </div>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.retired_or_reinstated ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                        {["2", "3", "4", "5", "6", "10", "11", "12"].includes(
                          member.occupation?.toString()
                        ) && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.post`}
                              >
                                <Form.Label className="require">
                                  पद (कार्याअनुभव स्वदेशी (पेशा नोकरीका हकमा))
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.post`}
                                  value={member.post}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]?.post
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]?.post ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.office`}
                              >
                                <Form.Label className="require">
                                  कार्यालय (कार्यानुभव स्वदेशी (पेशा नोकरीका
                                  हकमा))
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.office`}
                                  value={member.office}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]?.office
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]?.office ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.work_experience_year`}
                              >
                                <Form.Label className="require">
                                  कार्यानुभव बर्ष - कार्याअनुभव स्वदेशी (पेशा
                                  नोकरीमो हकमा)
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  name={`member_detail.${index}.work_experience_year`}
                                  value={member.work_experience_year}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.work_experience_year
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.work_experience_year ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                        <Col lg={12}></Col>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.residence_condition`}
                          >
                            <Form.Label className="">
                              बसोबासको अवस्था
                            </Form.Label>
                            <Field
                              name={`member_detail.${index}.residence_condition`}
                            >
                              {({ field }) => (
                                <>
                                  <Form.Control
                                    name={`member_detail.${index}.residence_condition`}
                                    value={member.residence_condition}
                                    as="select"
                                    className={
                                      errors.member_detail?.[index]
                                        ?.residence_condition
                                        ? "is-invalid"
                                        : null
                                    }
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "residence_condition"
                                      )
                                    }
                                    onBlur={handleBlur}
                                  >
                                    <option
                                      key={`residence_condition-`}
                                      value=""
                                    >
                                      -- चयन गर्नुहोस् --
                                    </option>
                                    {Object.keys(
                                      editorConfig.residence_condition
                                    ).map((key) => (
                                      <option
                                        key={`residence_condition-${key}`}
                                        value={key}
                                      >
                                        {editorConfig.residence_condition[key]}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </>
                              )}
                            </Field>

                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]
                                ?.residence_condition ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.residence_condition === "विदेशमा" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.country_if_living_abroad`}
                              >
                                <Form.Label className="require">
                                  विदेशमा बसोबास भए देश खुलाउनुहोस
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.country_if_living_abroad`}
                                  value={member.country_if_living_abroad}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.country_if_living_abroad
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.country_if_living_abroad ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.reason_for_going_abroad`}
                              >
                                <Form.Label className="require">
                                  विदेश जानुको कारण
                                </Form.Label>
                                <Field
                                  name={`member_detail.${index}.reason_for_going_abroad`}
                                >
                                  {({ field }) => (
                                    <>
                                      <Form.Control
                                        {...field}
                                        name={`member_detail.${index}.reason_for_going_abroad`}
                                        value={member.reason_for_going_abroad}
                                        as="select"
                                        className={
                                          errors.member_detail?.[index]
                                            ?.reason_for_going_abroad
                                            ? "is-invalid"
                                            : null
                                        }
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "reason_for_going_abroad"
                                          )
                                        }
                                        onBlur={handleBlur}
                                      >
                                        <option
                                          key={`reason_for_going_abroad-`}
                                          value=""
                                        >
                                          -- चयन गर्नुहोस् --
                                        </option>
                                        {Object.keys(
                                          editorConfig.reason_for_going_abroad
                                        ).map((key) => (
                                          <option
                                            key={`reason_for_going_abroad-${key}`}
                                            value={key}
                                          >
                                            {
                                              editorConfig
                                                .reason_for_going_abroad[key]
                                            }
                                          </option>
                                        ))}
                                      </Form.Control>
                                    </>
                                  )}
                                </Field>

                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.reason_for_going_abroad ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            {member.reason_for_going_abroad === "अध्ययन" && (
                              <Col lg={6} xl={4}>
                                <Form.Group
                                  className="mb-3"
                                  controlId={`member_detail.${index}.subject_of_study`}
                                >
                                  <Form.Label className="require">
                                    अध्ययनको विषय
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    name={`member_detail.${index}.subject_of_study`}
                                    value={member.subject_of_study}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                      errors.member_detail?.[index]
                                        ?.subject_of_study
                                        ? "is-invalid"
                                        : null
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors?.member_detail?.[index]
                                      ?.subject_of_study ?? ""}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                            )}

                            {member.reason_for_going_abroad === "रोजगारी" && (
                              <Col lg={6} xl={4}>
                                <Form.Group
                                  className="mb-3"
                                  controlId={`member_detail.${index}.which_employment`}
                                >
                                  <Form.Label className="require">
                                    के रोजगारीमा हो? उल्लेख गर्नुस्?
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    name={`member_detail.${index}.which_employment`}
                                    value={member.which_employment}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                      errors.member_detail?.[index]
                                        ?.which_employment
                                        ? "is-invalid"
                                        : null
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors?.member_detail?.[index]
                                      ?.which_employment ?? ""}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                            )}
                          </>
                        )}
                        {member.residence_condition === "स्वदेशमा अन्यत्र" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.if_living_in_other_part_of_country_local_level_name`}
                              >
                                <Form.Label className="require">
                                  स्वदेशमा अन्यत्र बसोबास गरेको भए स्थानीय तहको
                                  नाम र वडा न.
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.if_living_in_other_part_of_country_local_level_name`}
                                  value={
                                    member.if_living_in_other_part_of_country_local_level_name
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.if_living_in_other_part_of_country_local_level_name
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.if_living_in_other_part_of_country_local_level_name ??
                                    ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.for_living_in_other_place`}
                              >
                                <Form.Label className="require">
                                  अन्यत्र बसोबास गर्नका कारण (गणना गरेको भन्दा
                                  अन्यत्र बसाबासको हकमा)
                                </Form.Label>
                                <Form.Control
                                  name={`member_detail.${index}.for_living_in_other_place`}
                                  value={member.for_living_in_other_place}
                                  as="select"
                                  className={
                                    errors.member_detail?.[index]
                                      ?.for_living_in_other_place
                                      ? "is-invalid"
                                      : null
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option
                                    key={`for_living_in_other_place-`}
                                    value=""
                                  >
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(
                                    editorConfig.for_living_in_other_place
                                  ).map((key) => (
                                    <option
                                      key={`for_living_in_other_place-${key}`}
                                      value={key}
                                    >
                                      {
                                        editorConfig.for_living_in_other_place[
                                          key
                                        ]
                                      }
                                    </option>
                                  ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.for_living_in_other_place ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        )}

                        <Col sm={12}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.foreign_employment_returned`}
                          >
                            <div
                              className={`theme-radio d-flex ${
                                errors.member_detail?.[index]
                                  ?.foreign_employment_returned
                                  ? "is-invalid"
                                  : null
                              }`}
                            >
                              <Form.Label className="theme-radio_label require">
                                वैदेशिक रोजगारी पश्चात फर्किएको हो ? (गणना गरेको
                                स्थान वा स्वदेशमा अन्यत्र बस्नेको हकमा मात्र)
                              </Form.Label>
                              <div className="d-flex">
                                <Field
                                  name={`member_detail.${index}.foreign_employment_returned`}
                                >
                                  {({ field }) => (
                                    <>
                                      <Form.Check
                                        type="radio"
                                        id="foreign_employment_returned-1"
                                        value="1"
                                        label="हो"
                                        name={`member_detail.${index}.foreign_employment_returned`}
                                        checked={
                                          member.foreign_employment_returned ===
                                          "1"
                                        }
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "foreign_employment_returned"
                                          )
                                        }
                                        onBlur={handleBlur}
                                        className="me-4"
                                      />
                                      <Form.Check
                                        type="radio"
                                        id="foreign_employment_returned-0"
                                        label="होइन"
                                        value="0"
                                        name={`member_detail.${index}.foreign_employment_returned`}
                                        checked={
                                          member.foreign_employment_returned ===
                                          "0"
                                        }
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "foreign_employment_returned"
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
                              {errors?.member_detail?.[index]
                                ?.foreign_employment_returned ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.foreign_employment_returned === "1" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.foreign_employment_country`}
                              >
                                <Form.Label className="require">
                                  वैदेशिक रोजगारी गरेको देश
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.foreign_employment_country`}
                                  value={member.foreign_employment_country}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.foreign_employment_country
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.foreign_employment_country ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.foreign_employment_occupation`}
                              >
                                <Form.Label className="require">
                                  वैदेशिक रोजगारी पेशा
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.foreign_employment_occupation`}
                                  value={member.foreign_employment_occupation}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.foreign_employment_occupation
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.foreign_employment_occupation ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.work_period`}
                              >
                                <Form.Label className="require">
                                  वैदेशिक रोजगारी काम गरेको अवधी (महिनामा)
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  name={`member_detail.${index}.work_period`}
                                  value={member.work_period}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]?.work_period
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.work_period ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.skill_training`}
                          >
                            <Form.Label>सीपमुलक तालिम</Form.Label>
                            <Field
                              name={`member_detail.${index}.skill_training`}
                            >
                              {({ field }) => (
                                <>
                                  <Form.Control
                                    name={`member_detail.${index}.skill_training`}
                                    value={member.skill_training}
                                    as="select"
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "skill_training"
                                      )
                                    }
                                    onBlur={handleBlur}
                                  >
                                    <option key={`skill_training-`} value="">
                                      -- चयन गर्नुहोस् --
                                    </option>
                                    {Object.keys(
                                      editorConfig.skill_training
                                    ).map((key) => (
                                      <option
                                        key={`skill_training-${key}`}
                                        value={key}
                                      >
                                        {editorConfig.skill_training[key]}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </>
                              )}
                            </Field>

                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]?.skill_training ??
                                ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.skill_training !== "" &&
                        member.skill_training !== null &&
                        member.skill_training !== undefined ? (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.training_period`}
                              >
                                <Form.Label className="require">
                                  तालिमको अवधी
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  name={`member_detail.${index}.training_period`}
                                  value={member.training_period}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.member_detail?.[index]
                                      ?.training_period
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.training_period ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3 "
                                controlId={`member_detail.${index}.training_year`}
                              >
                                <Form.Label className="require">
                                  तालिम लिएको वर्ष
                                </Form.Label>
                                <Form.Control
                                  name={`member_detail.${index}.training_year`}
                                  value={member.training_year}
                                  as="select"
                                  className={
                                    errors.member_detail?.[index]?.training_year
                                      ? "is-invalid"
                                      : null
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value={""}>
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {getYear()}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.training_year ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        ) : (
                          <Col lg={6} xl={8}></Col>
                        )}
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.interested_area`}
                          >
                            <Form.Label>रुचीको क्षेत्र</Form.Label>
                            <Form.Control
                              name={`member_detail.${index}.interested_area`}
                              value={member.interested_area}
                              as="select"
                              className={
                                errors.member_detail?.[index]?.interested_area
                                  ? "is-invalid"
                                  : null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option key={`interested_area-`} value="">
                                -- चयन गर्नुहोस् --
                              </option>
                              {Object.keys(editorConfig.occupation).map(
                                (key) => (
                                  <option
                                    key={`interested_area-${key}`}
                                    value={key}
                                  >
                                    {editorConfig.occupation[key]}
                                  </option>
                                )
                              )}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]
                                ?.interested_area ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg={6} xl={8}></Col>
                      </>
                    )}
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.disability_condition`}
                      >
                        <Form.Label>अपाङ्गताको स्थिति</Form.Label>
                        <Form.Control
                          name={`member_detail.${index}.disability_condition`}
                          value={member.disability_condition}
                          as="select"
                          className={
                            errors.member_detail?.[index]?.disability_condition
                              ? "is-invalid"
                              : null
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option key={`disability_condition-`} value="">
                            -- चयन गर्नुहोस् --
                          </option>
                          {Object.keys(editorConfig.disability_condition).map(
                            (key) => (
                              <option
                                key={`disability_condition-${key}`}
                                value={key}
                              >
                                {editorConfig.disability_condition[key]}
                              </option>
                            )
                          )}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]
                            ?.disability_condition ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6} xl={4}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.interested_area`}
                      >
                        <Form.Label className="require">
                          स्वास्थ्य अवस्था
                        </Form.Label>
                        <Field name={`member_detail.${index}.health_condition`}>
                          {({ field }) => (
                            <>
                              <Form.Control
                                name={`member_detail.${index}.health_condition`}
                                value={member.health_condition}
                                as="select"
                                className={
                                  errors.member_detail?.[index]
                                    ?.health_condition
                                    ? "is-invalid"
                                    : null
                                }
                                onChange={(e) =>
                                  onToggleValues(
                                    e,
                                    index,
                                    field,
                                    editData,
                                    setValues,
                                    "health_condition"
                                  )
                                }
                                onBlur={handleBlur}
                              >
                                <option key={`health_condition-`} value="">
                                  -- चयन गर्नुहोस् --
                                </option>
                                {Object.keys(editorConfig.health_condition).map(
                                  (key) => (
                                    <option
                                      key={`health_condition-${key}`}
                                      value={key}
                                    >
                                      {editorConfig.health_condition[key]}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </>
                          )}
                        </Field>
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.health_condition ??
                            ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {member.health_condition === "दीर्घ रोगी" ? (
                      <Col lg={6} xl={4}>
                        <Form.Group
                          className="mb-3"
                          controlId={`member_detail.${index}.disease_name`}
                        >
                          <Form.Label className="require">रोगको नाम</Form.Label>
                          <Form.Control
                            name={`member_detail.${index}.disease_name`}
                            value={member.disease_name}
                            as="select"
                            className={
                              errors.member_detail?.[index]?.disease_name
                                ? "is-invalid"
                                : null
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option key={`disease_name-`} value="">
                              -- चयन गर्नुहोस् --
                            </option>
                            {Object.keys(editorConfig.disease_name).map(
                              (key) => (
                                <option key={`disease_name-${key}`} value={key}>
                                  {editorConfig.disease_name[key]}
                                </option>
                              )
                            )}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors?.member_detail?.[index]?.disease_name ?? ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    ) : (
                      <Col lg={6} xl={4}></Col>
                    )}

                    <Col lg={8} xl={12}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.infected_by_epidemic`}
                      >
                        <div
                          className={`theme-radio d-flex ${
                            errors.member_detail?.[index]?.infected_by_epidemic
                              ? "is-invalid"
                              : null
                          }`}
                        >
                          <Form.Label className="theme-radio_label require">
                            महामारीको प्रकोपबाट संक्रमित हो/ हैन ?
                          </Form.Label>
                          <div className="d-flex">
                            <Field
                              name={`member_detail.${index}.infected_by_epidemic`}
                            >
                              {({ field }) => (
                                <>
                                  <Form.Check
                                    type="radio"
                                    id="infected_by_epidemic-1"
                                    value="1"
                                    label="हो"
                                    name={`member_detail.${index}.infected_by_epidemic`}
                                    checked={
                                      member.infected_by_epidemic === "1"
                                    }
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "infected_by_epidemic"
                                      )
                                    }
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                  <Form.Check
                                    type="radio"
                                    id="infected_by_epidemic-0"
                                    label="हैन"
                                    value="0"
                                    name={`member_detail.${index}.infected_by_epidemic`}
                                    checked={
                                      member.infected_by_epidemic === "0"
                                    }
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "infected_by_epidemic"
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
                          {errors?.member_detail?.[index]
                            ?.infected_by_epidemic ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {member.infected_by_epidemic === "1" && (
                      <>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.epidemic_name`}
                          >
                            <Form.Label className="require">
                              हो भने महामारीको नाम
                            </Form.Label>
                            <Form.Control
                              name={`member_detail.${index}.epidemic_name`}
                              value={member.epidemic_name}
                              as="select"
                              className={
                                errors.member_detail?.[index]?.epidemic_name
                                  ? "is-invalid"
                                  : null
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option key={`epidemic_name-`}>
                                -- चयन गर्नुहोस् --
                              </option>
                              {Object.keys(editorConfig.epidemic_name).map(
                                (key) => (
                                  <option
                                    key={`epidemic_name-${key}`}
                                    value={key}
                                  >
                                    {editorConfig.epidemic_name[key]}
                                  </option>
                                )
                              )}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]?.epidemic_name ??
                                ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.infected_date`}
                          >
                            <Form.Label className="require">
                              संक्रमित भएको मिती
                            </Form.Label>
                            <NepaliDatePicker
                              className="form-control"
                              defaultDate={member.infected_date ?? true}
                              onDateSelect={(date) =>
                                onDateSelect(
                                  date,
                                  index,
                                  editData,
                                  setValues,
                                  "infected_date"
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.observed_symptoms`}
                          >
                            <Form.Label className="require">
                              देखा परेका लक्षणहरु
                            </Form.Label>
                            <Form.Control
                              name={`member_detail.${index}.observed_symptoms`}
                              value={member.observed_symptoms}
                              as="select"
                              onChange={handleChange}
                              className={
                                errors.member_detail?.[index]?.observed_symptoms
                                  ? "is-invalid"
                                  : null
                              }
                              onBlur={handleBlur}
                            >
                              <option key={`observed_symptoms-`} value="">
                                -- चयन गर्नुहोस् --
                              </option>
                              {Object.keys(editorConfig.observed_symptoms).map(
                                (key) => (
                                  <option
                                    key={`observed_symptoms-${key}`}
                                    value={key}
                                  >
                                    {editorConfig.observed_symptoms[key]}
                                  </option>
                                )
                              )}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]
                                ?.observed_symptoms ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.living_place_after_infection`}
                          >
                            <Form.Label className="require">
                              संक्रमण पश्चात् कहाँ बस्नुभएको थियो?
                            </Form.Label>
                            <Field
                              name={`member_detail.${index}.living_place_after_infection`}
                            >
                              {({ field }) => (
                                <>
                                  <Form.Control
                                    {...field}
                                    name={`member_detail.${index}.living_place_after_infection`}
                                    value={member.living_place_after_infection}
                                    as="select"
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "living_place_after_infection"
                                      )
                                    }
                                    className={
                                      errors.member_detail?.[index]
                                        ?.living_place_after_infection
                                        ? "is-invalid"
                                        : null
                                    }
                                    onBlur={handleBlur}
                                  >
                                    <option
                                      key={`living_place_after_infection-`}
                                      value=""
                                    >
                                      -- चयन गर्नुहोस् --
                                    </option>
                                    {Object.keys(
                                      editorConfig.living_place_after_infection
                                    ).map((key) => (
                                      <option
                                        key={`living_place_after_infection-${key}`}
                                        value={key}
                                      >
                                        {
                                          editorConfig
                                            .living_place_after_infection[key]
                                        }
                                      </option>
                                    ))}
                                  </Form.Control>
                                </>
                              )}
                            </Field>
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]
                                ?.living_place_after_infection ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        {member.living_place_after_infection === "अस्पताल" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.treatment_room`}
                              >
                                <Form.Label className="require">
                                  अस्पतालमा बसेको भए कुन कक्षमा उपचार गराउनु
                                  पर्‍यो /परेन ?
                                </Form.Label>
                                <Form.Control
                                  name={`member_detail.${index}.treatment_room`}
                                  value={member.treatment_room}
                                  as="select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option key={`treatment_room-`} value="">
                                    -- चयन गर्नुहोस् --
                                  </option>
                                  {Object.keys(editorConfig.treatment_room).map(
                                    (key) => (
                                      <option
                                        key={`treatment_room-${key}`}
                                        value={key}
                                      >
                                        {editorConfig.treatment_room[key]}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.treatment_room ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.hospital_discharged_in_how_many_days`}
                              >
                                <Form.Label className="require">
                                  अस्पतालबाट कति दिनमा डिस्चार्ज हुनु भयो ?
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  name={`member_detail.${index}.hospital_discharged_in_how_many_days`}
                                  value={
                                    member.hospital_discharged_in_how_many_days
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.member_detail?.[index]
                                      ?.hospital_discharged_in_how_many_days
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.hospital_discharged_in_how_many_days ??
                                    ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.oxygen_support_needed_for_treatment`}
                          >
                            <Form.Label className="theme-radio_label require">
                              उपचारको लागि अक्सिजन समर्थन चाहियो?
                            </Form.Label>
                            <div className="d-flex theme-radio">
                              <Form.Check
                                type="radio"
                                id="oxygen_support_needed_for_treatment-1"
                                value="1"
                                label="हो"
                                name={`member_detail.${index}.oxygen_support_needed_for_treatment`}
                                checked={
                                  member.oxygen_support_needed_for_treatment ===
                                  "1"
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="me-4"
                              />
                              <Form.Check
                                type="radio"
                                id="oxygen_support_needed_for_treatment-0"
                                label="हैन"
                                value="0"
                                name={`member_detail.${index}.oxygen_support_needed_for_treatment`}
                                checked={
                                  member.oxygen_support_needed_for_treatment ===
                                  "0"
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="me-4"
                              />
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]
                                ?.oxygen_support_needed_for_treatment ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </>
                    )}
                    <Col lg={8} xl={12}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.vaccine_against_covid`}
                      >
                        <div
                          className={`theme-radio d-flex  ${
                            errors.member_detail?.[index]?.vaccine_against_covid
                              ? "is-invalid"
                              : null
                          }`}
                        >
                          <Form.Label className="theme-radio_label require">
                            कोभिड १९ विरुद्ध खोप लगाइयो ?
                          </Form.Label>
                          <div className="d-flex">
                            <Field
                              name={`member_detail.${index}.vaccine_against_covid`}
                            >
                              {({ field }) => (
                                <>
                                  <Form.Check
                                    {...field}
                                    type="radio"
                                    id="vaccine_against_covid-1"
                                    value="1"
                                    label="छ"
                                    name={`member_detail.${index}.vaccine_against_covid`}
                                    checked={
                                      member.vaccine_against_covid === "1"
                                    }
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "vaccine_against_covid"
                                      )
                                    }
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                  <Form.Check
                                    {...field}
                                    type="radio"
                                    id="vaccine_against_covid-0"
                                    label="छैन"
                                    value="0"
                                    name={`member_detail.${index}.vaccine_against_covid`}
                                    checked={
                                      member.vaccine_against_covid === "0"
                                    }
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "vaccine_against_covid"
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
                          {errors?.member_detail?.[index]
                            ?.vaccine_against_covid ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {member.vaccine_against_covid === "1" && (
                      <>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.which_dose`}
                          >
                            <Form.Label className="require">
                              छ भने कुन डोज लिएको छ?
                            </Form.Label>
                            <div
                              className={`theme-radio d-flex  ${
                                errors.member_detail?.[index]?.which_dose
                                  ? "is-invalid"
                                  : null
                              }`}
                            >
                              {Object.keys(editorConfig.which_dose).map(
                                (key) => (
                                  <Form.Check
                                    type="radio"
                                    key={`member_detail.${index}.which_dose-${key}`}
                                    id={`member_detail.${index}.which_dose-${key}`}
                                    value={key}
                                    checked={key === member.which_dose}
                                    label={editorConfig.which_dose[key]}
                                    name={`member_detail.${index}.which_dose`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                )
                              )}
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]?.which_dose ?? ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col lg={6} xl={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.vaccine_name`}
                          >
                            <Form.Label className="require">
                              खोपको नाम
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name={`member_detail.${index}.vaccine_name`}
                              value={member.vaccine_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.member_detail?.[index]?.vaccine_name
                                  ? "is-invalid"
                                  : null
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors?.member_detail?.[index]?.vaccine_name ??
                                ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </>
                    )}
                    <Col lg={8} xl={12}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.health_insurance`}
                      >
                        <div
                          className={`theme-radio d-flex ${
                            errors.member_detail?.[index]?.health_insurance
                              ? "is-invalid"
                              : null
                          }`}
                        >
                          <Form.Label className="theme-radio_label require">
                            स्वास्थ्य विमा गरेको छ कि छैन ?
                          </Form.Label>
                          <div className="d-flex">
                            <Form.Check
                              type="radio"
                              id="health_insurance-1"
                              value="1"
                              label="छ"
                              name={`member_detail.${index}.health_insurance`}
                              checked={member.health_insurance === "1"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-4"
                            />
                            <Form.Check
                              type="radio"
                              id="health_insurance-0"
                              label="छैन"
                              value="0"
                              name={`member_detail.${index}.health_insurance`}
                              checked={member.health_insurance === "0"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="me-4"
                            />
                          </div>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors?.member_detail?.[index]?.health_insurance ??
                            ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={8} xl={12}>
                      <Form.Group
                        className="mb-3"
                        controlId={`member_detail.${index}.is_bank_account_exist`}
                      >
                        <div
                          className={`theme-radio d-flex  ${
                            errors.member_detail?.[index]?.is_bank_account_exist
                              ? "is-invalid"
                              : null
                          }`}
                        >
                          <Form.Label className="theme-radio_label require">
                            बैंक तथा वित्तिय संस्थामा खाता छ कि छैन ?
                          </Form.Label>
                          <div className="d-flex">
                            <Field
                              name={`member_detail.${index}.is_bank_account_exist`}
                            >
                              {({ field }) => (
                                <>
                                  <Form.Check
                                    {...field}
                                    type="radio"
                                    id="is_bank_account_exist-1"
                                    value="1"
                                    label="छ"
                                    name={`member_detail.${index}.is_bank_account_exist`}
                                    checked={
                                      member.is_bank_account_exist === "1"
                                    }
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "is_bank_account_exist"
                                      )
                                    }
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                  <Form.Check
                                    {...field}
                                    type="radio"
                                    id="is_bank_account_exist-0"
                                    label="छैन"
                                    value="0"
                                    name={`member_detail.${index}.is_bank_account_exist`}
                                    checked={
                                      member.is_bank_account_exist === "0"
                                    }
                                    onChange={(e) =>
                                      onToggleValues(
                                        e,
                                        index,
                                        field,
                                        editData,
                                        setValues,
                                        "is_bank_account_exist"
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
                          {errors?.member_detail?.[index]
                            ?.is_bank_account_exist ?? ""}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {member.is_bank_account_exist === "1" && (
                      <Col lg={6} xl={8}>
                        <Form.Group
                          className="mb-3"
                          controlId={`member_detail.${index}.bank_institution_name`}
                        >
                          <Form.Label className="require">
                            छ भने बैंक तथा वित्तिय संस्थाको नाम
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name={`member_detail.${index}.bank_institution_name`}
                            value={member.bank_institution_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.member_detail?.[index]
                                ?.bank_institution_name
                                ? "is-invalid"
                                : null
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors?.member_detail?.[index]
                              ?.bank_institution_name ?? ""}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    )}

                    {member.death_status !== null && (
                      <>
                        <Col lg={8} xl={12}>
                          <Form.Group
                            className="mb-3"
                            controlId={`member_detail.${index}.death_status`}
                          >
                            <div
                              className={`theme-radio d-flex  ${
                                errors.member_detail?.[index]?.death_status
                                  ? "is-invalid"
                                  : null
                              }`}
                            >
                              <Form.Label className="theme-radio_label">
                                सदस्यको मृत्यु भएको हो ?
                              </Form.Label>
                              <div className="d-flex">
                                <Field
                                  name={`member_detail.${index}.death_status`}
                                >
                                  {({ field }) => (
                                    <>
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="death_status-1"
                                        value="1"
                                        label="हो"
                                        name={`member_detail.${index}.death_status`}
                                        checked={member.death_status === "1"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "death_status"
                                          )
                                        }
                                        onBlur={handleBlur}
                                        className="me-4"
                                      />
                                      <Form.Check
                                        {...field}
                                        type="radio"
                                        id="death_status-0"
                                        label="हैन"
                                        value="0"
                                        name={`member_detail.${index}.death_status`}
                                        checked={member.death_status === "0"}
                                        onChange={(e) =>
                                          onToggleValues(
                                            e,
                                            index,
                                            field,
                                            editData,
                                            setValues,
                                            "death_status"
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
                              {errors?.member_detail?.[index]?.death_status ??
                                ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        {member.death_status === "1" && (
                          <>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.age_when_death`}
                              >
                                <Form.Label className="require">
                                  मत्यृ हुँदाको उमेर
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  name={`member_detail.${index}.age_when_death`}
                                  value={member.age_when_death}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.member_detail?.[index]
                                      ?.age_when_death
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.age_when_death ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.death_reason`}
                              >
                                <Form.Label className="require">
                                  मत्यृको कारण
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.death_reason`}
                                  value={member.death_reason}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.member_detail?.[index]?.death_reason
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.death_reason ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.death_disease`}
                              >
                                <Form.Label>रोग</Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`member_detail.${index}.death_disease`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors?.member_detail?.[index]
                                      ?.death_disease
                                      ? "is-invalid"
                                      : null
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.death_disease ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.death_certificate`}
                              >
                                <Form.Label className="require">
                                  मृत्यु दर्ता भएको छ/छैन ?
                                </Form.Label>
                                <div
                                  className={`theme-radio d-flex ${
                                    errors?.member_detail?.[index]
                                      ?.death_certificate
                                      ? "is-invalid"
                                      : null
                                  }`}
                                >
                                  <Form.Check
                                    type="radio"
                                    id={`member_detail.${index}.death_certificate-1`}
                                    label="छ"
                                    name={`member_detail.${index}.death_certificate`}
                                    value="1"
                                    checked={member.death_certificate === "1"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                  <Form.Check
                                    type="radio"
                                    id={`member_detail.${index}.death_certificate-0`}
                                    label="छैन"
                                    name={`member_detail.${index}.death_certificate`}
                                    value="0"
                                    checked={member.death_certificate === "0"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.death_certificate ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.is_pregnant_woman`}
                              >
                                <Form.Label className="require">
                                  गभवती महिला हो/होइन ?
                                </Form.Label>
                                <div
                                  className={`theme-radio d-flex ${
                                    errors?.member_detail?.[index]
                                      ?.is_pregnant_woman
                                      ? "is-invalid"
                                      : null
                                  }`}
                                >
                                  <Form.Check
                                    type="radio"
                                    id={`member_detail.${index}.is_pregnant_woman-1`}
                                    label="छ"
                                    name={`member_detail.${index}.is_pregnant_woman`}
                                    value="1"
                                    checked={member.is_pregnant_woman === "1"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                  <Form.Check
                                    type="radio"
                                    id={`member_detail.${index}.is_pregnant_woman-0`}
                                    label="छैन"
                                    name={`member_detail.${index}.is_pregnant_woman`}
                                    value="0"
                                    checked={member.is_pregnant_woman === "0"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.is_pregnant_woman ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col lg={6} xl={4}>
                              <Form.Group
                                className="mb-3"
                                controlId={`member_detail.${index}.is_infant_child`}
                              >
                                <Form.Label className="require">
                                  नवजात शिश हो/होइन ?
                                </Form.Label>
                                <div
                                  className={`theme-radio d-flex ${
                                    errors?.member_detail?.[index]
                                      ?.is_infant_child
                                      ? "is-invalid"
                                      : null
                                  }`}
                                >
                                  <Form.Check
                                    type="radio"
                                    id={`member_detail.${index}.is_infant_child-1`}
                                    label="छ"
                                    name={`member_detail.${index}.is_infant_child`}
                                    value="1"
                                    checked={member.is_infant_child === "1"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                  <Form.Check
                                    type="radio"
                                    id={`member_detail.${index}.is_infant_child-0`}
                                    label="छैन"
                                    name={`member_detail.${index}.is_infant_child`}
                                    value="0"
                                    checked={member.is_infant_child === "0"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="me-4"
                                  />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                  {errors?.member_detail?.[index]
                                    ?.is_infant_child ?? ""}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </>
                        )}
                      </>
                    )}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}

          <Button
            className="btn-lg me-3"
            onClick={() =>
              addFamilyMember(editData, setValues, editorConfig.member_detail)
            }
          >
            <i className="fa-solid fa-plus"></i>
          </Button>
        </div>
      </div>
    </>
  );
}
export default FamilyDetailTab;
