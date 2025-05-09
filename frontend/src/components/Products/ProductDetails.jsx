//import React from 'react'

import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

//best seller ku use panrathu
// const selectedProduct={
//     name:"Stylish Jacket",
//     price:120,
//     originalPrice:150,
//     description:"This is a Stylish Jacket perfect for any occasion ",
//     brand:"FashionBrand",
//     material:"Leather",
//     sizes:["S","M","L","XL"],
//     colors:["Red","Black"],
//     images:[
//         {
//             url:"https://picsum.photos/500/500?random=1",
//             altText:"Stylish Jcaket 1"
//         },
//         {
//             url:"https://picsum.photos/500/500?random=2",
//             altText:"Stylish Jcaket 2"
//         },
//     ],
// };
// const similiarProducts=[
//     {
//         _id:1,
//         name:"Product 1",
//         price:100,
//         images:[{url:"https://picsum.photos/500/500?random=1"},]
//     },
//     {
//         _id:1,
//         name:"Product 2",
//         price:100,
//         images:[{url:"https://picsum.photos/500/500?random=2"},]
//     },
//     {
//         _id:3,
//         name:"Product 3",
//         price:100,
//         images:[{url:"https://picsum.photos/500/500?random=3"},]
//     },
//     {
//         _id:4,
//         name:"Product 4",
//         price:100,
//         images:[{url:"https://picsum.photos/500/500?random=4"},]
//     },
// ]
export const ProductDetails = ({productId}) => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {selectedProduct,loading,error,similarProducts}=useSelector(
        (state)=>state.products
    );
    const {user,guestId}=useSelector((state)=>state.auth);
    const [mainImage,setMainImage]=useState(null);
    const [selectedSize,setSelectedSize]=useState(null);
    const [selectedColor,setSelectedColor]=useState(null);

    const [quantity,setQuantity]=useState(1);
    const [isButtonDisabled,setIsButtonDisabled]=useState(false);

    const productFetchId=productId||id;
    useEffect(()=>{
        if(productFetchId){
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({id:productFetchId}));
        }
    },[dispatch,productFetchId]);

    useEffect(()=>{
        if(selectedProduct?.images?.length>0)
        {
            setMainImage(selectedProduct.images[0].url);
        }
    },[selectedProduct]);

    //quantity change
    const handleQuantityChange=(action)=>{
        if (action==="plus") setQuantity((prev)=>prev+1);
        if (action==="minus" && quantity>1) setQuantity((prev)=>prev-1);
    }
    //handle add to  cart button- to show notification whwn button is clicked siccess or not
    const handleAddToCart=()=>{
        if(!selectedSize || !selectedColor)
        {
            toast.error("Please select a size and color before adding to the cart",{
                duration:1000,
            });
            return;
        }
        setIsButtonDisabled(true);
        dispatch(
            addToCart({
                productId:productFetchId,
                quantity,
                size:selectedSize,
                color:selectedColor,
                guestId,
                userId:user?._id,
            })
        ).then(()=>{
            toast.success("Product added to the cart!",{
                duration:1000,
            });
        })
        .finally(()=>{
            setIsButtonDisabled(false);
        });
        // setTimeout(()=>{
        //     toast.success("Product Added to the cart",{
        //         duration:1000,
        //     });
        // setIsButtonDiabled(false);
        // },500);
    };

if(loading){
    return <p>Loading...</p>
}

