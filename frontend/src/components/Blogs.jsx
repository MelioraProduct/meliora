import React from "react";
import { gradientClasses } from "../lib/gradientClasses";
import { useSelector } from "react-redux";
import { selectAllBlogs } from "../redux/reducers/blogs";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Blogs = () => {
  const blogs = useSelector(selectAllBlogs);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center text-2xl font-medium text-zinc-900 py-16">
        No blogs available.
      </div>
    );
  }

  return (
    <div className="py-16 px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => {
            const gradientClass = gradientClasses[index % gradientClasses.length];
            return (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-lg overflow-hidden shadow-lg ${gradientClass}`}>
                <img
                  src={blog.image}
                  alt={blog.blogName}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {blog.blogName}
                  </h3>
                  <p className="text-white/90">{blog.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Blogs;
