//import React from 'react'

import { useState } from "react";

export const UserManagement = () => {
    const users=[
        {
            _id:123123,
            name:"Gowtham",
            email:"gowthamabc@gmail.com",
            role:"admin",
        },
    ];
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"customer",
    });

    //handle change function
    const handleChange=(e)=>{
        setFormData({
            ...formData,
           [ e.target.name]:e.target.value,
        });
    }

    //handleSubmit function
    const handleSubmit=(e)=>{
        e.preventDefault();
        //console.log(formData); to print the data to the console for checking
        //reset the form after submission
        setFormData({
            name:"",
            email:"",
            password:"",
            role:"customer",   
        });
    }

    //handle role change function
    const handleRoleChange=(userId,newRole)=>{
       // console.log({id:userId,role:newRole});
    }

    //handle delete function
    const handleDeleteUser=(userId)=>{
        if(window.confirm("Are you sure want to  delete this user?")){
           // console.log("deleting user with id: ",userId);
        }
    }
  return (
    <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">User Management</h2>
        <div  className="p-6 rounded-lg mb-6">
            <h3 className="text-lg font-bold mb-4"> Add New User</h3>
            <form onSubmit={handleSubmit}>
                {/* name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleChange}
                    className="w-full p-2 border-2 rounded" required></input>
                </div>
                {/* email */}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleChange}
                    className="w-full p-2 border-2 rounded" required></input>
                </div>

                {/* password */}
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" 
                    name="password"
                    value={formData.password} 
                    onChange={handleChange}
                    className="w-full p-2 border-2 rounded" required></input>
                </div>

                {/* role */}
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange}
                    className="w-full p-2 border-2 rounded">
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>

                    </select>
                </div>
                    {/* add user button */}
                <button type="submit" className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-black hover:text-yellow-500">
                    Add User

                </button>
            </form>
        </div>

        {/* below user adding box -user list mangement*/}
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left text-gray-700">
                <thead className="bg-gray-800 text-sx text-yellow-500 uppercase">
                    <tr>
                        <th className="py-3 px-4">NAME</th>
                        <th className="py-3 px-4">EMAIL</th>
                        <th className="py-3 px-4">ROLE</th>
                        <th className="py-3 px-4">ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user)=>(
                        <tr key={user._id} className="border-b hover:bg-gray-100">
                            <td className="p-4 font-mdium text-gray-900 whitespace-nowrap">
                                {user.name}
                            </td>
                            <td className="p-4">{user.email}</td>

                            <td className="p-4">
                                <select value={user.role} 
                                onChange={(e)=>handleRoleChange(user._id,e.target.value)}
                                className="p-2 bordr-2 rounded">

                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>

                            <td className="p-4">
                                <button 
                                onClick={()=>handleDeleteUser(user._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-700">
                                        Delete
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>


    </div>
  )
}
export default UserManagement;
