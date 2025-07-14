"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import Container from "./Container";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Cloud, 
  Server, 
  Shield, 
  Globe, 
  Zap, 
  Users, 
  Building2, 
  CheckCircle2,
  ArrowRight,
  Database,
  Network,
  Smartphone,
  Lightbulb,
  Target,
  Handshake,
  Settings,
  Headphones
} from "lucide-react";

const ProductGrid = () => {
  const [selectedSolution, setSelectedSolution] = useState<'onpremise' | 'cloud' | 'hybrid'>('cloud');

  const solutions = {
    onpremise: {
      title: "On-Premise Access Control Solutions",
      subtitle: "Traditional, secure, and reliable access control systems",
      description: "Deploy robust access control systems within your own infrastructure with complete control over your security data and operations.",
      features: [
        "Complete data ownership and control",
        "No internet dependency for core operations",
        "Customizable to specific requirements",
        "One-time investment with predictable costs",
        "Full integration with existing infrastructure",
        "Advanced security protocols and encryption"
      ],
      benefits: [
        { icon: Shield, text: "Enhanced Security Control" },
        { icon: Database, text: "Local Data Storage" },
        { icon: Network, text: "Offline Operation" },
        { icon: Building2, text: "Custom Integration" }
      ],
      cta: "Learn More About On-Premise",
      image: "/images/onpremise-solution.jpg"
    },
    cloud: {
      title: "100% Cloud Access Control Platform",
      subtitle: "AWS Cloud Platform",
      description: "Experience the world's best biometric security in the cloud, zero on-prem infrastructure, and the industry's widest range of credentials.",
      features: [
        "Zero on-premise infrastructure required",
        "World's leading biometrics, now in the cloud",
        "Multi-branch management from anywhere",
        "Automatic updates and maintenance",
        "Scalable to any organization size",
        "Real-time monitoring and analytics"
      ],
      benefits: [
        { icon: Cloud, text: "Cloud-Based Security" },
        { icon: Globe, text: "Remote Management" },
        { icon: Zap, text: "Instant Deployment" },
        { icon: Smartphone, text: "Mobile Access" }
      ],
      cta: "Learn More About Cloud",
      image: "/images/cloud-solution.jpg"
    },
    hybrid: {
      title: "Hybrid Access Control Solutions",
      subtitle: "Best of Both Worlds: Cloud & On-Premise",
      description: "Combine the flexibility of cloud management with the reliability and control of on-premise infrastructure. Hybrid solutions ensure business continuity, real-time sync, and local autonomy even during internet outages.",
      features: [
        "Flexible deployment: cloud management with local fallback",
        "Seamless integration between cloud and on-premise systems",
        "Real-time sync and backup",
        "Local operation during internet outages",
        "Scalable and customizable",
        "Centralized monitoring with local autonomy"
      ],
      benefits: [
        { icon: Cloud, text: "Cloud Flexibility" },
        { icon: Server, text: "Local Reliability" },
        { icon: Network, text: "Seamless Integration" },
        { icon: Shield, text: "Enhanced Security" }
      ],
      cta: "Learn More About Hybrid",
      image: "/images/hybrid-solution.jpg"
    }
  };

  const currentSolution = solutions[selectedSolution];

  return (
    <Container className="py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Discover curated security solutions.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-8"
        >
          and AI-based Biometric Solutions
        </motion.p>
        
        {/* Solution Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gray-100 p-1 rounded-lg flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setSelectedSolution('onpremise')}
              className={`px-4 py-2 rounded-full border border-shop_dark_blue/20 font-semibold text-sm transition-all shadow-sm
                ${selectedSolution === 'onpremise' ? 'bg-shop_dark_blue text-white font-bold shadow-md' : 'bg-white text-shop_dark_blue hover:bg-shop_dark_blue hover:text-white hover:shadow-md'}
                hover:bg-shop_dark_blue hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-shop_dark_blue/40`}
            >
              <Server className="w-4 h-4 mr-2" />
              On-premise
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSelectedSolution('cloud')}
              className={`px-4 py-2 rounded-full border border-shop_dark_blue/20 font-semibold text-sm transition-all shadow-sm
                ${selectedSolution === 'cloud' ? 'bg-shop_dark_blue text-white font-bold shadow-md' : 'bg-white text-shop_dark_blue hover:bg-shop_dark_blue hover:text-white hover:shadow-md'}
                hover:bg-shop_dark_blue hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-shop_dark_blue/40`}
            >
              <Cloud className="w-4 h-4 mr-2" />
              Cloud
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSelectedSolution('hybrid')}
              className={`px-4 py-2 rounded-full border border-shop_dark_blue/20 font-semibold text-sm transition-all shadow-sm
                ${selectedSolution === 'hybrid' ? 'bg-shop_dark_blue text-white font-bold shadow-md' : 'bg-white text-shop_dark_blue hover:bg-shop_dark_blue hover:text-white hover:shadow-md'}
                hover:bg-shop_dark_blue hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-shop_dark_blue/40`}
            >
              <Server className="w-4 h-4 mr-2" />
              <Cloud className="w-4 h-4 mr-2" />
              Hybrid
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSolution}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                {selectedSolution === 'cloud' ? 'Cloud Platform' : 'On-Premise Solution'}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {currentSolution.title}
              </h2>
              {selectedSolution === 'cloud' && (
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  {currentSolution.subtitle}
                </h3>
              )}
              {selectedSolution === 'hybrid' && (
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">
                  {currentSolution.subtitle}
                </h3>
              )}
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentSolution.description}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {currentSolution.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <benefit.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {currentSolution.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white">
                {currentSolution.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    {selectedSolution === 'cloud' ? (
                      <div className="space-y-4">
                        <Cloud className="w-16 h-16 text-blue-600 mx-auto" />
                        <h3 className="text-xl font-semibold text-gray-800">
                          World's leading biometrics, now in the cloud.
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>No servers to set up. No extra door controllers.</p>
                          <p>Multi-branch management, from anywhere.</p>
                        </div>
                      </div>
                    ) : selectedSolution === 'hybrid' ? (
                      <div className="space-y-4">
                        <div className="flex justify-center space-x-2">
                          <Server className="w-12 h-12 text-gray-600" />
                          <Cloud className="w-12 h-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          Flexibility and reliability, together.
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Cloud management with local fallback.</p>
                          <p>Seamless integration and real-time sync.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Server className="w-16 h-16 text-gray-600 mx-auto" />
                        <h3 className="text-xl font-semibold text-gray-800">
                          Complete control over your security infrastructure
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Local deployment with full data ownership</p>
                          <p>Customizable to your specific requirements</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </AnimatePresence>

    </Container>
  );
};

export default ProductGrid;