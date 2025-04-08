import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import React from 'react'
const cart={
    products:[
        {
            name:"Stylish Jacket",
            size:"M",
            color:"Black",
            price:120,
            image:"https://picsum.photos/200?random=1"
        },
        {
            name:"Casual Sneakers",
            size:"42",
            color:"White",
            price:75,
            image:"https://picsum.photos/200?random=2"
        },
    ],
    totalPrice:195,
};

export const Checkout = () => {
    const navigate=useNavigate();
    const [shippingAddress,setShippingAdress]=useState({
        firstNmae:"",
        lastName:"",
        address:"",
        city:"",
        postalcode:"",
        country:"",
        phone:"",
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6
    tracking-tighter">
        {/* Left section */}
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl uppercase mb-6">Checkout</h2>
            <form>
                <h3 className="text-lg mb-4">
                    Contact Details
                </h3>
                <div className="mb-4 ">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" value="user@example.com" className="w-full" p-2 border rounded disabled>
                    </input>
                </div>
                
            </form>

        </div>

    </div>
  )
}
export default Checkout;
