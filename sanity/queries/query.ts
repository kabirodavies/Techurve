import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(name asc) {
  _id,
  title,
  slug,
  image,
  "productCount": count(*[_type == 'product' && brand._ref == ^._id])
}`);

const LATEST_BLOG_QUERY = defineQuery(
  ` *[_type == 'blog' && isLatest == true]|order(name asc){
      ...,
      blogcategories[]->{
      title
    }
    }`
);

const DEAL_PRODUCTS = defineQuery(
  `*[_type == 'product' && status == 'hot'] | order(name asc){
    ...,"categories": categories[]->title
  }`
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]{
    ...,
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
  }`
);

const BRAND_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`);

const MY_ORDERS_QUERY =
  defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderDate desc){
...,products[]{
  ...,product->
}
}`);

const ALL_ORDERS_QUERY =
  defineQuery(`*[_type == 'order'] | order(orderDate desc){
...,products[]{
  ...,product->
}
}`);
// const GET_ALL_BLOG = defineQuery(
//   `*[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
//   ...,  
//      blogcategories[]->{
//     title
// }
//     }
//   `
// );


const GET_ALL_BLOG = defineQuery(
  `*[_type == 'blog' && !('Portfolio' in blogcategories[]->title)] | order(publishedAt desc)[0...$quantity]{
    ...,
    blogcategories[]->{
      title
    }
  }`
);

const GET_PORTFOLIO_BLOGS = defineQuery(
  `*[_type == 'blog' && 'Portfolio' in blogcategories[]->title] | order(publishedAt desc)[0...$quantity]{
    ...,
    blogcategories[]->{
      title
    }
  }`
);

const SINGLE_BLOG_QUERY =
  defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  ..., 
    author->{
    name,
    image,
  },
  blogcategories[]->{
    title,
    "slug": slug.current,
  },
}`);

const BLOG_CATEGORIES = defineQuery(
  `*[_type == "blog"]{
     blogcategories[]->{
    ...
    }
  }`
);

const OTHERS_BLOG_QUERY = defineQuery(`*[
  _type == "blog"
  && defined(slug.current)
  && slug.current != $slug
]|order(publishedAt desc)[0...$quantity]{
...
  publishedAt,
  title,
  mainImage,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);

const CATEGORIES_WITH_SUBCATEGORIES = defineQuery(`
  *[_type == "category"]{
    _id,
    title,
    slug,
    image,
    "productCount": count(*[_type == "product" && subcategory->parent._ref == ^._id]),
    "subcategories": *[_type == "subcategory" && parent._ref == ^._id]{
      _id,
      title,
      slug,
      image,
      "productCount": count(*[_type == "product" && subcategory._ref == ^._id])
    }
  }
`);

const PRODUCTS_BY_SUBCATEGORY = defineQuery(`
  *[_type == "product" && subcategory._ref == $subcategoryId] | order(name asc){
    ...,
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
  }
`);

const PRODUCTS_BY_CATEGORY = defineQuery(`
  *[_type == "product" && subcategory->parent._ref == $categoryId] | order(name asc){
    ...,
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
  }
`);

const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] | order(name asc) {
    ...,
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
  }
`);

export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  MY_ORDERS_QUERY,
  ALL_ORDERS_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES,
  OTHERS_BLOG_QUERY,
  GET_PORTFOLIO_BLOGS,
  CATEGORIES_WITH_SUBCATEGORIES,
  PRODUCTS_BY_SUBCATEGORY,
  PRODUCTS_BY_CATEGORY,
  ALL_PRODUCTS_QUERY,
};