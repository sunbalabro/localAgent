import { Button, Col, Form, Input, Row, Typography, message } from 'antd'
import React, { useContext } from 'react'

import "../../../Styles/signin.css"
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { useSetToken } from '../Auth';
import { useCookies } from 'react-cookie';
import ApiContext from '../../../context/appContext';
export const LoginPage = (props) => {
    const {signinUser, UserData}= useContext(ApiContext)
    const [, setCookie] = useCookies();
     
   const [messageApi, contextHolder] = message.useMessage();
   const navigate = useNavigate()
    const [form] = useForm();
    const onFinish = async (values) => {
        try {

            const {
                email,
                password
            } = values;

            const userData = {
                email,
                password
            } 
            await signinUser({userData});
    
            if (UserData) {
                const Apimessage = UserData.data.message;
    
                if (Apimessage == 'Successfully login') {
                    form.resetFields();
                    console.log('Success:', values);
                    console.log({ UserData });
                    setCookie("token", UserData.data.token, { secure: true });
                    navigate('/profile');
                } else {
                    console.log('Entered else condition');
                    messageApi.open({
                        type: 'error',
                        content: Apimessage
                    });
                }
                console.log(Apimessage);
            }
        } catch (error) {
            // Handle error if signinUser fails
            console.error('Error during login:', error);
        }
    };
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
  return(
    <div className='signin-cont'>
            {contextHolder}
            <div className='signin'>
                <Typography.Title className='signIntitle'>
                    Login to Your Account
                </Typography.Title>
                <Form
                    className='signinForm'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input className='inp' placeholder='Email' />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input type='password' className='inp' placeholder='Password' />
                            </Form.Item>
                    <Form.Item
                    >
                        <Button htmlType="submit" className='signInbtn'>
                            <a>
                                <span>
                            Sign In
                                </span>
                            </a>
                        </Button>
                    </Form.Item>
                </Form>

            </div>
            <div className='welcomeSignInBoard'>
                <h1>New Here?</h1>
                <h3>Sign up and discover a great amount of new opportunities</h3>
                <Button>
                    <span>
                    <Link to='/signup'>
                        Sign Up
                    </Link>
                    </span>
                </Button>
            </div>
        </div>
   )

 }