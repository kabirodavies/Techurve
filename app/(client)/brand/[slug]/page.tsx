import { BrandPageClient } from "./BrandPageClient";
import { getProductsByBrandSlug, getAllBrands } from "@/sanity/queries";

// Server wrapper to fetch data and pass as props
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = (await getProductsByBrandSlug(slug)).map((product: any) => ({
    ...product,
    brand: product.brand === null ? undefined : product.brand,
  }));
  const brands = await getAllBrands();
  const brand = brands.find((b) => b.slug?.current === slug);
  return <BrandPageClient initialProducts={products || []} brand={brand} />;
}
