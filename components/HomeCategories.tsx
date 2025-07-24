import React from "react";
import Title from "./Title";
import { Category } from "@/sanity.types";
import { Shield } from "lucide-react";
import { featureIconMap } from "@/constants/featureIcons";
import Link from "next/link";

const HomeCategories = ({ categories }: { categories: (Category & { productCount?: number })[] }) => {
  return (
    <div className="mb-10 lg:mb-20 bg-shop_light_bg p-5 lg:p-10 rounded-xl shadow-md">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-shop_dark_blue mb-4">Popular Categories</h2>
      <p className="text-xl text-gray-600 mb-8 text-center">Browse our most popular product categories</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className=" 
            relative bg-white p-5 flex items-center gap-4 rounded-lg shadow-sm group transition-all duration-300 hover:shadow-lg hover:scale-[1.025] border-t border-b border-transparent hover:border-t-shop_orange/40 hover:border-b-shop_orange/40"
          >
            {category?.icon && (
              <div className="relative border-t border-b border-shop_orange/30 hover:border-t-shop_orange hover:border-b-shop_orange w-20 h-20 bg-white flex-shrink-0 flex items-center justify-center">
                <Link href={`/category/${category?.slug?.current}`} className="block w-full h-full flex items-center justify-center">
                  {(() => {
                    const Icon = featureIconMap[category.icon] || Shield;
                    return <Icon className="w-14 h-14 text-shop_dark_blue group-hover:scale-110 transition-transform duration-300" aria-label={category.icon} />;
                  })()}
                </Link>
              </div>
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                {/* Badge */}
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-shop_orange"></span>
                <h3 className="text-base font-bold text-shop_dark_blue">{category?.title}</h3>
              </div>
              <p className="text-xs text-shop_dark_blue/80">
                {/* If productCount exists, show it, else fallback to 0 */}
                <span className="font-bold text-shop_orange">{`(${category.productCount ?? 0})`}</span>{" "}
                items Available
              </p>
              <Link
                href={`/category/${category?.slug?.current}`}
                className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-shop_light_green/20 text-shop_dark_blue border border-shop_light_green/40 hover:bg-shop_light_green/40 transition-colors duration-200"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
