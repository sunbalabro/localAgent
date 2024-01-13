import Typography from 'antd/es/typography/Typography'
import React from 'react'
import Check from '../../../../../assets/check-mark.png'
/**
* @author
* @function Success
**/
import "./style.css"
import { Link } from 'react-router-dom'
export const Success = (props) => {
    const {verification, log} = props
  return(
    <div  className="success-container">
        <img src={Check} alt='correct' className="check-mark" />
        <Typography.Title level={2} className="title">
        Verification completed
            
        </Typography.Title>
        <Typography.Title level={4} className="subtitle">
        Congratulations you are a member of local agent. 
            
        </Typography.Title>
                <Typography.Title level={4} className='subtitle'>
            Click here to  &nbsp;
            <Link to='/'>
             login
            </Link> 
        </Typography.Title>
         
        
    </div>
   )

 }