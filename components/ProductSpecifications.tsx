"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Cpu, 
  Shield, 
  Wifi, 
  Zap, 
  Monitor, 
  Database, 
  Globe, 
  Settings,
  CheckCircle
} from "lucide-react";

interface Specification {
  label: string;
  value: string;
}

interface SpecificationCategory {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  specs: Specification[];
}

interface ProductSpecificationsProps {
  product?: any;
}

const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const specificationCategories: SpecificationCategory[] = [
    {
      category: "Hardware",
      icon: Cpu,
      specs: [
        { label: "Processor", value: "ARM Cortex-A7 Dual-core" },
        { label: "Memory", value: "1GB DDR3 RAM" },
        { label: "Storage", value: "8GB eMMC Flash" },
        { label: "Display", value: '2.4" TFT Color Screen' },
        { label: "Touch", value: "Capacitive Touch" },
        { label: "Dimensions", value: "180 × 120 × 35 mm" },
        { label: "Weight", value: "450g" },
      ]
    },
    {
      category: "Biometric",
      icon: Shield,
      specs: [
        { label: "Sensor Type", value: "500 DPI Capacitive" },
        { label: "Template Capacity", value: "3,000 fingerprints" },
        { label: "False Acceptance Rate", value: "< 0.001%" },
        { label: "False Rejection Rate", value: "< 0.1%" },
        { label: "Verification Speed", value: "< 0.5 seconds" },
        { label: "Enrollment Time", value: "< 2 seconds" },
        { label: "Anti-spoofing", value: "Advanced Liveness Detection" },
      ]
    },
    {
      category: "Connectivity",
      icon: Wifi,
      specs: [
        { label: "Network", value: "10/100 Mbps Ethernet" },
        { label: "Wi-Fi", value: "802.11 b/g/n (Optional)" },
        { label: "USB", value: "USB 2.0 Host" },
        { label: "RS485", value: "Wiegand 26/34/37" },
        { label: "Protocols", value: "TCP/IP, UDP, HTTP, HTTPS" },
        { label: "Communication", value: "RS485, TCP/IP" },
        { label: "Data Format", value: "Wiegand 26/34/37 bit" },
      ]
    },
    {
      category: "Power & Environment",
      icon: Zap,
      specs: [
        { label: "Power Supply", value: "12V DC / PoE (802.3af)" },
        { label: "Power Consumption", value: "< 3W" },
        { label: "Operating Temperature", value: "-10°C to 60°C" },
        { label: "Humidity", value: "10% to 90% RH" },
        { label: "Protection Rating", value: "IP65" },
        { label: "Backup Power", value: "Built-in Battery" },
        { label: "Standby Time", value: "Up to 8 hours" },
      ]
    },
    {
      category: "Software & Management",
      icon: Settings,
      specs: [
        { label: "Operating System", value: "Linux Embedded" },
        { label: "Management Interface", value: "Web-based & Mobile App" },
        { label: "User Management", value: "Up to 10,000 users" },
        { label: "Event Logs", value: "100,000 records" },
        { label: "Data Export", value: "CSV, Excel formats" },
        { label: "Remote Management", value: "Cloud & Local" },
        { label: "Firmware Updates", value: "OTA & USB" },
      ]
    },
    {
      category: "Security & Compliance",
      icon: Shield,
      specs: [
        { label: "Encryption", value: "AES-256 bit" },
        { label: "Authentication", value: "Multi-factor (FP + PIN)" },
        { label: "Access Control", value: "Time-based & Group-based" },
        { label: "Audit Trail", value: "Comprehensive logging" },
        { label: "Tamper Detection", value: "Hardware & Software" },
        { label: "Certifications", value: "FCC, CE, RoHS, ISO 27001" },
        { label: "Compliance", value: "GDPR, HIPAA ready" },
      ]
    }
  ];

  const keyFeatures = [
    "Advanced anti-spoofing technology with liveness detection",
    "Weatherproof IP65 design for outdoor installation",
    "Real-time monitoring with instant alerts",
    "Remote management via secure web interface",
    "Easy integration with existing security systems",
    "Multi-factor authentication support",
    "Comprehensive audit trail and access logs",
    "24/7 continuous operation capability"
  ];

  return (
    <div className="space-y-8">
      {/* Key Features */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <CheckCircle className="w-6 h-6" />
            Key Features & Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {specificationCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="w-5 h-5 text-blue-600" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 font-medium text-sm">{spec.label}</span>
                    <span className="text-gray-900 font-semibold text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Shield className="w-6 h-6" />
            Certifications & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "FCC", "CE", "RoHS", "ISO 27001", "UL", "ETL"
            ].map((cert, index) => (
              <Badge key={index} variant="outline" className="justify-center py-2 bg-white">
                {cert}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-green-700 mt-4">
            All products meet international safety and security standards for enterprise deployment.
          </p>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Zap className="w-6 h-6" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-purple-700">Uptime Reliability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">&lt;0.5s</div>
              <div className="text-sm text-purple-700">Verification Speed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">3,000</div>
              <div className="text-sm text-purple-700">User Capacity</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSpecifications; 