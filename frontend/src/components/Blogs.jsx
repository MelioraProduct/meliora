import React from "react";
import { gradientClasses } from "../lib/gradientClasses";
import { useSelector } from "react-redux";
import { selectAllBlogs } from "../redux/reducers/blogs";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaNewspaper } from "react-icons/fa";

const Blogs = () => {
  const blogs = useSelector(selectAllBlogs);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!blogs || blogs.length === 0) {
    return (
      <div className="py-24 px-4" style={{
        background: 'linear-gradient(123deg, rgba(245, 218, 224, 1) 13%, rgba(148, 187, 233, 1) 100%)'
      }}>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-200 font-sans tracking-tight drop-shadow-sm">
          Latest Blogs
        </h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
            <FaNewspaper className="w-12 h-12 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Blogs Available</h2>
          <p className="text-gray-600 text-center max-w-md mb-6">
            We're currently preparing our blog content. Please check back soon for our latest articles and updates.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4" style={{
      background: 'linear-gradient(123deg, rgba(245, 218, 224, 1) 13%, rgba(148, 187, 233, 1) 100%)'
    }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        ref={ref}
        className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-200 font-sans tracking-tight drop-shadow-sm">
        Latest Blogs
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog, index) => {
          const gradientClass = gradientClasses[index % gradientClasses.length];
          return (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
              <img
                src={blog.image}
                alt={blog.blogName}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {blog.blogName}
                </h3>
                <p className="text-gray-600">{blog.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
