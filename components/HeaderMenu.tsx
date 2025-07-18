"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const HeaderMenu = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  const handleMouseEnter = (title: string) => {
    setOpenDropdown(title);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="hidden md:flex w-1/3 items-center justify-center gap-8 relative">
      {headerData?.map((item) => {
        const isActive = pathname === item?.href;
        if (item.children) {
          return (
            <div
              key={item.title}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleDropdown(item.title)}
                className={`uppercase font-bold tracking-wide text-base px-0 py-2 bg-transparent border-none outline-none transition-colors duration-200 flex items-center gap-1
                  ${openDropdown === item.title || isActive ? 'text-shop_dark_blue' : 'text-gray-700'}
                  hover:text-shop_dark_blue
                  after:block after:h-0.5 after:bg-shop_dark_blue after:transition-all after:duration-200 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:w-full after:mt-1 relative`}
                aria-haspopup="true"
                aria-expanded={openDropdown === item.title}
                style={{ borderBottom: openDropdown === item.title || isActive ? '2px solid #1e3a8a' : '2px solid transparent' }}
              >
                {item.title}
                <span
                  className={`ml-1 text-lg transition-transform duration-200 ${openDropdown === item.title ? 'rotate-180' : ''}`}
                  style={{ display: 'inline-block', lineHeight: 1 }}
                >
                  ▼
                </span>
              </button>
              {openDropdown === item.title && (
                <div className="absolute left-0 mt-1 min-w-[180px] bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 flex flex-col">
                  {item.children.map((child: any) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      className={`block px-6 py-2 text-base font-semibold text-gray-700 hover:bg-shop_dark_blue/10 hover:text-shop_dark_blue transition-colors duration-150 rounded-lg ${pathname === child.href ? 'text-shop_dark_blue font-bold' : ''}`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }
        return (
          <Link
            key={item?.title}
            href={item?.href}
            className={`uppercase font-bold tracking-wide text-base px-0 py-2 bg-transparent border-none outline-none transition-colors duration-200 relative
              ${isActive ? 'text-shop_dark_blue' : 'text-gray-700'}
              hover:text-shop_dark_blue
              after:block after:h-0.5 after:bg-shop_dark_blue after:transition-all after:duration-200 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:w-full after:mt-1`}
            style={{ borderBottom: isActive ? '2px solid #1e3a8a' : '2px solid transparent' }}
          >
            {item?.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderMenu;
