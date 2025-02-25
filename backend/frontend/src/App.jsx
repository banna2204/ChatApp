import { useState } from "react";
import "./App.css";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import Logout from "./components/Logout";
import toast, { Toaster } from 'react-hot-toast';
import Toggle from "./home/toggle/Toggle";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser)

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="h-screen">

                <div className=" md:hidden ">
                  <Toggle/>
                </div>
                <div className="hidden md:flex ">
                <Logout/>
                <Left />
                <Right />
                </div>

              </div>
            ) : (
              <Navigate to={"/login"}/>
            )
          }
        />
        <Route path="/login" element={authUser? <Navigate to={'/'}/> :<Login />} />
        <Route path="/signup" element={authUser? <Navigate to={'/'}/> :<Signup />} />
        <Route path="/logout" element={authUser? <Navigate to={'/'}/> :<Login />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
