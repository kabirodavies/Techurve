import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import EnhancedProductGallery from "@/components/EnhancedProductGallery";
import ProductHero from "@/components/ProductHero";
import ProductTabs from "@/components/ProductTabs";
import RelatedProducts from "@/components/RelatedProducts";
import { getProductBySlug, getProductsBySubcategory } from "@/sanity/queries";
import { currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const user = await currentUser();
  const showPrice = isAdmin(user);
  
  if (!product) {
    return notFound();
  }

  // Fetch related products in the same subcategory
  let relatedProducts: any[] = [];
  let featuredProduct: any = null;
  let subcategory = null;
  if (product.subcategory && product.subcategory._id) {
    relatedProducts = await getProductsBySubcategory(product.subcategory._id);
    // Exclude current product
    relatedProducts = relatedProducts.filter((p: any) => p._id !== product._id);
    
    // Collect all featured products (including current product if featured)
    const allFeaturedProducts: any[] = [];
    
    if (product.isFeatured) {
      allFeaturedProducts.push(product);
    }
    
    // Add featured products from related products
    const relatedFeatured = relatedProducts.filter((p: any) => p.isFeatured);
    allFeaturedProducts.push(...relatedFeatured);
    
    // Randomly select one featured product
    if (allFeaturedProducts.length > 0) {
      const randomIndex = Math.floor(Math.random() * allFeaturedProducts.length);
      featuredProduct = allFeaturedProducts[randomIndex];
    }
    
    // Remove featured products from related list
    relatedProducts = relatedProducts.filter((p: any) => !p.isFeatured);
    
    // Get subcategory info for button
    subcategory = product.subcategory;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ProductHero product={product} showPrice={showPrice} />
      {/* Sticky Tab Navigation */}
      <ProductTabs product={product} showPrice={showPrice} />
      {/* Related Products */}
      <RelatedProducts 
        currentProduct={product} 
        featuredProduct={featuredProduct}
        relatedProducts={relatedProducts}
        subcategory={subcategory}
      />
    </div>
  );
};

export default SingleProductPage;
