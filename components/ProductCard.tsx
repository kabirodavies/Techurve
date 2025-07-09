"use client"

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";
import ProductAdminControls from "./ProductAdminControls";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] rounded-md border-darkBlue/20 group bg-white">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={500}
              priority
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop_light_bg duration-500 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.status === "sale" ? (
          <p className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-lightGreen hover:text-shop_dark_green hoverEffect">
            Sale!
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {/* Brand, Category, Subcategory */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 font-medium">
          {product?.brand && (product.brand as any).title && (
            <span>
              Brand: <Link href={`/shop?brand=${encodeURIComponent((product.brand as any).title)}`} className="hover:underline text-shop_dark_blue font-semibold">
                {(product.brand as any).title}
              </Link>
            </span>
          )}
          {(product?.subcategory && (product.subcategory as any).parent?.title && (product.subcategory as any).parent?.slug && (product.subcategory as any).title && (product.subcategory as any).slug) && (
            <span>
              <Link href={`/category/${(product.subcategory as any).parent.slug.current}`} className="hover:underline text-shop_dark_blue">
                {(product.subcategory as any).parent.title}
              </Link>
              {" > "}
              <Link href={{ pathname: `/category/${(product.subcategory as any).parent.slug.current}`, query: { subcategory: (product.subcategory as any).slug.current } }} className="hover:underline text-shop_dark_blue">
                {(product.subcategory as any).title}
              </Link>
            </span>
          )}
        </div>
        <Title className="text-sm line-clamp-1">{product?.name}</Title>


        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`${product?.stock === 0 ? "text-red-600" : "text-shop_dark_green/80 font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>

        <ProductAdminControls product={product} />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
