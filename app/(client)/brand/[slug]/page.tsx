"use client";
import { BrandPageClient } from "./BrandPageClient";
import { ExpandedProduct } from "@/types/ExpandedProduct";
import { Brand } from "@/sanity.types";
import { getProductsByBrandSlug, getAllBrands } from "@/sanity/queries";

// Server wrapper to fetch data and pass as props
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const products = await getProductsByBrandSlug(slug);
  const brands = await getAllBrands();
  const brand = brands.find((b: Brand) => b.slug?.current === slug);
  return <BrandPageClient initialProducts={products || []} brand={brand} />;
}
