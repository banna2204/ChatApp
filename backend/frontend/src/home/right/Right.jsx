import React, { useEffect } from 'react'
import Chatuser from './Chatuser.jsx'
import Type from './Type.jsx'
import Messages from './Messages.jsx';
import useConversation from '../../stateManage/UseConversation.js';
import { useAuth } from '../../context/AuthProvider.jsx';

const Right = () => {

  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='w-full bg-slate-950 text-white md:w-[70%] mt-6 md:mt-0'>


    <div>
    {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <Messages/>
            <Type/>
          </>
      )}
    </div>
  </div>
  )
}

export default Right;

const NoChatSelected = () => {
  const {authUser} = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="relative">

        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">
            Welcome to my{" "}
            <span className="font-semibold text-lg">
              {authUser?.user?.name || "ChatApp"}
            </span>
            <br />
            No chat selected, please start conversation by selecting anyone to
            your contacts
          </h1>
        </div>
      </div>
    </>
  );
};
