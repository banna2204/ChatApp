import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useSocketMessage from "../../context/useSocketMessage.js";

const Messages = () => {
  const { messages=[], loading } = useGetMessage();
  useSocketMessage();

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  return (
    <>
      <div className="p-4 scrol overflow-y-auto text-slate-950 minHeight md:h-[85vh] "  >
        {loading ? (
          <Loading />
        ) : (
          Array.isArray(messages) && messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMsgRef}>
             <Message message={message} />;
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Messages;
