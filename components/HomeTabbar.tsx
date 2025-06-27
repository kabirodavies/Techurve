"use client";
import { productType } from "@/constants/data";
import Link from "next/link";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center flex-wrap gap-5 justify-between">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <div className="flex items-center gap-1.5 md:gap-3">
          {productType?.map((item) => (
            <button
              onClick={() => onTabSelect(item?.value)}
              key={item?.value}
              className={`border border-shop_dark_blue/30 rounded-2xl
    hover:bg-shop_dark_blue hover:border-shop_dark_blue
    hover:text-white hoverEffect
    ${selectedTab === item?.value ? "bg-shop_dark_blue text-white border-shop_dark_blue" : "bg-shop_dark_blue/10"}
    w-28 h-15 flex items-center justify-center text-center break-words whitespace-normal`}
            >
              {item?.title}
            </button>
          ))}
        </div>
      </div>
      <Link
        href={"/shop"}
        className="border border-shop_dark_blue/30 rounded-2xl hover:bg-shop_dark_blue hover:border-shop_dark_blue
    hover:text-white hoverEffect w-28 h-15 flex items-center justify-center text-center break-words whitespace-normal" 
      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabbar;
