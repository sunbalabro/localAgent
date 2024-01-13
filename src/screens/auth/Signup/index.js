import { Button, Col, Row, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import '../../../Styles/signup.css'
import VectorImage1 from '../../../assets/vectorImage1.jpg'
import  VectorImage2 from '../../../assets/vectorImage2.jpg'
import { Link } from 'react-router-dom';
export const SignUpPage = (props) => {
    
    return (
      <div className='signup-cont'>
        <div className='signup-subCont'>
            <Typography.Title level={1}>
                LET'S GET STARTED!
            </Typography.Title>
            <Typography.Title level={4}>
                 Please select an option below
            </Typography.Title>
            <Row className='signUpRow1'>
                <Col span={12} className='img1'>
                    <img src={VectorImage2} width='55%' alt='vector1' />
                </Col>
                <Col span={12}>
                   <img src={VectorImage1}  width='50%' alt='vector2' />
                </Col>
            </Row>
            <Row className='signUpRow2'>
                <Col span={12} className='col1'>
                   <Button><Link to='/signup/localAgent'>I'm a Local Agent</Link></Button>
                </Col>
                <Col span={12} className='col2'>
                   <Button><Link to='/signup/client'>I'm a Client</Link></Button>
                </Col>
            </Row>
        </div>
      </div>
    )

}