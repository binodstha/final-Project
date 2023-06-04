import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router';
import OtpInput from 'react-otp-input';
import agent from '../../agent';
import AlertMessage from '../../components/alert/AlertMessage.component';




const INITIAL_STATE = {

  resend: false,
  otp: "",
  isOtpValidate: false,
  variant: 'danger',
  isError: false,
  errMsg: [],
  enableClick: false,
  minutes: 0,
  seconds: 0,
  expired_time: null
}
var interval = null;

class ResetCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE
  }
  handleOtpSubmit = async (event) => {
    event.preventDefault();
    if (this.state.otp !== "") {
      const body = `otp=${this.state.otp}`
      agent.AuthUser.otpVerify(body)
        .then(res => {
          if (res.status === 200) {
            window.localStorage.setItem("isLoggedIn", true);
            this.setState({ "isOtpValidate": true })
          }
        }).catch((err) => {
          this.setState({
            "isError": true,
            "errMsg": err.response.body.errors,
          });
          setTimeout(() => {
            this.setState({
              isError: false,
              errMsg: [],
            });
          }, 5000);
        });
    }
  };


  resendHandler = () => {
    const { house_number } = this.props;
    const body = `house_number=${house_number}`;
    agent.AuthUser.sendOtp(body)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            resend: true,
            expired_time: res.body.data.otp_expiry_time,
            otp: "",
            isOtpValidate: false,
            variant: 'success',
            isError: true,
            errMsg: [{ code: "", detail: res.body.data.message }],
            enableClick: false,
          })
          this.startTimer()

        }
      }).catch((err) => {
        this.setState({ isError: true, variant: 'danger', errMsg: err.response.body.errors })
        setTimeout(() => {

          this.setState({
            isError: false,
            errMsg: []
          })
        }, 5000)
      });
    setTimeout(() => {
      this.setState({
        enableClick: false,
        isError: false,
        errMsg: []
      })
    }, 5000)

  }

  handleOtpChange = (value) => {
    this.setState({ "otp": value })
  };

  componentDidMount() {
    this.startTimer()
  }
  startTimer = () => {
    const { expired_time } = this.props
    let countDownDate
    if (this.state.expired_time === null) {
      countDownDate = new Date(expired_time).getTime()
    } else {
      countDownDate = new Date(this.state.expired_time).getTime()
    }
    if (isNaN(countDownDate)) {
      this.setState({
        enableClick: true
      })
    } else {
      interval = setInterval(() => {
        const now = new Date().getTime()
        const distance = countDownDate - now
        const minutes = Math.floor((distance % (60 * 60 * 1000) / (1000 * 60)))
        const seconds = Math.floor((distance % (60 * 1000)) / 1000)
        if (distance < 0) {
          clearInterval(interval)
          this.setState({
            enableClick: true,
            startTimer: false
          })

        } else {
          if (this.state.enableClick) {
            this.setState({
              enableClick: false,
            })
          }
          this.setState({
            minutes: minutes,
            seconds: seconds
          })
        }
      }, 1000)
    }
  }
  componentWillUnmount() {
    clearInterval(interval);
  }

  render() {
    return (
      <>
        {this.state.isOtpValidate && (
          <Navigate to="/customer-service" replace={true} />
        )}
        <Form className='form' onSubmit={this.handleOtpSubmit}>
          <div className="form-head">
            <h2 className="form-head">Enter 6 Digits Code</h2>
            <p>Enter 6 digit code that you received on your mobile number </p>
          </div>
          {(this.state.isError) && (<AlertMessage variant={this.state.variant} message={this.state.errMsg} />)}
          <div className="verification-code">
            <label className='mb-3'>Verification code</label>
            <OtpInput type="number"
              isInputNum
              value={this.state.otp}
              onChange={this.handleOtpChange}
              numInputs={6}
            />
          </div>
          {this.state.enableClick ? <div className='code-resend' onClick={this.resendHandler}>Send code again</div> :
            <div className='code-resend disable'> <p>Send code in {this.state.minutes}m:{this.state.seconds}s</p> </div>}

          <Button type='submit'>Continue</Button>
        </Form>
      </>
    )
  }
}

export default ResetCode