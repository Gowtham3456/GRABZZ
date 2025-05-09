//import React from 'react'

import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.webp";
//new
import {loginUser} from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        //console.log("User Login :",{email,password});
        dispatch(loginUser({email,password}));
    }
  return (
    <div className="flex">
        <div className="w-full flex md:w-1/2 flex-col justify-center  items-center p-8 md:p-12">
            <form  onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border-2 border-yellow-500 p-8 md:p-12">
                <div className="flex justify-center mb-6">
                    <h2 className="text-3xl font-bold text-yellow-500 ">GraBzz</h2>
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center ">Hey there!</h2>
                <p className="text-center mb-6">
                    Enter your Username and Password to Login
                </p>
                <div className="mb-4">
                    <label className="block text-medium font-bold mb-2">Email</label>
                    <input 
                    type="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full p-2 border border-yellow-500 bg-white rounded placeholder-gray-700 
                    placeholder-font-bold"
                    placeholder="Enter your email address"></input>
                </div>
                <div  className="mb-4">
                    <label className="block text-medium font-bold mb-2">Password</label>
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full p-2 border rounded border-yellow-500 bg-white rounded placeholder-gray-700 "
                    placeholder="Enter your password"></input>
                </div>
                <button type="submit" className="w-full 
                bg-black text-yellow-500 p-2 rounded-lg font-bold hover:bg-yellow-500 hover:text-black transition">Sign In</button>
                <p className="mt-6 text-center text-sm">Don't have an account?
                    <Link to="/register" className="text-blue-500 "> Register</Link>
                </p>
            </form>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-800">
            <div className="h-full flex flex-col justify-center items-center">
                <img src={login} alt=" login to account" className="h-[750px] w-full object-cover"></img>

            </div>
        </div>

    </div>
  )
}
export default Login;
