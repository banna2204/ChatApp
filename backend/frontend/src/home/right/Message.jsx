import React from "react";

const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("messenger"));
  const itsme = message.senderId === authUser.user._id;
  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme && "bg-blue-400";
  return (
    <>
      <div className="p-4 " >
        <div className={` ${chatName}`}>
          <div className={`rounded-xl chat-bubble text-white ${chatColor} break-words max-w-[65%] whitespace-pre-wrap`}>
            {message.message}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
