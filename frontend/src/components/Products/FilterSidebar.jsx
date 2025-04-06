//import React from 'react'

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const FilterSidebar = () => {
    //search parametrs usestate
    const [searchParams,setSearchParams]=useSearchParams();
    const [filters,setFilters]=useState({
        category:"",
        gender:"",
        color:"",
        size:[],
        material:[],
        brand:[],
        minPrice:0,
        maxPrice:100,
    });

    //price range
    const [priceRange,setPriceRange]=useState([0,100]);
    //values for each thing in the filter side bar
    const categories=[" Top Wear","Bottom Wear"];

    const colors=[
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Navy",
        "Beige",
        "Gray",
        "White",
        "Pink"
    ];
    const sizes=["S","M","L","XL","XXL","XS"];

    const materials=[
        "Cotton",
        "Woool",
        "Denim",
        "Polyster",
        "Silk",
        "Linen",
        "Viscose",
        "Fleece",
    ];

  const barnds=[
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Breach Breeze",
    "ChicStyle",
    "Fashionista",
  ];

  const genders=["Men","Women"];

  return (
    <div>FilterSidebar</div>
  )
}
export default FilterSidebar;
