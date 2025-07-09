import ProductPageLayout from "@/components/ProductPageLayout";
import { getProductBySlug } from "@/sanity/queries";
import { notFound } from "next/navigation";
import React from "react";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }
  
  return (
    <div className="min-h-screen bg-white">
      <ProductPageLayout product={product} />
    </div>
  );
};

export default SingleProductPage;
