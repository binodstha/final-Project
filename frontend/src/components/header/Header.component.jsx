import React from "react";

import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";
import Logo from "../../assets/images/logo.png";
class HeaderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutSuccess: false,
    };
  }
  logout = async () => {
    window.localStorage.setItem("isLoggedIn", false);
    this.setState({ logoutSuccess: true });
  };
  render() {
    const { isAdmin } = this.props;
    return (
      <>
        {this.state.logoutSuccess && <Navigate to="/admin" replace={true} />}
        <header className="header-sticky d-flex align-items-center justify-content-between">
          <div className="header-logo d-flex align-items-center">
            <Link to={"/"} className="">
              <Image src={Logo} />
            </Link>
            <h1>
              Geolocation Mapping and
              <br />
              Routing
            </h1>
          </div>
          {isAdmin && (
            <div className="top-nav d-flex align-items-center">
              <Button className="" onClick={this.logout}>
                Logout
              </Button>
            </div>
          )}
        </header>
      </>
    );
  }
}

export default HeaderSection;
