"use client";

import React, { useRef, useState } from 'react';
import Video from 'next-video';
import Horus from '@/videos/Horus - Promotion video.mp4';
import { Title } from "./ui/text";
import Link from "next/link";

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
    <div className="w-full flex flex-col items-center justify-center animate-fadeIn">
      <div className="w-full aspect-video bg-black relative">
        <Video
          ref={videoRef}
          src={Horus}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          controls={isPlaying}
          autoPlay={isPlaying}
          muted={true}
        />
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 text-white border-none rounded-full w-20 h-20 text-4xl flex items-center justify-center shadow-lg cursor-pointer z-10 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-blue-700 hoverEffect animate-fadeIn"
            aria-label="Play video"
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
}