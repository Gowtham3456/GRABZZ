//import React from 'react'
//import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
//import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="border-t py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
            <div >
                <h3 className="font-medium text-lg text-gray-800 mb-4">NewsLetter</h3>
                <p className="text-black mb-4">
                    Be First to hear abot the new products,exclusive events and  online offers 
                </p>
                <p className="font-medium text-sm text-gray-600 mb-6">Signup and get 10% off on your first order</p>
                {/* Newsletter form */}
                <form className="flex">
                    <input type="email" placeholder="Enter your email" className="p-3 text-sm w-full border-t border-l border-b boder-gray-300 
                    rounded focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all required">
                    </input>
                    <button type="submit" className="bg-black text-white px-6 py-3 text-sm rounded-r-md
                    hover:bg-black transition-all">Subscribe</button>
                </form>
            </div>
            {/* Shop links */}
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>
                        <Link to="#" className="hover:text-gray-800 transition-colors ">Men's Top Wear</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-800 transition-colors ">Women's Top Wear</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-800 transition-colors ">Men's Bottom Wear</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-800 transition-colors ">Women Bottom Wear</Link>
                    </li>
                </ul>
            </div>
            {/* Support Links */}
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Support</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>
                        <Link to="#" className="hover:text-gray-800 transition-colors ">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-800 transition-colors ">About Us</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-800 transition-colors ">FAQ's</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-800 transition-colors ">Features</Link>
                    </li>
                </ul>
            </div>

            {/* Follow us */}
            <div>
                <h3 className="text-lg text-gray-800 mb-4 "> Follow Us</h3>
                <div className="flex items-center space-x-4 mb-6">
                    <a href="https://www.facebook.com" target="_balnk" rel="noopener noreferrer" className="
                    hover:text-blue-300">
                        <TbBrandMeta className="h-6 w-6"/>
                    </a>
                    <a href="https://www.facebook.com" target="_balnk" rel="noopener noreferrer" className="
                    hover:text-blue-300">
                        <IoLogoInstagram className="h-6 w-6"/>
                    </a>
                    <a href="https://www.facebook.com" target="_balnk" rel="noopener noreferrer" className="
                    hover:text-blue-300">
                        <RiTwitterXLine className="h-6 w-6"/>
                    </a>
                </div>
                <p className="text-gray-800 font-medium">Call Us:98877557292</p>
            </div>
        </div>
        {/* Footer */}
        <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-300">
            <p className="text-gray-500 text-sm text-center">@ 2025,GraBzz ,All Rights reserved</p>
        </div>
    </footer>
  )
}
export default Footer;
