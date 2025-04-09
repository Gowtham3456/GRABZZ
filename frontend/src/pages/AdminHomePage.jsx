//import React from 'react'

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
    ];
  return (
    <div className="max-w-7xl mx-auto p-6 ">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

    </div>
  )
}
export default AdminHomePage;
