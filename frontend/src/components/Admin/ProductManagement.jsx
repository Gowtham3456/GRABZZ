//import React from 'react'

import { Link } from "react-router-dom";

export const ProductManagement = () => {
    const products=[
       {
        _id:123456,
        name:"Shirt",
        price:120,
        sku:"123123123",
       },

    ];

    const handleDelete=(id)=>{
        if(window.confirm("Are you sure want to  delete this product?")){
            console.log("deleting Product with id: ",id);
        }
    }
  return (
    <div className="max-width-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Product Management</h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left text-gray-500">

                <thead className="bg-gray-800 text-yellow-500 uppercase text-sm">
                    <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">price</th>
                        <th className="px-4 py-3">sku</th>
                        <th className="px-4 py-3">actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.length>0 ? products.map((product)=>(
                        <tr key={product._id}
                        className="border-b hover:bg-200 cursor-pointer">
                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                {product.name}
                            </td>

                            <td className="p-4">${product.price}</td>
                            <td className="p-4">{product.sku}</td>
                            <td className="p-4">
                                <Link 
                                to={`/admin/products/${product._id}/edit`}
                                className="bg-yellow-500 text-white px-2 py-2 rounded mr-2 hover:bg-yellow-400">
                                    EDIT
                                </Link>

                                <button 
                                onClick={()=>handleDelete(product._id)}
                                className="bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded">
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))
                    :(
                    <tr>
                        <td colSpan={4} className="p-4 text-center text-gray-700 ">
                            No Products found.
                        </td>
                    </tr>
                    )}
                </tbody>

            </table>

        </div>
    </div>
  )
}

export default ProductManagement;
