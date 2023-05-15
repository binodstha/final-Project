import React from "react";

import { Image} from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
class HeaderSection extends React.Component {
  render() {
    return (
      <>
        <header className="header-sticky d-flex align-items-center justify-content-between">
          <div className="header-logo d-flex align-items-center">
            <Link to={"/"} className="">
              <Image src={Logo} />
            </Link>
            <h1>
              Chandragiri Digital
              <br />
              Profile
            </h1>
          </div>
        </header>
      </>
    );
  }
}



export default HeaderSection;
