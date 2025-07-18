import { client } from '@/sanity/lib/client'
import { GET_SOLUTION_BY_SLUG } from '@/sanity/queries/query'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface SolutionPageProps {
  params: { slug: string }
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const solution = await client.fetch(GET_SOLUTION_BY_SLUG, { slug: params.slug })
  if (!solution) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-gray-500">Solution not found.</div>
  }
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section with image overlay */}
      <section className="relative w-full h-80 md:h-[28rem] flex items-end justify-center">
        {solution.heroImage && solution.heroImage.asset ? (
          <>
            <Image
              src={solution.heroImage.asset.url}
              alt={solution.title}
              fill
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-center w-full max-w-2xl px-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow mb-4">{solution.title}</h1>
              <p className="text-lg md:text-xl text-white/90 mb-4 drop-shadow">{solution.summary}</p>
              {solution.industries && solution.industries.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {solution.industries.map((industry: string) => (
                    <span key={industry} className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                      {industry}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 flex flex-col items-center justify-end text-white py-16 px-6 text-center overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{solution.title}</h1>
              <p className="text-lg md:text-xl mb-4">{solution.summary}</p>
              {solution.industries && solution.industries.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {solution.industries.map((industry: string) => (
                    <span key={industry} className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                      {industry}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      {/* Floating Card Content */}
      <div className="relative z-30 max-w-4xl mx-auto -mt-12 md:-mt-20 lg:-mt-10 px-2 md:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border-t-8 border-blue-600">
          <div className="prose prose-blue max-w-none">
            {solution.body ? (
              <PortableText value={solution.body} />
            ) : (
              <p>No additional details available.</p>
            )}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/solutions" className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
              ← Back to Solutions
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 