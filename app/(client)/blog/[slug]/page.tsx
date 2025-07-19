import Container from "@/components/Container";
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import SocialMedia from "@/components/SocialMedia";
import type { GET_ALL_BLOGResult } from "@/sanity.types";
import { getSingleBlog, getAllBlogs } from "@/sanity/queries";
import type { BlockContent } from "@/sanity.types";

// Helper to extract ToC from PortableText blocks
type TocItem = { id: string; text: string; level: string };
function extractToc(blocks: BlockContent): TocItem[] {
  const toc: TocItem[] = [];
  let headingCount = 0;
  blocks?.forEach((block) => {
    if (
      block &&
      block._type === "block" &&
      (block.style === "h2" || block.style === "h3")
    ) {
      headingCount++;
      const id =
        (block.children?.[0]?.text || `section-${headingCount}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") + `-${headingCount}`;
      toc.push({
        id,
        text: block.children?.[0]?.text || `Section ${headingCount}`,
        level: block.style as string,
      });
    }
  });
  return toc;
}

const SingleBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blogResult = await getSingleBlog(slug);
  const blog = Array.isArray(blogResult) ? blogResult[0] : blogResult;
  if (!blog) return notFound();

  // Fetch all blogs to find the next one in the same category
  const allBlogs: GET_ALL_BLOGResult = await getAllBlogs(100);
  // Get current blog categories (by title)
  const currentCategories = (blog.blogcategories || []).map((cat) => cat.title);
  // Filter blogs in the same category (excluding current)
  const sameCategoryBlogs = allBlogs.filter(
    (b) =>
      b.slug?.current !== slug &&
      b.blogcategories?.some((cat) => currentCategories.includes(cat.title ?? ""))
  );
  // Always pick a random blog in the same category (if any)
  let nextBlog: typeof allBlogs[number] | null = null;
  if (sameCategoryBlogs.length > 0) {
    nextBlog = sameCategoryBlogs[Math.floor(Math.random() * sameCategoryBlogs.length)];
  }

  // Extract ToC and add anchor IDs to blocks
  const blocks: BlockContent = blog.body ?? [];
  const toc = extractToc(blocks);

  // Helper to render PortableText with anchor IDs for headings
  function PortableTextWithAnchors({ value }: { value: BlockContent }) {
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
            image: ({ value }: { value: { alt?: string } }) => (
              <Image
                alt={value.alt || ""}
                src={urlFor(value).width(2000).url()}
                className="w-full rounded-2xl"
                width={1400}
                height={1000}
              />
            ),
            separator: ({ value }: { value: { style?: string } }) => {
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
            bullet: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">{children}</ul>,
            number: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">{children}</ol>,
          },
          listItem: {
            bullet: ({ children }: { children?: React.ReactNode }) => <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>,
            number: ({ children }: { children?: React.ReactNode }) => <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>,
          },
          marks: {
            strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-gray-950">{children}</strong>,
            code: ({ children }: { children?: React.ReactNode }) => <><span aria-hidden>`</span><code className="text-[15px]/8 font-semibold text-gray-950">{children}</code><span aria-hidden>`</span></>,
            link: (props: { value?: { href?: string }; children?: React.ReactNode }) => {
              const { value, children } = props;
              return (
                <Link href={value?.href || "#"} className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-[hover]:decoration-gray-600">
                  {children}
                </Link>
              );
            },
          },
        }}
      />
    );
  }

  return (
    <div className="py-10">
      {/* Hero Section for Blog Post */}
      <section className="relative bg-gradient-to-br text-black py-20 px-6 text-left overflow-hidden mb-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 z-10 relative">{blog?.title}</h1>
        {/* Info Bar: Date, Category, Shared On (in hero) */}
        <div className="flex flex-wrap items-center gap-4 md:gap-8 text-base py-2 px-0 mb-2 z-10 relative">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 uppercase text-xs">Date:</span>
            <Calendar size={16} className="text-blue-700" />
            <span className="text-gray-900 text-sm md:text-base">{dayjs(blog.publishedAt).format("MMMM D, YYYY")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 uppercase text-xs">Category:</span>
            {Array.isArray(blog?.blogcategories) && blog.blogcategories.length > 0 ? (
              blog.blogcategories.map((cat: { title: string | null }, idx: number) => (
                <span key={idx} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-sm md:text-base font-normal">
                  {cat?.title ?? "No Category"}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm md:text-base">No Category</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 uppercase text-xs">Shared on:</span>
            <SocialMedia className="ml-1" iconClassName="border-gray-200 hover:border-blue-700" />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/blog-bg.jpg')" }} />
      </section>
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
        {/* Sidebar: ToC + Featured Product (now on the left) */}
        <aside className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-20 flex flex-col h-[calc(100vh-6rem)]">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-xl shadow p-4 mb-4 mt-0">
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
