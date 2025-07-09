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
};
