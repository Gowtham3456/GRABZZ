//import React from 'react'
import heroImg from "../../assets/rabbit-hero.webp";
import {Link } from "react-router-dom"

export const Hero = () => {
  return (
    <section className="relative">
        <img src={heroImg} alt="Hero" className="w-full h-[400px] md:h-[300px] lg:h-[400px] object-cover"></img>
        <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
            <div className="text-center text-white p-6">
                <h1 className="text-4xl md:text-9xl font-bold tracking-tighter  mb-4 ">GraBzz<br/> Ready</h1>
                <p className="text-sm tracking-tighter md:text-lg mb-6"> Explore  our collections with fast worldwide shipping</p>
                <Link to="#" className="text-black bg-white font-bold p-4 rounded-xl hover:bg-yellow-400">ShopNow</Link>

            </div>

        </div>
    </section>
  )
}
 export default Hero;
