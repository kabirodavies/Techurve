import { Shield, Wrench, Headset, Cloud, Server, Eye } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Security Consulting",
    description: "Expert advice to assess, design, and optimize your security infrastructure.",
    icon: Shield,
    link: "/services/security-consulting",
  },
  {
    title: "System Installation",
    description: "Professional installation of security, biometric, and access control systems.",
    icon: Wrench,
    link: "/services/installation",
  },
  {
    title: "Cloud Solutions",
    description: "Seamless migration and management of your security systems in the cloud.",
    icon: Cloud,
    link: "/services/cloud",
  },
  {
    title: "On-Premise Solutions",
    description: "Robust on-site security systems for maximum control and compliance.",
    icon: Server,
    link: "/services/on-premise",
  },
  {
    title: "Remote Monitoring",
    description: "24/7 surveillance and monitoring for peace of mind.",
    icon: Eye,
    link: "/services/monitoring",
  },
  {
    title: "Support & Maintenance",
    description: "Ongoing technical support and system maintenance to keep you secure.",
    icon: Headset,
    link: "/services/support",
  },
];

const ServicesSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-shop_dark_blue mb-8">What We Can Do For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white rounded-2xl shadow p-7 text-center hover:shadow-lg transition group border border-shop_dark_blue/10"
          >
            <service.icon className="mx-auto mb-4 text-shop_dark_blue group-hover:text-shop_orange w-12 h-12 transition-colors" />
            <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-shop_dark_blue transition-colors">{service.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
            <Link
              href={service.link}
              className="inline-block mt-2 text-shop_dark_blue font-semibold hover:underline hover:text-shop_orange transition-colors"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection; 