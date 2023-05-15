import { Route, Routes, useLocation, Navigate } from "react-router";
import Dashboard from "../pages/dashboard";
// import Admin from "../pages/admin";
// import Category from "../pages/admin/category";
// import Geolocation from "../pages/admin/geolocation";
import Login from "../pages/admin/auth/login";

const RequireAuth = ({ children }) => {
  const authCheck = window.localStorage.getItem("isLoggedIn");
  let location = useLocation();
  if (authCheck === "true") {
    return children;
  } else {
    return (
      <Navigate
        to="/customer-service/login"
        state={{ from: location }}
        replace
      />
    );
  }
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path='/admin/login' element={<Login />} />
        {/* <Route exact path='/customer-service/register' element={<Register />} />
        <Route exact path='/customer-service/forgot-password' element={<ForgotPassword />} /> */}

      {/* <Route
        exact
        path="/admin"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route exact index element={<Admin />} />
        <Route exact path="category" element={<Category />} />
        <Route exact path="geolocation" element={<Geolocation />} />
      </Route> */}
    </Routes>
  );
};
export default AppRoutes;
