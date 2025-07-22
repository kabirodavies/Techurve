import Shop from "@/components/Shop";
import HeroSection from "@/components/HeroSection";
import { getCategoriesWithSubcategories, getAllBrands } from "@/sanity/queries";
import React from "react";

const ShopPage = async () => {
  const categories = await getCategoriesWithSubcategories();
  const brands = await getAllBrands();
  return (
    <div className="bg-white">
      {/* Modern Hero Section using reusable component */}
      <HeroSection
        title="Shop Security & Automation Devices"
        subtitle="Discover the latest in security, biometrics, and smart automation. Curated for your peace of mind and convenience."
        bannerAlt="Shop Banner"
        showImage={true}
      />
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;
