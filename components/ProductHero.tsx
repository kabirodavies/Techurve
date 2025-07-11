"use client";
import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";
import PriceView from "./PriceView";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import EnhancedProductGallery from "./EnhancedProductGallery";
import { Shield, Zap, Wifi, Clock, CheckCircle, Star } from "lucide-react";

interface ProductHeroProps {
  product: Product | null | undefined;
  showPrice: boolean;
}

const ProductHero = ({ product, showPrice }: ProductHeroProps) => {
  const [brand, setBrand] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (product?.slug?.current) {
        const brandData = await getBrand(product.slug.current);
        setBrand(brandData?.[0]);
      }
    };
    fetchData();
  }, [product]);

  const keyFeatures = [
    { icon: Shield, label: "Enterprise Security", value: "Military-grade protection" },
    { icon: Zap, label: "Fast Response", value: "< 0.5s verification" },
    { icon: Wifi, label: "Smart Connectivity", value: "Wi-Fi & PoE ready" },
    { icon: Clock, label: "24/7 Operation", value: "Always-on monitoring" },
  ];

  const productHighlights = [
    "Advanced biometric authentication with 500 DPI capacitive sensor",
    "Weatherproof IP65 design for outdoor installation",
    "Real-time monitoring and instant alerts",
    "Remote management via secure web interface",
    "Easy integration with existing security systems",
    "Multi-factor authentication support",
    "Comprehensive audit trail and access logs",
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span>{product?.variant?.replace(/_/g, ' ')}</span>
          <span>/</span>
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
                {product?.description}
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <feature.icon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{feature.label}</p>
                    <p className="text-gray-600 text-xs">{feature.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Highlights */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Key Highlights</h3>
              <ul className="space-y-2">
                {productHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

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
                  {product?.discount && product.discount > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ${product.discount} on this item
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
                {product && <AddToCartButton product={product} />}
                {product && <FavoriteButton showProduct={true} product={product} />}
                <Button variant="outline" size="lg" className="flex-1">
                  Request Quote
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>✓ Free Shipping</span>
                  <span>✓ 2-Year Warranty</span>
                  <span>✓ 30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero; 