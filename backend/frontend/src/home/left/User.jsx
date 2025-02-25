import React from 'react'
import UseConversation from '../../stateManage/UseConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';

const User = ({user}) => {
  const {selectedConversation,setSelectedConversation} = UseConversation();
  const isSelected = selectedConversation?._id===user._id;
  const {socket,onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div
     className={`hover:bg-slate-300 duration-300 ${isSelected?"bg-slate-700":""}`}
     onClick={()=>setSelectedConversation(user)}>

      <div className='flex gap-3 p-4 hover:bg-slate-600 duration-300 cursor-pointer'>
        <div className={`avatar avatar-${isOnline ? 'online':'offline'}`}>
        <div className="w-14 rounded-full">
              <img src="profile3.jpg" />
            </div>
        </div>
        <div>
          <h1 className='text-xl'>{user.name}</h1>
          <span className='text-sm'>{user.email}</span>
        </div>
      </div>
    </div>
    
  )
}

export default User
