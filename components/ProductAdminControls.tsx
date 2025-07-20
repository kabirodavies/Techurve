"use client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import PriceView from "./PriceView";
import React from "react";
import { ExpandedProduct } from "@/types/ExpandedProduct";

export default function ProductAdminControls({ product }: { product: ExpandedProduct }) {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;
  return (
    <div className="mt-2">
      {/* Admin-only controls: price, edit/delete, etc. */}
      <PriceView price={product?.price} discount={product?.discount} className="text-sm" />
      {/* Add more admin controls here as needed */}
    </div>
  );
} 