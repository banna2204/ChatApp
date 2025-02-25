import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx'
import useConversation from '../stateManage/UseConversation.js';
import sound from "../assets/notifications.mp3"

 
const useSocketMessage = () => {
  const {socket} = useSocketContext();
  const { messages, setMessage } = useConversation();

  // useEffect(() => {
    
    //   const handleNewMessage = (newMessage) => {
      //     setMessage((prevMessages) => [...prevMessages, newMessage]);
      //   };
      
      //   socket.on("newMessage", handleNewMessage);
      
      useEffect(() => {
    if (!socket) return; // Ensure socket is available
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessage([...messages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket,messages,setMessage]);
};

export default useSocketMessage
