import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ForgotPassIcon from "../../assets/images/icons/password.svg";
import PasswordIcon from "../../assets/images/icons/password-icon.svg";
import EyeShow from "../../assets/images/icons/eye-show.svg";
import EyeHide from "../../assets/images/icons/eye-hide.svg";
import {
  Button,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import AlertMessage from "../../components/alert/AlertMessage.component";
import agent from "../../agent";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [passwordShow, setPasswordShow] = useState(false);
  const [currentpasswordShow, setCurrentPasswordShow] = useState(false);
  const [enableClick, setEnableClick] = useState(false);
  const [details, setDetails] = useState({
    houseNo: location.state.houseNo,
    expiry_time: location.state.expiry_time,
    token: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({
    isError: false,
    variant: "danger",
    errMsg: [],
  });

  const handlePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };
  const handleCurrentPasswordShow = () => {
    setCurrentPasswordShow(!currentpasswordShow);
  };

  const handleChange = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = `house_number=${details.houseNo}&token=${details.token}&password=${details.password}&password_confirmation=${details.confirm_password}`;
    agent.AuthUser.pnResetPassword(body)
      .then((res) => {
        if (res.status === 200) {
          navigate("/customer-service/login");
        }
      })
      .catch((err) => {
        setError({
          isError: true,
          variant: "danger",
          errMsg: err.response.body.errors,
        });
        setTimeout(() => {
          setError({ isError: false, errMsg: [] });
        }, 5000);
      });
  };
  const resendHandler = () => {
    const body = `house_number=${details.houseNo}`;
    agent.AuthUser.sendOtp(body)
      .then((res) => {
        if (res.status === 200) {
          setError({
            isError: true,
            variant: "success",
            errMsg: [{ code: "", detail: res.body.data.message }],
          });
          setDetails({
            houseNo: location.state.houseNo,
            expiry_time: res.body.data.otp_expiry_time,
            token: "",
            password: "",
            confirm_password: "",
          });
          setTimeout(() => {
            setEnableClick(false);
            setError({ isError: false, errMsg: [] });
          }, 5000);
        }
      })
      .catch((err) => {
        setError({
          isError: true,
          variant: "danger",
          errMsg: [{ code: "", detail: err.response.body.errors }],
        });
        setTimeout(() => {
          setError({ isError: false, errMsg: [] });
        }, 5000);
      });
  };

  let interval;
  const startTimer = () => {
    let countDownDate = new Date(details.expiry_time).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);
      if (distance < 0) {
        setEnableClick(true);
        clearInterval(interval);
      } else {
        if (enableClick === true) {
          setEnableClick(false);
        }
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    if (enableClick === false) {
      startTimer();
    }
    return () => {
      clearInterval(interval);
    };
  }, [interval, enableClick]);
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
        <Form className="form" onSubmit={handleSubmit}>
          <div className="form-head">
            <h2 className="form-head">Reset Password</h2>
            <p>Set the new password for you account so you can login</p>
          </div>
          {error.isError && (
            <AlertMessage variant={error.variant} message={error.errMsg} />
          )}
          <InputGroup className="mb-3">
            <div>
              <InputGroup.Text> </InputGroup.Text>
              <FloatingLabel
                controlId="token"
                label="OTP Code"
                className="floatingInput"
              >
                <Form.Control
                  type="number"
                  name="token"
                  value={details.token}
                  required
                  placeholder="Enter Token"
                  maxLength="6"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </div>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>
              <Image src={PasswordIcon} />
            </InputGroup.Text>
            <FloatingLabel
              controlId="password"
              label="Password"
              className="floatingInput"
            >
              <Form.Control
                type={passwordShow ? "text" : "password"}
                name="password"
                required
                value={details.password}
                placeholder="Enter Password"
                onChange={handleChange}
              />
            </FloatingLabel>
            <InputGroup.Text>
              <Button className="password-show" onClick={handlePasswordShow}>
                {passwordShow ? (
                  <Image src={EyeShow} />
                ) : (
                  <Image src={EyeHide} />
                )}
              </Button>
            </InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <Image src={PasswordIcon} />
            </InputGroup.Text>
            <FloatingLabel
              controlId="confirm_password"
              label="Confirm Password"
              className="floatingInput"
            >
              <Form.Control
                type={currentpasswordShow ? "text" : "password"}
                className="floatingInput"
                name="confirm_password"
                required
                value={details.confirm_password}
                placeholder="Re-Enter Password"
                onChange={handleChange}
              />
            </FloatingLabel>
            <InputGroup.Text>
              <Button
                className="password-show"
                onClick={handleCurrentPasswordShow}
              >
                {currentpasswordShow ? (
                  <Image src={EyeShow} />
                ) : (
                  <Image src={EyeHide} />
                )}
              </Button>
            </InputGroup.Text>
          </InputGroup>
          {enableClick ? (
            <div className="code-resend" onClick={resendHandler}>
              Send code again
            </div>
          ) : (
            <div className="code-resend disable" onClick={resendHandler}>
              Send code in {minutes}m {seconds}s
            </div>
          )}

          <Button type="submit" className="mb-5">
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
