import React from "react";
import { Navigate } from "react-router";
import { Form, Button, Nav, Tab, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import AgricultureTab from "./edit-tabs/Agriculture.tab";
import DeathMemberDetailTab from "./edit-tabs/DeathMemberDetail.tab";
import EthnicDetailTab from "./edit-tabs/EthnicDetail.tab";
import FamilyDetailTab from "./edit-tabs/FamilyDetail.tab";
import FarmingTab from "./edit-tabs/Farming.tab";
import HealthRelatedTab from "./edit-tabs/HealthRelated.tab";
import HouseHoldDetailTab from "./edit-tabs/HouseHoldDetail.tab";
import HouseRelatedDetailTab from "./edit-tabs/HouseRelatedDetail.tab";
import FacilitiesTab from "./edit-tabs/Facilities.tab";
import BankAndFinancialTab from "./edit-tabs/BankAndFinancial.tab";
import { contactSchemaPersonal, contactSchemaOrg } from "./validation";
import { toggleUpdateSuccess } from "../../../redux/customer-service/customer-service.actions";
import { animateScroll as scroll } from "react-scroll";
import Loader from "../../loader/loader.component";
import agent from "../../../agent";
import "./editform.styles.scss";

class EditHouseholdInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorConfig: null,
      editData: null,
      updateSuccess: false,
      isLoading: false,
      isCheckOrgBuildType: false,
      checkErr: {
        houseDetail: [
          "area_name",
          "street_name",
          "house_ownership",
          "house_owner_name",
          "organizational_ownerships_type",
          "more_than_one_family",
          "number_of_families",
          "if_other_house_ownership",
          "use_of_building",
          "road_surface_type",
        ],
        familyDetail: [
          "family_head_name",
          "family_head_name_en",
          "fathers_name",
          "mothers_name",
          "grandfathers_name",
          "grandmothers_name",
          "phone_no",
          "local_resident",
          "shifted_from_district",
          "shifted_date",
          "living_persons_no",
          "total_family_member",
          "member_detail",
        ],
        member_detail: [
          "id",
          "first_name",
          "middle_name",
          "last_name",
          "name_en",
          "gender",
          "relation_with_house_owner",
          "blood_group",
          "mobile_number",
          "email",
          "dob",
          "age",
          "citizenship",
          "citizenship_number",
          "citizenship_issue_date",
          "citizenship_issued_district",
          "reason_if_no_citizenship",
          "national_id_card",
          "national_id_card_number",
          "national_id_card_issue_date",
          "passport",
          "passport_number",
          "passport_issue_place",
          "passport_issue_date",
          "passport_deadline_date",
          "pan",
          "pan_number",
          "social_security_fund_id_card",
          "social_security_fund_id_card_number",
          "driver_license",
          "driver_license_number",
          "driver_license_issue_date",
          "driver_license_expiry_date",
          "driver_license_category",
          "voters_id_card_number",
          "voting_place",
          "education_qualification",
          "reason_for_leaving_school",
          "faculty_of_study",
          "passed_date",
          "qualification_assessment_type",
          "scored_gpa_marks",
          "studied_institution",
          "marital_status",
          "occupation",
          "government_job_type",
          "government_job_post",
          "retired_or_reinstated",
          "post",
          "office",
          "work_experience_year",
          "residence_condition",
          "if_living_in_other_part_of_country_local_level_name",
          "for_living_in_other_place",
          "country_if_living_abroad",
          "reason_for_going_abroad",
          "subject_of_study",
          "which_employment",
          "foreign_employment_returned",
          "foreign_employment_country",
          "foreign_employment_occupation",
          "work_period",
          "skill_training",
          "training_period",
          "training_year",
          "disability_condition",
          "health_condition",
          "disease_name",
          "interested_area",
          "infected_by_epidemic",
          "epidemic_name",
          "infected_date",
          "observed_symptoms",
          "living_place_after_infection",
          "treatment_room",
          "hospital_discharged_in_how_many_days",
          "oxygen_support_needed_for_treatment",
          "vaccine_against_covid",
          "which_dose",
          "vaccine_name",
          "health_insurance",
          "is_bank_account_exist",
          "bank_institution_name",
        ],
        deathMember: [
          "death_member_in_last_1_year",
          "how_many_death_members",
          "death_detail",
        ],
        deathDetail: [
          "first_name",
          "middle_name",
          "last_name",
          "relation_with_family_head",
          "gender",
          "age_when_death",
          "death_reason",
          "disease",
          "death_certificate",
          "is_pregnant_woman",
          "is_infant_child",
        ],
        healthRelated: ["vaccine_type"],
        agriculture: [
          "used_land_for_agriculture",
          "land_in_family_name",
          "land_in_family_name_aana",
          "land_with_other_people_ownership",
          "land_in_other_person_name",
          "land_in_other_person_name_aana",
          "how_much_land_has_irrigation_facility",
        ],
        farming: [
          "quadruped_and_livestock_farming",
          "if_fish_bee_silk_rearing_done",
          "pond_area",
        ],
        houseRelated: [
          "disaster_name",
          "estimated_destruction",
          "male_members",
          "female_members",
          "rented_by",
          "used_for",
          "number_of_rooms",
          "agreement_period",
          "start_date",
          "rent_period",
          "rent_money_monthly",
        ],
        facilites: [
          "water_purification_before_drinking",
          "purification_method",
          "electricity_main_source",
          "electricity_meter_connected_in_home",
          "not_using_electricity_reason",
          "if_no_drainage_system_how_to_manage_waste",
        ],
      },
    };
    this.state.position = 1;
    this.state.lenght = 10;
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  async componentDidMount() {
    const editorConfig = await agent.publicDigitalData.getEditConfigData();
    const editData = await agent.publicDigitalData.getEditData();
    this.setState({
      editorConfig: editorConfig,
      editData: editData,
      isCheckOrgBuildType: ["संस्थागत", "संयुक्त आवास", "अन्य"].includes(
        editData.house_ownership
      ),
    });
  }

  updateValidation = (type) => {
    this.setState({
      isCheckOrgBuildType: ["संस्थागत", "संयुक्त आवास", "अन्य"].includes(type),
    });
  };

  positionChange = (position) => {
    this.setState({ position: position });
  };

  positionChangeBackBtn = (e, position) => {
    e.preventDefault();
    this.setState({ position: position });
  };

  positionChangeFrontBtn = (e, position, errors, validateForm) => {
    e.preventDefault();
    validateForm();

    if (
      (position === 1 &&
        !Object.keys(errors).some((key) =>
          this.state.checkErr.houseDetail.includes(key)
        )) ||
      (position === 2 &&
        !Object.keys(errors).some((key) =>
          this.state.checkErr.familyDetail.includes(key)
        )) ||
      (position === 4 &&
        !Object.keys(errors).some((key) =>
          this.state.checkErr.deathMember.includes(key)
        )) ||
      (position === 5 &&
        !Object.keys(errors).some((key) =>
          this.state.checkErr.healthRelated.includes(key)
        )) ||
      (position === 6 &&
        !Object.keys(errors).some((key) =>
          this.state.checkErr.agriculture.includes(key)
        )) ||
      (position === 7 &&
        !Object.keys(errors).some((key) =>
          this.state.checkErr.farming.includes(key)
        )) ||
      (position === 8 &&
        !Object.keys(errors).some((key) =>
          this.state.checkErr.houseRelated.includes(key)
        )) ||
      (position === 9 &&
        !Object.keys(errors).some((key) =>
          this.state.checkErr.facilites.includes(key)
        )) ||
      position === 3
    ) {
      this.setState({ position: position + 1 });
    }
  };

  onSubmit = async (values, { setFieldError }) => {
    const { toggleUpdateSuccess } = this.props;
    const res = await agent.publicDigitalData.putHomeSurvey(values);
    if (res.errors === undefined) {
      this.setState({
        updateSuccess: true,
      });
      toggleUpdateSuccess(true);
    } else {
      res.errors.forEach((err) => {
        setFieldError(err.code, err.detail);
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      editData: {
        ...prevState.editData,
        [name]: value,
      },
    }));
  };

  getYear = () => {
    const output = [];
    for (let i = 1950; i <= 2079; i++) {
      output.push(
        <option key={`shifted_date-${i}`} value={i}>
          {i}
        </option>
      );
    }
    return output;
  };

  getWard = () => {
    const output = [];
    for (let i = 1; i <= 15; i++) {
      output.push(
        <option key={`get-ward-${i}`} value={i}>
          {i}
        </option>
      );
    }
    return output;
  };

  scrollToTop() {
    scroll.scrollToTop();
  }

  render() {
    const { position, editorConfig, editData, isCheckOrgBuildType, checkErr } =
      this.state;
    return (
      <div className="right-content">
        {this.state.updateSuccess && (
          <Navigate
            to="/customer-service/household-information"
            replace={true}
            success={true}
          />
        )}

        {editorConfig && editData ? (
          <div className="form-tabs">
            {editData !== null && editorConfig !== null && (
              <Formik
                initialValues={editData}
                validationSchema={
                  isCheckOrgBuildType ? contactSchemaOrg : contactSchemaPersonal
                }
                onSubmit={this.onSubmit}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  validateForm,
                  setValues,
                  isSubmitting,
                }) => (
                  <Form className="form-lg" onSubmit={handleSubmit}>
                    {this.state.isLoading === true && (
                      <div className="form-loader"></div>
                    )}
                    <Tab.Container id="left-tabs-example" defaultActiveKey={1}>
                      <Nav variant="pills">
                        <Nav.Item>
                          <Nav.Link
                            className={`${position >= 1 ? "active" : ""}`}
                            onClick={() => this.positionChange(1)}
                          >
                            <span
                              className={
                                Object.keys(errors).some((key) =>
                                  checkErr.houseDetail.includes(key)
                                )
                                  ? "error"
                                  : null
                              }
                            >
                              1
                            </span>
                            घर सर्वेक्षण विवरणहरू
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            className={`${
                              isCheckOrgBuildType
                                ? "disabled"
                                : position >= 2
                                ? "active"
                                : ""
                            }`}
                            onClick={() => this.positionChange(2)}
                          >
                            <span
                              className={
                                Object.keys(errors).some((key) =>
                                  checkErr.familyDetail.includes(key)
                                )
                                  ? "error"
                                  : null
                              }
                            >
                              2
                            </span>
                            परिवार सम्वन्धी विवरण
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            className={`${
                              isCheckOrgBuildType
                                ? "disabled"
                                : position >= 3
                                ? "active"
                                : ""
                            }`}
                            onClick={() => this.positionChange(3)}
                          >
                            <span>3</span>
                            जातीय विवरण
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            className={`${
                              isCheckOrgBuildType
                                ? "disabled"
                                : position >= 4
                                ? "active"
                                : ""
                            }`}
                            onClick={() => this.positionChange(4)}
                          >
                            <span
                              className={
                                Object.keys(errors).some((key) =>
                                  checkErr.deathMember.includes(key)
                                )
                                  ? "error"
                                  : null
                              }
                            >
                              4
                            </span>
                            मृतक सदस्य विवरण
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            className={`${
                              isCheckOrgBuildType
                                ? "disabled"
                                : position >= 5
                                ? "active"
                                : ""
                            }`}
                            onClick={() => this.positionChange(5)}
                          >
                            <span
                              className={
                                Object.keys(errors).some((key) =>
                                  checkErr.healthRelated.includes(key)
                                )
                                  ? "error"
                                  : null
                              }
                            >
                              5
                            </span>
                            स्वास्थ्य सम्बन्धित
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            className={`${
                              isCheckOrgBuildType
                                ? "disabled"
                                : position >= 6
                                ? "active"
                                : ""
                            }`}
                            onClick={() => this.positionChange(6)}
                          >
                            <span
                              className={
                                Object.keys(errors).some((key) =>
                                  checkErr.agriculture.includes(key)
                                )
                                  ? "error"
                                  : null
                              }
                            >
                              6
                            </span>
                            कृषि
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            className={`${
                              isCheckOrgBuildType
                                ? "disabled"
                                : position >= 7
                                ? "active"
                                : ""
                            }`}
                            onClick={() => this.positionChange(7)}
                          >
                            <span
                              className={
                                Object.keys(errors).some((key) =>
                                  checkErr.farming.includes(key)
                                )
                                  ? "error"
                                  : null
                              }
                            >
                              7
                            </span>
                            खेती
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            className={`${
                              isCheckOrgBuildType
                                ? "disabled"
                                : position >= 8
                                ? "active"
                                : ""
                            }`}
                            onClick={() => this.positionChange(8)}
                          >
                            <span
                              className={
                                Object.keys(errors).some((key) =>
                                  checkErr.houseRelated.includes(key)
                                )
                                  ? "error"
                                  : null
                              }
                            >
                              8
                            </span>
                            घर सम्बन्धित विवरण
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            className={`${
                              isCheckOrgBuildType
                                ? "disabled"
                                : position >= 9
                                ? "active"
                                : ""
                            }`}
                            onClick={() => this.positionChange(9)}
                          >
                            <span
                              className={
                                Object.keys(errors).some((key) =>
                                  checkErr.facilites.includes(key)
                                )
                                  ? "error"
                                  : null
                              }
                            >
                              9
                            </span>
                            सुविधा
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            className={`${
                              isCheckOrgBuildType
                                ? "disabled"
                                : position >= 10
                                ? "active"
                                : ""
                            }`}
                            onClick={() => this.positionChange(10)}
                          >
                            <span>10</span>
                            बैंक र वित्तीय विवरण
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content className="sub-main bordered">
                        {Object.keys(errors).length > 0 && (
                          <Alert variant="danger">
                            कृपया सबै आवश्यक क्षेत्रहरू भर्नुहोस्
                          </Alert>
                        )}
                        <Tab.Pane
                          className={`${position === 1 ? "active show" : ""}`}
                        >
                          <HouseHoldDetailTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            setValues={setValues}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            updateValidation={this.updateValidation}
                            errors={errors}
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          className={`${position === 2 ? "active show" : ""}`}
                        >
                          <FamilyDetailTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            setValues={setValues}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                            getYear={this.getYear}
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          className={`${position === 3 ? "active show" : ""}`}
                        >
                          <EthnicDetailTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          className={`${position === 4 ? "active show" : ""}`}
                        >
                          <DeathMemberDetailTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            setValues={setValues}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          className={`${position === 5 ? "active show" : ""}`}
                        >
                          <HealthRelatedTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            setValues={setValues}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          className={`${position === 6 ? "active show" : ""}`}
                        >
                          <AgricultureTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            setValues={setValues}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                            getWard={this.getWard}
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          className={`${position === 7 ? "active show" : ""}`}
                        >
                          <FarmingTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            setValues={setValues}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          className={`${position === 8 ? "active show" : ""}`}
                        >
                          <HouseRelatedDetailTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            setValues={setValues}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                            getYear={this.getYear}
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          className={`${position === 9 ? "active show" : ""}`}
                        >
                          <FacilitiesTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            setValues={setValues}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                          />
                        </Tab.Pane>
                        <Tab.Pane
                          className={`${position === 10 ? "active show" : ""}`}
                        >
                          <BankAndFinancialTab
                            editorConfig={editorConfig.config_data}
                            editData={values}
                            setValues={setValues}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            errors={errors}
                          />
                        </Tab.Pane>
                        <div className="text-end">
                          {isCheckOrgBuildType !== true && (
                            <>
                              <Nav.Link
                                as="button"
                                bsPrefix="1"
                                className="btn-lg me-3  btn btn-primary"
                                onClick={(e) =>
                                  this.positionChangeBackBtn(e, position - 1)
                                }
                                disabled={position === 1}
                              >
                                <i className="fa-solid fa-arrow-left"></i>
                              </Nav.Link>
                              <Nav.Link
                                as="button"
                                bsPrefix="1"
                                className="btn-lg me-3  btn btn-primary"
                                onClick={(e) => {
                                  this.positionChangeFrontBtn(
                                    e,
                                    position,
                                    errors,
                                    validateForm
                                  );
                                }}
                                disabled={position === this.state.lenght}
                              >
                                <i className="fa-solid fa-arrow-right"></i>
                              </Nav.Link>
                            </>
                          )}
                          <Button
                            className="btn-lg  me-3 "
                            type="submit"
                            onClick={this.scrollToTop}
                            disabled={isSubmitting}
                          >
                            अपडेट गर्नुहोस्
                          </Button>
                          <Link to="/customer-service/household-information">
                            <Button variant="warning" className="btn-lg">
                              <p>रद्द गर्नुहोस्</p>
                            </Button>
                          </Link>
                        </div>
                      </Tab.Content>
                    </Tab.Container>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleUpdateSuccess: (customerService) =>
    dispatch(toggleUpdateSuccess(customerService)),
});

export default connect(null, mapDispatchToProps)(EditHouseholdInfoComponent);
