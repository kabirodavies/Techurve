import Shop from "@/components/Shop";
import HeroSection from "@/components/HeroSection";
import { getCategoriesWithSubcategories, getAllBrands } from "@/sanity/queries";
import React, { Suspense } from "react";

const ShopPage = async () => {
  const categories = await getCategoriesWithSubcategories();
  const brands = await getAllBrands();
  return (
    <div className="bg-white">
      {/* Modern Hero Section using reusable component */}
      <HeroSection
        title=""
        // title="Shop Security & Automation Devices"
        // subtitle="Discover the latest in security, biometrics, and smart automation. Curated for your peace of mind and convenience."
        bannerAlt="Shop Banner"
        showImage={true}
      />
      <Suspense fallback={<div className="flex justify-center items-center p-8">Loading shop...</div>}>
        <Shop categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
};

export default ShopPage;
