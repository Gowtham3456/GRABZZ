//import React from 'react'

import { useState } from "react";

export const EditProductPage = () => {
    const [productData,setProductData]=useState({
        name:"",
        description:"",
        price:0,
        countInStock:0,
        sku:"",
        category:"",
        brand:"",
        sizes:[],
        colors:[],
        collections:"",
        material:"",
        gender:"",
        images:[
            {
                url:"https://picsum.photos/500/500?random=2"
            },
            {
                url:"https://picsum.photos/500/500?random=3"
            },
        ],
    });

    //handlechange function
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setProductData((prevData)=>({...prevData,[name]:value}));
    }

    //handle image function
    const handleImageUpload=async(e)=>{
        const file=e.target.files[0];
        console.log(file);
    }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md ">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
        <form>
            {/* name */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Product Name</label>
                <input 
                type="text" 
                name="name" 
                value={productData.name}
                onChange={handleChange}
                className="w-full border border-2 border-gray-300 rounded-md p-2" required>
                </input>
            </div>

            {/* description */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Description</label>
                <textarea 
                name="description" 
                value={productData.description}
                onChange={handleChange}
                className="w-full border border-2 border-gray-300 rounded-md p-2" rows={4} required>
                </textarea>
            </div>
            {/* price */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Price</label>
                <input 
                type="number" 
                name="price" 
                value={productData.price}
                onChange={handleChange}
                className="w-full border border-2 border-gray-300 rounded-md p-2" required>
                </input>
            </div>
            {/* count in stock */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Count in Stock</label>
                <input 
                type="number" 
                name="counInStock" 
                value={productData.countInStock}
                onChange={handleChange}
                className="w-full border border-2 border-gray-300 rounded-md p-2" required>
                </input>
            </div>

            {/* SKU */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">SKU</label>
                <input 
                type="text" 
                name="sku" 
                value={productData.sku}
                onChange={handleChange}
                className="w-full border border-2 border-gray-300 rounded-md p-2" required>
                </input>
            </div>

            {/* Sizes */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Sizes(comma-seperated)</label>
                <input 
                type="text" 
                name="sizes" 
                value={productData.sizes.join(",")}
                onChange={(e)=>setProductData({
                    ...productData,
                    sizes:e.target.value.split(",").map((size)=>size.trim())})}
                className="w-full border border-2 border-gray-300 rounded-md p-2" required>
                </input>
            </div>

             {/* colors */}
             <div className="mb-6">
                <label className="block font-semibold mb-2">Colors(comma-seperated)</label>
                <input 
                type="text" 
                name="colors" 
                value={productData.colors.join(",")}
                onChange={(e)=>setProductData({
                    ...productData,
                    colors:e.target.value.split(",").map((color)=>color.trim())})}
                className="w-full border border-2 border-gray-300 rounded-md p-2" required>
                </input>
            </div>


            {/* image upload */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Upload Image</label>

                <input
                type="file"
                onChange={handleImageUpload}>
                </input>

            </div>
        </form>

    </div>
  )
}
export default EditProductPage;
