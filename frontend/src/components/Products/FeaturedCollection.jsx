//import React from 'react'
import {Link} from "react-router-dom"
import featured from "../../assets/featured.webp";

export const FeaturedCollection = () => {
  return (
     <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-yellow-500 rounded-3xl">
            {/* left content */}
            <div className="lg:w-1/2 p-8 lg:text-left">
                <h2 className="text-lg font-bold text-black mb-2">
                Comfort & Style
                </h2>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Apparel made for your everyday life
                </h2>
                <p className="text-lg text-black mb-6">
                    Discover high-quality ,comfortable clothing that effortlessly blens
                    fashion and function,Designed to make you look and feel great
                    everyday.

                </p>
                <Link to="/collections/all" className="bg-black text-white px-6 py-3
                rounded-lg text-lg hover:bg-yellow-500 hover:border-2 hover:border-black">ShopNow</Link>
            </div>
            {/* Right content */}
            <div className="lg:w-1/2">
                <img src={featured} 
                alt="featured collections"
                className="w-full h-full object-cover lg:rounded-br-3xl lg:rounded-tr-3xl"></img>

            </div>

        </div>

     </section>
  )
}
export default FeaturedCollection;
