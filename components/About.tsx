"use client";

import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  ArrowRightCircle
  // Removed unused imports: Shield, Monitor, Lock, MessageCircle, CheckCircle2, ArrowRight, Play, Apple
} from "lucide-react";
import { featureIconMap } from "@/constants/featureIcons";
import { getAllSolutions } from "@/sanity/queries/index";
import { useEffect, useState } from "react";
import { getCategoriesWithSubcategories } from "@/sanity/queries";

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
  const [currentSolutionsPage, setCurrentSolutionsPage] = useState(0);
  
  // Calculate how many solutions to show per page based on screen size
  const solutionsPerPage = 4; // Show 4 solutions per page
  const totalPages = Math.ceil(solutions.length / solutionsPerPage);

  const softwareBanners = [
    "/software_banner/ZKBio Zexus Mobile App Web Banner 2024.png",
    "/software_banner/ZKBio CVSecurity V6.4.0_R Space Management Banner 202411.png",
    "/software_banner/ZKBio CVSecurity V6.4.0_R Video Intercom Banner 202411.png",
    "/software_banner/ZKBioCVSecurity-Web-banner.jpg",
    "/software_banner/zk1.jpg",
    "/software_banner/zk2.jpg",
    "/software_banner/zk3.jpg"
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
        Why Choose Techurve Solutions.</h2>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Discover curated security solutions  and AI-based Biometric Solution. 
        </p>
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
                     <div className="relative">
             {/* Solutions Carousel with Flanking Navigation */}
             <div className="flex items-center gap-6">
               {/* Left Navigation Arrow */}
               {totalPages > 1 && (
                 <button
                   aria-label="Previous solutions"
                   onClick={() => setCurrentSolutionsPage((prev) => (prev - 1 + totalPages) % totalPages)}
                   className="bg-shop_dark_blue hover:bg-shop_dark_blue/90 text-white shadow-lg rounded-full p-4 transition-all transform hover:scale-105 flex-shrink-0"
                 >
                   <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                 </button>
               )}

               {/* Solutions Grid - Center */}
               <div className="flex-1">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={currentSolutionsPage}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.5 }}
                     className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                   >
                     {solutions
                       .slice(currentSolutionsPage * solutionsPerPage, (currentSolutionsPage + 1) * solutionsPerPage)
                       .map((feature, index) => {
                         const Icon = featureIconMap[feature.icon] || featureIconMap["shield"];
                         return (
                           <motion.div
                             key={feature._id || index}
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.1 * index }}
                           >
                                                           <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-gray-50 transform hover:-translate-y-1 hover:scale-105 cursor-pointer group">
                               <CardContent className="p-6 text-center">
                                                                   <div className="w-16 h-16 bg-shop_dark_blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-md transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110">
                                    <Icon className="w-8 h-8 text-white transition-all duration-300 group-hover:scale-110" />
                                  </div>
                                                                   <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 transition-all duration-300 group-hover:text-shop_dark_blue">
                                    {feature.title}
                                  </h3>
                                 <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                                   {feature.summary}
                                 </p>
                                 <Button 
                                   variant="link" 
                                   className="text-gray-600 hover:text-black p-0 h-auto font-medium underline"
                                   asChild
                                 >
                                   <a href={feature.slug ? `/solutions/${feature.slug.current}` : '#'}>
                                     Learn More →
                                   </a>
                                 </Button>
                               </CardContent>
                             </Card>
                           </motion.div>
                         );
                       })}
                   </motion.div>
                 </AnimatePresence>
               </div>

               {/* Right Navigation Arrow */}
               {totalPages > 1 && (
                 <button
                   aria-label="Next solutions"
                   onClick={() => setCurrentSolutionsPage((prev) => (prev + 1) % totalPages)}
                   className="bg-shop_dark_blue hover:bg-shop_dark_blue/90 text-white shadow-lg rounded-full p-4 transition-all transform hover:scale-105 flex-shrink-0"
                 >
                   <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                 </button>
               )}
             </div>

             {/* Page Indicator - Below cards */}
             {totalPages > 1 && (
               <div className="flex justify-center mt-6">
                 <div className="text-sm text-gray-600 font-medium">
                   Page {currentSolutionsPage + 1} of {totalPages}
                 </div>
               </div>
             )}

            {/* Solutions Indicators */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSolutionsPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSolutionsPage 
                        ? 'bg-shop_dark_blue shadow-lg scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* View All Solutions Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-8"
            >
              <Link 
                href="/solutions" 
                className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_blue hover:underline transition-colors px-5 py-2 rounded-full border border-gray-300 bg-white text-black shadow text-sm md:text-base inline-flex items-center gap-4"
              >
                <span className="text-black">VIEW SOLUTIONS</span>
                <span className="ml-2 inline-flex items-center justify-center rounded-full bg-shop_dark_blue w-8 h-8">
                  <ArrowRightCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </span>
              </Link>
            </motion.div>
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
                   className="bg-shop_dark_blue hover:bg-shop_dark_blue/90 text-white shadow-lg rounded-full p-4 transition-all transform hover:scale-105 flex-shrink-0"
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
            className="bg-shop_dark_blue hover:bg-shop_dark_blue/90 text-white shadow-lg rounded-full p-4 transition-all transform hover:scale-105 flex-shrink-0"
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

      {/* How It Works Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20"
      >
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 text-center">
            {/* Elegant Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How Our Solutions Work
              </h2>
              <div className="w-24 h-1 bg-shop_dark_blue mx-auto rounded-full"></div>
            </motion.div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {[
                {
                  icon: "🔍",
                  title: "Consultation",
                  description: "We assess your needs and recommend the best-fit solution.",
                  step: "01"
                },
                {
                  icon: "⚙️", 
                  title: "Integration",
                  description: "Seamless integration of devices and software for your environment.",
                  step: "02"
                },
                {
                  icon: "📈",
                  title: "Support & Growth", 
                  description: "Ongoing support and scalable solutions as your needs evolve.",
                  step: "03"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  className="relative group"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-shop_dark_blue rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-shop_dark_blue/20">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Creative Meeting Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="relative"
            >
              <div className="bg-shop_dark_blue p-1 rounded-2xl shadow-lg">
                <div className="bg-white rounded-xl p-8 relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-shop_dark_blue/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-shop_dark_blue/10 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Ready to Get Started?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Let&apos;s discuss your security needs and find the perfect solution for your business.
                    </p>
                    
                    <a 
                      href="https://calendly.com/techurvesolutions-info/30min" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_blue hover:underline transition-colors px-5 py-2 rounded-full border border-gray-300 bg-white text-black shadow text-sm md:text-base inline-flex items-center gap-4"
                    >
                      <span className="text-black">SET UP A MEETING</span>
                      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-shop_dark_blue w-8 h-8">
                        <ArrowRightCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </Container>
  );
};

export default About;