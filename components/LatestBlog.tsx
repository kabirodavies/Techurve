import React from "react";
import Title from "./Title";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return (
    <div className="mb-10 lg:mb-20">
      <Title>Latest Blog</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {blogs?.map((blog) => (
          <div
            key={blog?._id}
            className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group flex flex-col h-full"
          >
            <div className="relative w-full h-56">
              {blog?.mainImage && (
                <>
                  <Link href={`/blog/${blog?.slug?.current}`} className="block h-full">
                    <Image
                      src={urlFor(blog?.mainImage).url()}
                      alt="blogImage"
                      fill
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-white drop-shadow-md line-clamp-2">
                        {blog?.title}
                      </h3>
                      <Link
                        href={`/blog/${blog?.slug?.current}`}
                        className="inline-block w-max px-3 py-1 bg-blue-600 text-white text-xs rounded-full shadow hover:bg-blue-700 transition-colors duration-200"
                      >
                        Read More
                      </Link>
                    </div>
                  </Link>
                </>
              )}
            </div>
            <div className="bg-shop_light_bg p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                {blog?.blogcategories?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full mr-1"
                  >
                    {item?.title}
                  </span>
                ))}
                <span className="flex items-center gap-1 text-lightColor text-xs">
                  <Calendar size={14} className="inline-block mr-1" />
                  {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
