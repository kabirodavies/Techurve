"use client";
import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { getProductsBySubcategory, getProductsByCategory, getAllProducts } from "@/sanity/queries";
import { useSearchParams } from "next/navigation";

interface SubcategoryWithCount {
  _id: string;
  title: string;
  slug: any;
  image?: any;
  productCount?: number;
}

interface CategoryWithCount {
  _id: string;
  title: string;
  slug: any;
  image?: any;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

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
      let data: Product[] = [];
      if (selectedSubcategory) {
        data = await getProductsBySubcategory(selectedSubcategory);
      } else if (selectedCategory) {
        data = await getProductsByCategory(selectedCategory);
      } else {
        data = await getAllProducts();
      }
      // Filter by brand name if selected
      if (selectedBrand) {
        data = data.filter((product) => {
          const brand = product.brand as PopulatedBrand | undefined;
          return brand?.title && brand.title.toLowerCase() === selectedBrand.toLowerCase();
        });
      }
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory, selectedSubcategory, selectedBrand]);

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              All Products
            </Title>
            {(selectedCategory !== null || selectedSubcategory !== null || selectedBrand !== null || selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_green underline text-sm mt-2 font-medium hover:text-darkRed hoverEffect"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide">
            {/* Product Categories Filter */}
            <div className="mb-6">
              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
              />
            </div>
            {/* Brand Filter */}
            <div className="w-full bg-white p-5 mt-6">
              <Title className="text-base font-black">Brands</Title>
              <div className="flex flex-col gap-2 mt-2">
                {brands?.map((brand) => (
                  <button
                    key={brand._id}
                    className={`w-full text-center px-2 py-1 rounded font-semibold shadow-sm border-2 transition-all duration-200 hover:scale-[1.03] hover:shadow-md hover:border-[#6b7280] hover:bg-[#6b7280] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:border-[#6b7280] ${selectedBrand === brand.title ? "bg-[#6b7280] border-[#6b7280] text-white" : "bg-[#1e3a8a] border-[#1e3a8a] text-white"}`}
                    onClick={() => setSelectedBrand(brand.title)}
                  >
                    {brand.title ?? ''}
                    <span className="ml-2 text-xs text-gray-300">({brand.productCount ?? 0})</span>
                  </button>
                ))}
                {selectedBrand && (
                  <button
                    onClick={() => setSelectedBrand(null)}
                    className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-[#1e3a8a] hoverEffect text-left"
                  >
                    Reset selection
                  </button>
                )}
              </div>
            </div>

          </div>
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products?.map((product) => (
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
