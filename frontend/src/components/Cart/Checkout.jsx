import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";

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
    const [checkoutId,setCheckoutId]=useState(null);
    const [shippingAddress,setShippingAdress]=useState({
        firstName:"",
        lastName:"",
        address:"",
        city:"",
        postalcode:"",
        country:"",
        phone:"",
    });
    //create checkout function for the form
    const handleCreateCheckout=(e)=>{
        e.preventDefault();
        setCheckoutId(123);

    }

    //handle payement buttton(paypal button)
    const handlePaymentSuccess=(details)=>{
        console.log("Payment succesfull",details);
        navigate("/order-confirmation");
    }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6
    tracking-tighter">
        {/* Left section */}
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl uppercase mb-6">Checkout</h2>
            <form onSubmit={handleCreateCheckout}>
                <h3 className="text-lg mb-4">
                    Contact Details
                </h3>
                <div className="mb-4 ">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" 
                    value="user@example.com" 
                    className="w-full p-2 border-2 border-gray-400 rounded" disabled>
                    </input>
                </div>
                <h3 className="text-lg mb-4">Delivery</h3>

                {/* First name and Last name */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-black">First Name</label>
                        <input 
                        type="text"
                        value={shippingAddress.firstName}
                        onChange={(e)=>setShippingAdress({...shippingAddress,firstName:e.target.value,})} 
                        className="w-full p-2 border-2 border-gray-300 rounded"
                        required>
                        </input>
                    </div>
                    <div>
                        <label className="block text-black">Last Name</label>
                        <input 
                        type="text"
                        value={shippingAddress.lastName}
                        onChange={(e)=>setShippingAdress({...shippingAddress,lastName:e.target.value,})} 
                        className="w-full p-2 border-2 border-gray-300 rounded"
                        required>
                        </input>
                    </div>
                </div>
                {/* Normal address */}
                <div className="mb-4 ">
                    <label className="block text-black">Address</label>
                    <input type="text" value={shippingAddress.address}
                    onChange={(e)=>setShippingAdress({...shippingAddress,address:e.target.value})}
                    className="w-full p-2 border-2 border-gray-300 rounded" required></input>
                </div>
                {/* city and postal adress */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-black">City</label>
                        <input 
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e)=>setShippingAdress({...shippingAddress,city:e.target.value,})} 
                        className="w-full p-2 border-2 border-gray-300 rounded"
                        required>
                        </input>
                    </div>
                    <div>
                        <label className="block text-black">Postal Code</label>
                        <input 
                        type="text"
                        value={shippingAddress.postalcode}
                        onChange={(e)=>setShippingAdress({...shippingAddress,postalcode:e.target.value,})} 
                        className="w-full p-2 border-2 border-gray-300 rounded"
                        required>
                        </input>
                    </div>
                </div>
                {/* Country */}
                <div className="mb-4 ">
                    <label className="block text-black">Country</label>
                    <input type="text" value={shippingAddress.country}
                    onChange={(e)=>setShippingAdress({...shippingAddress,country:e.target.value})}
                    className="w-full p-2 border-2 border-gray-300 rounded" required></input>
                </div>
                {/* Normal address */}
                <div className="mb-4 ">
                    <label className="block text-black">Phone Number</label>
                    <input type="number" value={shippingAddress.phone}
                    onChange={(e)=>setShippingAdress({...shippingAddress,phone:e.target.value})}
                    className="w-full p-2 border-2 border-gray-300 rounded" required></input>
                </div>
                <div className="mt-6">
                    {/* if checkout button is not presnt then proceed to continue to payment button */}
                    {!checkoutId ?(
                        <button type="submit" 
                        className="w-full bg-black text-white py-3 text-xl rounded-lg"> Continue to payment</button>
                    ):(
                        <div>
                            <h3 className="text-lg mb-4">Pay with Paypal</h3>

                            {/* Paypal component */}
                            <PaypalButton 
                            amount={100} 
                            onSuccess={handlePaymentSuccess} 
                            onError={(err)=>alert("Payment Failed.Try again")}/>

                        </div>
                    )}

                </div>
                
            </form>

        </div>
        {/* Right section */}
        <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg mb-4">Order Summary</h3>
            <div className="border-t py-4 mb-4">
                {cart.products.map((product,index)=>(
                    <div key={index} className="flex items-start justify-between py-2 border-b">
                        <div className="flex items-start">
                            <img src={product.image} alt={product.name}
                            className="w-full h-24 object-cover mr-4">

                            </img>
                            <div>
                                <h3 className="text-md">{product.name}</h3>
                                <p className="text-gray-700">Size :{product.size}</p>
                                <p className="text-gray-700">Color :{product.color}</p>
                            </div>
                            
                        </div>
                        <p className="text-xl font-semibold">${product.price?.toLocaleString()}</p>
                    </div>
                ))}
            </div>
            {/* totalPrice */}
            <div className="flex justify-between items-center text-lg mb-4">
                <p>Subtotal</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>
            {/* FOR SHIPPING */}
            <div className="flex justify-between items-center text-lg">
                <p>Shipping</p>
                <p>Free</p>
            </div>
            {/* overall price */}
            <div className="flex justify-between items-center text-lg mt-4 pt-4 border-t">
                <p>Total</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>

            </div>
        </div>

    </div>
  )
}
export default Checkout;
