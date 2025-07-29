import { BRANDS_QUERYResult } from "@/sanity.types";
import React from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface Props {
  brands: BRANDS_QUERYResult;
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md border relative">
      <Title className="text-base font-black">Brands</Title>
      {/* Desktop: Dropdown */}
      <select
        className="hidden md:block border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-shop_dark_blue bg-white min-w-[120px] mb-2"
        value={selectedBrand || ''}
        onChange={e => setSelectedBrand(e.target.value || null)}
      >
        <option value="">All Brands</option>
        {brands?.map(brand => (
          <option key={brand._id} value={brand.slug?.current || ''}>{brand.title}</option>
        ))}
      </select>
      {/* Mobile: Radio List */}
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1 md:hidden">
        {brands?.map((brand) => (
          <div
            key={brand?._id}
            onClick={() => setSelectedBrand(brand?.slug?.current as string)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={brand?.slug?.current as string}
              id={brand?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand?.slug?.current}
              className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {brand?.title}
            </Label>
          </div>
        ))}
        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default BrandList;
