import React, { useState } from 'react';
import ApiContext from './appContext';
import api from '../api';
import { useSetToken } from '../screens/auth/Auth';

const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);
  const [isCreated, setIsCreated] = useState(null);
  const [UserData, setUserData] = useState(null);
  const verifyUser = async ({token}) => {
    // Make your API call here and update the state
    try {
      const response = await api.post('/auth/verification', {token});
      const data = await response;
      setApiData(data);
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  const signUpUser = async ({userData}) => {
    try{
        const response = await api.post('/auth/signup', {userData});
        const data = await response;
        if(data.data.message == 'Successfully created user'){
           const d = data.data.message
            setIsCreated(true);
            console.log(d)
        }
    } catch (error) {
        console.error('Error Signing Up user : ' , error)
    }
  }

  const signinUser = async ({userData})=> {
    try{
        const response = await api.post('/auth/signin', {userData})
        const data = await response;
        setUserData(data)
       
    }catch(error){
        console.error('Error Signing in user :' , error)
    }
  }

  return (
    <ApiContext.Provider value={{ apiData, verifyUser, signUpUser, signinUser, isCreated, UserData }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;