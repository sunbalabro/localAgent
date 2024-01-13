import React, { useState } from 'react'
import Logo from '../../assets/logo.png'
import { Col, Row, Typography } from 'antd'

import './style.css';
import Container from '../container/Container';
import { Link } from 'react-router-dom';

export const AuthMenu = (props) => {

  return(
    <header className='menu'>
    <Container>
      <Row>
        <Col
          xs={12}
          lg={6}
        >
          <Link to="/">
              <img src={Logo} width='60%' height='80%' className='logo' alt='logo' />
          </Link>
        </Col>
      </Row>
    </Container>
  </header>
   )

 }