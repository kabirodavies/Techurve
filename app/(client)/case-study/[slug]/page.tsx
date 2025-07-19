import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getSingleCaseStudy, getAllCaseStudies } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { GET_ALL_SOLUTIONS } from "@/sanity/queries/query";

const SingleCaseStudyPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const caseStudy = await getSingleCaseStudy(slug);
  if (!caseStudy) return notFound();

  // Fetch all solutions
  const solutions = await client.fetch(GET_ALL_SOLUTIONS);

  // Fetch all case studies for next/fallback logic
  const allCaseStudies = await getAllCaseStudies(100);
  // Get current case study topic
  const currentTopic = caseStudy.topic;
  // Filter case studies in the same topic (excluding current)
  const sameTopicCaseStudies = allCaseStudies.filter(
    (cs: any) => cs.slug?.current !== slug && cs.topic === currentTopic
  );
  // Always pick a random case study in the same topic (if any)
  let nextCaseStudy = null;
  if (sameTopicCaseStudies.length > 0) {
    nextCaseStudy = sameTopicCaseStudies[Math.floor(Math.random() * sameTopicCaseStudies.length)];
  }

  return (
    <div className="py-10">
      <section className="relative bg-gradient-to-br text-black py-20 px-6 text-left overflow-hidden mb-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 z-10 relative">{caseStudy?.title}</h1>
        <div className="flex flex-wrap items-center gap-8 text-base py-2 px-0 mb-2 z-10 relative">
          {caseStudy?.location && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-500 uppercase text-xs">Location</span>
              <span className="text-black text-base font-semibold">{caseStudy.location}</span>
            </div>
          )}
          {caseStudy?.product && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-500 uppercase text-xs">Product</span>
              <span className="text-black text-base font-semibold">{caseStudy.product}</span>
            </div>
          )}
          {caseStudy?.topic && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-500 uppercase text-xs">Topic</span>
              <span className="text-black text-base font-semibold">{caseStudy.topic}</span>
            </div>
          )}
        </div>
        <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/blog-bg.jpg')" }} />
      </section>

      {/* Overview Section with SVG Pattern and Main Image */}
      <section className="relative py-16 px-4 md:px-0 bg-white overflow-visible">
        {/* SVG Pattern */}
        <svg
          className="absolute left-0 top-0 w-full h-96 pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="200" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(200 200) scale(200)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">Overview</h2>
          <div className="text-lg text-gray-700 mb-10">
            <PortableText value={caseStudy.overview} />
          </div>
        {caseStudy?.mainImage && (
            <div className="relative w-full md:w-4/5 mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-white">
            <Image
              src={urlFor(caseStudy.mainImage).url()}
              alt={caseStudy.title}
                width={1200}
                height={600}
                className="object-cover w-full h-96 md:h-[28rem]"
                priority
            />
          </div>
        )}
        </div>
      </section>

      {/* Challenges Section */}
      <section className="relative py-16 px-4 md:px-0 bg-white overflow-visible">
        {/* SVG Pattern */}
        <svg
          className="absolute left-0 top-0 w-full h-96 pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="200" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(200 200) scale(200)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">Challenges</h2>
          <div className="text-lg text-gray-700 mb-10">
            <PortableText value={caseStudy.challenges} />
          </div>
        </div>
      </section>


      {/* Solution Section with Solution Text on the left and Products on the right */}
      <section className="relative py-16 px-4 md:px-0 bg-white overflow-visible">
        {/* SVG Pattern */}
        <svg
          className="absolute left-0 top-0 w-full h-96 pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="200" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(200 200) scale(200)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-black">Solution</h2>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Solution Text */}
            <div className="flex-1 text-lg text-gray-700 mb-10 md:mb-0">
              <PortableText value={caseStudy.solution} />
            </div>
            {/* Solution Products Grid */}
            {caseStudy.solutionProducts?.length > 0 && (
              <div className="w-full md:w-1/2 flex-shrink-0">
                <div className="flex flex-col gap-6">
                  {caseStudy.solutionProducts.map((product: any) => {
                    let overviewLine = '';
                    if (product.overview && typeof product.overview === 'string') {
                      overviewLine = product.overview.split(/[\n\.]/)[0];
                    } else if (Array.isArray(product.overview) && product.overview.length > 0) {
                      const block = product.overview.find((b: any) => b._type === 'block');
                      if (block && block.children && block.children.length > 0) {
                        overviewLine = block.children[0].text.split(/[\n\.]/)[0];
                      }
                    }
                    return (
                      <Link href={`/product/${product.slug?.current}`} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start text-left shadow-sm hover:shadow-md transition max-w-xs w-full mx-auto cursor-pointer no-underline">
                        {/* Product Image */}
                        {product.images && product.images[0] && (
                          <div className="mb-4 w-full flex justify-center">
                            <Image
                              src={urlFor(product.images[0]).url()}
                              alt={product.name || product.title}
                              width={128}
                              height={176}
                              className="object-contain w-32 h-44"
                            />
                          </div>
                        )}
                        {/* Device Name */}
                        <div className="text-lg font-bold text-gray-900 mb-1">{product.name || product.title}</div>
                        {/* Category/Subcategory */}
                        {(product.subcategory?.parent?.title || product.subcategory?.title) && (
                          <div className="uppercase text-xs font-semibold text-teal-500 mb-2 tracking-wide">
                            {product.subcategory?.parent?.title}
                            {product.subcategory?.parent?.title && product.subcategory?.title && (
                              <span className="mx-1 text-gray-300">/</span>
                            )}
                            {product.subcategory?.title}
                          </div>
                        )}
                        {/* First line from rich overview */}
                        {overviewLine && (
                          <div className="text-gray-600 text-sm line-clamp-1">{overviewLine}</div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Back to Case Studies Button removed */}

      {/* Next Case Study Section with Modern Design */}
      {nextCaseStudy && (
        <section className="py-16 px-4 md:px-0 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            {/* Left: Text and Buttons */}
            <div className="flex-1">
              <div className="text-5xl font-extrabold mb-4 text-black">Next:</div>
              <div className="text-2xl font-semibold mb-2 text-black">{nextCaseStudy.title}</div>
              {nextCaseStudy.summary && (
                <div className="text-gray-700 text-base mb-6 line-clamp-2">{nextCaseStudy.summary}</div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/case-study/${nextCaseStudy.slug?.current}`}>
                  <button className="px-8 py-3 bg-teal-600 text-white rounded-md font-semibold shadow hover:bg-teal-700 transition">Learn More</button>
                </Link>
                <Link href="/case-study">
                  <button className="px-8 py-3 border border-teal-600 text-teal-700 rounded-md font-semibold bg-white hover:bg-teal-50 transition">Back to Case Studies</button>
                </Link>
              </div>
            </div>
            {/* Right: Image */}
            {nextCaseStudy.mainImage && (
              <div className="w-full md:w-[400px] flex-shrink-0">
                <Image
                  src={urlFor(nextCaseStudy.mainImage).url()}
                  alt={nextCaseStudy.title || "Next Case Study Image"}
                  width={400}
                  height={220}
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default SingleCaseStudyPage; 