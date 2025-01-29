import React from "react";
import { gradientClasses } from "../lib/gradientClasses";
import { StickyScroll } from "./../ui/sticky-scroll-reveal.tsx";
import { useSelector } from "react-redux";
import { selectAllBlogs } from "../redux/reducers/blogs";

export default function Blog() {
  const blogs = useSelector(selectAllBlogs);

  const transformedContent = blogs.map((blog, index) => {
    const gradientClass = gradientClasses[index % gradientClasses.length];

    return {
      title: blog.blogName,
      description: blog.text,
      content: (
        <div
          className={`h-full w-full ${gradientClass} flex items-center justify-center text-white`}>
          <img
            src={blog.image}
            alt={blog.blogName}
            className='h-full w-full object-cover'
          />
        </div>
      ),
    };
  });

  return (
    <div>
      {transformedContent.length > 0 ? (
        <StickyScroll content={transformedContent} />
      ) : (
        <div className='text-center text-2xl font-medium text-zinc-900'>
          No blogs available.
        </div>
      )}
    </div>
  );
}
