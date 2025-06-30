"use client";
import { productType } from "@/constants/data";
import Link from "next/link";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Grid for small devices, flex for md+ */}
      <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full max-w-xs sm:max-w-md md:hidden">
        {productType?.slice(0, 9).map((item) => (
          <button
            onClick={() => onTabSelect(item?.value)}
            key={item?.value}
            className={`border border-shop_dark_blue/30 rounded-2xl
hover:bg-shop_dark_blue hover:border-shop_dark_blue
hover:text-white hoverEffect
${
  selectedTab === item?.value
    ? "bg-shop_dark_blue text-white border-shop_dark_blue"
    : "bg-shop_dark_blue/10"
}
h-12 flex items-center justify-center text-center break-words whitespace-normal text-xs sm:text-sm truncate max-w-[90px]`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      {/* Flex row for md+ screens */}
      <div className="hidden md:flex items-center gap-1.5 text-sm font-semibold w-full justify-between">
        <div className="flex items-center gap-1.5 md:gap-3 flex-wrap">
          {productType?.map((item) => (
            <button
              onClick={() => onTabSelect(item?.value)}
              key={item?.value}
              className={`border border-shop_dark_blue/30 rounded-2xl
hover:bg-shop_dark_blue hover:border-shop_dark_blue
hover:text-white hoverEffect
${
  selectedTab === item?.value
    ? "bg-shop_dark_blue text-white border-shop_dark_blue"
    : "bg-shop_dark_blue/10"
}
w-28 h-15 flex items-center justify-center text-center break-words whitespace-normal`}
            >
              {item?.title}
            </button>
          ))}
        </div>
        <Link
          href={"/shop"}
          className="border border-shop_dark_blue/30 rounded-2xl hover:bg-shop_dark_blue hover:border-shop_dark_blue
hover:text-white hoverEffect w-28 h-15 flex items-center justify-center text-center break-words whitespace-normal"
        >
          See all
        </Link>
      </div>
      {/* See all button for small devices */}
      <div className="mt-4 flex justify-center w-full md:hidden">
        <Link
          href={"/shop"}
          className="border border-shop_dark_blue/30 rounded-2xl hover:bg-shop_dark_blue hover:border-shop_dark_blue
hover:text-white hoverEffect w-28 h-12 flex items-center justify-center text-center break-words whitespace-normal"
        >
          See all
        </Link>
      </div>
    </div>
  );
};

export default HomeTabbar;
