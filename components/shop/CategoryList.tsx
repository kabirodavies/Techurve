import React from "react";
import Title from "../Title";

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
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Product Categories</Title>
      <div className="flex flex-col gap-2 mt-2">
        {categories?.map((category) => {
          const isActive = selectedCategory === category._id;
          return (
            <div key={category._id} className="group">
              <button
                className={`w-full text-center px-2 py-1 rounded font-semibold shadow-sm border-2 transition-all duration-200 hover:scale-[1.03] hover:shadow-md hover:border-[#6b7280] hover:bg-[#6b7280] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:border-[#6b7280] ${isActive ? "bg-[#6b7280] border-[#6b7280] text-white" : "bg-[#1e3a8a] border-[#1e3a8a] text-white"}`}
                onClick={() => {
                  setSelectedCategory(category._id);
                  setSelectedSubcategory(null);
                }}
              >
                {category.title}
                <span className="ml-2 text-xs text-gray-300">({category.productCount ?? 0})</span>
              </button>
              {isActive && category.subcategories && category.subcategories.length > 0 && (
                <div className="mt-2 ml-4 w-[calc(100%-1rem)] bg-white border border-[#1e3a8a] rounded shadow-lg flex flex-col gap-2 p-2">
                  {category.subcategories.map((subcat) => (
                    <button
                      key={subcat._id}
                      className={`w-full text-center px-2 py-1 rounded font-semibold shadow-sm border-2 transition-all duration-200 hover:scale-[1.03] hover:shadow-md hover:border-[#6b7280] hover:bg-[#6b7280] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:border-[#6b7280] ${selectedSubcategory === subcat._id ? "bg-[#6b7280] border-[#6b7280] text-white" : "bg-[#1e3a8a] border-[#1e3a8a] text-white"}`}
                      onClick={() => setSelectedSubcategory(subcat._id)}
                    >
                      {subcat.title}
                      <span className="ml-2 text-xs text-gray-300">({subcat.productCount ?? 0})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {(selectedCategory || selectedSubcategory) && (
        <button
          onClick={() => {
            setSelectedCategory(null);
            setSelectedSubcategory(null);
          }}
          className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_blue hoverEffect text-left"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default CategoryList;
