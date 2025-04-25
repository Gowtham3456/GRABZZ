//import React from 'react'
import heroImg from "../../assets/hero.jpg";
import {Link } from "react-router-dom"

export const Hero = () => {
  return (
    <section className="relative">
        <img src={heroImg} alt="Hero" className="w-full h-[400px] md:h-[300px] lg:h-[400px] object-cover  rounded rounded-2xl"></img>
        <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
            <div className="text-center text-white p-6">
                <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-white border-2 border-gray-700 text-shadow  mb-4 ">GraBzz<br/> Ready</h1>
                <p className="text-sm tracking-tighter md:text-lg mb-6"> Explore  our collections with fast worldwide shipping</p>
                <Link to="#" className="text-black bg-white font-bold p-4 rounded-xl hover:bg-yellow-400">ShopNow</Link>

            </div>

        </div>
    </section>
  )
}
 export default Hero;
