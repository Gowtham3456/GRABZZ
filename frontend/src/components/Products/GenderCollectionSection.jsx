//import React from 'react'
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";
import {Link } from "react-router-dom"

export const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
            {/* Womens collection */}
            <div className="relative flex-1">
                <img src={womensCollectionImage} alt="womens collection" className="w-full h-[500px] object-cover"></img>
                <div className="absolute bottom-8 left-8 bg-white opacity-90 p-4 rounded-xl hover:bg-yellow-800">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Womens Collection</h2>
                    <Link to="/collections/all?gender==women" className="text-gray-900 underline">
                    Shop Now
                    </Link>
                </div>
            </div>
            {/* Mens collection */}
            <div className="relative flex-1">
                <img src={mensCollectionImage} alt="mens collection" className="w-full h-[500px] object-cover"></img>
                <div className="absolute bottom-8 left-8 bg-white opacity-90 p-4 rounded-xl hover:bg-yellow-800">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 ">Mens Collection</h2>
                    <Link to="/collections/all?gender==men" className="text-gray-900 underline">
                    Shop Now
                    </Link>
                </div>
            </div>
        </div>

    </section>
  )
}
export default GenderCollectionSection;
