import React from "react";
import { Col, Form, Row, Button } from "react-bootstrap";

function BankAndFinancialTab({
  editorConfig,
  editData,
  setValues,
  handleChange,
  handleBlur,
  errors,
}) {
  const totalIncome =
    Number(editData.agriculture_income) +
    Number(editData.business_income) +
    Number(editData.industry_income) +
    Number(editData.job_income) +
    Number(editData.foreign_employment) +
    Number(editData.rent_income) +
    Number(editData.enterprise_income) +
    Number(editData.other_income);

  const totalExpenses =
    Number(editData.food_expense) +
    Number(editData.education_expense) +
    Number(editData.health_expense) +
    Number(editData.tax_and_service_charge_payment_expense) +
    Number(editData.entertainment_and_travel_expense) +
    Number(editData.social_work_expense) +
    Number(editData.loan_payment_expense) +
    Number(editData.donation_payment_expense) +
    Number(editData.other_expenses);

  const addSavingDetail = (values, setValues) => {
    const saving_detail = [...values.saving_detail];
    saving_detail.push({
      saving_area: "",
      saving_amount: "",
    });
    setValues({ ...values, saving_detail });
  };
  const removeSavingDetail = (index, values, setValues) => {
    let saving_detail = [...values.saving_detail];
    saving_detail.splice(index, 1);
    setValues({ ...values, saving_detail });
  };

  const addInvestmentDetail = (values, setValues) => {
    const investment_detail = [...values.investment_detail];
    investment_detail.push({
      investment_area: "",
      investment_amount: "",
    });
    setValues({ ...values, investment_detail });
  };
  const removeInvestmentDetail = (index, values, setValues) => {
    let investment_detail = [...values.investment_detail];
    investment_detail.splice(index, 1);
    setValues({ ...values, investment_detail });
  };

  const addLoanDetail = (values, setValues) => {
    const loan_detail = [...values.loan_detail];
    loan_detail.push({
      loan_purpose: "",
      source_of_loan: "",
      loan_amount: "",
    });
    setValues({ ...values, loan_detail });
  };
  const removeLoanDetail = (index, values, setValues) => {
    let loan_detail = [...values.loan_detail];
    loan_detail.splice(index, 1);
    setValues({ ...values, loan_detail });
  };

  return (
    <>
      <div className="sub-main_title">
        <h2>आय सम्बन्धी विवरण</h2>
      </div>
      <div className="sub-main_body">
        <Row>
          <div className="mb-4 border-bottom">
            <Form.Label>आय स्रोत विवरण (वार्षिक)</Form.Label>
            <Col lg={7}>
              <Form.Label className="col-sm-4">आयका स्रोतहरु</Form.Label>
              <Form.Label className="col-sm-6">वार्षिक आय (हजारमा)</Form.Label>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="agriculture_income">
                <Form.Label className="col-sm-4">कृषि</Form.Label>
                <Form.Control
                  type="number"
                  name="agriculture_income"
                  value={editData.agriculture_income}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.agriculture_income ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="business_income">
                <Form.Label className="col-sm-4">ब्यापार</Form.Label>
                <Form.Control
                  type="number"
                  name="business_income"
                  value={editData.business_income}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.business_income ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="industry_income">
                <Form.Label className="col-sm-4">
                  उद्योग व्यापारमा सहभागिता
                </Form.Label>
                <Form.Control
                  type="number"
                  name="industry_income"
                  value={editData.industry_income}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.industry_income ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="job_income">
                <Form.Label className="col-sm-4">जागीर</Form.Label>
                <Form.Control
                  type="number"
                  name="job_income"
                  value={editData.job_income}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.job_income ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="foreign_employment">
                <Form.Label className="col-sm-4">
                  बैदेशिक रोजगारी (विप्रेषण)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="foreign_employment"
                  value={editData.foreign_employment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.foreign_employment ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="rent_income">
                <Form.Label className="col-sm-4">भाडा (बहाल)</Form.Label>
                <Form.Control
                  type="number"
                  name="rent_income"
                  value={editData.rent_income}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.rent_income ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="enterprise_income">
                <Form.Label className="col-sm-4">उद्यम</Form.Label>
                <Form.Control
                  type="number"
                  name="enterprise_income"
                  value={editData.enterprise_income}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.enterprise_income ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="other_income">
                <Form.Label className="col-sm-4">अन्य</Form.Label>
                <Form.Control
                  type="number"
                  name="other_income"
                  value={editData.other_income}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.other_income ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="total_income">
                <Form.Label className="col-sm-4">जम्मा</Form.Label>

                <Form.Control
                  type="number"
                  name="total_income"
                  disabled
                  value={totalIncome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.total_income ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
          </div>
          <div className="mb-4 border-bottom">
            <Form.Label>खर्च विवरण (वार्षिक)</Form.Label>
            <Col lg={7}>
              <Form.Label className="col-sm-4">खर्चका स्रोतहरु</Form.Label>
              <Form.Label className="col-sm-6">
                वार्षिक खर्च (हजारमा)
              </Form.Label>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="food_expense">
                <Form.Label className="col-sm-4">खाना</Form.Label>
                <Form.Control
                  type="number"
                  name="food_expense"
                  value={editData.food_expense}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.food_expense ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="education_expense">
                <Form.Label className="col-sm-4">शिक्षा</Form.Label>
                <Form.Control
                  type="number"
                  name="education_expense"
                  value={editData.education_expense}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.education_expense ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="health_expense">
                <Form.Label className="col-sm-4">स्वास्थ्य</Form.Label>
                <Form.Control
                  type="number"
                  name="health_expense"
                  value={editData.health_expense}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.health_expense ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group
                className="d-flex"
                controlId="tax_and_service_charge_payment_expense"
              >
                <Form.Label className="col-sm-4">
                  कर तथा सेवा शुल्क भुक्तानी
                </Form.Label>
                <Form.Control
                  type="number"
                  name="tax_and_service_charge_payment_expense"
                  value={editData.tax_and_service_charge_payment_expense}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.tax_and_service_charge_payment_expense
                      ? "is-invalid"
                      : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group
                className="d-flex"
                controlId="entertainment_and_travel_expense"
              >
                <Form.Label className="col-sm-4">मनोरञ्जन तथा भ्रमण</Form.Label>
                <Form.Control
                  type="number"
                  name="entertainment_and_travel_expense"
                  value={editData.entertainment_and_travel_expense}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.entertainment_and_travel_expense
                      ? "is-invalid"
                      : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="social_work_expense">
                <Form.Label className="col-sm-4">सामाजिक कार्य</Form.Label>
                <Form.Control
                  type="number"
                  name="social_work_expense"
                  value={editData.social_work_expense}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.social_work_expense ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="loan_payment_expense">
                <Form.Label className="col-sm-4">ऋण भुक्तानी</Form.Label>
                <Form.Control
                  type="number"
                  name="loan_payment_expense"
                  value={editData.loan_payment_expense}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.loan_payment_expense ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group
                className="d-flex"
                controlId="donation_payment_expense"
              >
                <Form.Label className="col-sm-4">दान</Form.Label>
                <Form.Control
                  type="number"
                  name="donation_payment_expense"
                  value={editData.donation_payment_expense}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.donation_payment_expense ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="other_expenses">
                <Form.Label className="col-sm-4">अन्य</Form.Label>
                <Form.Control
                  type="number"
                  name="other_expenses"
                  value={editData.other_expenses}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.other_expenses ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
            <Col lg={7}>
              <Form.Group className="d-flex" controlId="total_expenses">
                <Form.Label className="col-sm-4">जम्मा</Form.Label>
                <Form.Control
                  type="number"
                  name="total_expenses"
                  disabled
                  value={totalExpenses}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-sm-6 ${
                    errors.total_expenses ? "is-invalid" : null
                  }`}
                />
              </Form.Group>
            </Col>
          </div>
          <div className="mb-4 border-bottom">
            <Form.Label>बचत सम्बन्धी विवरण</Form.Label>
            <Col lg={10}>
              <Form.Label className="col-sm-6">बचतको क्षेत्र</Form.Label>
              <Form.Label className="col-sm-5">रकम (रु. हजारमा)</Form.Label>
            </Col>

            {editData.saving_detail.map((el, index) => (
              <Col lg={10} key={`investment_detail-.${index}`}>
                <Form.Group className="d-flex" controlId="saving_detail">
                  <Form.Control
                    type="text"
                    name={`saving_detail.${index}.saving_area`}
                    value={editData?.saving_detail?.[index]?.saving_area}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`"col-sm-5 ${
                      errors.food_expense ? "is-invalid" : null
                    }`}
                  />
                  <Form.Control
                    type="number"
                    name={`saving_detail.${index}.saving_amount`}
                    value={editData?.saving_detail?.[index]?.saving_amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`"col-sm-5 ${
                      errors.food_expense ? "is-invalid" : null
                    }`}
                  />
                  <Button
                    className="btn-lg me-3"
                    variant="warning"
                    onClick={() =>
                      removeSavingDetail(index, editData, setValues)
                    }
                  >
                    <i className="fa-solid fa-minus"></i>
                  </Button>
                </Form.Group>
              </Col>
            ))}
            <Button
              className="btn-lg me-3"
              onClick={() => addSavingDetail(editData, setValues)}
            >
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
          <div className="mb-4 border-bottom">
            <Form.Label>लगानी सम्बन्धी विवरण</Form.Label>
            <Col lg={10}>
              <Form.Label className="col-sm-6">लगानीको क्षेत्र</Form.Label>
              <Form.Label className="col-sm-5"> रकम (रु. हजारमा)</Form.Label>
            </Col>
            {editData.investment_detail.map((el, index) => (
              <Col lg={10} key={`investment_detail-.${index}`}>
                <Form.Group className="d-flex" controlId="food_expense">
                  <Form.Control
                    name={`investment_detail.${index}.investment_area`}
                    value={
                      editData?.investment_detail?.[index]?.investment_area
                    }
                    as="select"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={""}>-- चयन गर्नुहोस् --</option>
                    {Object.keys(editorConfig.investment_area).map((key) => (
                      <option
                        key={`investment_detail.${index}.investment_area-${key}`}
                        value={key}
                      >
                        {editorConfig.investment_area[key]}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control
                    type="number"
                    name={`investment_detail.${index}.investment_amount`}
                    value={
                      editData?.investment_detail?.[index]?.investment_amount
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`"col-sm-5 ${
                      errors.food_expense ? "is-invalid" : null
                    }`}
                  />
                  <Button
                    className="btn-lg me-3"
                    variant="warning"
                    onClick={() =>
                      removeInvestmentDetail(index, editData, setValues)
                    }
                  >
                    <i className="fa-solid fa-minus"></i>
                  </Button>
                </Form.Group>
              </Col>
            ))}
            <Button
              className="btn-lg me-3"
              onClick={() => addInvestmentDetail(editData, setValues)}
            >
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
          <div className="mb-4 border-bottom">
            <Form.Label>ऋण सम्बन्धी विवरण</Form.Label>
            <Col lg={10}>
              <Form.Label className="col-sm-4">ऋणको प्रयोजन</Form.Label>
              <Form.Label className="col-sm-4"> ऋण लिएको स्रोत</Form.Label>
              <Form.Label className="col-sm-4"> रकम (रु. हजारमा)</Form.Label>
            </Col>
            {editData.loan_detail.map((el, index) => (
              <Col lg={11} key={`loan_purpose-.${index}`}>
                <Form.Group className="d-flex" controlId="food_expense">
                  <Form.Control
                    name={`loan_detail.${index}.loan_purpose`}
                    value={editData?.loan_detail?.[index]?.loan_purpose}
                    as="select"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {Object.keys(editorConfig.loan_purpose).map((key) => (
                      <option
                        key={`loan_detail.${index}.loan_purpose-${key}`}
                        value={key}
                      >
                        {editorConfig.loan_purpose[key]}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control
                    name={`loan_detail.${index}.source_of_loan`}
                    value={editData?.loan_detail?.[index]?.source_of_loan}
                    as="select"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={""}>-- चयन गर्नुहोस् --</option>
                    {Object.keys(editorConfig.source_of_loan).map((key) => (
                      <option
                        key={`loan_detail.${index}.source_of_loan-${key}`}
                        value={key}
                      >
                        {editorConfig.source_of_loan[key]}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control
                    type="number"
                    name={`loan_detail.${index}.loan_amount`}
                    value={editData.loan_detail?.[index]?.loan_amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`"col-sm-5 ${
                      errors.food_expense ? "is-invalid" : null
                    }`}
                  />
                  <Button
                    className="btn-lg me-3"
                    variant="warning"
                    onClick={() => removeLoanDetail(index, editData, setValues)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </Button>
                </Form.Group>
              </Col>
            ))}
            <Button
              className="btn-lg me-3"
              onClick={() => addLoanDetail(editData, setValues)}
            >
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
        </Row>
      </div>
    </>
  );
}

export default BankAndFinancialTab;
