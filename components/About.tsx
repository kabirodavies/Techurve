"use client";

import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  // Removed unused imports: Shield, Monitor, Lock, MessageCircle, CheckCircle2, ArrowRight, Play, Apple
} from "lucide-react";
import { featureIconMap } from "@/constants/featureIcons";
import { getAllSolutions } from "@/sanity/queries/index";
import { useEffect, useState } from "react";
import { getCategoriesWithSubcategories, getProductsBySubcategory } from "@/sanity/queries";

// Add a type for the solution object
interface Solution {
  _id: string;
  title: string;
  slug: { current: string };
  summary: string;
  icon: string;
  industries?: string[];
  body?: unknown;
}

const About = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  // Removed unused featuredProduct and featuredLoading state
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const softwareBanners = [
    "/software_banner/ZKBio CVSecurity V6.6.0 Web Banner 202506.jpg",
    "/software_banner/ZKBio CVSecurity V6.6.0-10th Anniversary Poster 202506.jpg",
    "/software_banner/ZKBio Zexus Mobile App Web Banner 2024.png",
    "/software_banner/ZKBio CVSecurity V6.4.0_R Space Management Banner 202411.png",
    "/software_banner/ZKBio CVSecurity V6.4.0_R Video Intercom Banner 202411.png",
    "/software_banner/ZKBioCVSecurity-Web-banner.jpg"
  ];

  useEffect(() => {
    async function fetchSolutions() {
      try {
        const data = await getAllSolutions();
        setSolutions(data);
      } catch {
        setSolutions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSolutions();
  }, []);

  useEffect(() => {
    async function fetchFeatured() {
      // Removed setFeaturedLoading(true) and setFeaturedLoading(false)
      try {
        const categories = await getCategoriesWithSubcategories();
        // Find the subcategory for Entrance Control
        const entranceSubcat = (categories as { subcategories?: { title?: string; slug?: { current?: string }; _id: string }[] }[])
          .flatMap((cat) => cat.subcategories || [])
          .find((sub) =>
            sub.title?.toLowerCase().includes("entrance control") ||
            sub.slug?.current?.toLowerCase().includes("entrance-control")
          );
        if (!entranceSubcat) {
          // Removed setFeaturedProduct(null)
          return;
        }
        // Removed unused 'products' variable
      } catch {
        // Removed setFeaturedProduct(null)
      }
    }
    fetchFeatured();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % softwareBanners.length);
    }, 30000); // Change banner every 30 seconds

    return () => clearInterval(timer);
  }, [softwareBanners.length]);

  return (
    <Container className="py-16">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-shop_dark_blue mb-4">
        Why you choose Techurve Solutions.</h2>
        <p className="text-xl text-gray-600 mb-8 text-center">Learn more about how we can help you. 
          <br />
          Discover curated security solutions  and AI-based Biometric Solution</p>
      </motion.div>

      {/* Features Section (now using solutions) */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >        
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((feature, index) => {
              const Icon = featureIconMap[feature.icon] || featureIconMap["shield"];
              return (
                <motion.div
                  key={feature._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                        {feature.summary}
                      </p>
                      <Button 
                        variant="link" 
                        className="text-purple-600 hover:text-purple-700 p-0 h-auto font-medium underline"
                        asChild
                      >
                        <a href={feature.slug ? `/solutions/${feature.slug.current}` : '#'} target="_blank" rel="noopener noreferrer">
                          Learn More →
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Analytics Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full"
      >
        {/* Software Banner Slider - Full Width */}
        <div className="relative w-full h-[520px] flex items-center justify-center">
          {/* Left Arrow */}
          <button
            aria-label="Previous banner"
            onClick={() => setCurrentBannerIndex((prev) => (prev - 1 + softwareBanners.length) % softwareBanners.length)}
            className="absolute left-4 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2 transition-all"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          {/* Banner Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBannerIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="relative w-full h-full"
            >
              <Image
                src={softwareBanners[currentBannerIndex]}
                alt={`Software Solution Banner ${currentBannerIndex + 1}`}
                fill
                className="object-contain rounded-2xl"
                priority={currentBannerIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow */}
          <button
            aria-label="Next banner"
            onClick={() => setCurrentBannerIndex((prev) => (prev + 1) % softwareBanners.length)}
            className="absolute right-4 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2 transition-all"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          {/* Banner Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {softwareBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentBannerIndex 
                    ? 'bg-white shadow-lg scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default About;