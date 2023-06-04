import React from 'react';
import { Button, FloatingLabel, Form, Image, InputGroup, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setUserProfile } from '../../../redux/profile/profile.action';
import MobileIcon from '../../../assets/images/icons/mobile-num.svg';
import OtpInput from 'react-otp-input';
import AlertMessage from '../../alert/AlertMessage.component';
import agent from '../../../agent';

const INITIAL_STATE = {
  expired_time: null,
  enableClick: false,
  startTimer: false,
  minutes: 0,
  seconds: 0,
  otp: "",
  mobileNo: "",
  changeSuccess: false,
  isOtpSend: false,
  isError: false,
  errMsg: [],
  variant: "danger"
}

class UpdateNumberModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
    this.state.changeSuccess = false
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const body = `new_mobile_num=${this.state.mobileNo}`;
    agent.AuthUser.updateMobileNo(body)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            expired_time: res.body.data.otp_expiry_time,
            startTimer: true,
            isOtpSend: true,
            enableClick: false,
            otp: "",
            isError: true,
            variant: "success",
            errMsg: [{ detail: res.body.data.message }],
          })
          this.startTimer();
          setTimeout(() => {
            this.setState({
              startTimer: true,
              enableClick: false,
              isError: false,
              errMsg: [],
            });
          }, 5000);
        }
      }).catch((err) => {
        this.setState({
          isError: true,
          variant: "danger",
          errMsg: err.response.body.errors,
        });
      });

  }

  handleOtpSubmit = async (event) => {

    const { userProfile, profile } = this.props;
    event.preventDefault();
    if (this.state.otp !== "") {
      const body = `otp=${this.state.otp}`
      agent.AuthUser.confirmMobileOtp(body)
        .then(res => {
          if (res.status === 200) {
            localStorage.removeItem('otp')
            let proCopy = profile;
            proCopy.mobile_number = res.body.data.profile_data.mobile_number
            userProfile(proCopy)
            this.setState({
              otp: "",
              mobileNo: "",
              changeSuccess: true,
              isOtpSend: true,
              isError: false,
              errMsg: [],
              variant: "danger"
            }
            )
          }
        }).catch((err) => {
          this.setState({
            isError: true,
            variant: "danger",
            errMsg: err.response.body.errors,
          });
          setTimeout(() => {
            this.setState({
              isError: false,
              errMsg: [],
            });
          }, 5000);
        });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOtpChange = (value) => {
    this.setState({ "otp": value })
  };

  handleModal = () => {
    const { numberModalClose } = this.props;
    this.setState(INITIAL_STATE)
    numberModalClose()
  }

  startTimer = () => {
    const countDownDate = new Date(this.state.expired_time).getTime()
    this.interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = countDownDate - now
      const minutes = Math.floor((distance % (60 * 60 * 1000) / (1000 * 60)))
      const seconds = Math.floor((distance % (60 * 1000)) / 1000)

      if (distance < 0) {
        clearInterval(this.interval)
        this.setState({
          enableClick: true,
          startTimer: false
        })

      } else {
        if (this.state.startTimer === false) {
          this.setState({
            startTimer: true,
            enableClick: false,
            expired_time: null
          })
        }
        this.setState({
          minutes: minutes,
          seconds: seconds
        })
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { showNumberModal } = this.props;
    return (
      <>
        <Modal className='profile-modal' backdrop="static" show={showNumberModal} onHide={this.handleModal} centered>
          {(this.state.isOtpSend) ? (<>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.changeSuccess ? "Number Change Successfully" : "Enter Verification Code"}
              </Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleOtpSubmit}>
              <Modal.Body>
                {this.state.changeSuccess ? (<>
                  <div className="auth-form d-block p-0 h-auto">
                    <p className='verfication-text'>The mobile number has been change Successfully</p>
                  </div>
                </>) : (<>
                  <div className="auth-form d-block p-0 h-auto">
                    <p className='verfication-text'>We've sent a verification code to your mobile number. Your code will expire after 5 minutes</p>
                    <div className="verification-code mb-0">
                      {(this.state.isError) && (<AlertMessage variant={this.state.variant} message={this.state.errMsg} />)}
                      <label>Verification code</label>
                      <OtpInput
                        isInputNum
                        value={this.state.otp}
                        onChange={this.handleOtpChange}
                        numInputs={6}
                      />
                      {this.state.enableClick ? <div className='code-resend' onClick={this.handleSubmit}>Send code again</div> :
                        <div className='code-resend disable' disabled >Send code in {this.state.minutes}m:{this.state.seconds}s</div>}

                    </div>
                  </div></>)}
              </Modal.Body>
              <Modal.Footer>
                {this.state.changeSuccess ? (<>
                  <Button className='w-100' onClick={this.handleModal}>
                    CLOSE
                  </Button> c
                </>) : (<>
                  <Button className='w-100' type="submit">
                    VERIFY
                  </Button>
                </>)}

              </Modal.Footer>
            </Form>
          </>) : (<>
            <Modal.Header closeButton>
              <Modal.Title>Update mobile number</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleSubmit}>
              <Modal.Body className='py-4'>
                {(this.state.isError) && (<AlertMessage variant={this.state.variant} message={this.state.errMsg} />)}
                <div className="auth-form d-block p-0 h-auto">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <Image src={MobileIcon} />
                    </InputGroup.Text>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Mobile number"
                    >
                      <Form.Control type="number" name="mobileNo" value={this.state.mobileNo} required placeholder="Mobile number" onChange={this.handleChange} />
                    </FloatingLabel>
                  </InputGroup>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button className='w-100' type="submit">
                  CHANGE PHONE NUMBER
                </Button>
              </Modal.Footer>
            </Form>
          </>)}
        </Modal>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userProfile: profile => dispatch(setUserProfile(profile))
})

export default connect(null, mapDispatchToProps)(UpdateNumberModal)
