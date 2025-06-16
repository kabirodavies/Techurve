"use client";

// import React, { useState } from 'react'
// import HomeTabbar from './HomeTabbar';

// const ProductGrid = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedTab, setSelectedTab] = useState("");
//   return (

//     <div>
//       <HomeTabbar />
//     </div>
//   )
// }

// export default ProductGrid

import React from 'react'
import HomeTabbar from './HomeTabbar'

const ProductGrid = () => {
  return (
    <div><HomeTabbar selectedTab={''} onTabSelect={function (tab: string): void {
      throw new Error('Function not implemented.')
    } } /></div>
  )
}

export default ProductGrid