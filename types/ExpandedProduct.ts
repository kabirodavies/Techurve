import { Product } from "@/sanity.types";

export interface ExpandedProduct extends Omit<Product, 'brand' | 'subcategory'> {
  brand?: {
    title?: string;
    slug?: { current?: string };
  };
  subcategory?: {
    _id?: string;
    title?: string;
    slug?: { current?: string };
    parent?: {
      title?: string;
      slug?: { current?: string };
    };
  };
}

export function toExpandedProduct(product: Product): ExpandedProduct {
  return product as unknown as ExpandedProduct;
} 