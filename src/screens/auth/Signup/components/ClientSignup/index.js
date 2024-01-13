import { Form, Input, Row, Col, Typography, Select, Button, Tag } from 'antd'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import "../../../../../Styles/localAgentSignup.css"
import { useForm, useWatch } from 'antd/es/form/Form'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useIsLoggedIn } from '../../../Auth'
import ApiContext from '../../../../../context/appContext'

const getBase64 = (img, callback) => {
   const reader = new FileReader();
   reader.addEventListener('load', () => callback(reader.result));
   reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
   if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
   }
   const isLt2M = file.size / 1024 / 1024 < 2;
   if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
   }
   return isJpgOrPng && isLt2M;
};
export const ClientSignup = () => {
   const [loading, setLoading] = useState(false);
   const [imageUrl, setImageUrl] = useState();
   const {signUpUser } = useContext(ApiContext)
   const [messageApi, contextHolder] = message.useMessage();
   const navigate = useNavigate()
   const logged = useIsLoggedIn()
   const handleChange = (info) => {
      if (info.file.status === 'uploading') {
         setLoading(true);
         return;
      }
      if (info.file.status === 'done') {
         // Get this url from response in real world.
         getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
         });
      }
   };
   const uploadButton = (
      <button
         style={{
            border: 0,
            background: 'none',
         }}
         type="button"
      >
         {loading ? <LoadingOutlined /> : <PlusOutlined />}
         <div
            style={{
               marginTop: 8,
            }}
         >
            Upload
         </div>
      </button>
   );

   const [form] = useForm()
  
   const onFinish = (values) => {
      const {
        email,
        firstname,
        lastname,
        password,
        profilePic
      } = values
      const userData = {
        email,
        firstname,
        lastname,
        password,
        profilePic,
        role: "client"
      }
         signUpUser({userData})
            form.resetFields()
            setImageUrl('')
            navigate('/verify')
      

      console.log('Success:', values);
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   return (
      <div className='localAgentCont'>
         <div className='localAgentSignup'>
            <Typography.Title className='title1' level={1}>
               Join as a Client
            </Typography.Title>
            <Typography.Title className='title2' level={4}>
               Local Agent is the world's most trusted marketplace. Not a client? <span><Link to='/signup/localAgent'>Join as a local agent</Link></span>
            </Typography.Title>

            <Form
               className='localSignUpForm'
               form={form}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
            >
               <Form.Item>
                  <span className='formLabel'>Profile Image</span>
               </Form.Item>
               <Form.Item
                  name='profilePic'
                  rules={[
                     {
                        required: true,
                        message: 'Please select your profile pic!',
                     },
                  ]}
               >
                  <Upload
                     name="avatar"
                     listType="picture-circle"
                     className="avatar-uploader"
                     showUploadList={false}
                     action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                     beforeUpload={beforeUpload}
                     onChange={handleChange}
                     maxCount={1}
                  >
                     {imageUrl ? (
                        <img
                           src={imageUrl}
                           alt="avatar"
                           style={{
                              width: '100%',
                           }}
                        />
                     ) : (
                        uploadButton
                     )}
                  </Upload>
               </Form.Item>
               <Row>
                  <Col className='localSignupformItem'>
                     <Form.Item>
                        <span className='formLabel'>
                           First name
                        </span>
                     </Form.Item>
                     <Form.Item
                        name='firstname'
                        rules={[
                           {
                              required: true,
                              message: 'Please input your first name!',
                           },
                        ]}
                     >
                        <Input className='localsignUpinp' />
                     </Form.Item>
                  </Col>
                  <Col className='localSignupformItem'>
                     <Form.Item>
                        <span className='formLabel'>
                           Last Name
                        </span>
                     </Form.Item>
                     <Form.Item
                        name='lastname'
                        rules={[
                           {
                              required: true,
                              message: 'Please input your last name!',
                           },
                        ]}
                     >
                        <Input className='localsignUpinp' />
                     </Form.Item>
                  </Col>
               </Row>
               <Form.Item>
                  <span className='formLabel'>Email address</span>
               </Form.Item>
               <Form.Item
                  name='email'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your email address!'
                     }
                  ]}
               >
                  <Input className='formInp' placeholder='hello@example.com' />
               </Form.Item>
               <Form.Item>
                  <span className='formLabel'>Passowrd</span>
               </Form.Item>
               <Form.Item
                  name='password'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your password!'
                     }
                  ]}
               >
                  <Input.Password className='formInp' />
               </Form.Item>
               
               <Form.Item>
                  <Button htmlType="submit" className='localSignupbtn'>
                     Join
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </div>
   )

}