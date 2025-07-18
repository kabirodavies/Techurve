import Container from "@/components/Container";
import Title from "@/components/Title";
import { getAllBlogs } from "@/sanity/queries";
import Link from "next/link";
import React from "react";
import BlogListWithFilter from "@/components/BlogListWithFilter";

const BlogPage = async () => {
  const blogs = await getAllBlogs(100); // Fetch more blogs to allow filtering

  // Extract unique categories from all blogs
  const categoryMap = new Map();
  blogs?.forEach((blog) => {
    blog?.blogcategories?.forEach((cat) => {
      if (cat?.title) categoryMap.set(cat.title, cat.title);
    });
  });
  const categories = Array.from(categoryMap.values());

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20 px-6 text-center overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 z-10 relative">News, Events & Thoughts.</h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 z-10 relative">
          Stay informed with the latest trends, tips, and news in security, automation, and technology.
        </p>

        <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/blog-bg.jpg')" }} />
      </section>

      <Container>
        <BlogListWithFilter blogs={blogs} categories={categories} />
      </Container>
    </div>
  );
};

export default BlogPage;
