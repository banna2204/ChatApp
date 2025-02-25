import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function Login() {
  const [authUser,setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email:data.email,
      password:data.password,
    };
    axios.post('/api/user/login',userInfo)
    .then((response)=>{
      if(response.data){
        toast.success('Login Successfully')
      }
      localStorage.setItem('messenger',JSON.stringify(response.data));
      setAuthUser(response.data);
    })
    .catch((err)=>{
      toast.error(err.response.data.message);
    });

  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full p-5 mt-10">
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 text-sm md:w-[25%] w-[70%]">
          <h1 className="text-3xl font-bold">Login your account</h1>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="mt-5 border-none bg-white text-black p-2 rounded-lg"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500 text-sm">**This field is required**</span>}


          <input
            type="password"
            id="password"
            placeholder="Password"
            className="mt-5 border-none bg-white text-black p-2 rounded-lg"
            {...register("password", { required: true })}
          />
          {errors.password && <span className="text-red-500 text-sm">**This field is required**</span>}


          <div className="flex justify-center mt-5">
            <input
              className=" w-full px-3 rounded-lg py-1 font-bold bg-blue-800 hover:bg-blue-900 duration-300 cursor-pointer"
              type="submit"
              value="Login"
            />
          </div>
          <p className=" text-md mt-2">
            Don't have account?
            <Link to={'/signup'} className="font-bold text-md text-blue-400 hover:text-blue-500 underline cursor-pointer">
              {" "}
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
