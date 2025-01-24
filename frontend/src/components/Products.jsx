import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp.tsx";
import ProductCard from "./ProductCard.jsx";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products");

        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          console.log("No products found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className='bg-gradient-to-br mt-[-10%] from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl'>
        Our Products
      </motion.h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 py-8'>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className='text-center text-2xl font-medium text-gray-500 col-span-full'>
            No products found
          </div>
        )}
      </div>
    </LampContainer>
  );
}

export default Products;

/* Made by Labeeb Tariq */
/* Dynamic by: Wali M. Ahmad */
