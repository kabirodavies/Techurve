"use client";

import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HomeBanner = () => {
  return (
    <section className="mb-8 rounded-lg overflow-hidden relative w-full min-h-[440px] md:min-h-[560px] flex items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-900 to-fuchsia-800">
      {/* SVG Overlay for extra flair */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-25" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#paint0_linear)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center w-full h-full px-6 md:px-24 gap-10 py-16 md:py-0">
        {/* Text and CTAs on the left */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:mr-16 order-2 md:order-1">
          <Title className="text-white drop-shadow-2xl text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            Industry-Leading<br className="hidden md:block" />
            Biometric Security Solutions
          </Title>
          <p className="text-white/95 text-xl md:text-2xl font-semibold mb-10 max-w-2xl drop-shadow-lg">
            Streamline identity management and protect your digital & physical assets with advanced fingerprint, facial, and iris recognition technology.
          </p>
          <div className="flex gap-6">
            <Link
              href="/shop"
              className="bg-white text-shop_dark_blue px-8 py-4 rounded-lg text-lg font-bold shadow-2xl hover:bg-shop_dark_blue hover:text-white transition-colors duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/60"
            >
              View Products
            </Link>
            <Link
              href="/contact"
              className="bg-shop_dark_blue text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl hover:bg-white hover:text-shop_dark_blue transition-colors duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-shop_dark_blue/60"
            >
              Contact Us
            </Link>
          </div>
        </div>
        {/* Animated biometrics icon on the right */}
        <div className="w-48 h-48 md:w-80 md:h-80 flex-shrink-0 mb-8 md:mb-0 order-1 md:order-2" style={{filter: 'brightness(0) invert(1)'}}>
          <DotLottieReact
            src="https://lottie.host/df5c077c-e7f4-475d-a728-9d3ae6fcd418/2JV7Mj8kmN.lottie"
            loop
            autoplay
            speed={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;