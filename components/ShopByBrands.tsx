import React from "react";
import Title from "./Title";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import type { Brand } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $1000",
    icon: <Truck size={45} />,
    bg: "from-green-100 to-green-50",
  },
  {
    title: "Easy Return",
    description: "Hassle-free returns",
    icon: <GitCompareArrows size={45} />,
    bg: "from-blue-100 to-blue-50",
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 support",
    icon: <Headset size={45} />,
    bg: "from-yellow-100 to-yellow-50",
  },
  {
    title: "Money Back Guarantee", 
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
    bg: "from-pink-100 to-pink-50",
  },
];

const ShopByBrands = async () => {
  const brands = await getAllBrands();
  return (
    <div className="mb-10 lg:mb-20 bg-shop_light_bg p-5 lg:p-10 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-5 justify-between mb-8">
        <div>
          <Title>Shop By Brands</Title>
          <p className="text-shop_btn_dark_blue text-xs md:text-sm mt-1 font-medium tracking-wide">Discover top brands and exclusive deals</p>
        </div>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_blue hover:underline transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {brands?.map((brand: Brand) => (
          <Link
            key={brand?._id}
<<<<<<< HEAD
            href={`/shop?brand=${encodeURIComponent(brand?.title)}`}
            className="bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_dark_blue/20 hoverEffect"
=======
            href={`/shop?brand=${encodeURIComponent(brand?.title ?? "")}`}
            className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 w-full h-28 flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:border-shop_btn_dark_blue transition-all duration-200 transform hover:scale-105 relative"
>>>>>>> test
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt={brand?.title || "brandImage"}
                width={120}
                height={60}
                className="w-24 h-12 object-contain mb-2 group-hover:scale-110 transition-transform"
              />
            )}
            <span className="text-xs font-semibold text-gray-700 group-hover:text-shop_btn_dark_blue text-center px-1 truncate w-full">
              {brand?.title}
            </span>
          </Link>
        ))}
      </div>
      <div className="w-full flex justify-center my-10">
        <div className="h-1 w-32 bg-gradient-to-r from-shop_btn_dark_blue/30 via-shop_btn_dark_blue/60 to-shop_btn_dark_blue/30 rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br ${item.bg} shadow group transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer`}
          >
            <span className="inline-flex scale-100 group-hover:scale-110 group-hover:text-shop_btn_dark_blue transition-transform transition-colors duration-200">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/90 font-bold capitalize text-base mb-0.5">
                {item?.title}
              </p>
              <p className="text-lightColor/90 text-xs font-medium">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;


