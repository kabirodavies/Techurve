'use client';

import React, { useState } from 'react'
import Head from 'next/head';

export interface Testimonial {
  _id: string;
  quote: string;
  clientName: string;
  company?: string;
  companyLogo?: string;
}

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth >= 1024) return 3; // desktop
  if (window.innerWidth >= 640) return 2; // tablet
  return 1; // mobile
};

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [startIdx, setStartIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxStart = Math.max(0, testimonials.length - visibleCount);
  const canGoLeft = startIdx > 0;
  const canGoRight = startIdx < maxStart;

  const handleLeft = () => {
    setStartIdx((idx) => Math.max(0, idx - 1));
  };
  const handleRight = () => {
    setStartIdx((idx) => Math.min(maxStart, idx + 1));
  };

  // Random rotation for sticky note effect
  const rotations = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];
  // Pastel background colors for sticky notes
  const bgColors = [
    'bg-yellow-100 border-yellow-200',
    'bg-blue-100 border-blue-200',
    'bg-pink-100 border-pink-200',
    'bg-green-100 border-green-200',
    'bg-purple-100 border-purple-200',
    'bg-orange-100 border-orange-200',
  ];

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <section className="max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-blue-800">What Our Clients Say</h2>
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={handleLeft}
            disabled={!canGoLeft}
            className={`absolute left-0 z-10 bg-white/80 rounded-full shadow p-2 text-2xl text-blue-600 hover:bg-blue-100 transition disabled:opacity-30 disabled:cursor-not-allowed`}
            aria-label="Previous testimonials"
          >
            &lt;
          </button>
          {/* Paper Notes */}
          <div className="flex gap-8 overflow-hidden w-full justify-center">
            {testimonials.slice(startIdx, startIdx + visibleCount).map((t, i) => (
              <div
                key={t._id}
                className={`w-72 min-h-[320px] shadow-xl flex flex-col items-center flex-shrink-0 px-6 py-8 mx-2 ${bgColors[(startIdx + i) % bgColors.length]} ${rotations[(startIdx + i) % rotations.length]} relative transition-transform transition-shadow duration-300 hover:-translate-y-2 hover:shadow-2xl hover:animate-wiggle`}
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                {/* Pin */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-400 rounded-full shadow-lg border-2 border-white z-10"></div>
                {/* Handwritten Quote */}
                <blockquote className="text-2xl text-gray-800 mb-6 leading-relaxed text-center select-none">
                  “{t.quote}”
                </blockquote>
                {/* Client Info */}
                <div className="flex flex-col items-center mt-auto">
                  <span className="text-blue-700 text-xl font-bold">{t.clientName}</span>
                  <span className="text-gray-500 text-lg">{t.company}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleRight}
            disabled={!canGoRight}
            className={`absolute right-0 z-10 bg-white/80 rounded-full shadow p-2 text-2xl text-blue-600 hover:bg-blue-100 transition disabled:opacity-30 disabled:cursor-not-allowed`}
            aria-label="Next testimonials"
          >
            &gt;
          </button>
        </div>
      </section>
      {/* Wiggle animation for Tailwind (if not in config) */}
      <style jsx global>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          20% { transform: rotate(5deg); }
          40% { transform: rotate(-6deg); }
          60% { transform: rotate(4deg); }
          80% { transform: rotate(-2deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.4s ease-in-out;
        }
      `}</style>
    </>
  )
}

export default Testimonials