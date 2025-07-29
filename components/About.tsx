"use client";

import React from 'react';
import { motion } from "motion/react";
import Container from "./Container";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Shield, 
  Monitor, 
  Lock, 
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Play,
  Apple
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Create Free Account",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, maxime. Lorem, ipsum.",
      cta: "Start Earning →",
      color: "text-purple-600"
    },
    {
      icon: Monitor,
      title: "Monitor User Analytics",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, maxime. Lorem, ipsum.",
      cta: "Sign up your store →",
      color: "text-purple-600"
    },
    {
      icon: Lock,
      title: "Safe & Trusted",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, maxime. Lorem, ipsum.",
      cta: "Get The App →",
      color: "text-purple-600"
    },
    {
      icon: MessageCircle,
      title: "Fast Customer Support",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, maxime. Lorem, ipsum.",
      cta: "Learn More →",
      color: "text-purple-600"
    }
  ];

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
        <p className="text-xl text-gray-600 mb-8 text-center">Learn more about how we can help you.</p>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <Button 
                    variant="link" 
                    className="text-purple-600 hover:text-purple-700 p-0 h-auto font-medium underline"
                  >
                    {feature.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left - Illustration Placeholder */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Monitor className="w-16 h-16 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                ANALYTICS
              </h3>
              <div className="flex justify-center space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="space-y-6">
          <div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Discover curated security solutions.
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center">and AI-based Biometric Solutions</p>

          </div>

          {/* Features List */}
          <div className="space-y-3">
            {[
              "Chat prompt module supported",
              "Enjoy unlimited features by paid plan",
              "Manage ultimate conversation"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
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
            <Button size="lg" className="bg-gray-100 text-blue-600 hover:bg-gray-200 border border-gray-200">
              Explore More →
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  );
};

export default About;