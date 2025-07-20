import { client } from '@/sanity/lib/client'
import { GET_SOLUTION_BY_SLUG, GET_TESTIMONIALS } from '@/sanity/queries/query'
import Testimonials from '@/components/Testimonials'
import Link from 'next/link'
import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = await client.fetch(GET_SOLUTION_BY_SLUG, { slug });
  const testimonials = await client.fetch(GET_TESTIMONIALS);
  if (!solution) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-gray-500">Solution not found.</div>;
  }
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black/80 to-black/80 text-white py-20 px-6 text-center overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 z-10 relative">{solution.title}</h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 z-10 relative">{solution.summary}</p>
        {solution.industries && solution.industries.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-2 z-10 relative">
            {solution.industries.map((industry: string) => (
              <span key={industry} className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                {industry}
              </span>
            ))}
          </div>
        )}
        <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/solutions-bg.jpg')" }} />
      </section>

        {/* Q&A Section */}
        <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-teal-600 text-sm font-bold mb-2 tracking-widest">CHALLANGES & SOLUTIONS</h2>
        <h4 className="text-3xl md:text-4xl font-extrabold mb-2 text-left leading-tight">Your Pain Points and How We Address Them</h4>
        
        {solution.qa && solution.qa.length > 0 && (
        <section className="max-w-5xl mx-auto py-16 px-4">
          <div className="flex flex-col gap-0">
            {solution.qa.map((item: { title: string; question: string; answer: string }, idx: number) => (
              <div key={idx} className="bg-white">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${idx}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="flex flex-row items-center w-full px-2 md:px-6 py-6 md:py-8 text-lg md:text-xl font-semibold text-left bg-[#f5f5dc] text-gray-900 transition-all duration-300 hover:bg-[#ecead6] data-[state=open]:bg-[#ecead6]">
                      <span className="flex flex-col flex-1">
                        <span className="text-teal-600 text-sm font-bold mb-2 tracking-widest">{item.title}</span>
                        <span>{item.question}</span>
                      </span>
                      {/* The arrow icon is rendered by AccordionTrigger's children, so no change needed here, just layout */}
                    </AccordionTrigger>
                    <AccordionContent className="px-2 md:px-6 py-4 text-gray-700 text-base md:text-lg bg-gray-50">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* Divider (not after last item) */}
                {idx < solution.qa.length - 1 && (
                  <div className="border-t border-black w-full mx-auto my-0" style={{ height: 2 }} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      </section>



      {/* Case Studies Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h4 className="text-teal-600 text-sm font-bold mb-2 tracking-widest">CASE STUDIES</h4>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-left leading-tight">Our Successful Implementation Stories</h3>
        <div className="bg-gray-50 rounded-xl p-10 text-center text-gray-400 text-xl font-semibold border border-dashed border-gray-300">
          Coming soon...
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-8">How This Solution Works</h2>
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

      {/* Testimonials Section */}
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