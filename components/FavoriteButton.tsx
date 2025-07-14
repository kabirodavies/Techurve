"use client";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-shop_dark_blue/10 border-2 border-shop_dark_blue shadow hover:bg-shop_dark_blue hover:text-white transition-all">
            <Heart className="w-5 h-5" />
          </span>
          <span className="absolute -top-1 -right-1 bg-shop_dark_blue text-white h-4 w-4 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white shadow">
            {favoriteProduct?.length ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-shop_dark_blue hoverEffect border border-shop_dark_blue/80 hover:border-shop_dark_blue p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <Heart
              fill="#3b9c3c"
              className="text-shop_dark_blue/80 group-hover:text-shop_dark_blue hoverEffect mt-.5 w-5 h-5"
            />
          ) : (
            <Heart className="text-shop_dark_blue/80 group-hover:text-shop_dark_blue hoverEffect mt-.5 w-5 h-5" />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;