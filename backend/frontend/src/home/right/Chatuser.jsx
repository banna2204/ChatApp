import React from "react";
import useConversation from "../../stateManage/UseConversation.js";
import { useSocketContext } from '../../context/SocketContext.jsx';

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };


  return (
    <>
      <div className="flex gap-2 p-3 bg-gray-900 hover:bg-gray-600 duration-300">
        <div>
          <div className={`avatar avatar-online}`}>
            <div className="w-12 rounded-full">
              <img src="profile3.jpg" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl">{selectedConversation.name}</h1>
          <span className="text-sm">
          {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </>
  );
};

export default Chatuser;
