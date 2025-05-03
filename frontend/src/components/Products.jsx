import React from "react";
import ProductCard from "./ProductCard.jsx";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../redux/reducers/products.js";

function Products() {
  const products = useSelector(selectAllProducts);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h1 className='text-4xl md:text-7xl font-bold text-center text-white mb-12'>
        Our Products
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
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
    </div>
  );
}

export default Products;

/* Made by Labeeb Tariq */
/* Dynamic by: Wali M. Ahmad */
