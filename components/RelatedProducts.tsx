"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Star, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

// Extended Product interface for expanded references
interface ExpandedProduct extends Omit<Product, 'brand' | 'subcategory'> {
  brand?: {
    title?: string;
    slug?: { current?: string };
  };
  subcategory?: {
    _id?: string;
    title?: string;
    slug?: { current?: string };
    parent?: {
      title?: string;
      slug?: { current?: string };
    };
  };
}

interface RelatedProductsProps {
  currentProduct: ExpandedProduct;
  featuredProduct?: ExpandedProduct | null;
  relatedProducts?: ExpandedProduct[];
  subcategory?: any;
}

const RelatedProducts = ({ 
  currentProduct, 
  featuredProduct, 
  relatedProducts = [], 
  subcategory 
}: RelatedProductsProps) => {
  const displayProducts = relatedProducts.slice(0, 4); // Limit to 4 products for grid
  const subcategoryTitle = subcategory?.title || currentProduct.variant?.replace(/_/g, ' ');
  const subcategorySlug = subcategory?.slug?.current || currentProduct.variant;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Related Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover more {subcategoryTitle?.toLowerCase()} solutions from our comprehensive product line
          </p>
        </div>

        {/* Featured Product Highlight - Only show if there's a featured product */}
        {featuredProduct && (
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                <CardTitle className="text-xl text-blue-900">
                    Featured Product: {featuredProduct.name}
                </CardTitle>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                Most Popular
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {/* Brand, Category, and Subcategory Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">Brand:</span>
                    {featuredProduct.brand && (
                      <Badge variant="outline" className="text-sm font-medium text-blue-700 border-blue-300">
                        {featuredProduct.brand.title}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {featuredProduct.subcategory?.parent && (
                      <span className="hover:text-blue-600 transition-colors">
                        {featuredProduct.subcategory.parent.title}
                      </span>
                    )}
                    {featuredProduct.subcategory?.parent && featuredProduct.subcategory?.title && (
                      <span className="text-gray-400">•</span>
                    )}
                    {featuredProduct.subcategory?.title && (
                      <span className="hover:text-blue-600 transition-colors">
                        {featuredProduct.subcategory.title}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                    {featuredProduct.name}
                </h3>
                <p className="text-gray-600">
                    {featuredProduct.description}
                </p>
                {/* Price Section - Use PriceView just like ProductHero */}
                <div className="flex items-center gap-4">
                  <PriceView price={featuredProduct.price} discount={featuredProduct.discount} className="text-3xl font-bold" showPrice={true} />
                </div>
                <div className="flex items-center gap-3">
                  <AddToCartButton product={featuredProduct as any} />
                  <Link href={`/product/${featuredProduct.slug?.current}`}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      View Product
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
                <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
                  {featuredProduct.images && featuredProduct.images.length > 0 ? (
                    <img 
                      src={urlFor(featuredProduct.images[0]).url()} 
                      alt={featuredProduct.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                <span className="text-gray-500">Product Image</span>
                  )}
              </div>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Related Products Grid */}
        {displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product as any} />
          ))}
        </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800">
                No Related Products Available
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-600"
            >
              We&apos;re sorry, but there are no other products in the{" "}
              <span className="text-base font-semibold text-darkColor">
                {subcategoryTitle}
              </span>{" "}
              category at the moment.
            </motion.p>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex items-center space-x-2 text-shop_dark_green"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>We&apos;re adding more products shortly</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm text-gray-500"
            >
              Please check back later or explore our other product categories.
            </motion.p>
          </div>
        )}

        {/* View All Products CTA */}
        <div className="text-center mt-12">
          <Link href={`/category/${subcategorySlug}`}>
          <Button variant="outline" size="lg" className="px-8">
              View All {subcategoryTitle} Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts; 