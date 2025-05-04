import { motion } from "framer-motion";
import ProductCard from "./ProductCard.jsx";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../redux/reducers/products.js";
import { useInView } from "react-intersection-observer";

function Products() {
  const products = useSelector(selectAllProducts);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="py-16 px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        ref={ref}
        className="text-4xl font-medium text-center text-slate-800 md:text-7xl mb-12">
        Our Products
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="text-center text-2xl font-medium text-gray-500 col-span-full">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

/* Made by Labeeb Tariq */
/* Dynamic by: Wali M. Ahmad */
