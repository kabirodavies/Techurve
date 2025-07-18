"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Testimonials from '@/components/Testimonials'

export default function SolutionsPageClient({ solutions, industries, testimonials }: { solutions: any[]; industries: string[]; testimonials: any[] }) {
  const [selectedIndustry, setSelectedIndustry] = useState('All')

  const filteredSolutions =
    selectedIndustry === 'All'
      ? solutions
      : solutions.filter((s: any) => {
          if (!s.industries || s.industries.length === 0) return true; // Show for any filter if no industries
          return s.industries.includes(selectedIndustry);
        });

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20 px-6 text-center overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 z-10 relative">Smart Security & Automation Solutions</h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 z-10 relative">
          Discover tailored solutions for access control, attendance, surveillance, and more—designed for every industry.
        </p>
        <Link href="/contact" className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition z-10 relative">
          Request Consultation
        </Link>
        <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/solutions-bg.jpg')" }} />
      </section>

      {/* Industry Filter Bar */}
      <section className="max-w-4xl mx-auto py-6 px-4 flex flex-wrap gap-3 justify-center">
        {industries.map((industry: string) => (
          <button
            key={industry}
            className={`px-4 py-2 rounded-full border font-medium transition
              ${selectedIndustry === industry
                ? 'bg-blue-600 text-white border-blue-600 shadow'
                : 'border-blue-600 text-blue-600 bg-white hover:bg-blue-50'}`}
            onClick={() => setSelectedIndustry(industry)}
          >
            {industry}
          </button>
        ))}
      </section>

      {/* Solutions Grid */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">Explore Our Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No solutions found for this industry.</div>
          )}
          {filteredSolutions.map((solution: any) => (
            <Link key={solution.slug} href={`/solutions/${solution.slug}`} className="group">
              <div className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100 hover:border-blue-500 hover:-translate-y-1 hover:scale-[1.03]">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl" />
                {/* Industry badges */}
                {solution.industries && solution.industries.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {solution.industries.slice(0, 2).map((industry: string) => (
                      <span key={industry} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        {industry}
                      </span>
                    ))}
                  </div>
                )}
                {/* Title */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600">{solution.title}</h3>
                {/* Summary */}
                <p className="text-gray-600 mb-4 line-clamp-2">{solution.summary}</p>
                {/* Learn More Button */}
                <span className="inline-flex items-center gap-1 text-blue-600 font-semibold group-hover:underline group-hover:translate-x-1 transition">
                  Learn More <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-8">How Our Solutions Work</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div>
              <div className="text-4xl mb-2">🔍</div>
              <h4 className="font-bold mb-1">Consultation</h4>
              <p className="text-gray-600">We assess your needs and recommend the best-fit solution.</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⚙️</div>
              <h4 className="font-bold mb-1">Integration</h4>
              <p className="text-gray-600">Seamless integration of devices and software for your environment.</p>
            </div>
            <div>
              <div className="text-4xl mb-2">📈</div>
              <h4 className="font-bold mb-1">Support & Growth</h4>
              <p className="text-gray-600">Ongoing support and scalable solutions as your needs evolve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Case Studies */}
      <Testimonials testimonials={testimonials} />

      {/* CTA Banner */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to Secure Your Space?</h2>
        <p className="mb-6">Contact us for a free consultation and discover the right solution for you.</p>
        <Link href="/contact" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition">
          Request Consultation
        </Link>
      </section>
    </main>
  )
} 