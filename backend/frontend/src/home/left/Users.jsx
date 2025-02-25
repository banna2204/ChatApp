import React from 'react'
import User from './User';
import GetAllUsers from '../../context/GetAllUsers';

const Users = () => {
  const [allUsers,loading] = GetAllUsers();

  return (
    <>
      <div className='scrol overflow-y-auto MinHeight md:max-h-[80vh] '  >

        {allUsers.map((user,index)=>{
          return <User key={index} user={user}/>
        })}
      </div>
        
    </>
  )
}

export default Users;
