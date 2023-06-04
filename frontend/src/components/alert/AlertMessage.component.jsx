import React from 'react'
import { Alert } from 'react-bootstrap'

function AlertMessage({ key, variant, message }) {
  return (
    <div className='errMsg'>
      <Alert key={key} variant={variant}>
        {message.map((msg, index) => {
          return (<p key={index}>
            {msg.detail}
          </p>)
        })}
      </Alert>
    </div>
  )
}

export default AlertMessage