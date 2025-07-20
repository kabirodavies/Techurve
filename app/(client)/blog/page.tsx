import Container from "@/components/Container";
import { getAllBlogs } from "@/sanity/queries";
import React from "react";
import BlogListWithFilter from "@/components/BlogListWithFilter";
import type { GET_ALL_BLOGResult } from "@/sanity.types";

const BlogPage = async () => {
  const blogsRaw: GET_ALL_BLOGResult = await getAllBlogs(100); // Fetch more blogs to allow filtering

  // Map blogsRaw to Blog[] by converting blogcategories to reference format
  const blogs = blogsRaw.map((blog) => ({
    ...blog,
    blogcategories: blog.blogcategories
      ? blog.blogcategories.map((cat, idx) => ({
          _ref: cat._id ?? `unknown-id-${idx}`,
          _type: "reference" as const,
          _key: `cat-${idx}`
        }))
      : []
  }));

  // Extract unique categories from all blogs
  const categoryMap = new Map<string, string>();
  blogsRaw?.forEach((blog) => {
    blog?.blogcategories?.forEach((cat) => {
      if (cat?.title) categoryMap.set(cat.title, cat.title);
    });
  });
  const categories = Array.from(categoryMap.values());

  // Extract unique tags from all blogs
  const tagSet = new Set<string>();
  blogs?.forEach((blog) => {
    const tags = (blog && 'tags' in blog && Array.isArray((blog as { tags?: string[] }).tags)) ? (blog as { tags?: string[] }).tags : [];
    (tags ?? []).forEach((tag: string) => tagSet.add(tag));
  });
  const tags = Array.from(tagSet) as string[];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-black text-white py-20 px-6 text-center overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 z-10 relative">News, Events & Thoughts.</h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 z-10 relative">
          Stay informed with the latest trends, tips, and news in security, automation, and technology.
        </p>

        <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/blog-bg.jpg')" }} />
      </section>

      <Container>
        <div className="mt-10" />
        <div className="mb-16">
          <BlogListWithFilter blogs={blogs} categories={categories} tags={tags} />
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
