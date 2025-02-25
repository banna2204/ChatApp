import { useState } from "react";
import Left from "../left/Left.jsx";
import Right from "../right/Right.jsx";
import UseConversation from "../../stateManage/UseConversation.js";
import Logout from "../../components/Logout.jsx";

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const {selectedConversation,setSelectedConversation} = UseConversation();

  return (
    <div className="drawer md:drawer-open ">
      {/* Drawer Toggle (Only for small screens) */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Right Section: Chat Conversation */}
      <div className="drawer-content flex flex-col h-screen relative">
        {/* Navbar (Visible on Small Screens) */}
        <div className="p-1  flex items-center md:hidden mb-1 fixed top-0">
          <label htmlFor="my-drawer" >
            ☰ Open Chats
          </label>
        </div>
        

        {/* Chat Conversation */}
        <div className="flex-grow p-4" style={{ maxHeight: "60vh"}}>
          {selectedConversation ? (
            <>
              <Right/>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat to start conversation
            </div>
            )}
        </div>
      </div>

      {/* Left Section: Sidebar Chat List */}
      <div className="drawer-side z-10 " >
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-90 p-4">
              <button 
                className="md:hidden btn btn-secondary mb-2 "
                onClick={() => document.getElementById("my-drawer").checked = false}
              >
                ← Back to Messages
              </button>
          <Left onSelectChat={(chat) => { 
            setSelectedConversation(chat);
            document.getElementById("my-drawer").checked = false; // Close drawer on selection
          }} />
          <button 
                  className="md:hidden btn btn-secondary flex self-end  cursor-pointer mt-3">
                  <Logout/>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default ChatApp;
