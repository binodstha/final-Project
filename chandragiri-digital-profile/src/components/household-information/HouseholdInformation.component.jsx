import React, { useEffect, useRef, useState } from "react";
import { Button, Alert, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { createStructuredSelector } from "reselect";
import {
  setCustomerHouseholdInformation,
  setCustomerUpdatedHouseholdInformation,
  toggleUpdateSuccess,
  updateViewedStatus,
} from "../../redux/customer-service/customer-service.actions";
import {
  selectCustomerServiceHouseholdInfo,
  selectCustomerServiceUpdatedHouseholdInfo,
  selectUpdateSuccess,
} from "../../redux/customer-service/customer-service.selectors";
import { HouseholdDetail } from "./HouseholdDetail.component";
import Helper from "../../utils/helper";
import agent from "../../agent";
import "./home-survey.styles.scss";

function HouseholdInformation({
  customerHouseholdInformation,
  customerUpdatedHouseholdInformation,
  householdInfo,
  updateStatus,
  toggleUpdateSuccess,
  updatedHouseholdInfo,
  updateViewedStatus,
}) {
  useEffect(() => {
    const fetchData = async () => {
      customerUpdatedHouseholdInformation(
        await agent.publicDigitalData.getUpdateRequestData()
      );
      customerHouseholdInformation(
        await agent.publicDigitalData.getHomeSurvey()
      );
    };
    fetchData();
  }, []);
  const componentRef = useRef();

  const [showUpdatedData, setShowUpdatedData] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "household-detail",
  });

  const toggleShowStatus = async () => {
    const status = await agent.publicDigitalData.getUpdatedRequestStatus();
    if (status?.updated_status !== undefined)
      updateViewedStatus(status?.updated_status);
  };

  return (
    <div className="right-content">
      <div className="sub-main" id="home-survey-detail">
        {householdInfo && (
          <>
            {updateStatus && (
              <Col lg={6}>
                <Alert
                  variant="success"
                  onClose={() => toggleUpdateSuccess(false)}
                  dismissible
                >
                  <p>
                    <strong>Success!</strong>&nbsp;&nbsp;Successfully submitted your
                    request. Your request is processing.
                  </p>
                </Alert>
              </Col>
            )}
            {householdInfo.status !== null &&
              !householdInfo.updated_data_is_viewed && (
                <Col lg={6}>
                  <Alert
                    variant={
                      householdInfo.status === "verified"
                        ? "success"
                        : householdInfo.status === "pending"
                        ? "primary"
                        : "danger"
                    }
                    onClose={toggleShowStatus}
                    dismissible={householdInfo.status !== "pending"}
                  >
                    <p>
                      <strong>
                        {Helper.titleFormatter(householdInfo.status)} !
                      </strong>
                      &nbsp;&nbsp;Update Request is {householdInfo.status}.
                    </p>
                  </Alert>
                </Col>
              )}
            <div className="download-btn d-flex">
              {!showUpdatedData && (
                <>
                  {householdInfo.is_enable_household_edit && (
                    <Link
                      to={"/customer-service/household-information/edit"}
                      className="me-3 btn btn-primary d-flex justify-content-center align-items-center"
                    >
                      <i className="fa-solid fa-pen-to-square me-2"></i>सम्पादन
                      गर्नुहोस्
                    </Link>
                  )}
                  <Button onClick={handlePrint} className="me-3">
                    <i className="fa-solid fa-download"></i>डाउनलोड गर्नुहोस्
                  </Button>
                </>
              )}
              {householdInfo.status === "pending" && (
                <Button
                  onClick={() => setShowUpdatedData(!showUpdatedData)}
                  className="btn-warning"
                >
                  <i className="fa-solid fa-refresh me-2"></i>अद्यावधिक डाटा
                  {showUpdatedData ? "लुकाउनुहोस्" : "देखाउनुहोस्"}
                </Button>
              )}
            </div>
          </>
        )}
        <HouseholdDetail
          ref={componentRef}
          householdInfo={showUpdatedData ? updatedHouseholdInfo : householdInfo}
          showUpdatedData={showUpdatedData}
        />
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  householdInfo: selectCustomerServiceHouseholdInfo,
  updatedHouseholdInfo: selectCustomerServiceUpdatedHouseholdInfo,
  updateStatus: selectUpdateSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  customerHouseholdInformation: (customerService) =>
    dispatch(setCustomerHouseholdInformation(customerService)),
  customerUpdatedHouseholdInformation: (customerService) =>
    dispatch(setCustomerUpdatedHouseholdInformation(customerService)),
  toggleUpdateSuccess: (customerService) =>
    dispatch(toggleUpdateSuccess(customerService)),
  updateViewedStatus: (customerService) =>
    dispatch(updateViewedStatus(customerService)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseholdInformation);
