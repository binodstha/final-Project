import React from "react";
import {
  Button,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import LogoIcon from "../../assets/images/logo.png";
import HomeIcon from "../../assets/images/icons/home.svg";
import PasswordIcon from "../../assets/images/icons/password-icon.svg";
import EyeShow from "../../assets/images/icons/eye-show.svg";
import EyeHide from "../../assets/images/icons/eye-hide.svg";
import agent from "../../agent";
import ResetCode from "./ResetCode";
import AlertMessage from "../../components/alert/AlertMessage.component";
import "./auth.styles.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houseNo: "",
      password: "",
      regToken: "",
      expired_time: "null",
      loginSuccess: false,
      isOtpEnable: false,
      showPassword: false,
      isError: false,
      errMsg: [],
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.houseNo !== "" && this.password !== "") {
      const body = `username=${this.state.houseNo}&password=${this.state.password}&clientId=${process.env.REACT_APP_PRIVATE_CLIENT_ID}&clientSecret=${process.env.REACT_APP_PRIVATE_CLIENT_SECRET}&grantType=${process.env.REACT_APP_PRIVATE_GRANT_TYPE}`;
      agent.AuthUser.login(body)
        .then((res) => {
          if (res.status === 200) {
            window.localStorage.setItem(
              "authToken",
              JSON.stringify(res.body.data.auth_token)
            );
            if (res.body.data.is_verified) {
              window.localStorage.setItem("isLoggedIn", true);
              this.setState({ isOtpEnable: false, loginSuccess: true });
            } else {
              window.localStorage.setItem("isLoggedIn", false);
              this.setState({
                isOtpEnable: true,
                expired_time: res.body.data.otp_expiry_time,
              });
            }
          }
        })
        .catch((err) => {
          this.setState({
            isError: true,
            errMsg: err.response.body.errors,
          });
          setTimeout(() => {
            this.setState({
              isError: false,
              errMsg: [],
            });
          }, 5000);
        });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="auth-form d-flex">
        {this.state.loginSuccess && (
          <Navigate to="/admin" replace={true} />
        )}
        <div className="auth-form-content">
          <div className="left-section">
            <div>
              <Link to={"/"}>
                <Image src={LogoIcon} />
              </Link>
              <p>Login</p>
            </div>
            <Link to={"/"} className="home-link">
              Back to homepage
            </Link>
          </div>
          {this.state.isOtpEnable ? (
            <ResetCode
              house_number={this.state.houseNo}
              mobile_number={this.state.houseNo}
              expired_time={this.state.expired_time}
            />
          ) : (
            <Form className="form" onSubmit={this.handleSubmit}>
              {this.state.isError && (
                <AlertMessage variant="danger" message={this.state.errMsg} />
              )}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <Image src={HomeIcon} />
                </InputGroup.Text>
                <FloatingLabel
                  controlId="houseNo"
                  label="House number"
                  className="floatingInput"
                >
                  <Form.Control
                    type="text"
                    className="floatingInput"
                    required
                    name="houseNo"
                    placeholder="Enter House number"
                    value={this.state.houseNo}
                    onChange={this.handleChange}
                  />
                </FloatingLabel>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <Image src={PasswordIcon} />
                </InputGroup.Text>
                <FloatingLabel controlId="password" label="Password">
                  <Form.Control
                    type={this.state.showPassword ? "text" : "password"}
                    className="floatingInput"
                    required
                    name="password"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FloatingLabel>
                <InputGroup.Text>
                  <Button
                    className="password-show"
                    onClick={() =>
                      this.setState({ showPassword: !this.state.showPassword })
                    }
                  >
                    {this.state.showPassword ? (
                      <Image src={EyeShow} />
                    ) : (
                      <Image src={EyeHide} />
                    )}
                  </Button>
                </InputGroup.Text>
              </InputGroup>
              <div className="forgot-link">
                <Link
                  to="/admin/forgot-password"
                  className="link-text"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button type="submit" className="mb-5">
                Login
              </Button>
              <h5>
                DONT HAVE AN ACCOUNT?
                <Link to="/admin/register" className="link-text">
                  REGISTER NOW
                </Link>
              </h5>
            </Form>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
