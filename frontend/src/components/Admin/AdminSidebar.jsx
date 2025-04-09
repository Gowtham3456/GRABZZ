//import React from 'react'

import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const AdminSidebar = () => {
    //logout function

    const navigate=useNavigate();
    const handleLogout=()=>{
        navigate("/");
    }
  return (
    <div className="p-6">
        <div className="mb-6">
            <Link to="/admin" className="text-2xl font-semibold">GraBzz</Link>

        </div>
        <h2 className="text-xl font-medium mb-6 text-center ">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-2">
            <NavLink to="/admin/users" className={({isActive})=> isActive ? 
            "bg-gray-700 text-white rounded py-3 px-2 flex items-center":
            "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaUser/>
                <span>Users</span>
            </NavLink>

            {/* products */}

            <NavLink to="/admin/products" className={({isActive})=> isActive ? 
            "bg-gray-700 text-white rounded py-3 px-2 flex items-center":
            "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaBoxOpen/>
                <span>Producst</span>
            </NavLink>

            {/* orders */}
            <NavLink to="/admin/orders" className={({isActive})=> isActive ? 
            "bg-gray-700 text-white rounded py-3 px-2 flex items-center":
            "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaClipboardList/>
                <span>Orders</span>
            </NavLink>

            {/* shop */}
            <NavLink to="/" className={({isActive})=> isActive ? 
            "bg-gray-700 text-white rounded py-3 px-2 flex items-center":
            "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
                <FaStore/>
                <span>Shop</span>
            </NavLink>
        </nav>
        <div className="mt-6 ">
            <button onClick={handleLogout} className="w-full bg-yellow-500 text-black hover:bg-red-700 
            hover:text-black rounded p-3 flex items-center justify-center space-x-2">
                <FaSignOutAlt/>
                <span className=" text-xl font-semibold">Logout</span>
            </button>

        </div>

    </div>
  )
}

export default AdminSidebar;
