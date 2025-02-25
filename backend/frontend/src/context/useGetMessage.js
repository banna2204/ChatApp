import React, { useEffect, useState } from 'react'
import UseConversation from '../stateManage/UseConversation.js';
import axios from 'axios'

const useGetMessage = () => {

  const [loading,setLoading] = useState(false);
  const {messages,setMessage,selectedConversation} = UseConversation();

  useEffect(()=>{
    const getMessages = async()=>{
      setLoading(true);
      if(selectedConversation && selectedConversation._id){
        try {
          const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log('error in useGetMessages:',error);
          setLoading(false);
        }
      }
    };
    getMessages();
  },[selectedConversation,setMessage]);

  return {
    messages,
    loading
  };
}

export default useGetMessage;
