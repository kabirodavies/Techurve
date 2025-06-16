"use client";

import React, { useState } from "react";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants/data";


const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  return (

    <div>
        <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
    </div>
  ) 
}

export default ProductGrid

