"use client";
import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import { Calendar, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogListWithFilter({ blogs, categories }: { blogs: any[]; categories: string[] }) {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(blogs);

  useEffect(() => {
    let result = blogs;
    if (selected !== "All") {
      result = result.filter((b) => b.blogcategories?.some((c: any) => c.title === selected));
    }
    if (search.trim() !== "") {
      const s = search.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(s) ||
          b.body?.toLowerCase?.().includes?.(s)
      );
    }
    setFiltered(result);
  }, [selected, search, blogs]);

  return (
    <>
      {/* Category Menu Bar + Search Bar styled like HeaderMenu */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b pb-4">
        <div className="flex flex-wrap gap-6 overflow-x-auto">
          {["All", ...categories].map((cat) => {
            const isActive = selected === cat;
            return (
              <button
                key={cat}
                className={`uppercase font-bold tracking-wide text-base px-0 py-2 bg-transparent border-none outline-none transition-colors duration-200 relative
                  ${isActive ? "text-shop_dark_blue" : "text-gray-700"}
                  hover:text-shop_dark_blue
                  after:block after:h-0.5 after:bg-shop_dark_blue after:transition-all after:duration-200 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:w-full after:mt-1
                  ${isActive ? "after:scale-x-100" : "after:scale-x-0"}
                `}
                style={{ borderBottom: isActive ? '2px solid #1e3a8a' : '2px solid transparent' }}
                onClick={() => setSelected(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <div className="relative w-full max-w-xs ml-auto">
          <input
            type="text"
            placeholder="SEARCH HERE "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm rounded"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
        </div>
      </div>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {filtered?.map((blog) => (
          <div
            key={blog?._id}
            className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group flex flex-col h-full relative"
          >
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`} className="block h-64 relative">
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white drop-shadow-md line-clamp-2">
                    {blog?.title}
                  </h3>
                  <Link
                    href={`/blog/${blog?.slug?.current}`}
                    className="inline-block w-max px-3 py-1 bg-blue-600 text-white text-xs rounded-full shadow hover:bg-blue-700 transition-colors duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </Link>
            )}
            <div className="p-4 flex flex-col gap-2 mt-auto z-30 relative">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                {blog?.blogcategories?.map((item: any, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full mr-1"
                  >
                    {item?.title}
                  </span>
                ))}
                <span className="flex items-center gap-1 text-lightColor text-xs">
                  <Calendar size={14} className="inline-block mr-1" />
                  {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                </span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12 text-lg">No blog posts found.</div>
        )}
      </div>
    </>
  );
} 