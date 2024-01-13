import { Layout } from 'antd'
import React from 'react'
import { AuthMenu } from '../authMenu';


export const AuthLayout = ({children}) => {
    const { Header } = Layout;
  return(
    <>
            <AuthMenu />
            {children}
    </>
   )

 }