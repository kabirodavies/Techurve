'use client'
import { Search, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { createPortal } from "react-dom";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch all products when modal opens
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const result = await client.fetch(
          `*[_type == "product"] | order(name asc){
            _id, name, slug, images, price, discount, stock, status, brand, categories
          }`
        );
        setProducts(result);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [open]);

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Filter products by query
  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(query.toLowerCase())
  );

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl h-[75vh] bg-white rounded-2xl shadow-2xl flex flex-col p-6"
        style={{ maxHeight: '75vh' }}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
          onClick={() => setOpen(false)}
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-center mb-4 text-shop_dark_blue">Product Search</h2>
        <div className="relative mb-6">
          <input
            autoFocus
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full border border-gray-200 rounded px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-shop_dark_blue text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="overflow-y-auto flex-1 pr-2">
          {loading ? (
            <div className="py-10 text-center text-gray-400 text-lg">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center text-gray-400 text-lg">No products found</div>
          ) : (
            <div className="flex flex-row gap-6 overflow-x-auto pb-2">
              {filtered.map((product) => (
                <div
                  key={product._id}
                  className="min-w-[260px] max-w-xs border rounded-lg bg-white shadow-sm flex flex-col p-4 hover:shadow-md transition group"
                >
                  {product.images && product.images[0] && (
                    <Link href={`/product/${product.slug?.current || ''}`} onClick={() => setOpen(false)}>
                      <Image
                        src={urlFor(product.images[0]).width(200).height(140).url()}
                        alt={product.name || 'Product'}
                        width={200}
                        height={140}
                        className={`w-full h-32 object-contain rounded-md mb-3 ${product.stock === 0 ? 'opacity-50' : ''}`}
                      />
                    </Link>
                  )}
                  <div className="flex-1 flex flex-col gap-2">
                    <Link
                      href={`/product/${product.slug?.current || ''}`}
                      onClick={() => setOpen(false)}
                      className="font-semibold text-base text-shop_dark_blue hover:underline line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    {/* <div className="text-sm text-gray-500 line-clamp-2">{product.description}</div> */}
                    <AddToCartButton product={product} className="mt-2" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <button
        aria-label="Open search"
        onClick={() => setOpen(true)}
        className="flex items-center"
      >
        <Search className="w-5 h-5 hover:text-shop_dark_blue hoverEffect" />
      </button>
      {open && typeof window !== 'undefined' && createPortal(modal, document.body)}
    </div>
  );
};

export default SearchBar;
