import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProducts";
import HeroSection from "@/components/HeroSection";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();
  return (
    <>
      <HeroSection title="Your Wishlist" subtitle="Save your favorite products for later!" showImage={true} />
      {user ? (
        <WishListProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;
