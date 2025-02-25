import React from 'react';
import Users from '../left/Users.jsx';


const Chatlist = ({ onSelectChat }) => {

  return (
    <div>
      {Users.map((chat, index) => (
        <li key={index} className="p-3 border-b cursor-pointer hover:bg-gray-100" 
            onClick={() => onSelectChat(chat)}>
          {chat}
        </li>
      ))}
    </div>
  );
};

export default Chatlist;

