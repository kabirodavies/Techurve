"use client";
import React, { useRef, useState } from "react";
import EnhancedProductGallery from "./EnhancedProductGallery";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Download, 
  Info, 
  Wrench, 
  HelpCircle, 
  FileText, 
  Sliders, 
  Shield, 
  Zap, 
  Wifi, 
  Clock, 
  CheckCircle,
  Cpu,
  Monitor,
  Database,
  Globe,
  Lock,
  Settings
} from "lucide-react";

const TABS = [
  { key: "overview", label: "Overview", icon: Info },
  { key: "specs", label: "Specifications", icon: Sliders },
  { key: "features", label: "Features", icon: Shield },
  { key: "installation", label: "Installation", icon: Wrench },
  { key: "support", label: "Support", icon: HelpCircle },
  { key: "downloads", label: "Downloads", icon: FileText },
];

const ProductTabs = ({ product, showPrice }: any) => {
  const [activeTab, setActiveTab] = useState("overview");
  const refs = {
    overview: useRef<HTMLDivElement>(null),
    specs: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    installation: useRef<HTMLDivElement>(null),
    support: useRef<HTMLDivElement>(null),
    downloads: useRef<HTMLDivElement>(null),
  };

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    const ref = refs[key as keyof typeof refs];
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const technicalSpecs = [
    { category: "Hardware", specs: [
      { label: "Processor", value: "ARM Cortex-A7 Dual-core" },
      { label: "Memory", value: "1GB DDR3 RAM" },
      { label: "Storage", value: "8GB eMMC Flash" },
      { label: "Display", value: '2.4" TFT Color Screen' },
      { label: "Touch", value: "Capacitive Touch" },
    ]},
    { category: "Biometric", specs: [
      { label: "Sensor Type", value: "500 DPI Capacitive" },
      { label: "Template Capacity", value: "3,000 fingerprints" },
      { label: "False Acceptance Rate", value: "< 0.001%" },
      { label: "False Rejection Rate", value: "< 0.1%" },
      { label: "Verification Speed", value: "< 0.5 seconds" },
    ]},
    { category: "Connectivity", specs: [
      { label: "Network", value: "10/100 Mbps Ethernet" },
      { label: "Wi-Fi", value: "802.11 b/g/n (Optional)" },
      { label: "USB", value: "USB 2.0 Host" },
      { label: "RS485", value: "Wiegand 26/34/37" },
      { label: "Protocols", value: "TCP/IP, UDP, HTTP, HTTPS" },
    ]},
    { category: "Power & Environment", specs: [
      { label: "Power Supply", value: "12V DC / PoE (802.3af)" },
      { label: "Power Consumption", value: "< 3W" },
      { label: "Operating Temperature", value: "-10°C to 60°C" },
      { label: "Humidity", value: "10% to 90% RH" },
      { label: "Protection Rating", value: "IP65" },
    ]},
  ];

  const advancedFeatures = [
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Multi-layer security with anti-spoofing technology and tamper detection"
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Fast verification with advanced algorithms and optimized processing"
    },
    {
      icon: Wifi,
      title: "Smart Connectivity",
      description: "Multiple connectivity options with seamless integration capabilities"
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Comprehensive audit trails and centralized user management"
    },
    {
      icon: Globe,
      title: "Remote Access",
      description: "Secure remote management and monitoring via web interface"
    },
    {
      icon: Settings,
      title: "Easy Configuration",
      description: "Intuitive setup wizard and flexible configuration options"
    }
  ];

  return (
    <div className="relative bg-gray-50">
      {/* Sticky Tab Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-2 px-4 py-2 overflow-x-auto">
          {TABS.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              className="flex items-center gap-2 px-4 py-2 text-base whitespace-nowrap"
              onClick={() => handleTabClick(tab.key)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Overview */}
        <section ref={refs.overview} id="overview" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Product Description</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {product?.name} {product?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Add a section for detailed description at the bottom */}
 

        {/* Specifications */}
        <section ref={refs.specs} id="specs" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Technical Specifications</h2>
            <p className="text-lg text-gray-600">
              Comprehensive technical details and performance specifications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {technicalSpecs.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600 font-medium">{spec.label}</span>
                        <span className="text-gray-900 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Shield className="w-5 h-5" />
                Certifications & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["FCC", "CE", "RoHS", "ISO 27001"].map((cert, index) => (
                  <Badge key={index} variant="outline" className="justify-center py-2">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section ref={refs.features} id="features" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Advanced Features</h2>
            <p className="text-lg text-gray-600">
              Discover the powerful capabilities that set this device apart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Security Features</h3>
              <ul className="space-y-3">
                {[
                  "Advanced anti-spoofing technology prevents fake fingerprint attempts",
                  "Tamper detection with instant alerts and logging",
                  "Encrypted data transmission and storage",
                  "Multi-factor authentication support",
                  "Comprehensive audit trail with detailed access logs",
                  "Real-time monitoring and alert system"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Performance Features</h3>
              <ul className="space-y-3">
                {[
                  "High-speed fingerprint verification (< 0.5 seconds)",
                  "Large template capacity (3,000 fingerprints)",
                  "Low false acceptance and rejection rates",
                  "24/7 continuous operation capability",
                  "Power-efficient design with PoE support",
                  "Wide operating temperature range"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section ref={refs.installation} id="installation" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Installation & Setup</h2>
            <p className="text-lg text-gray-600">
              Quick and easy installation process with comprehensive setup guides
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-600" />
                  Installation Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {[
                    "Mount the device at the desired location using the included bracket",
                    "Connect power supply (12V DC) or PoE cable for power and data",
                    "Connect to network via Ethernet cable or configure Wi-Fi settings",
                    "Access the web interface using the default IP address",
                    "Configure device settings and enroll administrator access",
                    "Test biometric enrollment and access control functions"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Badge className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Default Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>IP Address:</span>
                        <span className="font-mono">192.168.1.100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Username:</span>
                        <span className="font-mono">admin</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Password:</span>
                        <span className="font-mono">123456</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    For security, change default credentials immediately after first login.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support */}
        <section ref={refs.support} id="support" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Support & Service</h2>
            <p className="text-lg text-gray-600">
              Comprehensive support options to ensure your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <CardTitle>Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  24/7 technical support via phone, email, and live chat
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <FileText className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive user manuals, guides, and video tutorials
                </p>
                <Button variant="outline" className="w-full">
                  View Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <CardTitle>Warranty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  2-year manufacturer warranty with extended options available
                </p>
                <Button variant="outline" className="w-full">
                  Warranty Info
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Downloads */}
        <section ref={refs.downloads} id="downloads" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Downloads & Resources</h2>
            <p className="text-lg text-gray-600">
              Access all product documentation and software tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "User Manual", type: "PDF", size: "2.4 MB", icon: FileText },
              { title: "Installation Guide", type: "PDF", size: "1.8 MB", icon: Wrench },
              { title: "Software SDK", type: "ZIP", size: "15.2 MB", icon: Download },
              { title: "Firmware Update", type: "BIN", size: "8.7 MB", icon: Settings },
              { title: "Technical Specs", type: "PDF", size: "1.2 MB", icon: Sliders },
              { title: "Compliance Certificates", type: "PDF", size: "3.1 MB", icon: Shield }
            ].map((file, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <file.icon className="w-8 h-8 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{file.title}</h3>
                      <p className="text-sm text-gray-600">{file.type} • {file.size}</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductTabs; 