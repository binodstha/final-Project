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
import LogoIcon from "../../assets/images/icons/login.svg";
import UserIcon from "../../assets/images/icons/user.svg";
import PasswordIcon from "../../assets/images/icons/password-icon.svg";
import EyeShow from "../../assets/images/icons/eye-show.svg";
import EyeHide from "../../assets/images/icons/eye-hide.svg";
import AlertMessage from "../../components/alert/AlertMessage.component";
import axios from "axios";
import "./auth.styles.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginSuccess: false,
      showPassword: false,
      isError: false,
      errMsg: [],
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.username !== "" && this.password !== "") {
      try {
        // eslint-disable-next-line no-undef
        const res = await axios.post(
          "http://localhost:8800/admin/auth/sign-in",
          this.state
        );
        console.log("res", res);
        if (res.status === 201) {
          window.localStorage.setItem("isLoggedIn", true);
          this.setState({ loginSuccess: true });
        }
      } catch (err) {
        this.setState({
          isError: true,
          errMsg: err.response.data.errors,
        });
        setTimeout(() => {
          this.setState({
            isError: false,
            errMsg: [],
          });
        }, 5000);
      }
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="auth-form d-flex">
        {this.state.loginSuccess && <Navigate to="/admin" replace={true} />}
        <div className="auth-form-content">
          <div className="left-section">
            <div>
              <Link to={"/"}>
                <Image src={LogoIcon} height={"50px"} width={"100px"} />
              </Link>
              <p>Login</p>
            </div>
            <Link to={"/"} className="home-link">
              Back to homepage
            </Link>
          </div>
          <Form className="form" onSubmit={this.handleSubmit}>
            {this.state.isError && (
              <AlertMessage variant="danger" message={this.state.errMsg} />
            )}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Image src={UserIcon} />
              </InputGroup.Text>
              <FloatingLabel
                controlId="username"
                label="Username"
                className="floatingInput"
              >
                <Form.Control
                  type="text"
                  className="floatingInput"
                  required
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
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
              <Link to="/admin/forgot-password" className="link-text">
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" className="mb-5">
              Login
            </Button>
            <h5>
              DONT HAVE AN ACCOUNT?{" "}
              <Link to="/admin/register" className="link-text">
                REGISTER NOW
              </Link>
            </h5>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
