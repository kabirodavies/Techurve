"use client";
import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

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
            className="w-full pl-10 pr-4 py-2 border border-shop_dark_blue/20 focus:border-shop_dark_blue focus:ring-2 focus:ring-shop_dark_blue/10 outline-none transition text-sm rounded"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-shop_dark_blue" size={18} />
        </div>
      </div>
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filtered?.map((blog) => (
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
                  alt={blog.title}
                  fill
                  className="object-cover w-full h-full rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1 justify-center">
              <h3 className="font-bold text-lg md:text-xl text-black group-hover:text-shop_dark_blue mb-2 line-clamp-2 text-left flex-1 flex items-center transition-colors duration-200">{blog?.title}</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {blog?.blogcategories?.map((cat: any, idx: any) => (
                  <span key={idx} className="text-gray-500 text-xs font-normal">
                    {cat?.title}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12 text-lg">No blog posts found.</div>
        )}
      </div>
    </>
  );
} 