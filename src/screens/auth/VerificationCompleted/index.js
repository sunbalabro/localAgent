import { Typography, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import api from '../../../api';
import { Success } from './components/sucess';
import { Failure } from './components/failure';
import ApiContext from '../../../context/appContext';

export const VerificationCompleted = (props) => {
    const [verification, setVerification] = useState('');
    const params = useParams();
    const { apiData, verifyUser } = useContext(ApiContext);
    const verifyToken = async (token) => {
        try {
          await verifyUser({token});
        } catch (error) {
          console.error('Error verifying token:', error);
          throw error; // Re-throw the error to handle it in the calling code if needed
        }
      };
    useEffect(()=>{
        const fetchData = async () => {
            if (params.id) {
                try {
                    const token = params.id;
                    await verifyToken(token);
                    // Log the updated apiData after verifyToken
                    console.log(apiData);
          
                    if (apiData && apiData.data.message === 'Successfully verified user') {
                      setVerification('success');
                    } else {
                      setVerification('failure');
                    }
          
                    console.log({ apiData });
                  } catch (error) {
                // Handle error if needed
                message.error('Verification failed. Please try again.');
              }
            }
          };
      
          fetchData();
    },[params.id, verifyToken, apiData])
  return(
    <div className='verificationCont'>
    {
            verification === 'success' ? ( 
                <Success />
            ): (
                <Failure />
            )
        }
    </div>
        
   )

 }