if(error){
    return <p> Error:{error}</p>
}
    
  return (
    <div className="p-6">
        {selectedProduct&&(
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
            <div className="flex flex-col md:flex-row">
                {/* Left thumnails */}
                <div className="hidden md:flex flex-col space-y-4 mr-6">
                    {selectedProduct.images.map((image,index)=> (
                        <img  
                        key={index} 
                        src={image.url} 
                        alt={image.altText || `Thumbnail${index}`}
                        onClick={()=>setMainImage(image.url)}
                        className={`w-20 h-20  object-cover rounded-lg cursor-pointer border 
                         ${mainImage===image.url ? " border-2 border-black ":"border-gray-300"}`} >

                        </img>
                    ))}
                </div>
                {/* Main image */}
                <div className="md:w-1/2 ">
                   <div className="mb-4">
                        <img src={mainImage} alt="Main product"
                         className="w-full h-auto object-cover rounded-lg">
                        </img>
                   </div>
                </div>
                {/* Mobile Thumbnail */}
                <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                    {selectedProduct.images.map((image,index)=> (
                            <img  
                            key={index} 
                            src={image.url} 
                            alt={image.altText || `Thumbnail${index}`}
                            onClick={()=>setMainImage(image.url)}
                            className={`w-20 h-20  object-cover rounded-lg cursor-pointer border 
                                ${mainImage===image.url ? " border-2 border-black ":"border-gray-300"}`} >

                            </img>
                        ))}
                </div>
                {/* Right Section */}
                <div className="md:w-1/2 md:ml-10">
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            {selectedProduct.name}
                        </h1>
                        <p className="text-lg text-gray-600 mb-1 line-through">
                            ${selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
                        </p>
                        <p className="text-xl text-gray-500 mb-2">
                            ${selectedProduct.price}
                        </p>
                        <p className="text-black mb-4">
                            {selectedProduct.description}
                        </p>
                        {/* Color picker */}
                        <div className="mb-4 ">
                            <p className="text-700 ">Color:</p>
                            <div className="flex gap-2 mt-2 ">
                                {selectedProduct.colors.map((color)=>(
                                    <button key={color}
                                    onClick={()=>setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full  border ${selectedColor===color?
                                     "border-4 border-black":"border-gray-300"   
                                    }` }
                                    style={{backgroundColor:color.toLocaleLowerCase(),
                                        filter:"brightness(0.5)"
                                    }}>

                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* sizes */}
                        <div className="mb-4">
                            <p className="text-gray-700">Size:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.sizes.map((size)=>(
                                    <button 
                                    key={size}
                                    onClick={()=>setSelectedSize(size)}
                                    className={`px-4 py-2 rounded border border-black 
                                        ${selectedSize===size ?"bg-black text-yellow-300":""}`}>{size}</button>
                                ))}
                            </div>
                        </div>
                        {/* Quantity */}
                        <div className="mb-6">
                            <p className="text-gary-700 ">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <button 
                                 onClick={()=>handleQuantityChange("minus")}
                                 className="px-2 py-1 bg-yellow-500 rounded text-lg">-
                                </button>
                                <span className="text-lg">{quantity}</span>
                                <button 
                                onClick={()=>handleQuantityChange("plus")}
                                className="px-2 py-1 bg-yellow-500 rounded text-lg">+</button>
                            </div>
                        </div>
                        {/* Add to  cart button */}
                        <button 
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled}
                            className={`bg-black text-yellow-300 font-bold py-2 px-6 rounded w-full mb-4 hover:text-black
                            ${isButtonDisabled ?"cursor-not-allowed opacity-50":"hover:bg-yellow-500 text-black"}`}>
                            {isButtonDisabled ? "Adding...":"ADD TO CART"} 
                        </button>
                        {/* Charateristics */}
                        <div className="mt-10 text-gray-700">
                            <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                            <table className="w-full text-left text-sm text-gray-600">
                                <tbody>
                                    <tr>
                                        <td className="py-1">Brand</td>
                                        <td className="py-1">{selectedProduct.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">Material</td>
                                        <td className="py-1">{selectedProduct.material}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
            <div className="mt-20 " >
                <h2 className="text-3xl text-center font-bold mb-4"> You May Also Like</h2>
                <ProductGrid products={similarProducts} loading={loading} error={error}/>
            </div>
        </div>
        )}
    </div>
  )
}
export default ProductDetails;