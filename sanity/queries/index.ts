import { client } from "../lib/client";
import {
  BLOG_CATEGORIES,
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  GET_ALL_BLOG,
  LATEST_BLOG_QUERY,
  MY_ORDERS_QUERY,
  ALL_ORDERS_QUERY,
  OTHERS_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  SINGLE_BLOG_QUERY,
  GET_PORTFOLIO_BLOGS,
  CATEGORIES_WITH_SUBCATEGORIES,
  PRODUCTS_BY_SUBCATEGORY,
  PRODUCTS_BY_CATEGORY,
  ALL_PRODUCTS_QUERY,
  PRODUCTS_BY_BRAND_SLUG,
  GET_ALL_SOLUTIONS,
} from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && subcategory->parent._ref == ^._id])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && subcategory->parent._ref == ^._id])
        }`;
    return await client.fetch(query, quantity ? { quantity } : {});
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};

const getAllBrands = async () => {
  try {
    return await client.fetch(BRANDS_QUERY);
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getLatestBlogs = async () => {
  try {
    return await client.fetch(LATEST_BLOG_QUERY);
  } catch (error) {
    console.log("Error fetching latest Blogs:", error);
    return [];
  }
};
const getDealProducts = async () => {
  try {
    return await client.fetch(DEAL_PRODUCTS);
  } catch (error) {
    console.log("Error fetching deal Products:", error);
    return [];
  }
};
const getProductBySlug = async (slug: string) => {
  try {
    return await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
const getBrand = async (slug: string) => {
  try {
    return await client.fetch(BRAND_QUERY, { slug });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
const getMyOrders = async (userId: string) => {
  try {
    return await client.fetch(MY_ORDERS_QUERY, { userId });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

const getAllOrders = async () => {
  try {
    return await client.fetch(ALL_ORDERS_QUERY);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return null;
  }
};
const getAllBlogs = async (quantity: number) => {
  try {
    return await client.fetch(GET_ALL_BLOG, { quantity });
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getSingleBlog = async (slug: string) => {
  try {
    return await client.fetch(SINGLE_BLOG_QUERY, { slug });
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};
const getBlogCategories = async () => {
  try {
    return await client.fetch(BLOG_CATEGORIES);
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number) => {
  try {
    return await client.fetch(OTHERS_BLOG_QUERY, { slug, quantity });
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getPortifolio = async (slug: string, quantity: number) => {
  try {
    return await client.fetch(GET_PORTFOLIO_BLOGS, { slug, quantity });
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getCategoriesWithSubcategories = async () => {
  return await client.fetch(CATEGORIES_WITH_SUBCATEGORIES);
};

const getProductsBySubcategory = async (subcategoryId: string) => {
  return await client.fetch(PRODUCTS_BY_SUBCATEGORY, { subcategoryId });
};

const getProductsByCategory = async (categoryId: string) => {
  return await client.fetch(PRODUCTS_BY_CATEGORY, { categoryId });
};

const getAllProducts = async () => {
  return await client.fetch(ALL_PRODUCTS_QUERY);
};

const getProductsByBrandSlug = async (brandSlug: string) => {
  return await client.fetch(PRODUCTS_BY_BRAND_SLUG, { brandSlug });
};

const getAllCaseStudies = async (limit = 100) => {
  const query = `*[_type == "caseStudy"]|order(publishedAt desc)[0...$limit]{
    _id,
    title,
    slug,
    summary,
    mainImage,
    publishedAt,
    location,
    product,
    topic,
    tags,
  }`;
  return await client.fetch(query, { limit });
};

const getSingleCaseStudy = async (slug: string) => {
  const query = `*[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    summary,
    mainImage,
    publishedAt,
    location,
    product,
    topic,
    tags,
    overview,
    challenges,
    solution,
    solutionProducts[]->{
      _id,
      title,
      name,
      images,
      price,
      discount,
      stock,
      status,
      brand->{title,slug},
      subcategory->{title,slug,parent->{title,slug}},
      slug,
      overview
    }
  }`;
  return await client.fetch(query, { slug });
};

const getSingleHotProduct = async () => {
  try {
    const query = `*[_type == 'product' && status == 'hot'] | order(name asc) [0]{
      ...,
      overview,
      brand->{
        title,
        slug
      },
      subcategory->{
        title,
        slug,
        parent->{
          title,
          slug
        }
      }
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.log("Error fetching single hot product:", error);
    return null;
  }
};

const getAllSolutions = async () => {
  try {
    return await client.fetch(GET_ALL_SOLUTIONS);
  } catch (error) {
    console.error("Error fetching all solutions:", error);
    return [];
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
  getBrand,
  getMyOrders,
  getAllOrders,
  getAllBlogs,
  getSingleBlog,
  getBlogCategories,
  getOthersBlog,
  getPortifolio,
  getCategoriesWithSubcategories,
  getProductsBySubcategory,
  getProductsByCategory,
  getAllProducts,
  getProductsByBrandSlug,
  getAllCaseStudies,
  getSingleCaseStudy,
  getSingleHotProduct,
  getAllSolutions,
};
