import { Layout } from 'antd'
import React from 'react'
import { Menu } from '../menu';

/**
* @author
* @function Layout
**/

export const AppLayout = (props) => {
    const { Header } = Layout;
  return(
    <Layout>
        <Header>
            <Menu />
        </Header>
    </Layout>
   )

 }