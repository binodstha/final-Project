import React, { useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassIcon from "../../assets/images/icons/password.svg";
import HomeIcon from "../../assets/images/icons/home.svg";
import AlertMessage from "../../components/alert/AlertMessage.component";
import agent from "../../agent";

function ForgotPassword() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    houseNo: "",
    mobile_number: "",
  });
  const [error, setError] = useState({
    isError: false,
    errMsg: [],
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (details.houseNo !== "") {
      const body = `house_number=${details.houseNo}`;
      agent.AuthUser.sendOtp(body)
        .then((res) => {
          if (res.status === 200) {
            navigate("/admin/reset-password", {
              state: {
                houseNo: details.houseNo,
                expiry_time: res.body.data.otp_expiry_time,
              },
            });
          }
        })
        .catch((err) => {
          setError({ isError: true, errMsg: err.response.body.errors });
          setTimeout(() => {
            setError({
              isError: false,
              errMsg: [],
            });
          }, 5000);
        });
    }
  };
  const handleChange = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  return (
    <div className="auth-form d-flex">
      <div className="auth-form-content">
        <div className="left-section">
          <div>
            <Image src={ForgotPassIcon} />
            <p>PASSWORD</p>
          </div>
          <Link to={"/"} className="home-link">
            Back to homepage
          </Link>
        </div>
        <Form className="form">
          <div className="form-head">
            <h2 className="form-head">Forgot Password</h2>
            <p>
              Enter your house number and mobile number for the verification
              process we will send you 6 digit code to your mobile number
            </p>
          </div>

          {error.isError && (
            <AlertMessage variant="danger" message={error.errMsg} />
          )}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <Image src={HomeIcon} />
            </InputGroup.Text>
            <FloatingLabel controlId="houseNo" label="House number">
              <Form.Control
                type="text"
                className="floatingInput"
                placeholder="Enter House number"
                name="houseNo"
                value={details.houseNo}
                onChange={handleChange}
              />
            </FloatingLabel>
          </InputGroup>
          <Button type="submit" className="mb-5" onClick={handleSubmit}>
            Continue
          </Button>
          <h5>
            Already have an account?
            <Link to="/admin/login" className="link-text">
              Login
            </Link>
          </h5>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
