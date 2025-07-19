import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  mainImage: unknown;
  location?: string;
  product?: string;
  topic?: string;
}

export default function CaseStudyShowcase({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (!caseStudies || caseStudies.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-10 text-center text-gray-400 text-xl font-semibold border border-dashed border-gray-300">
        No case studies found.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-0">
      {caseStudies.map((cs, idx) => {
        const isEven = idx % 2 === 1;
        return (
          <React.Fragment key={cs._id}>
            <div
              className={`group flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-center bg-white rounded-2xl overflow-hidden md:gap-10`}
            >
              {/* Image */}
              <Link href={`/case-study/${cs.slug.current}`} className="md:w-1/2 w-full h-64 md:h-72 relative flex-shrink-0 overflow-hidden block group/image">
                <Image
                  src={urlFor(cs.mainImage).url()}
                  alt={cs.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover/image:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx < 2}
                />
              </Link>
              {/* Text Content */}
              <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-left leading-tight">{cs.title}</h3>
                <div className="mb-6 space-y-1">
                  {cs.location && (
                    <div className="text-base"><span className="font-semibold text-gray-500 uppercase mr-2">LOCATION</span><span className="font-bold">{cs.location}</span></div>
                  )}
                  {cs.topic && (
                    <div className="text-base"><span className="font-semibold text-gray-500 uppercase mr-2">SOLUTION</span><span className="font-bold">{cs.topic}</span></div>
                  )}
                  {cs.product && (
                    <div className="text-base"><span className="font-semibold text-gray-500 uppercase mr-2">PRODUCT</span><span className="font-bold">{cs.product}</span></div>
                  )}
                </div>
                <Link
                  href={`/case-study/${cs.slug.current}`}
                  className="inline-block bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-teal-700 transition w-fit"
                >
                  Learn More
                </Link>
              </div>
            </div>
            {/* Divider (not after last item) */}
            {idx < caseStudies.length - 1 && (
              <div className="border-t border-black w-full mx-auto my-0" style={{ height: 2 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
} 