//import React from 'react'

import { Link } from "react-router-dom";

export const AdminHomePage = () => {
    const orders=[
        {
            _id:12321,
            user:{
                name:"Gowtham"
            },
            totalPrice:120,
            status:"Processing"
        },
        {
            _id:12321,
            user:{
                name:"Gowtham"
            },
            totalPrice:120,
            status:"Processing"
        },
        {
            _id:12321,
            user:{
                name:"Gowtham"
            },
            totalPrice:120,
            status:"Processing"
        },
        
    ];
  return (
    <div className="max-w-7xl mx-auto p-6 ">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
           {/* Revenue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 shadow-lg  rounded-lg">
                <h2 className="text-xl font-semibold ">Revenue</h2>
                <p className="text-2xl ">$10000</p>
            </div>
            {/* Total orders */}
            <div className="p-4 shadow-lg  rounded-lg">
                <h2 className="text-xl font-semibold ">Total Orders</h2>
                <p className="text-2xl ">200</p>
                <Link to="/admin/orders" className="text-blue-500 hover:underline"> Mange Orders</Link>
            </div>
            {/* total products */}
            <div className="p-4 shadow-lg  rounded-lg">
                <h2 className="text-xl font-semibold ">Total Products</h2>
                <p className="text-2xl ">100</p>
                <Link to="/admin/products" className="text-blue-500 hover:underline"> Mange Products</Link>
            </div>
        </div>
        {/* table for orderid,user,total price */}

        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-gray-700">
                    <thead className="bg-gray-900 text-xs uppercase text-yellow-500">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Total Price</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length>0 ? (
                            orders.map((order)=>(
                                <tr key={order._id} className="border-b hover:bg-gray-100 cursor-pointer">
                                    <td className="p-4">{order._id}</td>
                                    <td className="p-4">{order.user.name}</td>
                                    <td className="p-4">{order.totalPrice}</td>
                                    <td className="p-4">{order.status}</td>

                                </tr>

                            ))
                        ):(
                            <tr> 
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No recent orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

        </div>


    </div>
  )
}
export default AdminHomePage;
