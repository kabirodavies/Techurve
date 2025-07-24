import React from "react";
import Title from "../Title";
import { Check } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface CategoryWithCount {
  _id: string;
  title: string;
  slug?: { current?: string };
  image?: { asset?: { _ref: string } };
  productCount?: number;
  subcategories?: SubcategoryWithCount[];
}
interface SubcategoryWithCount {
  _id: string;
  title: string;
  slug?: { current?: string };
  image?: { asset?: { _ref: string } };
  productCount?: number;
}

interface Props {
  categories: CategoryWithCount[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSubcategory?: string | null;
  setSelectedSubcategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
}: Props) => {
  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md relative">
      <div className="flex items-center justify-between mb-2">
        <Title className="text-base font-black">Product Categories</Title>
        {(selectedCategory || selectedSubcategory) && (
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubcategory(null);
            }}
            className="text-xs font-semibold px-3 py-1 rounded bg-shop_dark_blue text-white shadow hover:bg-shop_dark_green focus:outline-none focus:ring-2 focus:ring-shop_dark_blue transition-all duration-150"
            aria-label="Reset category and subcategory selection"
          >
            Reset
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {categories?.map((category) => {
          const isActive = selectedCategory === category._id;
          return (
            <div key={category._id} className="group">
              <button
                className={`w-full flex items-center gap-2 text-left px-2 py-1 rounded font-semibold shadow-sm border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-shop_dark_blue focus:border-shop_dark_blue
                  ${isActive ? "bg-[#e0e7ef] border-shop_dark_blue text-shop_dark_blue border-l-4 pl-1" : "bg-[#f1f5f9] border-[#1e3a8a] text-[#1e3a8a]"}
                  hover:scale-[1.03] hover:shadow-md hover:border-shop_dark_blue hover:bg-[#e0e7ef] hover:text-shop_dark_blue`}
                onClick={() => {
                  setSelectedCategory(category._id);
                  setSelectedSubcategory(null);
                }}
                aria-pressed={isActive}
                aria-label={`Select category ${category.title}`}
              >
                {/* Category image/avatar if available */}
                {category.image?.asset?._ref && (
                  <span className="w-6 h-6 flex-shrink-0 rounded-full overflow-hidden border border-gray-200 bg-white">
                    <Image
                      src={urlFor(category.image).width(24).height(24).url()}
                      alt={category.title}
                      width={24}
                      height={24}
                      className="object-contain w-6 h-6"
                    />
                  </span>
                )}
                <span className="flex-1 truncate">{category.title}</span>
                <span className="ml-2 text-xs text-gray-400">({category.productCount ?? 0})</span>
                {isActive && <Check className="w-4 h-4 text-shop_dark_blue ml-1" aria-label="Selected" />}
              </button>
              {/* Subcategories */}
              {isActive && category.subcategories && category.subcategories.length > 0 && (
                <div className="mt-2 ml-4 w-[calc(100%-1rem)] bg-white border-l-4 border-shop_dark_blue rounded shadow flex flex-col gap-2 p-2">
                  <div className="border-b border-gray-200 mb-2 pb-1 text-xs text-gray-500 font-semibold uppercase tracking-wide">Subcategories</div>
                  {category.subcategories.map((subcat) => (
                    <button
                      key={subcat._id}
                      className={`w-full flex items-center gap-2 text-left px-2 py-1 rounded font-semibold shadow-sm border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-shop_dark_blue focus:border-shop_dark_blue
                        ${selectedSubcategory === subcat._id ? "bg-[#e0e7ef] border-shop_dark_blue text-shop_dark_blue border-l-4 pl-1" : "bg-[#f1f5f9] border-[#1e3a8a] text-[#1e3a8a]"}
                        hover:scale-[1.03] hover:shadow-md hover:border-shop_dark_blue hover:bg-[#e0e7ef] hover:text-shop_dark_blue`}
                      onClick={() => setSelectedSubcategory(subcat._id)}
                      aria-pressed={selectedSubcategory === subcat._id}
                      aria-label={`Select subcategory ${subcat.title}`}
                    >
                      <span className="flex-1 truncate">{subcat.title}</span>
                      <span className="ml-2 text-xs text-gray-400">({subcat.productCount ?? 0})</span>
                      {selectedSubcategory === subcat._id && <Check className="w-4 h-4 text-shop_dark_blue ml-1" aria-label="Selected" />}
                    </button>
                  ))}
                </div>
              )}
              {/* Divider between categories */}
              <div className="border-b border-gray-100 my-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
