import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const selectedBrand = searchParams.get("brand");
    const selectedCategory = searchParams.get("category");
    
    const query = `
      *[_type == 'product'
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
      ]{
        _id, name, slug, images, price, discount, stock, status, brand, "categories": categories[]->title
      }
    `;
    const products = await backendClient.fetch(query, { selectedBrand, selectedCategory });
    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 