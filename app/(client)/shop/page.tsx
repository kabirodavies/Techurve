import Shop from "@/components/Shop";
import { getCategoriesWithSubcategories, getAllBrands } from "@/sanity/queries";
import React from "react";
import Link from 'next/link'

const ShopPage = async () => {
  const categories = await getCategoriesWithSubcategories();
  const brands = await getAllBrands();
  return (
    <div className="bg-white">
      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 text-white py-24 px-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[420px]">
        {/* Animated/Illustrative Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#paint0_linear)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#a21caf" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight">Shop Security & Automation Devices</h1>
        <p className="relative z-10 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-medium drop-shadow-md">
          Discover the latest in security, biometrics, and smart automation. Curated for your peace of mind and convenience.
        </p>

        {/* Optional: Add a subtle floating icon or illustration for extra flair */}
        <div className="absolute bottom-0 right-0 z-0 opacity-30 pointer-events-none hidden md:block">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="90" r="90" fill="url(#paint1_radial)" />
            <defs>
              <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(90 90) scale(90)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" stopOpacity="0.7" />
                <stop offset="1" stopColor="#a21caf" stopOpacity="0.2" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;
