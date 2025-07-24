import React from "react";
import Title from "./Title";
import { Category } from "@/sanity.types";
import { Shield } from "lucide-react";
import { featureIconMap } from "@/constants/featureIcons";
import Link from "next/link";

const HomeCategories = ({ categories }: { categories: (Category & { productCount?: number })[] }) => {
  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Popular Categories</Title>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="relative bg-shop_light_bg p-5 flex items-center gap-4 rounded-lg shadow-sm group transition-all duration-300 hover:shadow-lg hover:scale-[1.025] border border-transparent hover:border-shop_orange/40"
          >
            {category?.icon && (
              <div className="relative border border-shop_orange/30 hover:border-shop_orange rounded-lg w-20 h-20 p-1 flex-shrink-0 flex items-center justify-center bg-white">
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
