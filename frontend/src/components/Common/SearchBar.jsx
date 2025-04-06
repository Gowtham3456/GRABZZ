//import React from 'react'
import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

export const SearchBar = () => {
    const [searchTerm,setSearchTerm]=useState("");
    const [isOpen,setIsOpen]=useState(false);
    const handleSearchToggle=()=>{
        setIsOpen(!isOpen)
    }
    const handleSearch=(e)=>{
        e.preventDefault();
        console.log("searchterm:"+searchTerm);
        setIsOpen(false);
    }
  return <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen?
    "absolute top-0 left-0  w-full bg-white h-24 z-100":"w-auto"}`}>

        {isOpen?(
            <form onSubmit={handleSearch}  className="relative flex items-center justify-center w-full">
                <div className="relative w-1/2">
                 <input type="text" placeholder="Searchproducts" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="bg-gray-200 px-4 py-2
                 pl-2 pr-12 rounded-lg focus:outline-none  w-full placeholder:text-gray-700"></input>
                </div>
                {/*search icon*/}
                <button type="submit" className=" text-gray-600 hover:textxt-gray-800">
                    <HiMagnifyingGlass className="h-6 w-6"></HiMagnifyingGlass>
                </button>
                {/*close button*/}
                <button type="button" onClick={handleSearchToggle} className="absolute right-12">
                    <HiMiniXMark className="H-6 W-6"/>

                </button>


            </form>
        ):(
            <button onClick={handleSearchToggle}> 
                <HiMagnifyingGlass className="h-6 w-6 "></HiMagnifyingGlass>
            </button>
        )}
    </div>
  
}

export default SearchBar;



// import { useState } from "react";
// import { HiMagnifyingGlass } from "react-icons/hi2";

// export const SearchBar = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [isOpen, setIsOpen] = useState(false);

//     const handleSearchToggle = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className={`fixed top-0 left-0 w-full transition-all duration-300 bg-white z-50 ${isOpen ? "h-24 flex items-center justify-center" : "h-auto flex justify-end p-4"}`}>
//             {isOpen ? (
//                 <form className="relative flex items-center justify-center w-full">
//                     <div className="relative w-4/5 sm:w-1/2">
//                         <input
//                             type="text"
//                             placeholder="Search products"
//                             value={searchTerm}
//                             className="bg-gray-200 px-4 py-3 pl-2 pr-12 rounded focus:outline-none w-full placeholder:text-gray-700"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
//                     >
//                         <HiMagnifyingGlass className="h-6 w-6" />
//                     </button>
//                 </form>
//             ) : (
//                 <button onClick={handleSearchToggle} className="text-gray-600 hover:text-gray-800">
//                     <HiMagnifyingGlass className="h-6 w-6" />
//                 </button>
//             )}
//         </div>
//     );
// };

// export default SearchBar;
