//import React from 'react'


//sample data to work
const checkout={
    _id:"12323",
     createdAt:new Date(),
     checkoutItems:[
        {
            productId:"1",
            name:"Jacket",
            color:"black",
            size:"M",
            price:150,
            quantity:1,
            Image:"https://picsum.photos/500/500?random=1",
        },
        {
            productId:"2",
            name:"T-shirt",
            color:"black",
            size:"M",
            price:120,
            quantity:2,
            Image:"https://picsum.photos/500/500?random=2",
        },
     ],
     shippingAddress:{
        address:"123 kovil Street",
        city:"New York",
        country:"USA",

     }
}

export const OrderConfirmationPage = () => {
    //estimate delivery function
    const calculateEstimatedDelivery=(createdAt)=>{
        const orderDate=new Date(createdAt);
        orderDate.setDate(orderDate.getDate()+10);//adds 10 days of order confirmation or delivery
        return orderDate.toLocaleDateString();
    }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
            Thank You for Your Order!
        </h1>
        {/* if the checkout data is present then will to the bewlow thinks athavathu items iruntha pannum */}

        {checkout && (
            <div className="p-6 rounded-lg border"> 
              <div className="flex justify-between mb-20">
                 {/* order id and date */}
                 <div>
                    <h2 className="text-xl font-semibold ">
                        Order ID:{checkout._id}
                    </h2>
                    <p className="text-gray-500">
                        Order date:{checkout.createdAt.toLocaleDateString()}
                    </p>
                 </div>
                 {/* Estimated Delivery */}
                 <div >
                    <p className="text-emerald-700 text-sm">
                        Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
                    </p>
                 </div>
              </div>  
              {/* ordred items */}
              <div className="mb-20 ">
                {checkout.checkoutItems.map((item)=>(
                    <div
                    key={item.productId} 
                    className="flex items-center mb-4">
                        <img src={item.Image} alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md mr-4">

                        </img>
                        {/* for item name and color and size */}
                        <div>
                            <h4 className="text-md font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                                {item.color} | {item.size}
                            </p>
                        </div>
                        {/* price and quantity */}
                        <div className="ml-auto text-right">
                            <p className="text-md ">${item.price}</p>
                            <p className="text-sm text-gray-600 ">Quantity :{item.quantity}</p>
                        </div>
                    </div>
                ))}
              </div>
              {/* Payment and delivery information */}
              <div className="grid grid-cols-2 gap-8">
                {/* Payement information */}
                <div >
                    <h4 className="text-lg font-semibold mb-2">Payment</h4>
                    <p className="gray-700">PayPal</p>
                </div>
                {/* delivery information */}
                <div>
                <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                <p className="gray-700">{checkout.shippingAddress.address}</p>
                <p className="gray-700">{checkout.shippingAddress.city},{" "}{checkout.shippingAddress.country}</p>
                </div>
              </div>
            </div>
        )}

    </div>
  )
}
export default OrderConfirmationPage;
