import React from "react";
import { NavLink } from "react-router-dom";
import "./sidemenu.styles.scss";
import DashboardIcon from "../../assets/images/icons/dashboard.svg";
import DashboardIconActive from "../../assets/images/icons/dashboard-active.svg";
import HouseHoldIcon from "../../assets/images/icons/household.svg";
import HouseHoldIconActive from "../../assets/images/icons/household-active.svg";
import InstituteIcon from "../../assets/images/icons/institute.svg";
import InstituteIconActive from "../../assets/images/icons/institute-active.svg";
import ComplainBoxIcon from "../../assets/images/icons/complain.svg";
import ComplainBoxIconActive from "../../assets/images/icons/complain-active.svg";
import { Image } from "react-bootstrap";

function SidebarMenu() {
  return (
    <>
      {/* <Button className='openNav' onClick={openSidebar}><i className="fa-solid fa-bars"></i></Button> */}
      <div className="sidemenu">
        <ul>
          <li>
            <NavLink to={"/admin"} end className="sidemenu-link">
              <Image className="default" src={DashboardIcon} />
              <Image className="active" src={DashboardIconActive} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/categories"} className="sidemenu-link">
              <Image className="default" src={HouseHoldIcon} />
              <Image className="active" src={HouseHoldIconActive} />
              <span>Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/geodata"} className="sidemenu-link">
              <Image className="default" src={InstituteIcon} />
              <Image className="active" src={InstituteIconActive} />
              <span>Geolocation</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/users"} className="sidemenu-link">
              <Image className="default" src={ComplainBoxIcon} />
              <Image className="active" src={ComplainBoxIconActive} />
              <span>Users</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SidebarMenu;
