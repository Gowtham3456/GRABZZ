//import React from 'react'
import { Link } from "react-router-dom"
import {HiOutlineUser,HiOutlineShoppingBag,HiBars3BottomRight} from "react-icons/hi2"
import SearchBar from "./SearchBar";
import CardDrawer from "../Layout/CardDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const Navbar = () => {
  const [drawerOpen,setDrawerOpen]=useState(false);
  const[navDrawerOpen,setNavDrawerOpen]=useState(false);
  const toggleNavDrawer=()=>{
    setNavDrawerOpen(!navDrawerOpen);
  }
  const toggleDrawer=()=>{
      setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/*logo left*/}
        <div>
            <Link to="/" className="text-2xl font-medium">GraBzz</Link>
        </div>
        {/* Center navigation link*/}
        <div className="hidden md:flex space-x-5">
            <Link to="/collections/all" 
            className="text-gray-700 hover:text-black text-sm font-medium uppercase">Mens</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Womens</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">BottomWear</Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">TopWear</Link>
        </div>
        {/*Right Icons*/}
        <div className="flex items-center space-x-4">
            <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-black-700"></HiOutlineUser>
            </Link>
            <button  onClick={toggleDrawer} className="relative hover:text-blue">
                <HiOutlineShoppingBag className="h-6 w-6 text-black-700"></HiOutlineShoppingBag>
                <span className="absolute  -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">4</span>
            </button>
            {/*search*/}
            <div className="overflow-hidden">
              <SearchBar />
            </div>
  
            <button onClick={toggleNavDrawer} className="md:hidden">
                <HiBars3BottomRight className="h-6 w-6 text-black-700 "></HiBars3BottomRight>
            </button>

        </div>
      </nav>
      <CardDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}/>
      {/* Mobile navigation */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full shadow-lg bg-white
      transform tansition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0":"-translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600"/>
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semobold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600  hover:text-black border-b">
              Men
            </Link>
            <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600  hover:text-black border-b">
              Women
            </Link>
            <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600  hover:text-black border-b">
              Topwears
            </Link>
            <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600  hover:text-black border-b">
                Bottomwears
            </Link>
          </nav>

        </div>
      </div>
    </>
  )
}

export default Navbar;
