import React from "react";
import { Outlet } from "react-router";
import HeaderSection from "../../components/header/Header.component";
import SidebarMenu from "../../components/sidebar-menu/SidebarMenu";

function Dashboard() {
  return (
    <>
      <HeaderSection isAdmin={true}/>
      <main>
        <SidebarMenu />
        <Outlet />
      </main>
    </>
  );
}

export default Dashboard;
