import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [authUser,setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password','');
  const confirmpassword = watch('confirmpassword','');
  const validatePasswordMatch = (value) => {
    return value === password || "Password don't match";
  }
  const onSubmit = async(data) => {
    const userInfo = {
      name:data.name,
      email:data.email,
      password:data.password,
      confirmpassword:data.confirmPassword,
    };
    await axios.post('/api/user/signup',userInfo)
    .then((response)=>{
      if(response.data){
        toast.success('Signup Successful')
      }
      localStorage.setItem('messenger',JSON.stringify(response.data));
      setAuthUser(response.data);
    })
    .catch((err)=>{
      toast.error(err.response.data.error)
    });

  }
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full p-5 mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1 md:w-[25%] w-[70%]" 
        >
          <h1 className="text-3xl font-bold">Create a new account</h1>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="border-none bg-white text-black p-2 rounded-lg mt-5"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500 text-sm">**This field is required**</span>}

          <input
            type="text"
            id="name"
            placeholder="name"
            className="border-none bg-white text-black p-2 rounded-lg mt-5"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-500 text-sm">**This field is required**</span>}

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="border-none bg-white text-black p-2 rounded-lg mt-5"
            {...register("password", { required: true })}
          />
          {errors.password && <span className="text-red-500 text-sm">**This field is required**</span>}

          <input
            type="password"
            id="confirmpassword"
            placeholder="Confirm password"
            className="border-none bg-white text-black p-2 rounded-lg mt-5"
            {...register("confirmPassword", { required: true,
              validate:validatePasswordMatch,
             })}
          />
          {errors.confirmPassword && (<span className="text-red-500 text-sm">**{errors.confirmPassword.message}**</span>)}

          <div className="flex justify-center">
            <input
              className=" w-full px-3 rounded-lg py-1 font-bold bg-blue-800 hover:bg-blue-900 duration-300 cursor-pointer mt-5"
              type="submit"
              value="Signup"
            />
          </div>
          <p className=" text-md mt-3">
            Have any account?
            <Link to={'/login'} className="font-bold text-md text-blue-400 hover:text-blue-500 text-sm underline cursor-pointer">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
