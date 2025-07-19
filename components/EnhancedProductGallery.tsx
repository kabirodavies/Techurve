"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ExpandedProduct } from "@/types/ExpandedProduct";

interface Props {
  images?: ExpandedProduct['images'];
  isStock?: number | undefined;
}

const EnhancedProductGallery = ({ images = [], isStock }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const imageSections = [
    { id: 'top-left', label: 'Sensor Area', x: 0, y: 0, width: 50, height: 50 },
    { id: 'top-right', label: 'Display', x: 50, y: 0, width: 50, height: 50 },
    { id: 'bottom-left', label: 'Connectors', x: 0, y: 50, width: 50, height: 50 },
    { id: 'bottom-right', label: 'Mounting', x: 50, y: 50, width: 50, height: 50 },
  ];

  const activeImage = images[activeIndex];

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Image Display */}
      <div className="relative overflow-hidden border rounded-md">
        <div className="p-0">
          <div className="relative group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage?._key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[400px] lg:h-[450px] bg-gray-100"
              >
                <Image
                  src={urlFor(activeImage).url()}
                  alt={`Product image ${activeIndex + 1}`}
                  fill
                  className={`object-contain transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 
                    hoveredSection ? 'scale-125' : 'group-hover:scale-105'
                  } ${isStock === 0 ? "opacity-50" : ""}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                      onClick={prevImage}
                    >
                      <span className="sr-only">Previous</span>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                      onClick={nextImage}
                    >
                      <span className="sr-only">Next</span>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Button>
                  </>
                )}
                {/* Action Buttons */}
                <div className="absolute top-4 right-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white shadow-lg"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M15.5 15.5L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/></svg>
                  </Button>
                </div>
                {/* Interactive Image Sections */}
                <div className="absolute inset-0 pointer-events-none">
                  {imageSections.map((section) => (
                    <div
                      key={section.id}
                      className="absolute border-2 border-transparent hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 pointer-events-auto cursor-pointer"
                      style={{
                        left: `${section.x}%`,
                        top: `${section.y}%`,
                        width: `${section.width}%`,
                        height: `${section.height}%`,
                      }}
                      onMouseEnter={() => setHoveredSection(section.id)}
                      onMouseLeave={() => setHoveredSection(null)}
                    >
                      {hoveredSection === section.id && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          {section.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {activeIndex + 1} / {images.length}
                </div>
                {/* Stock Overlay */}
                {isStock === 0 && (
                  <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                      Out of Stock
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image._key}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square border-2 rounded-lg overflow-hidden transition-all ${
                index === activeIndex
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={urlFor(image).url()}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {index === activeIndex && (
                <div className="absolute inset-0 bg-blue-600/20" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedProductGallery; 