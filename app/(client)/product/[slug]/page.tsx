import ProductHero from "@/components/ProductHero";
import ProductTabs from "@/components/ProductTabs";
import RelatedProducts from "@/components/RelatedProducts";
import { getProductBySlug, getProductsBySubcategory } from "@/sanity/queries";
import { currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";
import { ExpandedProduct, toExpandedProduct } from "@/types/ExpandedProduct";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const productData = await getProductBySlug(slug);
  const product = productData ? toExpandedProduct(productData) : undefined;
  const user = await currentUser();

  if (!product) {
    return notFound();
  }

  // Fetch related products in the same subcategory
  let relatedProducts: ExpandedProduct[] = [];
  let featuredProduct: ExpandedProduct | null = null;
  let subcategory: { _id?: string } | null = null;
  if (product.subcategory && (product.subcategory as { _id?: string })._id) {
    const subcatId = (product.subcategory as { _id?: string })._id;
    if (subcatId) {
      relatedProducts = (await getProductsBySubcategory(subcatId)).map(toExpandedProduct);
      // Exclude current product
      relatedProducts = relatedProducts.filter((p) => p._id !== product._id);
      
      // Collect all featured products (including current product if featured)
      const allFeaturedProducts: ExpandedProduct[] = [];
      
      if (product.isFeatured) {
        allFeaturedProducts.push(product);
      }
      
      // Add featured products from related products
      const relatedFeatured = relatedProducts.filter((p) => !!p.isFeatured);
      allFeaturedProducts.push(...relatedFeatured);
      
      // Select featured product - random if multiple, direct if only one
      if (allFeaturedProducts.length > 0) {
        if (allFeaturedProducts.length === 1) {
          featuredProduct = allFeaturedProducts[0];
        } else {
          const randomIndex = Math.floor(Math.random() * allFeaturedProducts.length);
          featuredProduct = allFeaturedProducts[randomIndex];
        }
      } else if (relatedProducts.length > 0) {
        // Fallback: show the first related product as featured
        featuredProduct = relatedProducts[0];
        relatedProducts = relatedProducts.slice(1);
      }
      
      // Remove all featured from relatedProducts
      relatedProducts = relatedProducts.filter((p) => !p.isFeatured || p._id === featuredProduct?._id);
      
      // Get subcategory info for button
      subcategory = product.subcategory;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ProductHero product={product} showPrice={isAdmin(user)} />
      {/* Sticky Tab Navigation */}
      <ProductTabs product={product} />
      {/* Related Products */}
      <RelatedProducts 
        currentProduct={product} 
        featuredProduct={featuredProduct}
        relatedProducts={relatedProducts}
        subcategory={subcategory || undefined}
      />
    </div>
  );
};

export default SingleProductPage;
