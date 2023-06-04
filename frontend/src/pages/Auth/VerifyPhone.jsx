import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Image } from 'react-bootstrap';
import VerifyIcon from '../../assets/images/icons/verification.svg';
import OtpInput from 'react-otp-input';


function VerifyPhone() {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (otp) => setOtp(otp);
  return (
    <div className='auth-form d-flex'>
      <div className='auth-form-content'>
        <div className="left-section">
          <div>
            <Image src={VerifyIcon} />
            <p>VERIFICATION</p>
          </div>
          <Link to={'/'} className="home-link">Back to homepage</Link>
        </div>
        <Form className='form' >
          <div className="form-head">
            <h2 className="form-head">Verify your phone</h2>
            <p>We've sent a verification code to your number</p>
          </div>
          <div className="verification-code">
            <label className='mb-3'>Verification code</label>
            <OtpInput
              isInputNum
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
            />
            <Link to={'/customer-service/verify-phone'}>Send code again</Link>
          </div>
          <Button type='submit'>VERIFY</Button>
        </Form>
      </div>
    </div>
  )
}

export default VerifyPhone