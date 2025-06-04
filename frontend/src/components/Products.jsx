import { motion } from "framer-motion";
import ProductCard from "./ProductCard.jsx";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../redux/reducers/products.js";
import { useInView } from "react-intersection-observer";
import { FaBoxOpen } from "react-icons/fa";

function Products() {
  const products = useSelector(selectAllProducts);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen py-16 px-4" style={{
      background: 'linear-gradient(123deg, rgba(245, 218, 224, 1) 13%, rgba(148, 187, 233, 1) 100%)'
    }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        ref={ref}
        className="text-4xl font-bold text-center md:text-7xl mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-200 font-sans tracking-tight drop-shadow-sm">
        Our Products
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-full flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
              <FaBoxOpen className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Products Available</h2>
            <p className="text-gray-600 text-center max-w-md mb-6">
              We're currently updating our product catalog. Please check back soon for our latest collection.
            </p>
            
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Products;

/* Made by Labeeb Tariq */
/* Dynamic by: Wali M. Ahmad */
