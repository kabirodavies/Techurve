"use client";
import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";

export default function CaseStudyListWithFilter({ caseStudies, topics, linkBase = "/case-study" }: { caseStudies: any[]; topics: string[]; linkBase?: string }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(caseStudies);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL"); // 'ALL' or 'BY TAGS'
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Collect all unique tags from case studies
  const allTags = Array.from(new Set(caseStudies.flatMap((cs) => cs.tags || [])));

  useEffect(() => {
    let result = caseStudies;
    if (activeTab === "BY TAGS" && selectedTags.length > 0) {
      result = result.filter((cs) =>
        selectedTags.some((tag) => (cs.tags || []).includes(tag))
      );
    }
    if (search.trim() !== "") {
      const s = search.trim().toLowerCase();
      result = result.filter(
        (cs) =>
          cs.title?.toLowerCase().includes(s) ||
          cs.summary?.toLowerCase?.().includes?.(s)
      );
    }
    setFiltered(result);
  }, [search, caseStudies, activeTab, selectedTags]);

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
      {/* Tab Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-8 relative">
          <button
            className={`uppercase font-bold tracking-wide text-sm md:text-base px-0 py-2 bg-transparent border-none outline-none transition-colors duration-200 relative ${activeTab === "ALL" ? "text-shop_dark_blue" : "text-gray-700"}`}
            onClick={() => {
              setActiveTab("ALL");
              setSelectedTags([]);
              setDropdownOpen(false);
            }}
          >
            ALL
            {activeTab === "ALL" && <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-shop_dark_blue rounded" />}
          </button>
          <div className="relative">
            <button
              className={`uppercase font-bold tracking-wide text-sm md:text-base px-0 py-2 bg-transparent border-none outline-none flex items-center gap-1 ${activeTab === "BY TAGS" ? "text-shop_dark_blue" : "text-gray-700"}`}
              onClick={() => {
                setActiveTab("BY TAGS");
                setDropdownOpen((v) => !v);
              }}
            >
              BY TAGS <span className="ml-1">▼</span>
              {activeTab === "BY TAGS" && <span className="block absolute left-0 -bottom-1 w-full h-0.5 bg-shop_dark_blue rounded" />}
            </button>
            {dropdownOpen && activeTab === "BY TAGS" && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow z-10 max-h-64 overflow-y-auto">
                {allTags.map((tag) => (
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
      {activeTab === "BY TAGS" && selectedTags.length > 0 && (
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {filtered?.map((cs) => (
          <Link
            key={cs?._id}
            href={`${linkBase}/${cs?.slug?.current}`}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full relative transition hover:shadow-md focus:outline-none"
            tabIndex={0}
            aria-label={cs?.title}
          >
            <div className="relative w-full h-56">
              <Image
                src={urlFor(cs?.mainImage).url()}
                alt={cs.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 flex flex-col p-6">
              <h3 className="font-bold text-lg md:text-xl text-black line-clamp-2 text-left flex-1 flex items-center transition-colors duration-200 mb-2">
                {cs?.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{cs?.summary}</p>
              <div className="flex items-end justify-between flex-1 mt-auto">
                <div className="flex flex-col gap-1 items-start">
                  {cs?.location && (
                    <span className="text-xs"><span className="font-bold text-black mr-1">LOCATION</span><span className="text-gray-500">{cs.location}</span></span>
                  )}
                  {cs?.topic && (
                    <span className="text-xs"><span className="font-bold text-black mr-1">SOLUTION</span><span className="text-gray-500">{cs.topic}</span></span>
                  )}
                  {cs?.product && (
                    <span className="text-xs"><span className="font-bold text-black mr-1">PRODUCT</span><span className="text-gray-500">{cs.product}</span></span>
                  )}
                </div>
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-100 hover:bg-teal-200 transition"
                >
                  <ChevronRight className="text-teal-700" size={24} />
                </span>
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