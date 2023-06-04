import React from 'react';
import { Button, FloatingLabel, Form, Image, InputGroup, Modal } from 'react-bootstrap';
import PasswordIcon from '../../../assets/images/icons/password-icon.svg';
import EyeShow from '../../../assets/images/icons/eye-show.svg';
import EyeHide from '../../../assets/images/icons/eye-hide.svg';
import AlertMessage from '../../alert/AlertMessage.component';
import agent from '../../../agent';

const INITIAL_STATE = {
  password: "",
  newPassword: "",
  reNewPassword: "",
  showPassword: false,
  showNewPassword: false,
  showRePassword: false,
  variant: 'danger',
  isError: false,
  errMsg: [],
}

class ChangePasswordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE
    this.state.isChangeSuccess = false
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      "errMsg": [],
      "isError": false
    })
    if (this.state.password !== this.state.newPassword) {
      const body = `old_password=${this.state.password}&password=${this.state.newPassword}&password_confirmation=${this.state.reNewPassword}`;
      agent.AuthUser.changePassword(body)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              "isChangeSuccess": true,
            });
            this.state(INITIAL_STATE)
          }
        }).catch((err) => {
          this.setState({
            "isError": true,
            "errMsg": err.response.body.errors,
          });
        });

      setTimeout(() => {
        this.setState({
          isError: false,
          errMsg: [],
        });
      }, 5000);
    } else {

      this.setState({
        "isError": true,

        'errMsg': [{
          code: "password",
          detail: "The Old password and  New password must be different.",
          source: { pointer: 'password' },
          title: "The Old password and  New password must be different."

        }]

      })
    }


  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClose = () => {
    const { passwordModalClose } = this.props;
    this.setState(INITIAL_STATE);
    passwordModalClose()
  }
  render() {
    const { showPasswordModal } = this.props
    return (
      <>
        <Modal className='profile-modal' backdrop="static" show={showPasswordModal} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          {(this.state.isChangeSuccess) ? (
            <>
              <Modal.Body className='pt-4'>
                <div className='Success'>Password Change Successfully!</div>
              </Modal.Body>
              <Modal.Footer>
                <Button className='w-100' onClick={this.handleClose}>
                  CLOSE
                </Button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Form onSubmit={this.handleSubmit}>
                <Modal.Body className='pt-4'>
                  {(this.state.isError) && (<AlertMessage variant={this.state.variant} message={this.state.errMsg} />)}
                  <div className="auth-form d-block p-0 h-auto">
                    <InputGroup className="mb-3">
                      <InputGroup.Text><Image src={PasswordIcon} /></InputGroup.Text>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Current Password"
                      >
                        <Form.Control type={this.state.showPassword ? "text" : "password"} value={this.setState.password} name="password" required placeholder="Current Password" onChange={this.handleChange} />
                      </FloatingLabel>
                      <InputGroup.Text>
                        <Button className='password-show' onClick={() => this.setState({ "showPassword": !this.state.showPassword })}>
                          {this.state.showPassword ?
                            (<Image src={EyeShow} />)
                            :
                            (<Image src={EyeHide} />)
                          }
                        </Button>
                      </InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text><Image src={PasswordIcon} /></InputGroup.Text>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="New Password"
                      >
                        <Form.Control type={this.state.showNewPassword ? "text" : "password"} value={this.setState.newPassword} name="newPassword" required placeholder="New Password" onChange={this.handleChange} />
                      </FloatingLabel>
                      <InputGroup.Text>
                        <Button className='password-show' onClick={() => this.setState({ "showNewPassword": !this.state.showNewPassword })}>
                          {this.state.showNewPassword ?
                            (<Image src={EyeShow} />)
                            :
                            (<Image src={EyeHide} />)
                          }
                        </Button>
                      </InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text><Image src={PasswordIcon} /></InputGroup.Text>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Confirm Password"
                      >
                        <Form.Control type={this.state.showRePassword ? "text" : "password"} value={this.setState.reNewPassword} name="reNewPassword" required placeholder="Confirm Password" onChange={this.handleChange} />
                      </FloatingLabel>
                      <InputGroup.Text>
                        <Button className='password-show' onClick={() => this.setState({ "showRePassword": !this.state.showRePassword })}>
                          {this.state.showRePassword ?
                            (<Image src={EyeShow} />)
                            :
                            (<Image src={EyeHide} />)
                          }
                        </Button>
                      </InputGroup.Text>
                    </InputGroup>

                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button className='w-100' type='submit'>
                    UPDATE
                  </Button>
                </Modal.Footer>
              </Form>
            </>)}

        </Modal>
      </>
    )
  }
}

export default ChangePasswordModal