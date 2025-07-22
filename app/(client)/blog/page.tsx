import Container from "@/components/Container";
import { getAllBlogs } from "@/sanity/queries";
import React from "react";
import BlogListWithFilter from "@/components/BlogListWithFilter";
import type { GET_ALL_BLOGResult } from "@/sanity.types";
import HeroSection from "@/components/HeroSection";

const BlogPage = async () => {
  const blogsRaw: GET_ALL_BLOGResult = await getAllBlogs(100); // Fetch more blogs to allow filtering

  // Remove the remapping of blogcategories
  // const blogs = blogsRaw.map((blog) => ({
  //   ...blog,
  //   blogcategories: blog.blogcategories
  //     ? blog.blogcategories.map((cat, idx) => ({
  //         _ref: cat._id ?? `unknown-id-${idx}`,
  //         _type: "reference" as const,
  //         _key: `cat-${idx}`
  //       }))
  //     : []
  // }));

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
  blogsRaw?.forEach((blog) => {
    const tags = (blog && 'tags' in blog && Array.isArray((blog as { tags?: string[] }).tags)) ? (blog as { tags?: string[] }).tags : [];
    (tags ?? []).forEach((tag: string) => tagSet.add(tag));
  });
  const tags = Array.from(tagSet) as string[];

  return (
    <div>
      <HeroSection
        title="News, Events & Thoughts."
        subtitle="Stay informed with the latest trends, tips, and news in security, automation, and technology."
        bannerAlt="Blog Banner"
        showImage={false}
      />
      <Container>
        <div className="mt-10" />
        <div className="mb-16">
          <BlogListWithFilter blogs={blogsRaw} categories={categories} tags={tags} />
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
