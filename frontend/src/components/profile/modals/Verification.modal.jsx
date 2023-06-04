import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';

function VerificationModal({ verificationModal, verifyModalClose }) {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (otp) => setOtp(otp);

  return (
    <>
      <Modal className='profile-modal' show={verificationModal} onHide={verifyModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Verification Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="auth-form d-block p-0 h-auto">
            <p className='verfication-text'>We've sent a verification code to your mobile number. Your code will expire after 5 minutes</p>
            <div className="verification-code mb-0">
              <label>Verification code</label>
              <OtpInput
                isInputNum
                value={otp}
                onChange={handleOtpChange}
                numInputs={4}
              />
              <Link to={'/customer-service'}>Send code again</Link>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='w-100'>
            VERIFY
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default VerificationModal