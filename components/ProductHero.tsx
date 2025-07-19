"use client";
import { ExpandedProduct } from "@/types/ExpandedProduct";
import { getBrand } from "@/sanity/queries";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";
import PriceView from "./PriceView";
import { Badge } from "./ui/badge";
import React, { useEffect, useState } from "react";
import EnhancedProductGallery from "./EnhancedProductGallery";
import { Shield, Zap, Star, CheckCircle } from "lucide-react";
import FeatureGrid from "./FeatureGrid";
import { featureIconMap } from "@/constants/featureIcons";
import { Product } from "@/sanity.types";

// Define a type for brand
interface BrandType { brandName?: string | null }

interface ProductHeroProps {
  product: ExpandedProduct | null | undefined;
  showPrice: boolean;
}

const ProductHero = ({ product, showPrice }: ProductHeroProps) => {
  const [brand, setBrand] = useState<BrandType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (product?.slug?.current) {
        const brandData = await getBrand(product.slug.current);
        setBrand(brandData?.[0] ?? null);
      }
    };
    fetchData();
  }, [product]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          {typeof product?.brand === 'object' && 'title' in (product.brand ?? {}) && (
            <>
              <span>Brand:</span>
              <span>{product.brand?.title}</span>
              <span>|</span>
            </>
          )}
          {typeof product?.subcategory === 'object' && 'parent' in (product.subcategory ?? {}) && (product.subcategory?.parent ?? {}) && 'title' in (product.subcategory?.parent ?? {}) && (
            <>
              <span>{(product.subcategory?.parent ?? {}).title}</span>
              <span>-</span>
            </>
          )}
          {typeof product?.subcategory === 'object' && 'title' in (product.subcategory ?? {}) && (
            <>
              <span>{(product.subcategory ?? {}).title}</span>
              <span>-</span>
            </>
          )}
          <span className="text-gray-900 font-medium">{product?.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Product Gallery */}
          <div className="space-y-4">
            <EnhancedProductGallery images={product?.images} isStock={product?.stock} />
            
            {/* Product Status Badges */}
            <div className="flex items-center gap-3">
              {product?.status === "new" && (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  <Star className="w-3 h-3 mr-1" />
                  New Arrival
                </Badge>
              )}
              {product?.status === "hot" && (
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                  <Zap className="w-3 h-3 mr-1" />
                  Hot Product
                </Badge>
              )}
              {product?.status === "sale" && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  On Sale
                </Badge>
              )}
              {brand && (
                <Badge variant="outline" className="text-sm">
                  {brand.brandName}
                </Badge>
              )}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-8">
            {/* Product Title */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {product?.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {product?.overview}
              </p>
            </div>

            {/* Key Features Grid */}
            {Array.isArray(product?.keyFeatures) && product.keyFeatures.length > 0 && (
              <FeatureGrid
                features={product.keyFeatures.slice(0, 4)}
                iconMap={featureIconMap}
                fallbackIcon={Shield}
              />
            )}

            {/* Product Highlights */}
            {Array.isArray(product?.keyHighlights) && product.keyHighlights.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Key Highlights</h3>
                <ul className="space-y-2">
                  {product.keyHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price & Stock */}
            <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <PriceView
                    price={product?.price}
                    discount={product?.discount}
                    className="text-3xl font-bold"
                    showPrice={showPrice}
                  />
                  {product?.discount !== undefined && product.discount > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      Save KES{product.discount} on this item
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      (product?.stock as number) > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      (product?.stock as number) > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                {product && <AddToCartButton product={product as Product} />}
                {product && <FavoriteButton showProduct={true} product={product as Product} />}
              </div>

              {/* Trust Indicators */}
              {Array.isArray(product?.trustIndicators) && product.trustIndicators.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {product.trustIndicators.map((indicator, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        {indicator}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero; 