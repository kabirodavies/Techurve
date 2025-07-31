"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';

export default function HomeBanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="w-full bg-shop_light_blue rounded-lg px-6 md:px-16 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-10 animate-fadeIn">
      {/* Left: Text Section */}
      <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Your Trusted
          <br />
          Partener in Security.
        </h1>
        <p className="text-gray-900 mb-8 text-base md:text-lg">
          Explore top-quality surveillance systems and security products
          designed to protect your home and business. Shop now for the latest in
          safety and peace of mind
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link 
            href="/shop" 
            className="bg-shop_dark_blue text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-shop_dark_blue/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Shop
          </Link>
          <Link 
            href="/case-study" 
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-shop_dark_blue/90 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Case Studies
          </Link>
        </div>
      </div>
      {/* Right: Video Section */}
      <div className="flex-1 flex items-center justify-center w-full max-w-xl aspect-video bg-white relative rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
        <video
          ref={videoRef}
          src="https://stream.mux.com/hPthtXB2E9wOOipb7bUWsmsoZLiXqJXQP43IG00dNB004.m3u8"
          poster="https://image.mux.com/hPthtXB2E9wOOipb7bUWsmsoZLiXqJXQP43IG00dNB004/thumbnail.webp"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "1.5rem", // extra rounded
          }}
          controls={isPlaying}
          autoPlay={isPlaying}
          muted={true}
          preload="metadata"
        />
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
             bg-blue-600/90 text-white border-none rounded-full w-14 
             h-14 text-3xl flex items-center justify-center shadow-lg cursor-pointer
              z-10 transition-all duration-300 ease-in-out hover:scale-110
               hover:bg-blue-700 animate-fadeIn"
            aria-label="Play video"
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
}