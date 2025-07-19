"use client";
import React, { useRef, useState } from "react";
import EnhancedProductGallery from "./EnhancedProductGallery";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Download, 
  Info, 
  Wrench, 
  FileText, 
  Sliders, 
  Shield, 
  Zap, 
  ShoppingCart,
  Wifi, 
  Settings,
  Cpu // <-- Add this import
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import FeatureGrid from "./FeatureGrid";
import { featureIconMap } from "@/constants/featureIcons";
import { ExpandedProduct } from "@/types/ExpandedProduct";
import Image from "next/image";

const TABS = [
  { key: "overview", label: "Overview", icon: Info },
  { key: "features", label: "Features", icon: Shield },
  { key: "specs", label: "Specifications", icon: Sliders },
  { key: "downloads", label: "Downloads", icon: Download },
  { key: "product", label: "Similar Products", icon: ShoppingCart },
];

// Types for product, keyFeatures, and specifications
interface ProductFeature {
  id: string; // Should match keys in featureIconMap
  label: string;
  value?: string;
  description?: string;
}

const ProductTabs = ({ product }: { product: ExpandedProduct }) => {
  const [activeTab, setActiveTab] = useState("features");
  const refs = {
    overview: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    specs: useRef<HTMLDivElement>(null),
    downloads: useRef<HTMLDivElement>(null),
    product: useRef<HTMLDivElement>(null),

  };

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    const ref = refs[key as keyof typeof refs];
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Icon mapping for technical specification categories (should match category from Sanity)
  const specCategoryIconMap: Record<string, React.ElementType> = {
    Hardware: Cpu,
    Biometric: Shield,
    Connectivity: Wifi,
    "Power & Environment": Zap,
    // Add more mappings as needed, matching your Sanity category names
  };

  // Add icon mapping for downloads (reuse featureIconMap and add file-specific icons)
  const downloadIconMap: Record<string, React.ElementType> = {
    FileText,
    Wrench,
    Download: Download,
    Settings,
    Sliders,
    Shield,
    // Add more mappings as needed
    ...featureIconMap,
  };

  return (
    <div className="relative bg-gray-50">
      {/* Sticky Tab Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-2 px-4 py-2 overflow-x-auto">
          {TABS.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              className="flex items-center gap-2 px-4 py-2 text-base whitespace-nowrap"
              onClick={() => handleTabClick(tab.key)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
  {/* Overview Section */}
  {activeTab === "overview" && (
    <section ref={refs.overview} id="overview" className="space-y-8">
      <div className="text-center space-y-4"></div>
      <div className="text-center space-y-4">
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          {product?.name} {product?.description}
        </p>
      </div>
    </section>
  )}

  {/* Features Section */}
  {activeTab === "features" && (
    <section ref={refs.features} id="features" className="space-y-8">
      {product?.keyFeatures && product.keyFeatures.length > 0 && (() => {
        const half = Math.ceil(product.keyFeatures.length / 2);
        const leftFeatures = product.keyFeatures.slice(0, half).map((f: ProductFeature) => ({ ...f, value: f.value ?? "" }));
        const rightFeatures = product.keyFeatures.slice(half).map((f: ProductFeature) => ({ ...f, value: f.value ?? "" }));
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
            {/* Left Features */}
            <div className="flex flex-col gap-6 flex-1 items-end w-full md:w-auto">
              <FeatureGrid
                features={leftFeatures}
                iconMap={featureIconMap}
                fallbackIcon={Shield}
              />
            </div>
            {/* Product Image */}
            <div className="flex-shrink-0">
              <Image
                src={
                  product.images?.[0]
                    ? urlFor(product.images[0]).width(400).height(400).url() || '/placeholder.png'
                    : '/placeholder.png'
                }
                alt={product.name || 'Product image'}
                width={256}
                height={256}
                className="w-64 h-64 object-contain rounded-lg shadow"
              />
            </div>
            {/* Right Features */}
            <div className="flex flex-col gap-6 flex-1 items-start w-full md:w-auto">
              <FeatureGrid
                features={rightFeatures}
                iconMap={featureIconMap}
                fallbackIcon={Shield}
              />
            </div>
          </div>
        );
      })()}
    </section>
  )}

  {/* Specifications Section */}
  {activeTab === "specs" && (
    <section ref={refs.specs} id="specs" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Technical Specifications</h2>
        <p className="text-lg text-gray-600">
          Comprehensive technical details and performance specifications
        </p>
      </div>
      <div className="text-center text-gray-400">No technical specifications available.</div>
    </section>
  )}

  {/* Downloads Section */}
  {activeTab === "downloads" && (
    <section ref={refs.downloads} id="downloads" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Downloads & Resources</h2>
        <p className="text-lg text-gray-600">
          Access product documentation and software tools
        </p>
      </div>
      <div className="text-center text-gray-400 col-span-full">No downloads available.</div>
    </section>
  )}

  {/* Similar Products Section */}
  {activeTab === "product" && (
    <section ref={refs.product} id="products" className="space-y-8">
      {/* Render your RelatedProducts or similar component here */}
      {/* Example: <RelatedProducts currentProduct={product as ExpandedProduct} relatedProducts={[]} /> */}
    </section>
  )}
</div>
    </div>
  );
};

export default ProductTabs; 