import React from "react";
import "./styles/App.scss";
import { Route, Routes, useLocation, Navigate } from "react-router";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardComponent from "./components/dashboard-component/Dashboard.component";
import CategoriesComponent from "./components/categories/Categories.component";
import Geolocation from "./components/geolocation/Geolocation.component";

import GisMapPage from "./pages/GisMap/GisMap.page";

function RequireAuth({ children }) {
  const authCheck = window.localStorage.getItem("isLoggedIn");
  let location = useLocation();
  if (authCheck === "true") {
    return children;
  } else {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
}

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<GisMapPage />} />
        <Route exact path="/admin/login" element={<Login />} />
        <Route exact path="/admin/register" element={<Register />} />
        <Route
          exact
          path="/admin"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route exact index element={<DashboardComponent />} />
          <Route path="/admin/categories" element={<CategoriesComponent />} />
          <Route path="/admin/geodata" element={<Geolocation />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
