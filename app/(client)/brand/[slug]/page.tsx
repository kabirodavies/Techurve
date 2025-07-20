import { BrandPageClient } from "./BrandPageClient";
import { getProductsByBrandSlug, getAllBrands } from "@/sanity/queries";
import { Product } from "@/sanity.types";
import { toExpandedProduct } from "@/types/ExpandedProduct";

// Server wrapper to fetch data and pass as props
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rawProducts = await getProductsByBrandSlug(slug);
  const products = rawProducts.map(product => {
    const expanded = toExpandedProduct(product as Product);
    return {
      ...expanded,
      brand: expanded.brand === null ? undefined : expanded.brand,
    };
  });
  const brands = await getAllBrands();
  const brand = brands.find((b) => b.slug?.current === slug);
  return <BrandPageClient initialProducts={products || []} brand={brand} />;
}
