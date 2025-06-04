import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaArrowRight, FaBoxOpen } from "react-icons/fa";
import axios from "axios";

const WholeSale = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("/package");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (isLoading) {
    return (
      <div className="py-24 px-4" style={{
        background: 'linear-gradient(123deg, rgba(245, 218, 224, 1) 13%, rgba(148, 187, 233, 1) 100%)'
      }}>
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="py-24 px-4" style={{
        background: 'linear-gradient(123deg, rgba(245, 218, 224, 1) 13%, rgba(148, 187, 233, 1) 100%)'
      }}>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-200 font-sans tracking-tight drop-shadow-sm">
          Wholesale Packages
        </h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
            <FaBoxOpen className="w-12 h-12 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Packages Available</h2>
          <p className="text-gray-600 text-center max-w-md mb-6">
            We're currently preparing our wholesale packages. Please check back soon or contact our sales team for more information.
          </p>
          
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4" style={{
      background: 'linear-gradient(123deg, rgba(245, 218, 224, 1) 13%, rgba(148, 187, 233, 1) 100%)'
    }}>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-200 font-sans tracking-tight drop-shadow-sm">
        Wholesale Packages
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold">
                {pkg.name}
              </div>
            </div>
            <div className="text-center mt-8">
              <div className="text-4xl font-bold mb-4 text-gray-800">
                ${pkg.price}
                <span className="text-lg text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-8">{pkg.description}</p>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <FaCheck className="text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center w-full px-6 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full overflow-hidden">
                <span className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-white/10"></span>
                <span className="relative flex items-center justify-center gap-2">
                  Get Started
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WholeSale;

/* Made by Labeeb Tariq */
/* Dynamic by: Wali M. Ahmad */
