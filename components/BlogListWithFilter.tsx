"use client";
import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";

export default function BlogListWithFilter({ blogs, categories, tags = [], linkBase = "/blog" }: { blogs: any[]; categories: string[]; tags?: string[]; linkBase?: string }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(blogs);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // null means ALL
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    let result = blogs;
    if (activeCategory && activeCategory !== "ALL") {
      result = result.filter((b) => (b.blogcategories || []).some((c: any) => c.title === activeCategory));
    }
    if (selectedTags.length > 0) {
      result = result.filter((b) =>
        selectedTags.some((tag) => (b.tags || []).includes(tag))
      );
    }
    if (search.trim() !== "") {
      const s = search.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(s) ||
          b.summary?.toLowerCase?.().includes?.(s)
      );
    }
    setFiltered(result);
  }, [search, blogs, activeCategory, selectedTags]);

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setDropdownOpen(false);
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <>
      {/* Category Tabs and Tags Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-8 relative">
          <button
            className={`uppercase font-bold tracking-wide text-sm md:text-base px-0 py-2 bg-transparent border-none outline-none transition-colors duration-200 relative ${!activeCategory ? "text-shop_dark_blue" : "text-gray-700"}`}
            onClick={() => {
              setActiveCategory(null);
              setSelectedTags([]);
              setDropdownOpen(false);
            }}
          >
            ALL
            {!activeCategory && <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-shop_dark_blue rounded" />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`uppercase font-bold tracking-wide text-sm md:text-base px-0 py-2 bg-transparent border-none outline-none transition-colors duration-200 relative ${activeCategory === cat ? "text-shop_dark_blue" : "text-gray-700"}`}
              onClick={() => {
                setActiveCategory(cat);
                setDropdownOpen(false);
              }}
            >
              {cat}
              {activeCategory === cat && <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-shop_dark_blue rounded" />}
            </button>
          ))}
          <div className="relative">
            <button
              className={`uppercase font-bold tracking-wide text-sm md:text-base px-0 py-2 bg-transparent border-none outline-none flex items-center gap-1 ${dropdownOpen ? "text-shop_dark_blue" : "text-gray-700"}`}
              onClick={() => setDropdownOpen((v) => !v)}
            >
              TOPICS <span className="ml-1">▼</span>
              {dropdownOpen && <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-shop_dark_blue rounded" />}
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow z-10 max-h-64 overflow-y-auto">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedTags.includes(tag) ? "bg-teal-50 font-bold text-teal-700" : ""}`}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && <span className="ml-2">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="relative flex-1 flex justify-end">
          <input
            type="text"
            placeholder="SEARCH HERE"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs pl-10 pr-4 py-2 bg-[#f3fafa] border-none focus:ring-2 focus:ring-shop_dark_blue/10 outline-none transition text-sm rounded-full placeholder:text-gray-400"
          />
          <Search className="absolute left-auto right-4 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
        </div>
      </div>
      {/* Selected Tag Pills */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-2">
          {selectedTags.map((tag) => (
            <span key={tag} className="inline-flex items-center px-4 py-1 bg-[#e6f7f7] border border-teal-200 rounded-lg text-teal-900 font-semibold text-xs uppercase">
              {tag}
              <button
                className="ml-2 text-teal-700 hover:text-red-500"
                onClick={() => handleTagRemove(tag)}
                aria-label={`Remove ${tag}`}
              >
                <X size={16} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-end text-gray-500 text-sm mb-2">
        Showing <span className="font-bold mx-1">{filtered.length}</span> results
      </div>
      <hr className="border-t border-gray-200 mb-6" />
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filtered?.map((blog) => (
          <Link
            key={blog?._id}
            href={`${linkBase}/${blog?.slug?.current}`}
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
          <div className="col-span-full text-center text-gray-500 py-12 text-lg">No case studies found.</div>
        )}
      </div>
    </>
  );
} 