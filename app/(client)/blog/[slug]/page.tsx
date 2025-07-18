import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import {
  getBlogCategories,
  getOthersBlog,
  getSingleBlog,
  getAllBlogs,
} from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon, Pencil } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Helper to extract ToC from PortableText blocks
type TocItem = { id: string; text: string; level: string };
function extractToc(blocks: any[]): TocItem[] {
  const toc: TocItem[] = [];
  let headingCount = 0;
  blocks?.forEach((block: any) => {
    if (block._type === "block" && (block.style === "h2" || block.style === "h3")) {
      headingCount++;
      const id =
        (block.children?.[0]?.text || `section-${headingCount}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") + `-${headingCount}`;
      toc.push({
        id,
        text: block.children?.[0]?.text || `Section ${headingCount}`,
        level: block.style,
      });
      block._tocId = id; // Attach id for later use
    }
  });
  return toc;
}

const SingleBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  let blog = await getSingleBlog(slug);
  if (Array.isArray(blog)) blog = blog[0] || null;
  if (!blog) return notFound();

  // Fetch all blogs to find the next one in the same category
  const allBlogs = await getAllBlogs(100);
  // Get current blog categories (by title)
  const currentCategories = (blog.blogcategories || []).map((cat: any) => cat.title);
  // Filter blogs in the same category (excluding current)
  const sameCategoryBlogs = allBlogs.filter(
    (b) =>
      b.slug?.current !== slug &&
      b.blogcategories?.some((cat: any) => currentCategories.includes(cat.title))
  );
  // Sort by publishedAt ascending
  const sortedSameCategory = sameCategoryBlogs.sort((a, b) => new Date(a.publishedAt || '').getTime() - new Date(b.publishedAt || '').getTime());
  // Find the next blog in the same category (by date)
  const currentDate = new Date(blog.publishedAt || '').getTime();
  const nextInCategory = sortedSameCategory.find((b) => new Date(b.publishedAt || '').getTime() > currentDate);
  // Fallback: random blog in same category (if no next)
  let nextBlog = nextInCategory;
  if (!nextBlog && sortedSameCategory.length > 0) {
    nextBlog = sortedSameCategory[Math.floor(Math.random() * sortedSameCategory.length)];
  }

  // Extract ToC and add anchor IDs to blocks
  const blocks = blog.body || [];
  const toc = extractToc(blocks);

  // Helper to render PortableText with anchor IDs for headings
  function PortableTextWithAnchors({ value }: { value: any[] }) {
    let headingCount = 0;
    return (
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }: { children?: React.ReactNode }) => <p className="my-5 text-base/8 first:mt-0 last:mb-0">{children}</p>,
            h2: ({ children }: { children?: React.ReactNode }) => {
              headingCount++;
              const id = toc.find((t, i) => t.level === "h2" && i + 1 === headingCount)?.id || `section-${headingCount}`;
              return <h2 id={id} className="my-8 text-2xl font-bold scroll-mt-32">{children}</h2>;
            },
            h3: ({ children }: { children?: React.ReactNode }) => {
              headingCount++;
              const id = toc.find((t, i) => t.level === "h3" && i + 1 === headingCount)?.id || `section-${headingCount}`;
              return <h3 id={id} className="my-6 text-xl font-semibold scroll-mt-32">{children}</h3>;
            },
            blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="my-5 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">{children}</blockquote>,
          },
          types: {
            image: ({ value }) => (
              <Image
                alt={value.alt || ""}
                src={urlFor(value).width(2000).url()}
                className="w-full rounded-2xl"
                width={1400}
                height={1000}
              />
            ),
            separator: ({ value }) => {
              switch (value.style) {
                case "line":
                  return <hr className="my-5 border-t border-gray-200" />;
                case "space":
                  return <div className="my-5" />;
                default:
                  return null;
              }
            },
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">{children}</ol>,
          },
          listItem: {
            bullet: ({ children }) => <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>,
            number: ({ children }) => <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>,
          },
          marks: {
            strong: ({ children }) => <strong className="font-semibold text-gray-950">{children}</strong>,
            code: ({ children }) => <><span aria-hidden>`</span><code className="text-[15px]/8 font-semibold text-gray-950">{children}</code><span aria-hidden>`</span></>,
            link: ({ value, children }) => <Link href={value.href} className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-[hover]:decoration-gray-600">{children}</Link>,
          },
        }}
      />
    );
  }

  // Placeholder featured product
  const featuredProduct = {
    name: "A700 FBI FAP 30 Certified Optical Fingerprint Scanner",
    image: "/images/products/product_3.png",
    link: "/product/a700-fingerprint-scanner",
    description: "A compact, high-accuracy fingerprint scanner for secure ID verification.",
  };

  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: ToC + Featured Product (now on the left) */}
        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 flex flex-col h-[calc(100vh-6rem)]">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-xl shadow p-6 mb-6">
                <ul className="space-y-2 list-disc pl-5">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === "h3" ? "ml-6" : ""}>
                      <a
                        href={`#${item.id}`}
                        className="text-blue-700 hover:underline text-sm block transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex-1" />
            {/* Next Blog Post in Sidebar at Bottom */}
            {nextBlog && (
              <div className="bg-white border border-gray-100 rounded-xl shadow p-6 mb-6 mt-auto">
                <div className="text-gray-500 text-sm mb-2 font-semibold">Next:</div>
                <div className="flex flex-col items-center md:items-start md:flex-row gap-4">
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-base font-bold mb-2">{nextBlog.title}</div>
                    <Link
                      href={`/blog/${nextBlog.slug?.current}`}
                      className="inline-block px-5 py-2 bg-blue-700 text-white rounded shadow hover:bg-blue-800 transition font-semibold"
                    >
                      Learn more
                    </Link>
                  </div>
                  {nextBlog.mainImage && (
                    <div className="w-full md:w-28 flex-shrink-0">
                      <Image
                        src={urlFor(nextBlog.mainImage).url()}
                        alt={nextBlog.title || "Next Blog Image"}
                        width={112}
                        height={80}
                        className="object-cover rounded-lg mx-auto md:mx-0"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>
        {/* Main Content */}
        <div className="lg:col-span-8">
          {blog?.mainImage && (
            <Image
              src={urlFor(blog?.mainImage).url()}
              alt={blog.title || "Blog Image"}
              width={400}
              height={400}
              className="w-full max-h-[400px] object-cover rounded-xl mb-8"
            />
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            {blog?.blogcategories?.map((item, idx) => (
              <span key={idx} className="font-semibold text-shop_dark_green tracking-wider">
                {item?.title ?? "No Category"}
              </span>
            ))}
            <span className="flex items-center gap-1">
              <Pencil size={15} /> {blog?.author?.name}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={15} /> {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{blog?.title}</h1>
          <div className="prose max-w-none prose-blue prose-lg">
            <PortableTextWithAnchors value={blocks} />
          </div>
          <div className="mt-10">
            <Link href="/blog" className="flex items-center gap-1 text-blue-700 hover:underline">
              <ChevronLeftIcon className="size-5" />
              <span className="text-sm font-semibold">Back to blog</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleBlogPage;
