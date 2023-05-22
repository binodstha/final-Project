import React from "react";
import {
  Button,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./auth.styles.scss";
import LogoIcon from "../../assets/images/logo.png";
import UserIcon from "../../assets/images/icons/user.svg";
import HomeIcon from "../../assets/images/icons/home.svg";
import MobileIcon from "../../assets/images/icons/mobile-num.svg";
import PasswordIcon from "../../assets/images/icons/password-icon.svg";
import AlertMessage from "../../components/alert/AlertMessage.component";
import EyeShow from "../../assets/images/icons/eye-show.svg";
import EyeHide from "../../assets/images/icons/eye-hide.svg";
import agent from "../../agent";
import ResetCode from "./ResetCode";
import axios from "axios";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      rePassword: "",
      showPassword: false,
      showRePassword: false,
      rePasswordMatch: true,
      errMsg: "",
      isError: false,
      isRegSuccess: false,
      expired_time: null,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.rePassword) {
      this.setState({
        errMsg: [{ detail: "Password and Confirm Password do not march" }],
        isError: true,
      });
      return false;
    } else {
      this.setState({
        errMsg: "",
        isError: false,
      });
      // if (
      //   this.state.name !== "" &&
      //   this.state.houseNo !== "" &&
      //   this.state.mobileNo !== "" &&
      //   this.state.password !== ""
      // ) {
        // const body = `name=${this.state.name}&house_number=${this.state.houseNo}&mobile_number=${this.state.mobileNo}&password=${this.state.password}&password_confirmation=${this.state.rePassword}&clientId=${process.env.REACT_APP_PRIVATE_CLIENT_ID}&clientSecret=${process.env.REACT_APP_PRIVATE_CLIENT_SECRET}&grantType=${process.env.REACT_APP_PRIVATE_GRANT_TYPE}`;
        

        try {
          const res= await axios.post("   http://localhost:8800/admin/auth/sign-up", this.state);
          console.log(res)
          // navigate("/");
        } catch (err) {
          console.log(err);
          // setError(true)
        }
        
        // agent.AuthUser.register(body)
        //   .then((res) => {
        //     if (res.status === 200) {
        //       window.localStorage.setItem(
        //         "authToken",
        //         JSON.stringify(res.body.data.auth_token)
        //       );
        //       this.setState({
        //         isRegSuccess: true,
        //         expired_time: res.body.data.otp_expiry_time,
        //       });
        //     }
        //   })
        //   .catch((err) => {
        //     this.setState({
        //       isError: true,
        //       errMsg: err.response.body.errors,
        //     });
        //     setTimeout(() => {
        //       this.setState({
        //         isError: false,
        //         errMsg: [],
        //       });
        //     }, 5000);
        //   });
      // }
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="auth-form d-flex">
        <div className="auth-form-content">
          <div className="left-section">
            <div>
              <Link to={"/"}>
                <Image src={LogoIcon} height={"50px"} width={"100px"} />
              </Link>
              <p>REGISTER</p>
            </div>
            <Link to={"/"} className="home-link">
              Back to homepage
            </Link>
          </div>
            <Form className="form" onSubmit={this.handleSubmit}>
              {this.state.isError && (
                <div className="errMsg">
                  <AlertMessage variant="danger" message={this.state.errMsg} />
                </div>
              )}
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <Image src={UserIcon} />
                </InputGroup.Text>
                <FloatingLabel controlId="username" label="Username">
                  <Form.Control
                    type="text"
                    className="floatingInput"
                    name="username"
                    required
                    placeholder="Enter Name"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </FloatingLabel>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <Image src={HomeIcon} />
                </InputGroup.Text>
                <FloatingLabel controlId="firstanme" label="First Name">
                  <Form.Control
                    type="text"
                    className="floatingInput"
                    name="firstanme"
                    required
                    placeholder="Enter First Name"
                    value={this.state.firstanme}
                    onChange={this.handleChange}
                  />
                </FloatingLabel>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <Image src={MobileIcon} />
                </InputGroup.Text>
                <FloatingLabel controlId="lastname" label="Last Lame">
                  <Form.Control
                    type="text"
                    className="floatingInput"
                    name="lastname"
                    required
                    placeholder="Enter last name"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  />
                </FloatingLabel>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <Image src={MobileIcon} />
                </InputGroup.Text>
                <FloatingLabel controlId="email" label="Email">
                  <Form.Control
                    type="email"
                    className="floatingInput"
                    name="email"
                    required
                    placeholder="Enter email"
                    value={this.state.email}
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
                    name="password"
                    required
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
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <Image src={PasswordIcon} />
                </InputGroup.Text>
                <FloatingLabel controlId="rePassword" label="Confirm Password">
                  <Form.Control
                    type={this.state.showRePassword ? "text" : "password"}
                    className="floatingInput"
                    name="rePassword"
                    required
                    placeholder="Re-Enter Password"
                    value={this.state.rePassword}
                    onChange={this.handleChange}
                  />
                </FloatingLabel>
                <InputGroup.Text>
                  <Button
                    className="password-show"
                    onClick={() =>
                      this.setState({
                        showRePassword: !this.state.showRePassword,
                      })
                    }
                  >
                    {this.state.showRePassword ? (
                      <Image src={EyeShow} />
                    ) : (
                      <Image src={EyeHide} />
                    )}
                  </Button>
                </InputGroup.Text>
              </InputGroup>
              <Button type="submit" className="mb-5">
                Register
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
}

export default Register;
