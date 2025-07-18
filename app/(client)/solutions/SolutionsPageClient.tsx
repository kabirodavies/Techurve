"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Testimonials from '@/components/Testimonials'
import { featureIconMap } from '@/constants/featureIcons';
import { Shield } from 'lucide-react';

export default function SolutionsPageClient({ solutions, industries, testimonials }: { solutions: any[]; industries: string[]; testimonials: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filteredSolutions = solutions;

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-black text-white py-20 px-6 text-center overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 z-10 relative">Smart Security & Automation Solutions</h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 z-10 relative">
          Discover tailored solutions for access control, attendance, surveillance, and more—designed for every industry.
        </p>
        <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/solutions-bg.jpg')" }} />
      </section>


      {/* Solutions Accordion Grid */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-teal-600 text-sm font-bold mb-2 tracking-widest">01. OUR SOLUTIONS</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-left leading-tight">Enhance Security with Our Leading Biometric Solutions</h3>
        <div className="flex flex-col gap-0">
          {filteredSolutions.length === 0 && (
            <div className="text-center text-gray-500">No solutions found for this industry.</div>
          )}
          {filteredSolutions.map((solution: any, idx: number) => {
            console.log('Solution:', solution.title, 'Icon:', solution.icon);
            const isOpen = openIndex === idx;
            // Defensive, deterministic icon rendering
            const Icon = (typeof solution.icon === 'string' && featureIconMap[solution.icon]) ? featureIconMap[solution.icon] : Shield;
            return (
              <div key={solution.slug}>
                {/* Solution Row */}
                <div
                  className="flex items-center w-full px-2 md:px-6 py-6 md:py-8"
                  onMouseEnter={() => setOpenIndex(idx)}
                  onMouseLeave={() => setOpenIndex(null)}
                  aria-expanded={isOpen}
                  aria-controls={`solution-panel-${idx}`}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Icon Circle */}
                  <div className="flex-shrink-0 mr-6 md:mr-10">
                    <span className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-dotted border-gray-300 bg-white">
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-shop_dark_blue" />
                    </span>
                  </div>
                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <span className="block font-bold text-xl md:text-2xl text-black mb-1">{solution.title}</span>
                  </div>
                  {/* Expand/Collapse Button */}
                  <div className="flex-shrink-0 ml-4">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${isOpen ? 'bg-teal-100' : 'bg-teal-50'}`}
                      style={{ border: 'none' }}
                    >
                      <svg className={`w-6 h-6 text-teal-800 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
                {/* Expandable Content */}
                <div
                  id={`solution-panel-${idx}`}
                  className={`transition-all duration-300 px-2 md:px-6 ${isOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}
                  style={{ overflow: 'hidden' }}
                  aria-hidden={!isOpen}
                  onMouseEnter={() => setOpenIndex(idx)}
                  onMouseLeave={() => setOpenIndex(null)}
                >
                  <p className="text-gray-600 mb-4 text-base md:text-lg">{solution.summary}</p>
                  <Link href={`/solutions/${solution.slug}`} className="inline-flex items-center gap-1 text-shop_dark_blue font-semibold hover:underline transition">
                    Learn More <span aria-hidden>→</span>
                  </Link>
                </div>
                {/* Divider (not after last item) */}
                {idx < filteredSolutions.length - 1 && (
                  <div className="border-t border-black w-full mx-auto my-0" style={{ height: 2 }} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-teal-600 text-sm font-bold mb-2 tracking-widest">02. CASE STUDIES</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-left leading-tight">Our Successful Implementation Stories</h3>
        {/* Placeholder for case studies grid/list */}
        <div className="bg-gray-50 rounded-xl p-10 text-center text-gray-400 text-xl font-semibold border border-dashed border-gray-300">
          Coming soon...
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