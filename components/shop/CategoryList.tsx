import React from "react";
import Title from "../Title";
import { Check } from "lucide-react";
import { Shield } from "lucide-react";
import { featureIconMap } from "@/constants/featureIcons";

interface CategoryWithCount {
  _id: string;
  title: string;
  slug?: { current?: string };
  image?: { asset?: { _ref: string } };
  productCount?: number;
  subcategories?: SubcategoryWithCount[];
  icon?: string; // Added icon property
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
            className="text-xs font-semibold px-3 py-1 rounded bg-shop_orange text-white shadow hover:bg-shop_dark_blue focus:outline-none focus:ring-2 focus:ring-shop_orange transition-all duration-150"
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
                className={`w-full flex items-center gap-2 text-left px-2 py-1 rounded font-semibold shadow-sm border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-shop_orange focus:border-shop_orange
                  ${isActive ? "bg-shop_orange text-white border-shop_orange border-l-4 pl-1" : "bg-white border-gray-200 text-gray-700"}
                  hover:scale-[1.03] hover:shadow-md hover:border-shop_orange hover:bg-shop_orange/90 hover:text-white`}
                onClick={() => {
                  setSelectedCategory(category._id);
                  setSelectedSubcategory(null);
                }}
                aria-pressed={isActive}
                aria-label={`Select category ${category.title}`}
              >
                {/* Category image/avatar if available */}
                {category.icon && (
                  <span className="w-6 h-6 flex-shrink-0 rounded-full overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                    {(() => {
                      const Icon = featureIconMap[category.icon] || Shield;
                      return <Icon className="w-5 h-5 text-shop_orange" aria-label={category.icon} />;
                    })()}
                  </span>
                )}
                <span className="flex-1 truncate">{category.title}</span>
                <span className="ml-2 text-xs text-gray-400">({category.productCount ?? 0})</span>
                {isActive && <Check className="w-4 h-4 text-shop_orange ml-1" aria-label="Selected" />}
              </button>
              {/* Subcategories */}
              {isActive && category.subcategories && category.subcategories.length > 0 && (
                <div className="mt-2 ml-4 w-[calc(100%-1rem)] bg-white border-l-4 border-shop_orange rounded shadow flex flex-col gap-2 p-2">
                  <div className="border-b border-gray-200 mb-2 pb-1 text-xs text-gray-500 font-semibold uppercase tracking-wide">Subcategories</div>
                  {category.subcategories.map((subcat) => (
                    <button
                      key={subcat._id}
                      className={`w-full flex items-center gap-2 text-left px-2 py-1 rounded font-semibold shadow-sm border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-shop_orange focus:border-shop_orange
                        ${selectedSubcategory === subcat._id ? "bg-shop_orange text-white border-shop_orange border-l-4 pl-1" : "bg-white border-gray-200 text-gray-700"}
                        hover:scale-[1.03] hover:shadow-md hover:border-shop_orange hover:bg-shop_orange/90 hover:text-white`}
                      onClick={() => setSelectedSubcategory(subcat._id)}
                      aria-pressed={selectedSubcategory === subcat._id}
                      aria-label={`Select subcategory ${subcat.title}`}
                    >
                      <span className="flex-1 truncate">{subcat.title}</span>
                      <span className="ml-2 text-xs text-gray-400">({subcat.productCount ?? 0})</span>
                      {selectedSubcategory === subcat._id && <Check className="w-4 h-4 text-shop_orange ml-1" aria-label="Selected" />}
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
