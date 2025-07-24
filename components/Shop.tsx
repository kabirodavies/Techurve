"use client";
import { ExpandedProduct, toExpandedProduct } from "@/types/ExpandedProduct";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { getProductsBySubcategory, getProductsByCategory, getAllProducts } from "@/sanity/queries";
import { useSearchParams } from "next/navigation";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";

interface SubcategoryWithCount {
  _id: string;
  title: string;
  slug: { current?: string };
  image?: { asset?: { _ref: string } };
  productCount?: number;
}

interface CategoryWithCount {
  _id: string;
  title: string;
  slug: { current?: string };
  image?: { asset?: { _ref: string } };
  productCount?: number;
  subcategories?: SubcategoryWithCount[];
}

interface Props {
  categories: CategoryWithCount[];
  brands: BrandWithCount[];
}
interface BrandWithCount {
  _id: string;
  title: string;
  slug?: { current?: string };
  productCount?: number;
}

// For filtering populated brands
type PopulatedBrand = { title?: string; slug?: { current?: string } };
const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [products, setProducts] = useState<ExpandedProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // Set selected filters from query params on mount
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const categoryParam = searchParams.get("category");
    const subcategoryParam = searchParams.get("subcategory");
    if (brandParam) {
      setSelectedBrand(brandParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (subcategoryParam) {
      setSelectedSubcategory(subcategoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let data: ExpandedProduct[] = [];
      if (selectedSubcategory) {
        data = (await getProductsBySubcategory(selectedSubcategory)).map(toExpandedProduct);
      } else if (selectedCategory) {
        data = (await getProductsByCategory(selectedCategory)).map(toExpandedProduct);
      } else {
        data = (await getAllProducts()).map(toExpandedProduct);
      }
      // Filter by brand slug if selected
      if (selectedBrand) {
        data = data.filter((product) => {
          const brand = product.brand as PopulatedBrand | undefined;
          return brand?.slug?.current && brand.slug.current === selectedBrand;
        });
      }
      // Filter by price if selected
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        data = data.filter((product) => {
          const price = typeof product.price === "number" ? product.price : 0;
          return price >= min && price <= max;
        });
      }
      // Sort
      if (sortBy === "price-asc") {
        data = data.slice().sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (sortBy === "price-desc") {
        data = data.slice().sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (sortBy === "newest") {
        data = data.slice().sort((a, b) => {
          const dateA = new Date(a._createdAt || 0).getTime();
          const dateB = new Date(b._createdAt || 0).getTime();
          return dateB - dateA;
        });
      }
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory, selectedSubcategory, selectedBrand, selectedPrice, sortBy]);

  return (
    <div className="border-t">
      <Container className="mt-5">
        {/* Modern filter/sort bar */}
        <div className="sticky top-0 z-10 mb-7">
          <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-xl px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-gray-100">
            <Title className="text-lg uppercase tracking-wide">All Products</Title>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-shop_dark_blue bg-white"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              {(selectedCategory !== null || selectedSubcategory !== null || selectedBrand !== null || selectedPrice !== null) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                    setSelectedBrand(null);
                    setSelectedPrice(null);
                  }}
                  className="ml-4 text-shop_dark_green underline text-sm font-medium hover:text-darkRed hoverEffect"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
          {/* Modern accent bar below filter/sort bar */}
          <div className="h-1 w-full bg-gradient-to-r from-shop_dark_blue/20 via-shop_dark_green/40 to-shop_dark_blue/20 rounded-b-xl mt-1 mb-2" />
        </div>
        {/* Main content area */}
        <div className="flex flex-col md:flex-row gap-10 border-t-0">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-48 md:max-w-xs pb-5 md:border-r border-r-gray-100/60 scrollbar-hide flex flex-col gap-6">
            {/* Product Categories Filter */}
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
            />
            {/* Brand Filter */}
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            {/* Price Filter hidden for now */}
            {/*
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
            */}
          </div>
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide bg-white/80 rounded-2xl shadow-lg p-4">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products?.map((product: ExpandedProduct) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
