//import React from 'react'
import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"

export const Topbar = () => {
  return (
    <div className="bg-black text-white ">
        <div className="container mx-auto flex justify-between items-center py-3">
            <div className="hidden md:flex  items-center space-x-4">
                <a href="#" className="hover:text-gray-300">
                    <TbBrandMeta />
                </a>
                <a href="#" className="hover:text-gray-300">
                    <IoLogoInstagram />
                </a>
                <a href="#" className="hover:text-gray-300">
                    <RiTwitterXLine />
                </a>
            </div>
            <div className="text-xl font-bold text-center flex-grow">
                <span> Grab the best ! Forget the Rest!</span>
            </div>
            <div className="hidden:block text-sm">
                <a href="tel:+1234567890" className="hover:text-gray-300">
                    +1 (234) 567-890
                </a>
            </div>
        </div>
    </div>
  )
}

export default Topbar;
