import { Form, Input, Row, Col, Typography, Select, Button, Tag } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import "../../../../../Styles/localAgentSignup.css"
import { useForm, useWatch } from 'antd/es/form/Form'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import ApiContext from '../../../../../context/appContext'
import { useIsLoggedIn } from '../../../Auth'

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
export const LocalAgentSignUp = (props) => {
   const [countries, setCountries] = useState([]);
   const [selectedTask, setSelectedTask] = useState('')
   const [loading, setLoading] = useState(false);
   const [imageUrl, setImageUrl] = useState();
   const [resources, setResources] = useState([]);
   const [prices, setPrices] = useState([]);
   const [deliverDays, setDeliverDays] = useState([])
   const [inputValue, setInputValue] = useState('');
   const inputRef = useRef(null);
   const [messageApi, contextHolder] = message.useMessage();
const isLogged = useIsLoggedIn()
const navigate = useNavigate()
   const { signUpUser, isCreated } = useContext(ApiContext);
   const warning = () => {
      messageApi.open({
        type: 'warning',
        content: 'Please add any resource!',
      });
    };
   const handleInputChange = (e) => {
      setInputValue(e.target.value);
   };

   const handleKeyPress = () => {
      if (inputValue !== '') {
         setResources([...resources, inputValue.trim()]);
         setInputValue('');
         form.resetFields(['resourceInp'])
      }
   };

   const handleRemoveItem = (itemToRemove) => {
      const updatedItems = resources.filter((item) => item !== itemToRemove);
      setResources(updatedItems);
   };
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
   const handleTask = (e) => {
      setSelectedTask(e)
   }
   const onFinish = (values) => {
      if (values.taskOffered.includes('custom')) {
         values.taskOffered = values.taskOffered.map((task) =>
            task === 'custom' ? values.customTask : task
         );
      }
      const prices = [];
   const deliveryDays = [];

   values.taskOffered.forEach((task, index) => {
      console.log(`Price${index}:`, values[`price${index}`]);
      console.log(`DeliveryDays${index}:`, values[`deliveryDays${index}`]);

      prices.push(values[`price${index}`]);
      deliveryDays.push(values[`deliveryDays${index}`]);
   });
      if(resources.length == 0){
         warning()
         return;
      }
      const {
         firstname,
         lastname,
         email,
         password,
         country,
         location,
         taskOffered,
         customTask,
         howItWorks,
         profilePic
       } = values;
       
   
       const userData = {
         firstname,
         lastname,
         email,
         password,
         country,
         location,
         taskOffered,
         customTask,
         howItWorks,
         resources,
         prices,
         deliveryDays,
         role:'seller',
         profilePic
       };
   
      signUpUser({userData})

       console.log('Success:', userData);
         form.resetFields()
         setImageUrl('')
         setResources([]);
         navigate('/verify')
           
   };
   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   useEffect(() => {
      if(isLogged){
         navigate('/profile')
      }else{
         const fetchData = async () => {
            try {
               const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
               const data = await response.json();
               const sortedData = [...data].sort((a, b) => {
                  const commonA = a.name.common.toUpperCase();
                  const commonB = b.name.common.toUpperCase();
   
                  if (commonA < commonB) {
                     return -1;
                  }
                  if (commonA > commonB) {
                     return 1;
                  }
                  return 0;
               });
               setCountries(sortedData)
            } catch (error) {
               console.error('Error fetching data:', error);
            }
         };
   
         fetchData();
      }
   }, []);

   const taskOffer = useWatch('taskOffered', form);
   const customTaskName = useWatch('customTask', form);
   return (
      <div className='localAgentCont'>
         <div className='localAgentSignup'>
            <Typography.Title className='title1' level={1}>
               Join as a Local Agent
            </Typography.Title>
            <Typography.Title className='title2' level={4}>
               Local Agent is the world's most trusted marketplace. Not a local agent? <span><Link to='/signup/client'>Join as a client</Link></span>
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
                  <span className='formLabel'>Where are you based for work</span>
                  <p className='formSublabel'>Country</p>
               </Form.Item>
               <Form.Item
                  name='country'
                  rules={[
                     {
                        required: true,
                        message: 'Please select your country!'
                     }
                  ]}
               >
                  <Select
                     options={(countries || []).map((c) => ({
                        value: c.name.common,
                        label: c.name.common,
                     }))}
                     className='formSelect'
                  />
               </Form.Item>
               <Form.Item>
                  <p className='formSublabel'>
                     Location
                  </p>
               </Form.Item>
               <Form.Item
                  name='location'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your location!'
                     }
                  ]}
               >
                  <Input className='formInp' placeholder='eg London' />
               </Form.Item>
               <Form.Item>
                  <span className='formLabel'>Task you offer</span>
               </Form.Item>
               <Form.Item
                  name='taskOffered'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your location!'
                     }
                  ]}
               >
                  <Select
                     mode='multiple'
                     value={selectedTask}
                     onChange={handleTask}
                     className='formSelect'
                     options={[
                        {
                           value: 'Audit & Inspection',
                           label: 'Audit & Inspection'
                        },
                        {
                           value: 'custom',
                           label: 'Miscellaneous'
                        }
                     ]}
                  />
               </Form.Item>
               {
                  taskOffer && taskOffer.includes('custom') ?
                     (
                        <>
                           <Form.Item>
                              Specify Your task
                           </Form.Item>
                           <Form.Item
                              name='customTask'
                              rules={[
                                 {
                                    required: true,
                                    message: 'Please input your location!'
                                 }
                              ]}
                           >
                              <Input />
                           </Form.Item>
                        </>
                     ) : null
               }
               {
                  taskOffer !== undefined ? taskOffer.map((item, index) => (

                     <Row>
                        <Col span={8}>
                          {index + 1}. {item == 'custom' && customTaskName ? customTaskName : item}
                        </Col>
                        <Col span={8}>
                           <Form.Item name={`price${index}`}>
                              <Input placeholder='price' type='number' />
                           </Form.Item>   
                        </Col>
                        <Col span={8}>
                           <Form.Item name={`deliveryDays${index}`}>
                              <Input placeholder='delivery days' type='number' />
                           </Form.Item>
                        </Col>
                     </Row>
                  )) : null
               }
               <Form.Item>
                  <span className='formLabel'>
                     How it works
                  </span>
               </Form.Item>
               <Form.Item
                  name='howItWorks'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your work details!'
                     }
                  ]}
               >
                  <Input.TextArea />
               </Form.Item>
                <Form.Item>
                 <span className='formLabel'>
                 What resource you will give
                </span>
                </Form.Item>
                <Row>
                  <Col>
               <Form.Item
                  name="resourceInp"
               >
                  <Input value={inputValue} className='formInp' onChange={handleInputChange} />

               </Form.Item>
                  </Col>
                  <Col>
                  <Button className='resourceBtn' onClick={handleKeyPress}>
                     Add 
                  </Button>
                  </Col>
                </Row>
                  <Form.Item
                    name='resources'
                  >
                  {resources.map((item, index) => (
                     
                        <Tag
                           key={index}
                           closable
                           onClose={() => handleRemoveItem(item)}
                           style={{ marginRight: '8px', marginBottom: '8px', }}
                        >
                           {item}
                        </Tag>
                  ))}
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