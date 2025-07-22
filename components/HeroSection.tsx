"use client";
import { usePathname } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";
import Image from "next/image";
import React from "react";


type HeroSectionProps = {
  title: string;
  subtitle?: string;
  bannerAlt?: string;
  children?: React.ReactNode;
  showImage?: boolean; // Add this line
};

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, bannerAlt = "Banner", children, showImage = true }) => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  return (
    <section className="relative bg-gradient-to-br from-blue-700 to-black
     text-white py-24 px-6 text-center overflow-hidden flex flex-col 
     items-center justify-center min-h-[420px]">
      {/* Banner/Poster Image */}
      {showImage && (
        <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
          <Image
            src="/banner/Horus.png"
            alt={bannerAlt}
            fill
            style={{ objectFit: "cover", opacity: 0.2 }}
            priority
          />
        </div>
      )}
      {/* Breadcrumbs (not on home page) */}
      {!isHome && (
        <div className="absolute top-4 left-4 z-20">
          <Breadcrumbs />
        </div>
      )}
      {/* Main Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-medium drop-shadow-md">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
};

export default HeroSection; 