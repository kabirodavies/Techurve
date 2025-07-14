"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:inline-flex w-1/3 items-center justify-center gap-3">
      {headerData?.map((item) => {
        const isActive = pathname === item?.href;
        return (
          <Link
            key={item?.title}
            href={item?.href}
            className={`px-3 py-1.5 rounded-full border border-shop_dark_blue/20 font-semibold text-sm transition-all shadow-sm
              ${isActive ? 'bg-shop_dark_blue text-white font-bold shadow-md' : 'bg-white text-shop_dark_blue hover:bg-shop_dark_blue hover:text-white hover:shadow-md'}
              hover:scale-105 focus:outline-none focus:ring-2 focus:ring-shop_dark_blue/40`}
          >
            {item?.title}
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenu;
