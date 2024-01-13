import React from 'react'
import Cross from '../../../../../assets/cancel.png'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'
/**
* @author
* @function Failure
**/

export const Failure = (props) => {
  return(
    <div className='success-container'>
        <img src={Cross} className='check-mark' />
        <Typography.Title level={2} className='title'>
           Invalid Token
        </Typography.Title> 
        <Typography.Title level={4} className='subtitle'>
            Click here to go to <Link to='/signup'>signup</Link> 
        </Typography.Title>
    </div>
   )

 }