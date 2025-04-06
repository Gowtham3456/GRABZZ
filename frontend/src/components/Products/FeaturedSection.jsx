//import React from 'react'

import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi2";

export const FeaturedSection = () => {
  return (
    <section className=" py-16 px-4 bg-white ">
        <div className="conatiner mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center "> 
            {/* featured1 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiShoppingBag className="text-3xl"></HiShoppingBag>
                </div>
                <h4 className="traking-tighter font-bold mb-4">FREE INTERNATIONAL SHIPPING</h4>
                <p className="text-gray-600 text-sm tracking-tighter">On all orders over $100.00</p>
            </div>

            {/* featured 2*/}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiArrowPathRoundedSquare className="text-3xl"/>
                </div>
                <h4 className="traking-tighter font-bold mb-4">45-DAYS RETURN</h4>
                <p className="text-gray-600 text-sm tracking-tighter">Money back guarantee</p>
            </div>

            {/* featured 3 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full mb-4">
                    <HiOutlineCreditCard className="text-3xl "/>
                </div>
                <h4 className="traking-tighter font-bold mb-4">SECURE CHECKOUT</h4>
                <p className="text-gray-600 text-sm tracking-tighter">100% secure checkout process</p>
            </div>

        </div>

    </section>
  )
}
export default FeaturedSection;