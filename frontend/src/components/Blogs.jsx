import React from "react";
import { gradientClasses } from "../lib/gradientClasses";
import { useSelector } from "react-redux";
import { selectAllBlogs } from "../redux/reducers/blogs";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Blogs = () => {
  const blogs = useSelector(selectAllBlogs);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!blogs || blogs.length === 0) {
    return (
      <div className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 text-white">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Latest Blog Posts
        </h1>
        <div className="text-center text-xl font-medium text-gray-400">
          No blog posts found
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Latest Blog Posts
      </h1>
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <FaCalendarAlt />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                {blog.title}
              </h3>
              <p className="text-gray-400 mb-6 line-clamp-3">{blog.content}</p>
              <button className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Read More
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
