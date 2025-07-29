import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
// import About from "@/components/About";
import ServicesSection from "@/components/ServicesSection";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";

import React from "react";

const Home = async () => {
  const categories = await getCategories(6);
  
  return (
    <>
      <HomeBanner />
      <Container className="bg-shop-light-pink">
        {/* <About /> */}
        <ServicesSection />
        <HomeCategories categories={categories} />
        <ShopByBrands/>
        <LatestBlog />
      </Container>
    </>
  );
};

export default Home;
