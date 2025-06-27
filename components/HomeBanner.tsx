import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import { banner } from "@/images";

const HomeBanner = () => {
  return (
    <div className="mb-8 py-16 md:py-0 bg-shop_light_blue rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div className="space-y-5">
        <Title className=" text-blue-900 text-2xl md:text-3xl lg:text-4xl">
          Discover curated security solutions<br />
          Protect your digital & physical assets. 
          
           
        </Title>
        <Link
          href={"/shop"}
          className="bg-shop_dark_blue/90 mr-5 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_dark_blue hoverEffect"
        >
          Get a Quote
        </Link>
                <Link
          href={"/contact"}
          className="bg-shop_dark_blue/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_dark_blue hoverEffect"
        >
          Contact Us
        </Link>
      </div>
      <div>
        <Image
          src={banner}
          alt="banner_1"
          className="hidden md:inline-flex w-100"
        />
      </div>
    </div>
  );
};

export default HomeBanner;