"use client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import PriceView from "@/components/PriceView";

export default function ProductPriceSection({ price, discount }: { price: number, discount: number }) {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return <>{/* Quotation button logic already in place */}</>;
  return <PriceView price={price} discount={discount} className="text-lg font-bold" />;
} 