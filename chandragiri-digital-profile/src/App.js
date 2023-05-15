import React from 'react';
import { connect } from 'react-redux';
import {
  setMunicipalityData,
  setChartData
} from './redux/municipality-info/municipality-info.actions';
import { setAboutApp } from './redux/about-app/about-app.actions';
import { setBanner } from './redux/municipality-info/municipality-info.actions';
import agent from './agent';
import HomePage from './pages/Home/HomePage';
import './styles/App.scss';
import { Route, Routes, useLocation, Navigate } from 'react-router';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import VerifyPhone from './pages/Auth/VerifyPhone';
import ResetCode from './pages/Auth/ResetCode';
import DashboardComponent from "./components/dashboard-component/Dashboard.component";
import HouseholdInformation from './components/household-information/HouseholdInformation.component';
import ComplainBoxComponent from './components/complain-box/ComplainBox.component';
import InstitutionalInformation from './components/instituional-information/InstitutionalInformation.component';
import ServicesComponent from './components/services-info/Services.component';
import EditHouseholdInfoComponent from './components/household-information/edit-form/EditHouseholdInfo.component';
import GisMapPage from './pages/GisMap/GisMap.page';



function RequireAuth({ children }) {
  const authCheck = window.localStorage.getItem('isLoggedIn');
  let location = useLocation();
  if (authCheck === "true") {
    return children;
  } else {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
}

class App extends React.Component {
  async componentDidMount() {
    const {
      setMunicipalityData,
      setChartData,
      setAboutApp,
      setBanner,
    } = this.props;

    const script = document.createElement("script");
    script.src = "/nepali-date-picker/dist/nepali.datepicker.v3.7.min.js";
    script.async = true;
    document.body.appendChild(script);

    setBanner(await agent.publicDigitalData.getBanner())
    setAboutApp(await agent.publicDigitalData.getAboutApp());
    setMunicipalityData(await agent.publicDigitalData.getMunicipalityData());
    setChartData(await agent.publicDigitalData.getMunicipalityChart());
  }
  render() {
    return (
      <Routes>
        <Route exact path='/' element={<GisMapPage />} />

        <Route exact path='/gis-map' element={<GisMapPage />} />
        <Route exact path='/admin/login' element={<Login />} />
        <Route exact path='/admin/register' element={<Register />} />
        <Route exact path='/admin/forgot-password' element={<ForgotPassword />} />
        <Route exact path='/admin/reset-password' element={<ResetPassword />} />
        <Route exact path='/admin/reset-code' element={<ResetCode />} />
        <Route exact path='/admin/verify-phone' element={<VerifyPhone />} />
        <Route exact path="/admin" element={<RequireAuth>
          <Dashboard />
        </RequireAuth>}>
          <Route exact index element={<DashboardComponent />} />
          <Route path='household-information' element={<HouseholdInformation />} />
          <Route path='household-information/edit' element={<EditHouseholdInfoComponent />} />
          <Route path='institutional-information' element={<InstitutionalInformation />} />
          <Route path='complain-box' element={<ComplainBoxComponent />} />
          <Route path='services' element={<ServicesComponent />} />
        </Route>
      </Routes>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMunicipalityData: (municipalityInfo) => dispatch(setMunicipalityData(municipalityInfo)),
  setChartData: (municipalityInfo) => dispatch(setChartData(municipalityInfo)),
  setBanner: (municipalityInfo) => dispatch(setBanner(municipalityInfo)),
  setAboutApp: (aboutApp) => dispatch(setAboutApp(aboutApp))
})

export default connect(null, mapDispatchToProps)(App);
