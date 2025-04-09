//import React from 'react'
import { useState } from "react"
import { IoMdClose } from "react-icons/io";
import Cartcomponents from "../Cart/Cartcomponents";
import { useNavigate } from "react-router-dom";

export const CardDrawer = ({drawerOpen,toggleDrawer}) => {
    const navigate=useNavigate();
    const handleCheckout=()=>{
         toggleDrawer();
        navigate("/checkout");
    }
   
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:2-1/2 md:w-[20rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ?"translate-x-0":"translate-x-full"}`}>
        {/*close button*/}
        <div className="flex justify-end p-4">
            <button onClick={toggleDrawer}>
                <IoMdClose className="h-6 w-6 text-gray-600"/>
            </button>
        </div>
        {/* Card content with scorallble Area */}
        <div className="flex-grow p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            {/* Component for cart contents */}
            <Cartcomponents/>

        </div>
        {/* Checkout button fixed at the bottom */}
        <div className="p-4 bg-white sticky bottom-0">
            <button
            onClick={handleCheckout} 
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800
            transition">Checkout</button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center ">Shipping,taxes and discount codes calculated at checkout</p>
        </div>
    </div>
  )
}
export default CardDrawer;