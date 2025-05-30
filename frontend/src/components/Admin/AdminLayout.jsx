//import React from 'react'

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);

    const toggleSidebar=()=>{
        setIsSidebarOpen(!isSidebarOpen);
    }
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
        {/* Mobile toggle button */}
        <div className="flex md:hidden p-4 bg-black text-white z-20">
            <button onClick={toggleSidebar}>
                <FaBars size={24}></FaBars>
            </button>
            <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
        </div>
        {/* overlay for mobile sidebar */}
        {isSidebarOpen &&(
            <div className="fixed inset-0 z-20 bg-black bg-opacity-60 md:hidden"
            onClick={toggleSidebar}></div>
        )}
        {/* sidebar */}
        <div className={`bg-gray-900 w-64 min-h-screen text-yellow-500 absolute md:relative transform 
            ${isSidebarOpen ?"translate-x-0":"-translate-x-full"} transition-transform duration-300
            md:translate-x-0 md:static md:block z-20`}>
                {/* sidebar component */}
                <AdminSidebar/>
        </div>
        {/* main content */}
        <div className="flex-grow p-6 overflow-auto">
            <Outlet/>

        </div>


    </div>
  )
}
export default AdminLayout;
