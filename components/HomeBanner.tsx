"use client";

import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import { banner, G4Pro, ZK3, ZK4, Horus } from "@/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const sliderImages = [banner, G4Pro, ZK3, ZK4, Horus];

const HomeBanner = () => {
  return (
    <div className="mb-8 rounded-lg overflow-hidden relative">
      <Swiper
        modules={[EffectFade, Pagination, Autoplay]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 30000 }}
        className="w-full h-[320px] md:h-[420px] lg:h-[500px]"
      >
        {sliderImages.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              alt={`banner_${idx + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className="w-full h-full"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-black/30 z-10" />
            {idx === 0 && (
              <div className="absolute inset-0 flex flex-col justify-center z-20 px-6 md:px-24">
                <Title className="text-white drop-shadow-lg text-2xl md:text-3xl lg:text-4xl mb-6">
                  Discover curated security solutions<br />
                  Protect your digital & physical assets.
                </Title>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-6 right-6 md:right-24 z-30 flex gap-4">
        <Link
          href={"/shop"}
          className="bg-shop_dark_blue/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_dark_blue hoverEffect"
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
    </div>
  );
};

export default HomeBanner;