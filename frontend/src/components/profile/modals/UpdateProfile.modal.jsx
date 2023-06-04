import React from 'react';
import { connect } from 'react-redux';
import { Button, FloatingLabel, Form, Image, InputGroup, Modal } from 'react-bootstrap';
import CamIcon from '.././../../assets/images/cam.jpg';
import UserIcon from '../../../assets/images/icons/user.svg';
import EmailIcon from '../../../assets/images/icons/email.svg';
import LocationIcon from '../../../assets/images/icons/location.svg';
import AlertMessage from '../../alert/AlertMessage.component';
import { setUserProfile } from '../../../redux/profile/profile.action';
import { createStructuredSelector } from 'reselect';
import { selectProfile } from '../../../redux/profile/profile.secector';
import agent from '../../../agent';


class UpdateProfileModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.profile.email,
      name: props.profile.name,
      address: props.profile.address,
      selectedFile: null,
      varient: "danger",
      isError: false,
      errMsg: [],

    }
  }
  handleSubmit = async (event) => {
    const { profileModalClose, userProfile } = this.props
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name)
    formData.append('email', this.state.email)
    formData.append('address', this.state.address)
    formData.append('image', this.state.selectedFile ? this.state.selectedFile : "")

    agent.AuthUser.updateProfile(formData)
      .then(res => {
        if (res.status === 200) {
          userProfile(res.body.data.profile_data)
          profileModalClose()
          this.setState({
            isError: false,
            errMsg: [{ detail: res.body.data.message }],
            selectedFile: null
          });
        }

      }).catch((err) => {
        this.setState({
          isError: true,
          errMsg: err.response.body.errors,
        });

      });

    setTimeout(() => {
      this.setState({ "errMsg": [] })
    },
      5000)

  }

  uploadHandler = (event) => {
    const extension = event.target.files[0].name.split('.').pop()
    if ((extension === 'JPG' || extension === 'jpeg' || extension === 'png')) {
      let files = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        this.setState({
          selectedFile: e.target.result,
        })
      }
      reader.onerror = (error) => {
        return error
      };
    }
    else {
      this.setState({
        "serrMsg": [{ "detail": "The file must be in 'pdf' 'jpg', 'jpeg' or 'png' format" }]
      })
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { showProfileModal, profileModalClose } = this.props
    return (
      <>
        <Modal className='profile-modal' backdrop="static" show={showProfileModal} onHide={profileModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <div className="profile-img">
                <Form.Group controlId="formFile" className="mb-3">
                  {this.state.selectedFile === null ? <Form.Label style={{ cursor: 'pointer', borderRadius: '100%' }}><Image style={{ maxWidth: '180px', maxHeight: '180px' }} src={CamIcon} /></Form.Label> : <Form.Label style={{ cursor: 'pointer' }}><Image style={{ maxHeight: '180px', width: 'auto' }} src={this.state.selectedFile} /></Form.Label>}
                  <Form.Control type='file' onChange={this.uploadHandler} style={{ display: 'none' }}>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="auth-form d-block p-0 h-auto">
                {(this.state.isError) && (
                  <AlertMessage variant={this.state.varient} message={this.state.errMsg} />
                )}
                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <Image src={UserIcon} />
                  </InputGroup.Text>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                  >
                    <Form.Control type="text" name="name" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} />
                  </FloatingLabel>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <Image src={EmailIcon} />
                  </InputGroup.Text>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email"
                  >
                    <Form.Control type="email" name="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleChange} />
                  </FloatingLabel>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <Image src={LocationIcon} />
                  </InputGroup.Text>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Address"
                  >
                    <Form.Control type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.handleChange} />
                  </FloatingLabel>
                </InputGroup>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" className='w-100'>
                UPDATE
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  profile: selectProfile
})

const mapDispatchToProps = dispatch => ({
  userProfile: profile => dispatch(setUserProfile(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileModal);