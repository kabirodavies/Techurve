import React from "react";
import Link from "next/link";

const quickLinks = [
  { title: "About us", href: "/about" },
  { title: "Contact us", href: "/contact" },
  { title: "Blog", href: "/blog" },
  { title: "Orders", href: "/orders" },
];

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">About Us</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Techurve is dedicated to delivering innovative, secure, and scalable technology solutions tailored to your business needs. Our mission is to empower organizations with the best-in-class security, automation, and digital transformation tools by partnering with leading global brands.
      </p>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Our Values</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Client-first approach: We prioritize your unique needs and goals.</li>
          <li>Integrity: We build trust through transparency and reliability.</li>
          <li>Innovation: We stay ahead by adopting the latest technologies.</li>
          <li>Partnership: We work with top brands to offer the best solutions.</li>
          <li>Support: We provide ongoing assistance and expertise.</li>
        </ul>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Quick Links</h3>
        <div className="flex flex-wrap gap-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors cursor-pointer">
                {link.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 