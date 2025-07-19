"use client";
import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  const { items } = useStore();
  return (
    <Link href={"/cart"} className="group relative">
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-shop_dark_blue/10 border-2 border-shop_dark_blue shadow hover:bg-shop_dark_blue hover:text-white transition-all">
        <ShoppingBag className="w-5 h-5" />
      </span>
      <span className="absolute -top-1 -right-1 bg-shop_dark_blue text-white h-4 w-4 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white shadow">
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;
