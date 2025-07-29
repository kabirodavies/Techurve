"use client";

import { ExpandedProduct } from "@/types/ExpandedProduct";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";
import { useIsAdmin } from "@/hooks";

// Add these types for populated fields
// These match the shape returned by GROQ queries in your codebase

const ProductCard = ({ product }: { product: ExpandedProduct }) => {
  const isAdmin = useIsAdmin();

  const brand = product.brand;
  const subcategory = product.subcategory;

  return (
    <div className="text-xs border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-darkBlue/10 group bg-white hover:scale-[1.02]">
      <div className="relative group overflow-hidden bg-shop_light_bg rounded-t-xl">
        {product?.images && product.images[0] && (
          <Link href={`/product/${product?.slug?.current}`}> 
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={320}
              height={160}
              priority
              className={`w-full h-40 object-contain overflow-hidden transition-transform duration-500 bg-shop_light_bg border-b border-gray-100 shadow-sm group-hover:scale-105 ${product?.stock !== 0 ? "" : "opacity-50"}`}
              style={{ borderRadius: '0.75rem 0.75rem 0 0' }}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {/* Removed sale, hot, and new badges */}
      </div>
      {/* Divider between image and content */}
      <div className="w-full h-px bg-gray-100 my-0" />
      <div className="p-2 flex flex-col gap-2 items-center text-center">
        {/* Product Name at the Top */}
        <Title className="text-sm font-semibold line-clamp-1 text-gray-900">{product?.name}</Title>

        {/* Brand followed by Subcategory (e.g., ZKTECO | SUB) */}
        <div className="flex flex-wrap gap-1 text-[11px] text-gray-600 items-center justify-center">
          {brand?.title && (
            <Link
              href={`/shop?brand=${encodeURIComponent(brand.title)}`}
              className="text-[11px] text-shop_dark_green hover:text-shop_dark_blue hover:underline font-medium transition-colors duration-200"
            >
              {brand.title}
            </Link>
          )}
          {brand?.title && subcategory?.title && <span className="mx-1 text-gray-300 font-bold">|</span>}
          {subcategory?.title && (
            <Link
              href={`/category/${subcategory.parent?.slug?.current}?subcategory=${subcategory.slug?.current}`}
              className="hover:text-shop_dark_green hover:underline transition-colors duration-200"
            >
              {subcategory.title}
            </Link>
          )}
        </div>
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-base font-bold mx-auto"
          showPrice={isAdmin}
        />
        <AddToCartButton product={product} className="w-28 rounded-full mx-auto transition-all duration-200 bg-shop_light_blue text-white hover:shadow-lg hover:bg-shop_dark_blue hover:text-white border border-shop_light_blue font-semibold text-xs" />
      </div>
    </div>
  );
};

export default ProductCard;
