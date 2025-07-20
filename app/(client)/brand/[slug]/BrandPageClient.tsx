"use client";
import React, { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { ExpandedProduct } from "@/types/ExpandedProduct";
import { Brand } from "@/sanity.types";

export function BrandPageClient({ initialProducts, brand }: { initialProducts: ExpandedProduct[]; brand: Brand }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products] = useState(initialProducts || []);

  // Extract unique categories from products
  const categories = useMemo(() => Array.from(
    new Map(
      (products || [])
        .map((p: ExpandedProduct) => p.subcategory?.parent)
        .filter((cat): cat is { title?: string; slug?: { current?: string } } => !!cat && !!cat.title && !!cat.slug?.current)
        .map((cat) => [cat.slug!.current!, cat])
    ).values()
  ), [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return (products || []).filter(
      (p: ExpandedProduct) => p.subcategory?.parent?.slug?.current === selectedCategory
    );
  }, [products, selectedCategory]);

  return (
    <div className="py-10">
      <Title className="mb-6 text-2xl font-bold">
        {brand ? brand.title : "Brand"}
      </Title>
      {/* Category filter buttons */}
      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedCategory(null)}
            className={`capitalize px-4 py-2 rounded ${selectedCategory === null ? "bg-shop_orange text-white" : "bg-gray-100 text-gray-700"}`}
          >
            All
          </Button>
          {categories.map((cat) => (
            cat.slug && cat.slug.current ? (
              <Button
                key={cat.slug.current}
                onClick={() => setSelectedCategory(cat.slug!.current!)}
                className={`capitalize px-4 py-2 rounded ${selectedCategory === cat.slug!.current! ? "bg-shop_orange text-white" : "bg-gray-100 text-gray-700"}`}
              >
                {cat.title}
              </Button>
            ) : null
          ))}
        </div>
      )}
      {filteredProducts?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No products found for this brand.</div>
      )}
    </div>
  );
} 