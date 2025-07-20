"use client"

import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Product } from "@/sanity.types";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";
import { ExpandedProduct } from "@/types/ExpandedProduct";
import Image from "next/image";

const TABS = [
  { label: "Features", id: "features" },
  { label: "Specs", id: "specs" },
  { label: "Installation", id: "installation" },
  { label: "FAQ", id: "faq" },
  { label: "Downloads", id: "downloads" },
];

interface ProductPageLayoutProps {
  product?: Product | null;
}

const ProductPageLayout: React.FC<ProductPageLayoutProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("features");
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-4 pt-8 pb-6 border-b">
        {/* Media Gallery */}
        {product?.images && (
          <ImageView images={product?.images} isStock={product?.stock} />
        )}
        {/* Product Info */}
        <div className="flex-[2] flex flex-col justify-between gap-2">
          <div>
            {/* Category, Subcategory info (above name) */}
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 font-medium mt-2 mb-2">
              {product?.subcategory &&
                typeof product.subcategory === 'object' &&
                product.subcategory !== null &&
                'parent' in product.subcategory &&
                typeof product.subcategory.parent === 'object' &&
                product.subcategory.parent !== null &&
                'title' in product.subcategory.parent &&
                'slug' in product.subcategory.parent &&
                'title' in product.subcategory &&
                'slug' in product.subcategory &&
                <span>
                  <Link href={`/category/${(product.subcategory.parent as any).slug.current}`} className="hover:underline text-shop_dark_blue">
                    {(product.subcategory.parent as any).title}
                  </Link>
                  {" > "}
                  <Link href={`/category/${(product.subcategory.parent as any).slug.current}?subcategory=${(product.subcategory as any).slug.current}`} className="hover:underline text-shop_dark_blue">
                    {(product.subcategory as any).title}
                  </Link>
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product?.name || "Product Name Placeholder"}</h1>
            <p className="text-lg text-gray-600 mb-2">{product?.description || "Short product tagline or description goes here."}</p>
            {/* Brand info (below description) */}
            {product?.brand &&
              typeof product.brand === 'object' &&
              product.brand !== null &&
              'title' in product.brand && (
                <div className="mb-2 text-xs text-gray-500 font-medium">
                  Brand: <Link href={`/shop?brand=${encodeURIComponent((product.brand as any).title)}`} className="hover:underline text-shop_dark_blue font-semibold">{(product.brand as any).title}</Link>
                </div>
              )}
            <PriceView price={typeof product?.price === 'number' ? product.price : 0} discount={typeof product?.discount === 'number' ? product.discount : 0} />
            <p className={`px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg ${product?.stock === 0 ? "bg-red-100 text-red-600" : "text-green-600 bg-green-100"} mt-2`}>
              {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {product && <AddToCartButton product={product} />}
            <FavoriteButton showProduct={true} product={product} />
            <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">Compare Models</Button>
              </DialogTrigger>
              <DialogContent>
                <h2 className="text-xl font-semibold mb-2">Compare Models</h2>
                <p>Comparison table/modal placeholder.</p>
                <Button onClick={() => setCompareOpen(false)} className="mt-4">Close</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Sticky Tab Navigation */}
      <nav className="sticky top-0 z-10 bg-white border-b flex gap-6 py-2 mt-2 mb-6 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium rounded transition-colors ${activeTab === tab.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div>
        {activeTab === "features" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Feature 1 placeholder</li>
              <li>Feature 2 placeholder</li>
              <li>Feature 3 placeholder</li>
            </ul>
          </section>
        )}
        {activeTab === "specs" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
            <Accordion type="multiple" className="w-full max-w-2xl">
              <AccordionItem value="specs-1">
                <AccordionTrigger>General Specs</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Spec A: Value</li>
                    <li>Spec B: Value</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specs-2">
                <AccordionTrigger>Dimensions</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Height: 100mm</li>
                    <li>Width: 200mm</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        )}
        {activeTab === "installation" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Install</h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl">
              <AccordionItem value="install-1">
                <AccordionTrigger>Step 1: Unbox</AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-4 items-center">
                    <Image src="/placeholder1.png" alt="Step 1" width={96} height={96} className="w-24 h-24 object-cover rounded" />
                    <span>Unbox the product and check all components.</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="install-2">
                <AccordionTrigger>Step 2: Setup</AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-4 items-center">
                    <Image src="/placeholder2.png" alt="Step 2" width={96} height={96} className="w-24 h-24 object-cover rounded" />
                    <span>Follow the setup instructions in the manual.</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        )}
        {activeTab === "faq" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl">
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is the warranty?</AccordionTrigger>
                <AccordionContent>Warranty info placeholder.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How do I get support?</AccordionTrigger>
                <AccordionContent>Support info placeholder.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        )}
        {activeTab === "downloads" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Downloads</h2>
            <div className="flex flex-col gap-4">
              <Button asChild>
                <a href="/manual.pdf" download>
                  Download Product Manual (PDF)
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/specsheet.pdf" download>
                  Download Spec Sheet (PDF)
                </a>
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPageLayout; 