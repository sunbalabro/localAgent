import Typography from 'antd/es/typography/Typography'
import React from 'react'

/**
* @author
* @function Verify
**/

export const Verify = (props) => {
  return(
    <div className='success-container'>
        <Typography.Title level={2} className='title'>
            We have sent you verification email
        </Typography.Title>
    </div>
   )

 }