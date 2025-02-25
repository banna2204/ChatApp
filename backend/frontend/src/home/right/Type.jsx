import React, { useState } from "react";
import useSendMessage from "../../context/useSendMessage.js";

const Type = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  }
  return (
    <form onSubmit={handleSubmit}>
    <div className="fixed bottom-0 md:w-[70vw] w-[90vw] justify-center items-center flex bg-gray-800">
      <div className="flex gap-3 bg-slate-900  md:mx-6 mx-4 my-2 rounded-lg px-2 md:w-[40vw] w-full">
        <input
        onChange={(e)=>setMessage(e.target.value)}
          type="text"
          value={message}
          placeholder="Type here..."
          className="outline-none border-none py-3 w-full"
        />
        <button>
          <img width={30} src="send.png" alt="send" />
        </button>
      </div>
    </div>
    </form>
  );
};

export default Type;
