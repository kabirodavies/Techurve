import React from "react";
import Title from "./Title";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return (
    <div className="mb-10 lg:mb-20">
      <div className="flex items-end justify-between mb-4 gap-4">
        <Title className="min-h-[3.5rem] flex items-end">Explore Techurve Latest News<br/>and Insights.</Title>
        <Link
          href="/blog"
          className="inline-flex items-center gap-4 px-5 py-2 rounded-full border border-gray-300 bg-white text-black font-semibold shadow hover:bg-gray-100 transition-colors text-sm md:text-base"
        >
          <span className="text-black">VIEW ALL NEWS</span>
          <span className="ml-2 inline-flex items-center justify-center rounded-full bg-shop_dark_blue w-8 h-8">
            <ArrowRightCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {blogs?.slice(0, 3).map((blog) => (
          <Link
            key={blog?._id}
            href={`/blog/${blog?.slug?.current}`}
            className="group bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition flex flex-col overflow-hidden focus:outline-none"
            tabIndex={0}
            aria-label={blog?.title}
          >
            {blog?.mainImage && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt={blog.title || 'blogImage'}
                  fill
                  className="object-cover w-full h-full rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1 justify-center">
              <h3 className="font-bold text-lg md:text-xl text-black group-hover:text-shop_dark_blue mb-2 line-clamp-2 text-left flex-1 flex items-center transition-colors duration-200">{blog?.title}</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {blog?.blogcategories?.map((cat: { title: string }, idx: number) => (
                  <span key={idx} className="text-gray-500 text-xs font-normal">
                    {cat?.title}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
