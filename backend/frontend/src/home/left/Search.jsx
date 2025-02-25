import React, { useState } from "react";
import GetAllUsers from "../../context/GetAllUsers.jsx";
import useConversation from "../../stateManage/UseConversation.js";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [allUsers] = GetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    
    const conversation = allUsers.find((user) =>{
      return user.name.toLowerCase().includes(search.toLowerCase())
    });
  
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div>
      <form
        onSubmit={
          handleSubmit
        }
      >
        <div className="flex gap-3 bg-slate-900  mx-6 my-2 rounded-lg w-[80%]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="outline-none border-none p-3 w-[85%]"
          />
          <button className="cursor-pointer">
            <lord-icon
              src="https://cdn.lordicon.com/wjyqkiew.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#08a88a"
              style={{ width: "25px", height: "25px", paddingTop: "4px" }}
            ></lord-icon>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
