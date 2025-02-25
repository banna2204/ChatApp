import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const Logout = () => {
  const [loading , setLoading] = useState(false);
  const handleClick = async() => {
    setLoading(true);
    try {
      const res = await axios.post('/api/user/logout');
      localStorage.removeItem('messenger');
      Cookies.remove('jwt');
      setLoading(false);
      toast.success('Logout Successful');
    } catch (error) {
      console.log(error);
      toast.error('Failed to logout')
    }
  }

  return (
    <div onClick={handleClick} className='w-10 flex mb-2 self-end cursor-pointer'>
      <img className='invert' width={30} src="logout.png" alt="logout" />
    </div>
  )
}

export default Logout
