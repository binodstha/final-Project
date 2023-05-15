import React from 'react'
import { Button, Image, ListGroup, Offcanvas } from 'react-bootstrap';
import { Navigate } from 'react-router';
import ProfileImg from '../../assets/images/profile.png'
import UpdateProfileModal from './modals/UpdateProfile.modal';
import ChangePasswordModal from './modals/ChangePassword.modal';
import UpdateNumberModal from './modals/UpdateNumber.modal';
import agent from '../../agent';
import './profile.styles.scss';

class ProfileCanvasComponent extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      "profileModalShow": false,
      "numberModalShow": false,
      "passwordModalShow": false,
      logoutSuccess: false,
      imageSrc: null
    }
  }

  toggleProfileModalShow = () => {
    this.setState({ "profileModalShow": !this.state.profileModalShow })
  }

  toggleNumberModalShow = () => {
    this.setState({ "numberModalShow": !this.state.numberModalShow })
  }

  togglePasswordModalShow = () => {
    this.setState({ "passwordModalShow": !this.state.passwordModalShow })
  }


  logout = async () => {
    const logout = await agent.AuthUser.logout();
    if (logout.status === 200) {
      window.localStorage.setItem("isLoggedIn", false);
      window.localStorage.removeItem("authToken");
      agent.publicDigitalData.tokenRefresh()
      this.setState({
        "logoutSuccess": true,
      });
    }
  }

  render() {
    const { handleProfileClose, profileShow, profile } = this.props;

    return (
      <>
        {this.state.logoutSuccess && (
          <Navigate to="" replace={true} />
        )}
        <Offcanvas
          show={profileShow}
          onHide={handleProfileClose}
          scroll={true}
          backdrop={false}
          placement="end"
          className="profile-canvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>My Profile</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="profile-canvas-edit">
              <div className="profile-img">
                {/* Image size: 108 x 108 */}
                <Image src={profile.image ? profile.image : ProfileImg} alt={ProfileImg} className="img-fluid" />
              </div>
              <div className='profile-name d-flex justify-content-center align-items-center'>
                <h2 className="name">{profile.name}</h2>
                <Button onClick={this.toggleProfileModalShow}><i className="fa-solid fa-pen"></i></Button>
              </div>
              <div className="btns-group">
                <Button onClick={this.toggleNumberModalShow}>Change phone no</Button>
                <Button onClick={this.togglePasswordModalShow}>Change Password</Button>
              </div>
            </div>
            <div className="profile-canvas-detail">
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <i className="fa-solid fa-house-chimney"></i>
                  <span className='house-num'>{profile.house_number}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="fa-solid fa-envelope"></i>
                  <span>{profile.email ? profile.email : "N/A"}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="fa-solid fa-phone"></i>
                  <span>{profile.mobile_number ? profile.mobile_number : "N/A"}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{profile.address ? profile.address : "N/A"}</span>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <Button className='btn-lg w-100' onClick={() => this.logout()}>Logout</Button>
          </Offcanvas.Body>
        </Offcanvas>
        {/* Update profile modal */}
        <UpdateProfileModal profile={profile} showProfileModal={this.state.profileModalShow} profileModalClose={this.toggleProfileModalShow} />
        {/* Change Password modal */}
        <ChangePasswordModal showPasswordModal={this.state.passwordModalShow} passwordModalClose={this.togglePasswordModalShow} />
        {/* Update mobile number modal */}
        <UpdateNumberModal profile={profile} showNumberModal={this.state.numberModalShow} numberModalClose={this.toggleNumberModalShow}
        />
      </>
    )
  }
}

export default ProfileCanvasComponent